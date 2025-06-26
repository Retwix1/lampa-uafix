(function() {
  const plugin = {
    name: 'UAFLiX',
    version: '1.0.0',
    icon: 'https://uafix.net/favicon.ico',
    catalogs: async function() {
      return [
        { title: 'UAFLIX – Останнє', url: 'https://uafix.net', type: 'movie' }
      ];
    },
    movies: async function(url) {
      const html = await fetch(url).then(r => r.text());
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const items = [];
      doc.querySelectorAll('.card a').forEach(el => {
        const href = el.href;
        const title = el.title || el.textContent.trim();
        if (href) items.push({ title, url: href });
      });
      return items;
    },
    resolve: async function(url) {
      const html = await fetch(url).then(r => r.text());
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const iframe = doc.querySelector('iframe');
      const videoUrl = iframe ? iframe.src : null;
      return { url: videoUrl, subtitles: [] };
    }
  };
  Lampa.Plugins.register(plugin);
})();
