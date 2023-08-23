const path = require('path');
const fsp = require('fs/promises');

const mustache = require('mustache');

const { copyLibs } = require('./copyLibs');

copyLibs();

const notebooks = [
    {
        title: 'In praise of the map function',
        notebookFilename: 'in-praise-of-the-map-function.txt',
        htmlFilename: 'in-praise-of-the-map-function.html',
    },
    {
        title: 'Tic-tac-toe',
        notebookFilename: 'tic-tac-toe.txt',
        htmlFilename: 'tic-tac-toe.html',
    },
];

const build = async () => {
    const template = await fsp.readFile(
        path.join(__dirname, 'src', 'template.html'),
        { encoding: 'utf-8' }
    );

    notebooks.forEach((notebook) => {
        fsp.writeFile(
            path.join(__dirname, 'src', notebook.htmlFilename),
            mustache.render(template, notebook)
        );
    });

    const header = template.split('</a>')[0].trim();

    const contents = [
        mustache.render(header, { title: 'Contents' }),
        '',
        '</a>',
        '<starboard-cell class="cell-grid cell-container">',
        '<div class="cell-gutter cell-gutter-left-top"></div>',
        '<div></div>',
        '<div></div>',
        '<div>',
        '<br/>',
        '<h1>p5-notebook</h1>',
        '<p>Welcome!</p>',
        '<h2>Contents</h2>',
        '<ol>',
        ...notebooks.map(
            (notebook) =>
                `<li><a href="${notebook.htmlFilename}">${notebook.title}</a></li>`
        ),
        '</ol>',
        '</div>',
        '</starboard-cell>',
        '</body>',
        '</html>',
    ].join('\n');

    fsp.writeFile(path.join(__dirname, 'src/index.html'), contents);
};

build();
