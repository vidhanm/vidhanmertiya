(function() {
  // 1. Inject Stylesheets for Dark Theme
  const css = `
    /* Core variables override for blog content */
    html[data-theme="dark"] {
      --paper: #0c0c0c !important;
      --paper-2: #16161a !important;
      --paper-3: #222226 !important;
      --ink: #f5f5f7 !important;
      --ink-2: #e2e8f0 !important;
      --ink-3: #cbd5e1 !important;
      --ink-4: #94a3b8 !important;
    }

    /* Page-level body overrides */
    html[data-theme="dark"] body,
    html[data-theme="dark"] html,
    html[data-theme="dark"] main,
    html[data-theme="dark"] .bio-section,
    html[data-theme="dark"] .blog-section {
      background-color: #0c0c0c !important;
      color: #f5f5f7 !important;
    }

    /* Navbar styling overrides */
    html[data-theme="dark"] .navbar {
      background-color: #0c0c0c !important;
      border-bottom-color: #35353d !important;
    }

    html[data-theme="dark"] .navbar-brand {
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .navbar-avatar {
      border-color: #35353d !important;
      background: linear-gradient(135deg, #4c1d95 0%, #2e1065 100%) !important;
    }

    html[data-theme="dark"] .navbar-nav {
      border-color: #35353d !important;
      background-color: #16161a !important;
    }

    html[data-theme="dark"] .navbar-nav a {
      background-color: #16161a !important;
      color: #94a3b8 !important;
      border-right-color: #35353d !important;
    }

    html[data-theme="dark"] .navbar-nav a:hover:not(.active) {
      background-color: #222226 !important;
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .navbar-nav a.active {
      background-color: #f5f5f7 !important;
      color: #0c0c0c !important;
    }

    html[data-theme="dark"] .navbar-social {
      background-color: #16161a !important;
      color: #cbd5e1 !important;
      border-color: #35353d !important;
    }

    html[data-theme="dark"] .navbar-social:hover {
      background-color: #f5f5f7 !important;
      color: #0c0c0c !important;
      border-color: #f5f5f7 !important;
    }

    /* Bio Section overrides */
    html[data-theme="dark"] .bio-title {
      color: #f5f5f7 !important;
    }
    
    html[data-theme="dark"] .bio-text {
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .bio-highlight {
      background-color: #16161a !important;
      color: #f5f5f7 !important;
      border-color: #35353d !important;
    }

    /* Section Headers overrides */
    html[data-theme="dark"] .section-header {
      background-color: #16161a !important;
      border-color: #35353d !important;
      box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.08) !important;
    }

    html[data-theme="dark"] .section-header-text h3 {
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .section-header-text p {
      color: #64748b !important;
    }

    html[data-theme="dark"] .project-count {
      background-color: #f5f5f7 !important;
      color: #0c0c0c !important;
      border-color: #f5f5f7 !important;
    }

    /* Project Cards overrides */
    html[data-theme="dark"] .flip-card-inner {
      border-color: #35353d !important;
      box-shadow: 8px 8px 0px rgba(255, 255, 255, 0.05) !important;
    }
    
    html[data-theme="dark"] .flip-card-inner:hover {
      box-shadow: 12px 12px 0px rgba(255, 255, 255, 0.08) !important;
    }

    html[data-theme="dark"] .flip-card-front,
    html[data-theme="dark"] .flip-card-back {
      background-color: #16161a !important;
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .flip-card-front .border-b-\[3px\] {
      border-bottom-color: #35353d !important;
      background-color: #16161a !important;
    }

    html[data-theme="dark"] .flip-card-front p.text-sm {
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .flip-info-btn {
      background-color: #222226 !important;
      color: #cbd5e1 !important;
      border-color: #35353d !important;
    }

    html[data-theme="dark"] .flip-info-btn:hover,
    html[data-theme="dark"] .flip-info-btn.active {
      background-color: #f5f5f7 !important;
      color: #0c0c0c !important;
      border-color: #f5f5f7 !important;
    }

    /* Placeholder only card front overrides */
    html[data-theme="dark"] .flip-card-front div.relative > div.absolute {
      background-color: #121214 !important;
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .flip-card-front div.relative > div.absolute span {
      background-color: #f5f5f7 !important;
      color: #0c0c0c !important;
      border-color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .flip-card-front div.relative > div.absolute > div:last-child {
      background-color: #16161a !important;
      border-color: #35353d !important;
      color: #f5f5f7 !important;
      box-shadow: 4px 4px 0px rgba(255, 255, 255, 0.05) !important;
    }

    html[data-theme="dark"] .flip-card-front div.relative > div.absolute > div:last-child p,
    html[data-theme="dark"] .flip-card-front div.relative > div.absolute > div:last-child h4 {
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .flip-card-front div.relative > div.absolute > div:last-child div {
      color: #94a3b8 !important;
    }

    /* Embedded iframe overrides (Inverts colors to match dark mode theme) */
    html[data-theme="dark"] .flip-card-front div.relative > iframe {
      filter: invert(0.9) hue-rotate(180deg) !important;
      background-color: #0c0c0c !important;
    }

    /* Card Back Overrides */
    html[data-theme="dark"] .flip-card-back .border-b-\[3px\] {
      border-bottom-color: #35353d !important;
      background-color: #16161a !important;
    }

    html[data-theme="dark"] .flip-card-back p {
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .flip-card-back .text-gray-400 {
      color: #64748b !important;
    }

    html[data-theme="dark"] .flip-card-back .text-\[13px\] {
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .flip-card-back span.bg-white.text-black {
      background-color: #222226 !important;
      color: #cbd5e1 !important;
      border-color: #35353d !important;
    }

    html[data-theme="dark"] .flip-card-back .border-t-\[2px\] {
      border-top-color: #35353d !important;
    }

    /* Actions Links in Card Back */
    html[data-theme="dark"] .flip-card-back a.bg-black {
      background-color: #f5f5f7 !important;
      color: #0c0c0c !important;
      border-color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .flip-card-back a.bg-black:hover {
      background-color: #0c0c0c !important;
      color: #f5f5f7 !important;
      border-color: #f5f5f7 !important;
    }

    /* Blog List Page Index overrides */
    html[data-theme="dark"] .blog-title {
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .blog-subtitle {
      color: #94a3b8 !important;
    }

    html[data-theme="dark"] .blog-card {
      background-color: #16161a !important;
      border-color: #35353d !important;
      box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.08) !important;
    }

    html[data-theme="dark"] .blog-card:hover {
      box-shadow: 10px 10px 0px rgba(255, 255, 255, 0.12) !important;
      transform: translateY(-4px) !important;
    }

    html[data-theme="dark"] .blog-post-title a {
      color: #f5f5f7 !important;
    }

    html[data-theme="dark"] .blog-excerpt {
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .blog-tag {
      background-color: #222226 !important;
      color: #cbd5e1 !important;
      border-color: #35353d !important;
    }

    html[data-theme="dark"] .blog-post-meta {
      color: #64748b !important;
    }

    /* Blog Footer overrides */
    html[data-theme="dark"] .blog-footer {
      border-top-color: #35353d !important;
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .blog-footer a {
      color: var(--accent) !important;
    }

    /* Social popovers overrides */
    html[data-theme="dark"] .social-preview-card {
      background-color: #16161a !important;
      border-color: #35353d !important;
      color: #f5f5f7 !important;
      box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.08) !important;
    }

    html[data-theme="dark"] .social-preview-card::after {
      border-color: transparent transparent #35353d transparent !important;
    }

    html[data-theme="dark"] .social-preview-card::before {
      border-color: transparent transparent #16161a transparent !important;
    }

    html[data-theme="dark"] .github-chart {
      border-color: #35353d !important;
      background-color: #1a1a1f !important;
    }

    html[data-theme="dark"] .email-address {
      background: #1a1a1f !important;
      border-color: #35353d !important;
      color: #f5f5f7 !important;
    }

    /* Scrollspy Sidebar (ToC) overrides */
    html[data-theme="dark"] .toc-item {
      color: #94a3b8 !important;
    }
    html[data-theme="dark"] .toc-item.active {
      color: #f5f5f7 !important;
    }
    html[data-theme="dark"] .toc-dot {
      border-color: #475569 !important;
    }
    html[data-theme="dark"] .toc-item.active .toc-dot {
      background-color: #f5f5f7 !important;
      border-color: #f5f5f7 !important;
    }
    html[data-theme="dark"] .minimap-line {
      background-color: #334155 !important;
    }
    html[data-theme="dark"] .minimap-line.line-h2,
    html[data-theme="dark"] .minimap-line.line-h3 {
      background-color: #475569 !important;
    }
    html[data-theme="dark"] .minimap-line.active-line {
      background-color: #94a3b8 !important;
    }
    html[data-theme="dark"] .minimap-line.line-h2.active-line,
    html[data-theme="dark"] .minimap-line.line-h3.active-line {
      background-color: #f5f5f7 !important;
    }
    html[data-theme="dark"] .minimap-lens {
      border-color: #f5f5f7 !important;
      background-color: rgba(255, 255, 255, 0.04) !important;
      box-shadow: 2px 2px 0px rgba(255, 255, 255, 0.9) !important;
    }
  `;

  // Inject dark-mode styling element
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  function initThemeToggle() {
    const navbarRight = document.querySelector('.navbar-right');
    if (!navbarRight) return;

    // Create the toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'navbar-social theme-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Toggle Theme');
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.padding = '0';
    toggleBtn.style.display = 'flex';
    toggleBtn.style.alignItems = 'center';
    toggleBtn.style.justifyContent = 'center';

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const updateIcon = (theme) => {
      if (theme === 'dark') {
        // Sun SVG icon
        toggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
        `;
        toggleBtn.title = 'Switch to Light Theme';
      } else {
        // Moon SVG icon
        toggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        `;
        toggleBtn.title = 'Switch to Dark Theme';
      }
    };

    updateIcon(currentTheme);

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateIcon(theme);
    });

    // Insert toggle button as the leftmost icon inside navbar-right
    navbarRight.insertBefore(toggleBtn, navbarRight.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
})();
