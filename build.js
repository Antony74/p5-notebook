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
    const srcDir = path.join(__dirname, 'src');
    const srcNotebooksDir = path.join(srcDir, 'notebooks');
    const nodeModulesDir = path.join(__dirname, 'node_modules');

    const distDir = path.join(__dirname, 'dist');
    const distSrcDir = path.join(distDir, 'src');
    const distSrcNotebooksDir = path.join(distSrcDir, 'notebooks');
    const distNodeModulesDir = path.join(distDir, 'node_modules');

    await rimraf(distDir);
    await fsp.mkdir(distDir);
    await fsp.mkdir(distSrcDir);
    await fsp.mkdir(distSrcNotebooksDir);
    await fsp.mkdir(distNodeModulesDir);
    await fsp.mkdir(path.join(distNodeModulesDir, 'github-fork-ribbon-css'));
    await fsp.mkdir(path.join(distNodeModulesDir, 'coi-serviceworker'));
    await fsp.mkdir(path.join(distNodeModulesDir, 'starboard-wrap'));
    await fsp.mkdir(path.join(distNodeModulesDir, 'starboard-wrap', 'dist'));
    await fsp.mkdir(path.join(distNodeModulesDir, 'starboard-notebook'));

    await fsp.mkdir(
        path.join(distNodeModulesDir, 'starboard-notebook', 'dist')
    );

    await fsp.mkdir(path.join(distNodeModulesDir, 'p5'));
    await fsp.mkdir(path.join(distNodeModulesDir, 'p5', 'lib'));

    copyDir(srcDir, distSrcDir);
    copyDir(srcNotebooksDir, distSrcNotebooksDir);

    copyDir(
        path.join(nodeModulesDir, 'starboard-notebook', 'dist'),
        path.join(distNodeModulesDir, 'starboard-notebook', 'dist')
    );

    fsp.copyFile(
        path.join(nodeModulesDir, 'coi-serviceworker/coi-serviceworker.js'),
        path.join(distDir, 'coi-serviceworker.js')
    );

    [
        'github-fork-ribbon-css/gh-fork-ribbon.css',
        'coi-serviceworker/coi-serviceworker.js',
        'starboard-wrap/dist/index.js',
        'p5/lib/p5.js',
    ].forEach((filename) =>
        fsp.copyFile(
            path.join(nodeModulesDir, filename),
            path.join(distNodeModulesDir, filename)
        )
    );
};

main();
