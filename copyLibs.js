const { rimraf } = require('rimraf');
const path = require('path');
const fsp = require('fs/promises');

const copyDir = async (src, dest) => {
    const filenames = await fsp.readdir(src, { withFileTypes: true });
    filenames
        .filter((dirent) => dirent.isFile())
        .forEach((dirent) =>
            fsp.copyFile(
                path.join(src, dirent.name),
                path.join(dest, dirent.name)
            )
        );
};

const main = async () => {
    const nodeModulesDir = path.join(__dirname, 'node_modules');
    const libDir = path.join(__dirname, 'lib');

    await rimraf(libDir);
    await fsp.mkdir(libDir);
    await fsp.mkdir(path.join(libDir, 'github-fork-ribbon-css'));
    await fsp.mkdir(path.join(libDir, 'starboard-wrap'));
    await fsp.mkdir(path.join(libDir, 'starboard-wrap', 'dist'));
    await fsp.mkdir(path.join(libDir, 'starboard-notebook'));
    await fsp.mkdir(path.join(libDir, 'starboard-notebook', 'dist'));
    await fsp.mkdir(path.join(libDir, 'p5'));
    await fsp.mkdir(path.join(libDir, 'p5', 'lib'));

    copyDir(
        path.join(nodeModulesDir, 'starboard-notebook', 'dist'),
        path.join(libDir, 'starboard-notebook', 'dist')
    );

    fsp.copyFile(
        path.join(nodeModulesDir, 'coi-serviceworker/coi-serviceworker.js'),
        path.join(__dirname, 'coi-serviceworker.js')
    );

    [
        'github-fork-ribbon-css/gh-fork-ribbon.css',
        'starboard-wrap/dist/index.js',
        'p5/lib/p5.js',
    ].forEach((filename) =>
        fsp.copyFile(
            path.join(nodeModulesDir, filename),
            path.join(libDir, filename)
        )
    );
};

main();
