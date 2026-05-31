const fs = require('fs');
const path = require('path');

// Read blog posts from JSON
const blogPostsJson = JSON.parse(fs.readFileSync('./data/blog-posts.json', 'utf-8'));

// Function to convert markdown-like content to HTML
function renderContent(content) {
  let html = '';
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockLanguage = '';

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock) {
        codeBlockLanguage = line.slice(3).trim();
        html += `<pre><code${codeBlockLanguage ? ` class="language-${codeBlockLanguage}"` : ''}>`;
      } else {
        html += '</code></pre>\n';
      }
      continue;
    }

    if (inCodeBlock) {
      html += line + '\n';
      continue;
    }

    if (line.startsWith('# ')) {
      html += `<h1 class="text-3xl font-bold mt-8 mb-4">${line.slice(2)}</h1>\n`;
    } else if (line.startsWith('## ')) {
      html += `<h2 class="text-2xl font-bold mt-8 mb-4 border-b-[3px] border-black pb-2">${line.slice(3)}</h2>\n`;
    } else if (line.startsWith('### ')) {
      html += `<h3 class="text-xl font-bold mt-6 mb-3">${line.slice(4)}</h3>\n`;
    } else if (line.startsWith('#### ')) {
      html += `<h4 class="text-lg font-bold mt-4 mb-2">${line.slice(5)}</h4>\n`;
    } else if (line.startsWith('> ')) {
      html += `<blockquote class="border-l-4 border-black pl-4 italic text-gray-700 my-4">${line.slice(2)}</blockquote>\n`;
    } else if (line.startsWith('- ')) {
      html += `<li class="ml-6">${line.slice(2)}</li>\n`;
    } else if (line === '---') {
      html += '<hr class="border-t-[3px] border-black my-8" />\n';
    } else if (line.trim() === '') {
      html += '\n';
    } else {
      // Replace inline code and other markdown
      let processed = line
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 border-[1px] border-gray-300 px-2 py-1 rounded text-sm font-mono">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
      html += `<p class="leading-relaxed mb-4">${processed}</p>\n`;
    }
  }

  return html;
}

// Function to get related posts
function getRelatedPosts(slug, blogPosts) {
  return blogPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3);
}

// Generate individual blog post pages
for (const post of blogPostsJson) {
  const slug = post.slug;
  const dir = `./blog/${slug}`;

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const relatedPosts = getRelatedPosts(slug, blogPostsJson);
  const contentHtml = renderContent(post.content);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} - Vidhan Mertiya</title>
  <meta name="description" content="${post.excerpt}">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt}">
  <meta property="og:type" content="article">
  <link rel="stylesheet" href="/styles/globals.css">
</head>
<body>
  <main class="relative min-h-screen overflow-hidden bg-white text-black">
    <div class="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[420px_minmax(0,1fr)]">
      <aside class="border-b-[4px] border-black bg-white px-6 py-10 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r-[4px] lg:px-10">
        <div class="flex h-full flex-col gap-8 pt-2">
          <div class="flex flex-col gap-4">
            <a href="/blog" class="inline-flex items-center gap-2 border-[2px] border-black bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white w-fit">
              ← Back
            </a>

            <div>
              <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500 mb-2">
                ${post.date} • ${post.readTime}
              </p>
              <h1 class="font-heading text-2xl font-black leading-[1.1] text-black sm:text-3xl">
                ${post.title}
              </h1>
            </div>

            <div class="flex flex-wrap gap-2 pt-2">
              ${post.tags.map(tag => `<span class="border-[1px] border-black bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-black">${tag}</span>`).join('')}
            </div>
          </div>

          <nav class="flex flex-col gap-2 border-t-[3px] border-black pt-6">
            <a href="/" class="border-[2px] border-black bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white">
              Projects
            </a>
            <a href="/blog" class="border-[2px] border-black bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black">
              Blog
            </a>
          </nav>

          ${relatedPosts.length > 0 ? `
          <div class="border-t-[3px] border-black pt-6">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-3">
              More posts
            </p>
            <div class="flex flex-col gap-2">
              ${relatedPosts.map(rp => `
              <a href="/blog/${rp.slug}" class="text-xs font-semibold text-black hover:underline">
                ${rp.title}
              </a>
              `).join('')}
            </div>
          </div>
          ` : ''}
        </div>
      </aside>

      <article class="px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div class="max-w-2xl prose prose-lg">
          <style>
            code { font-family: 'Monaco', 'Courier New', monospace; }
            pre code { display: block; overflow-x: auto; padding: 1rem; background: #f5f5f5; border: 2px solid #000; }
            h2 { border-bottom: 3px solid #000; padding-bottom: 0.5rem; margin-top: 2rem; }
            blockquote { border-left: 4px solid #000; padding-left: 1rem; }
            li { list-style-position: inside; margin-bottom: 0.5rem; }
          </style>
          ${contentHtml}
        </div>

        <div class="mt-12 border-t-[3px] border-black pt-8">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Share this post
              </p>
            </div>
            <div class="flex gap-2">
              <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://vidhanmertiya.vercel.app/blog/${post.slug}" target="_blank" rel="noopener noreferrer" class="border-[2px] border-black bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black">
                Twitter
              </a>
              <a href="https://linkedin.com/sharing/share-offsite/?url=https://vidhanmertiya.vercel.app/blog/${post.slug}" target="_blank" rel="noopener noreferrer" class="border-[2px] border-black bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  </main>

  <script>
    // Inline styles for proper TailwindCSS rendering
    document.querySelectorAll('h1').forEach(el => {
      el.className = 'mt-8 text-4xl font-black text-black mb-4';
    });
    document.querySelectorAll('h2').forEach(el => {
      el.className = 'mt-6 text-3xl font-bold text-black mb-3';
    });
    document.querySelectorAll('h3').forEach(el => {
      el.className = 'mt-5 text-2xl font-bold text-black mb-2';
    });
    document.querySelectorAll('h4').forEach(el => {
      el.className = 'mt-4 text-xl font-bold text-black mb-2';
    });
    document.querySelectorAll('p').forEach(el => {
      el.className = 'text-base leading-7 text-black mb-3';
    });
    document.querySelectorAll('blockquote').forEach(el => {
      el.className = 'mt-4 border-l-4 border-black pl-4 italic text-gray-700';
    });
    document.querySelectorAll('code').forEach(el => {
      if (!el.parentElement.tagName === 'PRE') {
        el.className = 'bg-gray-100 px-2 py-1 rounded text-sm';
      }
    });
    document.querySelectorAll('pre').forEach(el => {
      el.className = 'bg-gray-900 text-gray-100 p-4 rounded overflow-auto mb-4';
    });
    document.querySelectorAll('li').forEach(el => {
      el.className = 'ml-6 text-black';
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`✓ Generated ${dir}/index.html`);
}

console.log(`\n✓ Built ${blogPostsJson.length} blog posts`);
