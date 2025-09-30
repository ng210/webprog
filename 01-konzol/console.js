var _instance = null;
var _isDragging = false;

function handleEvent(event) {
    switch (event.type) {
        case 'pointerdown':
            _isDragging = true;
            _instance.border_.setPointerCapture(event.pointerId);
            break;
        case 'pointerup':
            _isDragging = false;
            _instance.border_.releasePointerCapture(event.pointerId);
            break;
        case 'pointermove':
            if (_isDragging) {
                _instance.style.top = `${event.clientY}px`;
                _instance.style.height = (_instance.parentNode.clientHeight - event.clientY) + 'px';
            }
            break;
    }
}

function createConsole() {
    if (_instance == null) {
        _instance = document.createElement('console');
        let border = document.createElement('div');
        border.className = 'border';
        border.addEventListener('pointerdown', handleEvent);
        border.addEventListener('pointerup', handleEvent);
        border.addEventListener('pointermove', handleEvent);
        let style = document.createElement('style');
        style.innerHTML = `@import '${import.meta.url.substring(0, import.meta.url.lastIndexOf('/'))+'/console.css'}'`;
        _instance.appendChild(style);
        _instance.appendChild(border);
        _instance.border_ = border;
        let content = document.createElement('div');
        content.className = 'content';
        _instance.appendChild(content);
    }
    return _instance;
}

function writeConsole(text) {
    if (_instance == null) {
        createConsole();
    }
    let content = _instance.querySelector('.content');
    content.innerText += text + '\n';
    content.scrollTop = content.scrollHeight;
}

function getConsole() {
    return _instance;
}

export { createConsole, writeConsole, getConsole };