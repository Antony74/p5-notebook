const path = require('path');
const fsp = require('fs/promises');

const { rimraf } = require('rimraf');
const css = require('css');

const copyDir = async (src, dest) => {
    const filenames = await fsp.readdir(src, { withFileTypes: true });
    return Promise.all(
        filenames
            .filter((dirent) => dirent.isFile())
            .map(async (dirent) => {
                const { ext } = path.parse(dirent.name);

                if (ext === '.css') {
                    const cssText = await fsp.readFile(
                        path.join(dirent.path, dirent.name),
                        { encoding: 'utf-8' },
                    );

                    const json = css.parse(cssText);
                    json.stylesheet.rules = json.stylesheet.rules.filter(
                        (rule) => rule.type !== 'font-face',
                    );

                    await fsp.writeFile(
                        path.join(dest, dirent.name),
                        css.stringify(json),
                    );
                } else {
                    return fsp.copyFile(
                        path.join(src, dirent.name),
                        path.join(dest, dirent.name),
                    );
                }
            }),
    );
};

const copyLibs = async () => {
    const nodeModulesDir = path.join(__dirname, 'node_modules');
    const libDir = path.join(__dirname, 'lib');

    await rimraf(libDir);
    await fsp.mkdir(libDir);
    await fsp.mkdir(path.join(libDir, 'github-fork-ribbon-css'));
    await fsp.mkdir(path.join(libDir, 'coi-serviceworker'));
    await fsp.mkdir(path.join(libDir, 'starboard-notebook'));
    await fsp.mkdir(path.join(libDir, 'starboard-notebook', 'dist'));
    await fsp.mkdir(path.join(libDir, 'p5'));
    await fsp.mkdir(path.join(libDir, 'p5', 'lib'));

    await copyDir(
        path.join(nodeModulesDir, 'starboard-notebook', 'dist'),
        path.join(libDir, 'starboard-notebook', 'dist'),
    );

    [
        'github-fork-ribbon-css/gh-fork-ribbon.css',
        'coi-serviceworker/coi-serviceworker.js',
        'p5/lib/p5.js',
    ].forEach((filename) =>
        fsp.copyFile(
            path.join(nodeModulesDir, filename),
            path.join(libDir, filename),
        ),
    );
};

module.exports = { copyLibs };
