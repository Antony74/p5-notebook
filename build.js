const path = require('path');
const fsp = require('fs/promises');

const mustache = require('mustache');
const prettier = require('prettier');

const { copyLibs } = require('./copyLibs');

copyLibs();

const notebooks = [
    {
        title: 'In praise of the map function',
        fileTitle: 'in-praise-of-the-map-function',
    },
    {
        title: 'Fractal curves',
        fileTitle: 'fractal-curves',
    },
    {
        title: 'Tic-tac-toe',
        fileTitle: 'tic-tac-toe',
    },
];

const build = async () => {
    const packageJsonText = await fsp.readFile(
        path.join(__dirname, 'package.json'),
        {
            encoding: 'utf-8',
        },
    );

    const prettierOptions = {
        ...JSON.parse(packageJsonText).prettier,
        parser: 'html',
    };

    //
    // Write (from template) a html page for each notebook
    //

    const template = await fsp.readFile(
        path.join(__dirname, 'src', 'template.html'),
        { encoding: 'utf-8' },
    );

    notebooks.forEach(async (notebook) => {
        fsp.writeFile(
            path.join(__dirname, 'src', `${notebook.fileTitle}.html`),
            await prettier.format(
                mustache.render(template, notebook),
                prettierOptions,
            ),
        );
    });

    //
    // Write contents page
    //

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
                `<li><a href="${notebook.fileTitle}.html">${notebook.title}</a></li>`,
        ),
        '</ol>',
        '<h2>About</h2>',
        '<p>',
        'This is an interactive <a href="https://github.com/gzuidhof/starboard-notebook">starboard-notebook</a>',
        'hosted on Github Pages. I write about and experiment with the',
        '<a href="https://p5js.org/">p5 JavaScript library</a> for creative coding here.',
        '</p>',
        '<p>',
        'I have also made a YouTube video: <a href="https://youtu.be/TcUvUWJjVvA">Live coding with p5</a>',
        '</p>',
        '</div>',
        '</starboard-cell>',
        '</body>',
        '</html>',
    ].join('\n');

    fsp.writeFile(
        path.join(__dirname, 'src/index.html'),
        await prettier.format(contents, prettierOptions),
    );
};

build();
