(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.blog-views');
    if (!elements.length) return;

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const pathname = window.location.pathname;

    elements.forEach(async (el) => {
      const slug = el.getAttribute('data-slug');
      if (!slug) return;

      // Detect if we are on the post's detail page
      const isCurrentPost = pathname.includes(`/${slug}`) || pathname.includes(`${slug}/`);
      
      // Increment only on production detail page.
      // On local development, or for other posts on list page, just read the count.
      const shouldIncrement = isCurrentPost && !isLocal;
      const url = shouldIncrement
        ? `https://api.counterapi.dev/v1/vidhanmertiya/blog-${slug}/up`
        : `https://api.counterapi.dev/v1/vidhanmertiya/blog-${slug}/`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && typeof data.count === 'number') {
          const formatted = new Intl.NumberFormat().format(data.count);
          // Set text content
          el.textContent = `${formatted} views`;
          // Fade in the element smoothly to avoid layout shift
          el.style.opacity = '1';
        }
      } catch (error) {
        console.error(`[Views Counter] Failed to load views for slug: ${slug}`, error);
        // Clean fallback: hide the view counter if it fails
        el.style.display = 'none';
      }
    });
  });
})();
