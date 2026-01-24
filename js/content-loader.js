// Fetch and display CMS content
async function loadContent() {
    // Load Articles
    try {
        const articlesRes = await fetch('content/articles.json');
        const articles = await articlesRes.json();
        const articlesContainer = document.querySelector('#recent-articles');

        if (articlesContainer && articles.length > 0) {
            // Remove placeholder content
            const placeholders = articlesContainer.querySelectorAll('.content-item');
            placeholders.forEach(p => p.remove());

            // Add real content (show up to 5 most recent)
            articles.slice(0, 5).forEach(article => {
                const date = new Date(article.date);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

                const item = document.createElement('div');
                item.className = 'content-item';
                item.innerHTML = `
                    <p class="content-item-date">${formattedDate}</p>
                    <h3 class="content-item-title"><a href="${article.link}" target="_blank" rel="noopener">${article.title}</a></h3>
                    <p class="content-item-source">${article.source}</p>
                    ${article.excerpt ? `<p class="content-item-excerpt">${article.excerpt}</p>` : ''}
                `;
                articlesContainer.appendChild(item);
            });
        }
    } catch (e) {
        console.log('Could not load articles:', e);
    }

    // Load Media & Reviews
    try {
        const mediaRes = await fetch('content/media.json');
        const media = await mediaRes.json();
        const mediaContainer = document.querySelector('#media-reviews');

        if (mediaContainer && media.length > 0) {
            // Remove placeholder content
            const placeholders = mediaContainer.querySelectorAll('.content-item');
            placeholders.forEach(p => p.remove());

            // Add real content (show up to 5 most recent)
            media.slice(0, 5).forEach(item => {
                const date = new Date(item.date);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

                const itemEl = document.createElement('div');
                itemEl.className = 'content-item';
                itemEl.innerHTML = `
                    <p class="content-item-date">${formattedDate}</p>
                    <h3 class="content-item-title"><a href="${item.link}" target="_blank" rel="noopener">${item.title}</a></h3>
                    <p class="content-item-source">${item.source}</p>
                    ${item.excerpt ? `<p class="content-item-excerpt">${item.excerpt}</p>` : ''}
                `;
                mediaContainer.appendChild(itemEl);
            });
        }
    } catch (e) {
        console.log('Could not load media:', e);
    }
}

// Load content when page is ready
document.addEventListener('DOMContentLoaded', loadContent);
