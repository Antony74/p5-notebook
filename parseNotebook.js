const parseNotebook = (notebookText) => {
    const output = [];
    const addLine = (s) => (output[output.length - 1].text += '\n' + s);

    for (text of notebookText.split('\n')) {
        switch (text.trim()) {
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

module.exports = { parseNotebook };
