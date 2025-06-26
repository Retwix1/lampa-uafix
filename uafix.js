(function () {
    const plugin = {
        name: 'UAFLIX',
        version: '1.0.1',
        icon: 'https://uafix.net/favicon.ico',
        catalogs: async function () {
            return [
                {
                    title: 'UAFLIX – Нове',
                    url: 'https://uafix.net',
                    type: 'movie'
                }
            ];
        },
        movies: async function (url) {
            const html = await fetch(url).then(r => r.text());
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const items = [];

            doc.querySelectorAll('.short a.short-img').forEach(el => {
                const href = el.href;
                const title = el.getAttribute('title') || el.querySelector('img')?.alt || 'Без назви';
                if (href) items.push({ title, url: href });
            });

            return items;
        },
        resolve: async function (url) {
            const html = await fetch(url).then(r => r.text());
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const iframe = doc.querySelector('iframe');
            const videoUrl = iframe?.src || null;
            return { url: videoUrl, subtitles: [] };
        }
    };

    Lampa.Plugins.register(plugin);
})();
