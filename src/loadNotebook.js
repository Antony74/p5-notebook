import { StarboardEmbed } from 'https://cdn.jsdelivr.net/npm/starboard-wrap@0.4.1/dist/index.min.js';

export const loadNotebook = (url, id) => {
    fetch(url)
        .then((response) => response.text())
        .then((notebookContent) => {
            const el = new StarboardEmbed({
                notebookContent,
                src: 'https://cdn.starboard.gg/npm/starboard-notebook@0.13.2/dist/index.html',
                preventNavigationWithUnsavedChanges: true,
                onUnsavedChangesStatusChange: (t) =>
                    console.log('Unsaved changes status change:', t),
            });

            document.getElementById(id).appendChild(el);
        });
};
