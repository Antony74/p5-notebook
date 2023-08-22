const path = require('path');
const fsp = require('fs/promises');

const mustache = require('mustache');

const { copyLibs } = require('./copyLibs');

copyLibs();

const notebooks = [
    {
        title: 'Tic-tac-toe',
        notebookFilename: 'tic-tac-toe.txt',
        htmlFilename: 'src/tic-tac-toe.html',
    },
    {
        title: 'In praise of the map function',
        notebookFilename: 'in-praise-of-the-map-function.txt',
        htmlFilename: 'src/in-praise-of-the-map-function.html',
    },
];

const build = async () => {
    const template = await fsp.readFile(
        path.join(__dirname, 'src', 'template.html'),
        { encoding: 'utf-8' }
    );

    notebooks.forEach((notebook) => {
        fsp.writeFile(
            path.join(__dirname, notebook.htmlFilename),
            mustache.render(template, notebook)
        );
    });
};

build();
