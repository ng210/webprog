// ********************************
// Transform relative imports to absolute
// ********************************
function makeImportsAbsolute(code, baseUrl) {
    return code.replace(/import\s+(?:[^'"]+\s+from\s+)?['"](.+?)['"]/g,
        (match, p1) => {
            // If it's already absolute (starts with http://, https://, /) leave it
            if (/^(https?:)?\/\//.test(p1) || p1.startsWith('/')) return match;
            const abs = new URL(p1, baseUrl).href;
            return match.replace(p1, abs);
        }
    );
}

// ********************************
// Script patcher
// ********************************
function patchScriptCode(code, baseUrl) {
	code = makeImportsAbsolute(code, baseUrl);
	// uses shadowRoot implicitly
	return `
    const _isolatedWindowLoadHandlers = [];
    ${code
			.replace(/window\s*\.\s*addEventListener\s*\(\s*['"]load['"]\s*,/g, '_isolatedWindowLoadHandlers.push(')
            .replace(/\s*addEventListener\s*\(\s*['"]load['"]\s*,/g, '_isolatedWindowLoadHandlers.push(')
			.replace(/window\s*\.\s*onload\s*=\s*['"](\w+)['"]/g, (m, p1) => `_isolatedWindowLoadHandlers.push('${p1}')`)
			.replace(/\bdocument\b/g, 'shadowRoot')
		}

    const __runDeferredLoads = () => {
      for (const fn of _isolatedWindowLoadHandlers) {
        try { fn(); } catch (err) { console.error(err); }
      }
    };
    __runDeferredLoads();
  `;
}

// ********************************
// Utility: absolute path fixer
// ********************************
function absolutizeAttributes(doc, base) {
	const absolutize = (node, attr) => {
		const val = node.getAttribute(attr);
		if (!val) return;
		try {
			node.setAttribute(attr, new URL(val, base).href);
		} catch { }
	};

	doc.querySelectorAll("[src]").forEach(el => absolutize(el, "src"));
	doc.querySelectorAll("[href]").forEach(el => absolutize(el, "href"));
}

// ********************************
// CSS handling
// ********************************
async function injectStyles(doc, shadow) {
	// linked CSS
	for (const link of doc.querySelectorAll('link[rel="stylesheet"]')) {
		try {
			const cssText = await (await fetch(link.href)).text();
			const style = document.createElement("style");
			style.textContent = cssText;
			shadow.appendChild(style);
		} catch (err) {
			console.warn("CSS load failed:", link.href, err);
		}
	}

	// inline styles
	for (const styleTag of doc.querySelectorAll("style")) {
		const style = document.createElement("style");
		style.textContent = styleTag.textContent;
		shadow.appendChild(style);
	}
}

// ********************************
// Shadow DOM helpers
// ********************************
function resetShadow(host) {
    if (globalThis.__shadowRoot__) {
        delete globalThis.__shadowRoot__;
    }

	if (host.shadowRoot) {
		host.shadowRoot.innerHTML = "";
		const newHost = host.cloneNode(false);
		host.replaceWith(newHost);
		host = newHost;
	}
	return host.attachShadow({ mode: "open" });
}

function createShadowRootAPI(shadow) {
	return {
		getElementById: document.getElementById.bind(document),
		querySelector: shadow.querySelector.bind(shadow),
		querySelectorAll: shadow.querySelectorAll.bind(shadow),
		createElement: document.createElement.bind(document),
		createTextNode: document.createTextNode.bind(document),
		addEventListener: document.addEventListener.bind(document),
		body: shadow.querySelector('div.body')
	};

	// return {
	// 	createElement: (...args) => document.createElement(...args),
	// 	createTextNode: (...args) => document.createTextNode(...args),
	// 	body: new Proxy({}, {
	// 		get(_, prop) {
	// 			switch (prop) {
	// 				case 'appendChild': return el => shadow.appendChild(el);
	// 				case 'removeChild': return el => shadow.removeChild(el);
	// 				case 'querySelector': return sel => shadow.querySelector(sel);
	// 				case 'querySelectorAll': return sel => shadow.querySelectorAll(sel);
	// 			}
	// 			return document.body[prop];
	// 		}
	// 	})
	// };
}

// ********************************
// Script loader
//  uses globalThis.__shadowRoot__
// ********************************
async function loadIsolatedModule(url) {
	const code = await (await fetch(url)).text();
	const patched = patchScriptCode(code, url);

	// Wrap code to inject the shadowRoot variable into the module scope
	const wrappedCode = `
		const shadowRoot = globalThis.__shadowRoot__;
		${patched}
	`;

	const blob = new Blob([wrappedCode], { type: 'text/javascript' });
	const blobUrl = URL.createObjectURL(blob);

	try {
		await import(blobUrl);
	} finally {
		URL.revokeObjectURL(blobUrl);
	}
}

async function runInlineScripts(doc, shadowRoot) {
	const inlineScripts = [];

	for (const script of doc.querySelectorAll("script")) {
		if (script.type === "module") continue; // modules handled separately
		if (script.src) {
			const code = await (await fetch(script.src)).text();
			inlineScripts.push(code);
		} else {
			inlineScripts.push(script.textContent);
		}
	}

	for (const code of inlineScripts) {
		const wrapped = patchScriptCode(code, doc.baseURI);
		new Function('shadowRoot', wrapped)(shadowRoot);
	}
}

async function runModuleScripts(doc, shadowRoot) {
	const moduleScripts = [];

	for (const script of doc.querySelectorAll("script[type='module']")) {
		if (script.src) {
			moduleScripts.push(script.src);
		} else {
			const blob = new Blob([script.textContent], { type: 'text/javascript' });
			const blobUrl = URL.createObjectURL(blob);
			await import(blobUrl);
			URL.revokeObjectURL(blobUrl);
		}
	}

	for (const url of moduleScripts) {
		await loadIsolatedModule(url);
	}
}

// ********************************
// Bootstrap execution context
// ********************************
function runBootstrap() {
	globalThis._myWindow = {
		handlers: {},
		onload: null,
		addEventListener(event, fn) {
			if (event === "load") (this.handlers.load ||= []).push(fn);
		},
		triggerLoad() {
			if (this.onload) this.onload();
			if (this.handlers.load) this.handlers.load.forEach(fn => fn());
		}
	};
}

// ********************************
// Main orchestrator
// ********************************
async function loadIntoShadow(url, selector) {
	let host = document.querySelector(selector);
	if (!host) throw new Error("Host element not found: " + selector);

	const shadow = resetShadow(host);
	const html = await (await fetch(url)).text();
	const doc = new DOMParser().parseFromString(html, "text/html");
	const base = new URL(url, window.location.href);

	absolutizeAttributes(doc, base);
	await injectStyles(doc, shadow);

	const container = document.createElement("body");
	//container.className = 'body';
	container.innerHTML = doc.body.innerHTML;
	container.style.height = '100%';
	shadow.appendChild(container);

	// for (const node of [...doc.body.childNodes]) {
	// 	shadow.appendChild(node.cloneNode(true));
	// }

	const shadowRoot = createShadowRootAPI(shadow);
	globalThis.__shadowRoot__ = shadowRoot; // make available globally
	shadowRoot.body = container

	runBootstrap(shadow);
	await runInlineScripts(doc, shadowRoot);
	await runModuleScripts(doc, shadowRoot);

	if (window._myWindow) {
		setTimeout(() => window._myWindow.triggerLoad(), 0);
	}
}

async function createIndex(url, target, parent, template) {
	let resp = await fetch(url);
	if (!resp.ok) throw new Error(`Failed to fetch '${url}': ${resp.statusText}`);
	let index = await resp.json();
	let dummy = document.createElement('div');
	for (let item of index) {
		dummy.innerHTML += template.replace(/{{(\w+)}}+/g, (match, p1) => item[p1.toLowerCase()]);
		let child = dummy.querySelector(':last-child');
		child.addEventListener('click', e => loadIntoShadow(item.url, '#content').catch(err => console.err(err)));
		parent.appendChild(child);
	}
}

export { createIndex, loadIntoShadow };
