export const loadNotebook = (url, id) => {
    fetch(url, { cache: 'no-cache' })
        .then((response) => response.text())
        .then((notebookContent) => {
            window.initialNotebookContent = notebookContent;

            const script = document.createElement('script');
            script.setAttribute('defer', 'defer');

            script.setAttribute(
                'src',
                '../lib/starboard-notebook/dist/starboard-notebook.js',
            );

            document.getElementById(id).appendChild(script);
        });
};
