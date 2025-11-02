class HTML {
    static Entities = {
        'nbsp':  { 'char': ' ',  'name': 'nbsp',  'code':160 },
        'nbsp':  { 'char': '\t', 'name': 'nbsp',  'code':160 },
        'lt':    { 'char': '<',  'name': 'lt',    'code':60 },
        'gt':    { 'char': '>',  'name': 'gt',    'code':62 },
        'amp':   { 'char': '&',  'name': 'amp',   'code':38 },
        'quot':  { 'char': '"',  'name': 'quot',  'code':34 },
        'apos':  { 'char': "'",  'name': 'apos',  'code':39 },
        'cent':  { 'char': '¢',  'name': 'cent',  'code':162 },
        'pound': { 'char': '£',  'name': 'pound', 'code':163 },
        'yen':   { 'char': '¥',  'name': 'yen',   'code':165 },
        'euro':  { 'char': '€',  'name': 'euro',  'code':8364 },
        'copy':  { 'char': '©',  'name': 'copy',  'code':169 },
        'reg':   { 'char': '®',  'name': 'reg',   'code':174 }
    };

    static decode(html) {
        return html.replace(
            /&(.+);||(<\s*br\s*\/?>)/g,
            (m, p1, p2) => {
                var res = '';
                if (p1) {
                    var code = parseInt(p1);
                    var entity = isNaN(code) ?
                        HTML.Entities.find(e => e.code == code) :
                        HTML.Entities.find(e => e.name == p1);
                    res = entity || p1;
                } else if (p2) {
                    res = '<br/>'
                }
                return res;
            }
        );
    }

    static encode(txt) {
        var chunks = [];
        var isSep = true;
        if (typeof txt === 'string') {
            var start = 0;
            for (var ci=0; ci<txt.length; ci++) {
                var ch = txt.charAt(ci);
                var swapToken = '';
                if (ch == '\n') {
                    swapToken = '<br/>';
                    isSep = true;
                } else if (ch == ' ') {
                    if (isSep) {
                        swapToken = '&nbsp;';
                    }
                } else {
                    for (var key in HTML.Entities) {
                        if (HTML.Entities[key].char == ch) {
                            swapToken = `&${key};`;
                            break;
                        }
                    }
                    isSep = false;
                }
                if (swapToken) {
                    if (ci > start) {
                        chunks.push(txt.substring(start, ci));
                    }
                    chunks.push(swapToken);
                    start = ci + 1;
                }
            }
            if (ci > start) {
                chunks.push(txt.substring(start, ci));
            }
        } else {
            chunks.push(txt);
        }

        return chunks.join('');
    }
}
export { HTML }