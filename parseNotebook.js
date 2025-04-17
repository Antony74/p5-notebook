const path = require('path');
const fs = require('fs');

const parseNotebook = (notebookText) => {
    const output = [];
    const addLine = (s) => (output[output.length - 1].text += '\n' + s);

    for (text of notebookText.split('\n')) {
        text = text.trim();
        switch (text) {
            case '# %%--- [javascript]':
                output.push({ type: 'header', text });
                break;
            case '# ---%%':
                addLine(text);
                output.push({ type: 'babel', text: '' });
                break;
            case '# %% [javascript]':
                output.push({ type: 'header', text });
                output.push({ type: 'babel', text: '' });
                break;
            case '# %% [markdown]':
                output.push({ type: 'header', text });
                output.push({ type: 'markdown', text: '' });
                break;
            default:
                addLine(text);
        }
    }

    return output;
};

const Spellchecker = require('hunspell-spellchecker');
const spellchecker = new Spellchecker();

const dictDir = path.join(
    __dirname,
    'node_modules',
    'markdown-spellcheck',
    'data',
);

var DICT = spellchecker.parse({
    aff: fs.readFileSync(path.join(dictDir, 'en_US-large.aff')),
    dic: fs.readFileSync(path.join(dictDir, 'en_US-large.dic')),
});

spellchecker.use(DICT);

const spellcheckMarkdown = (md) => {
    const words = [''];
    let state = '+';
    md.split('').forEach((char) => {
        switch (state) {
            case ']':
                if (char === '(') {
                    state = '(';
                    return;
                } else {
                    state = '';
                }
                break;
            case '(':
                if (char === ')') {
                    state = '';
                }
                return;
        }

        if (char === ']') {
            state = ']';
        }

        switch (char) {
            case ' ':
            case '\r':
            case '\n':
            case '.':
            case '`':
            case '/':
            case '*':
            case '!':
            case '-':
            case '#':
            case ',':
            case '[':
            case ']':
            case '(':
            case ')':
            case '^':
            case '=':
            case '"':
            case ':':
            case '+':
            case '?':
            case ';':
            case '2':
            case '_':
                words.push('');
                break;
            default:
                words[words.length - 1] += char;
        }
    });

    words.forEach((word) => {
        if (word[0] === "'") {
            word = word.substring(1);
        }

        if (word.length && word[word.length - 1] === "'") {
            word = word.substring(0, word.length - 1);
        }

        const isRight = spellchecker.check(word);

        if (!isRight) {
            switch (word) {
                case 'p5':
                case 'lerp':
                case 'linearMap':
                case 'powerMap':
                case 'segmentedMap':
                case 'vectorMap':
                case 'sideLength':
                case 'heightOfEquilateralTriangle':
                case 'minotaur':
                case 'sqrt':
                case 'withinBounds':
                case 'Vectorizing':
                case 'kochSnowflakeMap':
                case 'tac':
                case 'explainlikeimfive':
                case 'p5js':
                case 'Reddit':
                case 'pointsStart':
                case 'pointsEnd':
                    break; // special case
                default:
                    console.warn(`Word ${word} not recognised`);
            }
        }
    });
};

module.exports = { parseNotebook, spellcheckMarkdown };
