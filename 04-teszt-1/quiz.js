import { questions} from './js-alapok.js'


window.addEventListener('load', ev =>
{
    // --- helper: parse code block from question text (```js ... ```), return {text,noCodeHtml,code} ---
    function extractCode(questionText) {
        const codeFence = /```(?:js)?\n([\s\S]*?)```/i;
        const m = questionText.match(codeFence);
        if (m) {
            const code = m[1].trim();
            const text = questionText.replace(codeFence, '').trim();
            return { text, code };
        } else {
            return { text: questionText, code: null };
        }
    }

    // --- load questions from script tag quiz-data ---
    // let questions;
    // try {
    //     const el = document.getElementById('quiz-data');
    //     questions = JSON.parse(el.textContent);
    //     if (!Array.isArray(questions) || questions.length === 0) throw new Error('Nincs kérdés.');
    // } catch (e) {
    //     questions = [];
    //     document.getElementById('question').textContent = 'Hiba a kérdések betöltésében: ' + (e && e.message);
    //     console.error(e);
    //     return;
    // }

    // If you prefer to fetch external file, uncomment and use fetch: (requires same origin / CORS)
    // fetch('javascript_teszt.json').then(r=>r.json()).then(data=>questions=data).catch(console.error);

    let idx = 0;
    let correctCount = 0;
    let answeredCount = 0;
    const total = questions.length;

    const topicEl = document.querySelector('#topic');
    const qEl = document.querySelector('#question');
    const codeEl = document.querySelector('#code-block');
    const optsEl = document.querySelector('#options');
    const progressEl = document.querySelector('#progress');
    const scoreEl = document.querySelector('#scoreSummary');
    // const showBtn = document.getElementById('showBtn');
    const nextBtn = document.querySelector('#nextBtn');

    function sanitizeHtml(str) {
        // minimal escaping for safe insertion inside elements
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function renderQuestion(i) {
        const q = questions[i];
        progressEl.textContent = (i + 1) + ' / ' + total;
        scoreEl.textContent = `Jó válaszok: ${correctCount} / ${answeredCount}`;
        optsEl.innerHTML = '';
        codeEl.innerHTML = '';

        topicEl.innerHTML = q.topic;

        const { text, code } = extractCode(q.question || '');
        qEl.textContent = text || '(nincs kérdés szöveg)';

        if (code) {
            const pre = document.createElement('pre');
            pre.className = 'code';
            pre.textContent = code;
            codeEl.appendChild(pre);
        }

        // create options as radio buttons inside labels for easy clicking
        const formName = 'opt-' + i;
        (q.options || []).forEach((opt, j) => {
            const label = document.createElement('label');
            label.className = 'option';
            label.tabIndex = 0;
            const marker = document.createElement('span');
            marker.className = 'marker';
            marker.textContent = ''; // for check/X after reveal
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = formName;
            radio.value = j;
            radio.id = `q${i}_opt${j}`;
            radio.addEventListener('click', ev => nextBtn.disabled = false);

            const span = document.createElement('span');
            span.className = 'label-text';
            // allow option text to contain code fences too (rare)
            const { text: optText, optCode } = extractCode(opt);
            if (optCode) {
                span.innerHTML = sanitizeHtml(optText) + '<pre class="code">' + sanitizeHtml(optCode) + '</pre>';
            } else {
                span.textContent = opt;
            }

            label.appendChild(radio);
            label.appendChild(span);
            label.appendChild(marker);

            // when clicking label, select radio (native), but ensure keyboard also works
            label.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    radio.checked = true;
                }
            });

            optsEl.appendChild(label);
        });

        // reset buttons
        // showBtn.disabled = false;
        nextBtn.disabled = true;
        nextBtn.textContent = (i === total - 1) ? 'Eredmény' : 'Megmutat';
    }

    // reveal correct answer and mark feedback
    function revealCurrent() {
        const q = questions[idx];
        const labels = Array.from(optsEl.querySelectorAll('.option'));
        const radios = Array.from(optsEl.querySelectorAll('input[type=radio]'));
        const selectedIndex = radios.findIndex(r => r.checked);

        // count answered
        if (selectedIndex !== -1) answeredCount++;

        // mark all labels disabled
        labels.forEach(l => l.classList.add('disabled'));

        // mark correct and incorrect
        labels.forEach((label, j) => {
            const marker = label.querySelector('.marker');
            if (j === q.correct) {
                marker.textContent = '✓';
                marker.classList.add('good');
                // green background for correct
                label.style.borderColor = '#d1fae5';
                label.style.background = 'linear-gradient(180deg,#ecfdf5,#f0fff8)';
            } else if (j === selectedIndex && j !== q.correct) {
                marker.textContent = '✗';
                marker.classList.add('bad');
                label.style.borderColor = '#fee2e2';
                label.style.background = 'linear-gradient(180deg,#fff1f2,#fff6f6)';
            } else {
                // leave neutral
            }
        });

        // update score
        if (selectedIndex === q.correct) {
            correctCount++;
        }

        scoreEl.textContent = `Jó válaszok: ${correctCount} / ${answeredCount}`;
        // showBtn.disabled = true;
        nextBtn.disabled = false;
    }

    // proceed to next or finish
    function next() {
        const radios = Array.from(optsEl.querySelectorAll('input[type=radio]'));
        const selectedIndex = radios.findIndex(r => r.checked);
        if (selectedIndex == -1) {
            return;
        }
        revealCurrent();

        if (idx < total - 1) {
            idx++;
            renderQuestion(idx);
        } else {
            // finished: show final percentage
            const percent = total === 0 ? 0 : Math.round((correctCount / total) * 100);
            qEl.textContent = 'Kvíz vége';
            codeEl.innerHTML = '';
            optsEl.innerHTML = '';
            scoreEl.textContent = `Végső eredmény: ${correctCount} / ${total} (${percent}%)`;
            progressEl.textContent = `Kész: ${total} / ${total}`;
            // showBtn.disabled = true;
            nextBtn.disabled = true;
        }
    }

    // button handlers
    // showBtn.addEventListener('click', () => {
    //     revealCurrent();
    // });
    nextBtn.addEventListener('click', () => {
        if (nextBtn.textContent == 'Megmutat') {
            revealCurrent();
            nextBtn.textContent = 'Tovább';
        } else {
            next();
            nextBtn.textContent = 'Megmutat';
        }
        
    });

    // initial render
    renderQuestion(idx);

    // keyboard support: Enter => if show enabled -> reveal, else next
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // if (!showBtn.disabled) revealCurrent();
            // else
            if (!nextBtn.disabled) next();
        }
    });
});