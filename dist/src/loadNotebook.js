import { StarboardEmbed } from '../node_modules/starboard-wrap/dist/index.js';

export const loadNotebook = (url, id) => {
    fetch(url, { cache: 'no-cache' })
        .then((response) => response.text())
        .then((notebookContent) => {
            const el = new StarboardEmbed({
                notebookContent,
                src: '../node_modules/starboard-notebook/dist/index.html',
                preventNavigationWithUnsavedChanges: true,
                onUnsavedChangesStatusChange: (t) =>
                    console.log('Unsaved changes status change:', t),
            });

            document.getElementById(id).appendChild(el);
        });
};
