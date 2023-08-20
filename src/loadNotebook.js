import { StarboardEmbed } from 'https://cdn.jsdelivr.net/npm/starboard-wrap@0.4.1/dist/index.min.js';

export const loadNotebook = (url, id) => {
    fetch(url, { cache: 'no-cache' })
        .then((response) => response.text())
        .then((notebookContent) => {
            const el = new StarboardEmbed({
                notebookContent,
                src: '../lib/starboard-notebook/dist/index.html',
                preventNavigationWithUnsavedChanges: true,
                onUnsavedChangesStatusChange: (t) =>
                    console.log('Unsaved changes status change:', t),
                allow: '',
                sandbox: 'allow-scripts allow-same-origin',
            });

            document.getElementById(id).appendChild(el);
        });
};
