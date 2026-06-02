(function() {
  // 1. Inject sidebar styles into page head
  const css = `
    .blog-toc-sidebar {
      position: fixed !important;
      top: 120px !important;
      left: calc(50% + 380px) !important;
      width: 240px !important;
      max-height: calc(100vh - 180px) !important;
      display: flex !important;
      gap: 20px !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      z-index: 30 !important;
      user-select: none !important;
      pointer-events: none !important;
    }

    .minimap-column {
      width: 40px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: flex-start !important;
      pointer-events: auto !important;
    }

    .minimap-container {
      position: relative !important;
      width: 32px !important;
      height: 260px !important;
      background: transparent !important;
      display: flex !important;
      flex-direction: column !important;
    }

    .minimap-line {
      background-color: #e2e8f0 !important;
      border-radius: 1px !important;
      transition: background-color 0.2s ease, width 0.2s ease !important;
      width: 14px !important;
      box-sizing: border-box !important;
    }

    .minimap-line.line-h2 {
      width: 28px !important;
      background-color: #cbd5e1 !important;
    }

    .minimap-line.line-h3 {
      width: 22px !important;
      background-color: #cbd5e1 !important;
    }

    .minimap-line.line-blockquote {
      width: 16px !important;
      background-color: #cbd5e1 !important;
      border-left: 2px solid var(--accent) !important;
    }

    .minimap-line.line-pre {
      width: 24px !important;
      background-color: #94a3b8 !important;
      opacity: 0.7 !important;
    }

    .minimap-line.line-list {
      width: 16px !important;
      background-color: #cbd5e1 !important;
    }

    /* Active highlighted states inside lens */
    .minimap-line.active-line {
      background-color: #94a3b8 !important;
    }
    .minimap-line.line-h2.active-line {
      background-color: black !important;
      width: 32px !important;
    }
    .minimap-line.line-h3.active-line {
      background-color: black !important;
      width: 26px !important;
    }
    .minimap-line.line-blockquote.active-line {
      background-color: var(--accent) !important;
      width: 18px !important;
    }
    .minimap-line.line-pre.active-line {
      background-color: #475569 !important;
      opacity: 1 !important;
    }

    .minimap-lens {
      position: absolute !important;
      left: -6px !important;
      right: -6px !important;
      border: 2.5px solid black !important;
      border-radius: 4px !important;
      background-color: rgba(0, 0, 0, 0.04) !important;
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 1) !important;
      pointer-events: none !important;
      z-index: 5 !important;
      box-sizing: border-box !important;
      transition: top 0.12s cubic-bezier(0.25, 1, 0.5, 1), height 0.12s cubic-bezier(0.25, 1, 0.5, 1) !important;
    }

    .toc-column {
      display: flex !important;
      flex-direction: column !important;
      gap: 12px !important;
      flex: 1 !important;
      pointer-events: auto !important;
    }

    .toc-title {
      font-family: var(--mono), monospace !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      color: var(--ink-4) !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    .toc-list {
      list-style: none !important;
      padding: 0 !important;
      margin: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 12px !important;
    }

    .toc-item {
      display: flex !important;
      align-items: flex-start !important;
      gap: 8px !important;
      font-size: 13.5px !important;
      font-weight: 400 !important;
      color: var(--ink-3) !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      line-height: 1.35 !important;
    }

    .toc-item.h3 {
      padding-left: 12px !important;
      font-size: 12.5px !important;
    }

    .toc-dot {
      width: 6px !important;
      height: 6px !important;
      border-radius: 50% !important;
      border: 1.5px solid #cbd5e1 !important;
      background-color: transparent !important;
      margin-top: 6px !important;
      flex-shrink: 0 !important;
      transition: all 0.2s ease !important;
    }

    .toc-label {
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
    }

    .toc-item.active {
      color: var(--ink) !important;
      font-weight: 600 !important;
    }

    .toc-item.active .toc-dot {
      background-color: var(--ink) !important;
      border-color: var(--ink) !important;
      transform: scale(1.2) !important;
    }

    .toc-item:hover {
      color: var(--ink) !important;
    }

    .toc-item:hover .toc-dot {
      border-color: var(--ink) !important;
    }

    @media (max-width: 1280px) {
      .blog-toc-sidebar {
        display: none !important;
      }
    }
  `;

  // Inject styles into document head
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  function initBlogTOC() {
    const prose = document.querySelector('.prose');
    if (!prose) return;

    // Get trackable child content blocks
    const blocks = Array.from(prose.children);
    const trackableBlocks = blocks.filter(el => {
      const tag = el.tagName.toLowerCase();
      // Filter out meta elements, scripts, styles
      if (tag === 'script' || tag === 'style') return false;
      // Keep standard elements
      if (['h2', 'h3', 'p', 'blockquote', 'pre', 'ul', 'ol'].includes(tag)) return true;
      // Keep specific layout containers if they are visible
      if (el.classList.contains('stats-bar') || el.classList.contains('pipeline') || el.classList.contains('talkbook-cta') || el.classList.contains('insight-block')) return true;
      return el.offsetHeight > 0 && el.innerText.trim().length > 0;
    });

    if (trackableBlocks.length === 0) return;

    // 2. Create sidebar DOM nodes
    const sidebar = document.createElement('aside');
    sidebar.className = 'blog-toc-sidebar';

    const minimapCol = document.createElement('div');
    minimapCol.className = 'minimap-column';

    const minimapContainer = document.createElement('div');
    minimapContainer.className = 'minimap-container';

    const lens = document.createElement('div');
    lens.className = 'minimap-lens';
    minimapContainer.appendChild(lens);
    minimapCol.appendChild(minimapContainer);

    const tocCol = document.createElement('div');
    tocCol.className = 'toc-column';

    const tocTitle = document.createElement('div');
    tocTitle.className = 'toc-title';
    tocTitle.textContent = 'ON THIS PAGE';
    tocCol.appendChild(tocTitle);

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    tocCol.appendChild(tocList);

    sidebar.appendChild(minimapCol);
    sidebar.appendChild(tocCol);
    document.body.appendChild(sidebar);

    // 3. Render minimap lines
    const minimapLines = [];
    const totalBlocks = trackableBlocks.length;
    const minimapHeight = 260;
    const gap = 2;

    const availableHeightForLines = minimapHeight - (totalBlocks - 1) * gap;
    const lineHeight = Math.max(1.5, availableHeightForLines / totalBlocks);

    trackableBlocks.forEach((block, idx) => {
      const line = document.createElement('div');
      line.className = 'minimap-line';
      
      const tag = block.tagName.toLowerCase();
      if (tag === 'h2') {
        line.classList.add('line-h2');
      } else if (tag === 'h3') {
        line.classList.add('line-h3');
      } else if (tag === 'blockquote' || block.classList.contains('insight-block')) {
        line.classList.add('line-blockquote');
      } else if (tag === 'pre') {
        line.classList.add('line-pre');
      } else if (tag === 'ul' || tag === 'ol') {
        line.classList.add('line-list');
      } else {
        line.classList.add('line-p');
      }

      line.style.height = `${lineHeight}px`;
      line.style.marginBottom = idx === totalBlocks - 1 ? '0px' : `${gap}px`;

      minimapContainer.appendChild(line);
      minimapLines.push({
        element: block,
        lineElement: line
      });
    });

    // 4. Render Table of Contents items (for H2 and H3 headings)
    const headings = [];
    trackableBlocks.forEach((block) => {
      const tag = block.tagName.toLowerCase();
      if (tag === 'h2' || tag === 'h3') {
        const text = block.textContent.trim();
        if (!text) return;

        // Ensure unique anchor ID exists
        if (!block.id) {
          block.id = text.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }

        const li = document.createElement('li');
        li.className = `toc-item ${tag}`;

        const dot = document.createElement('span');
        dot.className = 'toc-dot';

        const label = document.createElement('span');
        label.className = 'toc-label';
        label.textContent = text;

        li.appendChild(dot);
        li.appendChild(label);
        tocList.appendChild(li);

        li.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById(block.id);
          if (target) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });

        headings.push({
          element: block,
          tocElement: li
        });
      }
    });

    // Hide Table of Contents column if no headings are present
    if (headings.length === 0) {
      tocCol.style.display = 'none';
    }

    // 5. Scroll synchronization handler
    function updateLensAndScrollspy() {
      const viewportTop = window.scrollY;
      const viewportBottom = viewportTop + window.innerHeight;

      let firstVisibleIdx = -1;
      let lastVisibleIdx = -1;

      // Compute bounding rectangles of trackable blocks relative to document
      const blockRects = trackableBlocks.map(block => {
        const rect = block.getBoundingClientRect();
        return {
          top: rect.top + window.pageYOffset,
          bottom: rect.bottom + window.pageYOffset
        };
      });

      blockRects.forEach((rect, idx) => {
        const line = minimapLines[idx].lineElement;
        const isVisible = rect.bottom > viewportTop && rect.top < viewportBottom;

        if (isVisible) {
          if (firstVisibleIdx === -1) {
            firstVisibleIdx = idx;
          }
          lastVisibleIdx = idx;
          line.classList.add('active-line');
        } else {
          line.classList.remove('active-line');
        }
      });

      // Position the lens overlay to cover visible lines
      if (firstVisibleIdx !== -1 && lastVisibleIdx !== -1) {
        const firstLineTop = firstVisibleIdx * (lineHeight + gap);
        const lastLineBottom = lastVisibleIdx * (lineHeight + gap) + lineHeight;
        
        lens.style.top = `${firstLineTop}px`;
        lens.style.height = `${lastLineBottom - firstLineTop}px`;
      } else {
        // Fallback when scrolled completely outside the prose container
        if (window.scrollY < blockRects[0]?.top) {
          lens.style.top = '0px';
          lens.style.height = `${lineHeight}px`;
        } else {
          const lastLineTop = (totalBlocks - 1) * (lineHeight + gap);
          lens.style.top = `${lastLineTop}px`;
          lens.style.height = `${lineHeight}px`;
        }
      }

      // Update Scrollspy active heading
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const spyThreshold = viewportTop + navbarHeight + 80;
      
      let activeHeading = null;
      for (let i = 0; i < headings.length; i++) {
        const hTop = headings[i].element.getBoundingClientRect().top + window.pageYOffset;
        if (hTop <= spyThreshold) {
          activeHeading = headings[i];
        } else {
          break;
        }
      }

      // Default to first heading if above all headings
      if (!activeHeading && headings.length > 0) {
        activeHeading = headings[0];
      }

      headings.forEach(h => {
        if (h === activeHeading) {
          h.tocElement.classList.add('active');
        } else {
          h.tocElement.classList.remove('active');
        }
      });
    }

    // Attach event listeners
    window.addEventListener('scroll', updateLensAndScrollspy, { passive: true });
    window.addEventListener('resize', updateLensAndScrollspy, { passive: true });
    
    // Initial run
    updateLensAndScrollspy();

    // Re-run after a small delay in case images or custom styles shifted elements dynamically
    setTimeout(updateLensAndScrollspy, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogTOC);
  } else {
    initBlogTOC();
  }
})();
