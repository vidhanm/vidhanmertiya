(function() {
  // 1. Inject Stylesheets for Dark Theme
  const css = `
    /* Core variables override for blog content and general spacing */
    html[data-theme="dark"] {
      --paper: #0d0e12 !important;
      --paper-2: #1a1d24 !important;
      --paper-3: #2a2e3b !important;
      --ink: #ffffff !important;
      --ink-2: #cbd5e1 !important;
      --ink-3: #cbd5e1 !important;
      --ink-4: #94a3b8 !important;
      --accent: #ff6b4a !important;
    }

    /* Page-level body overrides */
    html[data-theme="dark"] body,
    html[data-theme="dark"] html,
    html[data-theme="dark"] main,
    html[data-theme="dark"] .bio-section,
    html[data-theme="dark"] .projects-section,
    html[data-theme="dark"] .blog-section {
      background-color: #0d0e12 !important;
      color: #ffffff !important;
    }

    /* Navbar styling overrides */
    html[data-theme="dark"] .navbar {
      background-color: #0d0e12 !important;
      border-bottom-color: #ffffff !important;
    }

    html[data-theme="dark"] .navbar-brand {
      color: #ffffff !important;
    }

    html[data-theme="dark"] .navbar-avatar {
      border-color: #ffffff !important;
      box-shadow: 4px 4px 0px #000000 !important;
      background: linear-gradient(135deg, #4c1d95 0%, #2e1065 100%) !important;
    }

    html[data-theme="dark"] .navbar-nav {
      border-color: #ffffff !important;
      background-color: #1a1d24 !important;
    }

    html[data-theme="dark"] .navbar-nav a {
      background-color: #1a1d24 !important;
      color: #cbd5e1 !important;
      border-right-color: #ffffff !important;
    }

    html[data-theme="dark"] .navbar-nav a:hover:not(.active) {
      background-color: #2a2e3b !important;
      color: #ffffff !important;
    }

    html[data-theme="dark"] .navbar-nav a.active {
      background-color: #ffffff !important;
      color: #0d0e12 !important;
    }

    html[data-theme="dark"] .navbar-social {
      background-color: #1a1d24 !important;
      color: #cbd5e1 !important;
      border-color: #ffffff !important;
    }

    html[data-theme="dark"] .navbar-social:hover {
      background-color: #ffffff !important;
      color: #0d0e12 !important;
      border-color: #ffffff !important;
    }

    /* Bio Section overrides */
    html[data-theme="dark"] .bio-title {
      color: #ffffff !important;
    }
    
    html[data-theme="dark"] .bio-text {
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .bio-highlight {
      background-color: #1a1d24 !important;
      color: #ffffff !important;
      border-color: #ffffff !important;
    }

    html[data-theme="dark"] .bio-section {
      border-bottom-color: #ffffff !important;
    }

    /* Section Headers overrides */
    html[data-theme="dark"] .section-header {
      background-color: #1a1d24 !important;
      border-color: #ffffff !important;
      box-shadow: 8px 8px 0px #000000 !important;
    }

    html[data-theme="dark"] .section-header-text h3 {
      color: #ffffff !important;
    }

    html[data-theme="dark"] .section-header-text p {
      color: #94a3b8 !important;
    }

    html[data-theme="dark"] .project-count {
      background-color: #ffffff !important;
      color: #0d0e12 !important;
      border-color: #ffffff !important;
    }

    /* Project Cards overrides */
    html[data-theme="dark"] .flip-card-inner {
      border-color: #ffffff !important;
      box-shadow: 8px 8px 0px #000000 !important;
    }
    
    html[data-theme="dark"] .flip-card-inner:hover {
      box-shadow: 12px 12px 0px #000000 !important;
    }

    html[data-theme="dark"] .flip-card-front,
    html[data-theme="dark"] .flip-card-back {
      background-color: #1a1d24 !important;
      color: #ffffff !important;
    }

    html[data-theme="dark"] .flip-card-front .border-b-\[3px\],
    html[data-theme="dark"] .flip-card-back .border-b-\[3px\] {
      border-bottom-color: #ffffff !important;
      background-color: #1a1d24 !important;
    }

    html[data-theme="dark"] .flip-card-front p.text-sm {
      color: #ffffff !important;
    }

    html[data-theme="dark"] .flip-info-btn {
      background-color: #2a2e3b !important;
      color: #cbd5e1 !important;
      border-color: #ffffff !important;
    }

    html[data-theme="dark"] .flip-info-btn:hover,
    html[data-theme="dark"] .flip-info-btn.active {
      background-color: #ffffff !important;
      color: #0d0e12 !important;
      border-color: #ffffff !important;
    }

    /* Placeholder only card front overrides */
    html[data-theme="dark"] .flip-card-front div.relative > div.absolute {
      background-color: #12141a !important;
      color: #ffffff !important;
    }

    html[data-theme="dark"] .flip-card-front div.relative > div.absolute span {
      background-color: #ffffff !important;
      color: #0d0e12 !important;
      border-color: #ffffff !important;
    }

    html[data-theme="dark"] .flip-card-front div.relative > div.absolute > div:last-child {
      background-color: #15181f !important;
      border-color: #ffffff !important;
      color: #ffffff !important;
      box-shadow: 4px 4px 0px #000000 !important;
    }

    html[data-theme="dark"] .flip-card-front div.relative > div.absolute > div:last-child p:first-child {
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .flip-card-front div.relative > div.absolute > div:last-child p,
    html[data-theme="dark"] .flip-card-front div.relative > div.absolute > div:last-child h4 {
      color: #ffffff !important;
    }

    html[data-theme="dark"] .flip-card-front div.relative > div.absolute > div:last-child div {
      color: #94a3b8 !important;
    }

    /* Embedded iframe overrides (Inverts colors to match dark mode theme) */
    html[data-theme="dark"] .flip-card-front div.relative > iframe {
      filter: invert(0.9) hue-rotate(180deg) !important;
      background-color: #0d0e12 !important;
    }

    /* Card Back Overrides */
    html[data-theme="dark"] .flip-card-back p {
      color: #ffffff !important;
    }

    html[data-theme="dark"] .flip-card-back .text-gray-400 {
      color: #94a3b8 !important;
    }

    html[data-theme="dark"] .flip-card-back .text-\[13px\] {
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .flip-card-back .flex-wrap span {
      background-color: #15181f !important;
      color: #ffffff !important;
      border-color: #ffffff !important;
    }

    html[data-theme="dark"] .flip-card-back .border-t-\[2px\] {
      border-top-color: #ffffff !important;
    }

    /* Actions Links in Card Back */
    html[data-theme="dark"] .flip-card-back a {
      background-color: #ffffff !important;
      color: #0d0e12 !important;
      border-color: #ffffff !important;
    }

    html[data-theme="dark"] .flip-card-back a:hover {
      background-color: #1a1d24 !important;
      color: #ffffff !important;
      border-color: #ffffff !important;
    }

    /* Blog List Page Index overrides */
    html[data-theme="dark"] .blog-title {
      color: #ffffff !important;
    }

    html[data-theme="dark"] .blog-subtitle {
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .blog-card {
      background-color: #1a1d24 !important;
      border-color: #ffffff !important;
      box-shadow: 8px 8px 0px #000000 !important;
    }

    html[data-theme="dark"] .blog-card:hover {
      box-shadow: 12px 12px 0px #000000 !important;
      transform: translateY(-4px) !important;
    }

    html[data-theme="dark"] .blog-post-title a {
      color: #ffffff !important;
    }

    html[data-theme="dark"] .blog-excerpt {
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .blog-tag {
      background-color: #15181f !important;
      color: #cbd5e1 !important;
      border-color: #ffffff !important;
    }

    html[data-theme="dark"] .blog-post-meta {
      color: #94a3b8 !important;
    }

    html[data-theme="dark"] .blog-card-footer {
      border-top-color: #ffffff !important;
    }

    html[data-theme="dark"] .blog-card-footer a {
      color: #ffffff !important;
      border-bottom-color: #ffffff !important;
    }
    
    html[data-theme="dark"] .blog-card-footer a:hover {
      border-bottom-color: transparent !important;
    }

    /* Blog Footer overrides */
    html[data-theme="dark"] .blog-footer {
      border-top-color: #ffffff !important;
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .blog-footer a {
      color: #ff6b4a !important;
    }

    /* Social popovers overrides */
    html[data-theme="dark"] .social-preview-card {
      background-color: #1a1d24 !important;
      border-color: #ffffff !important;
      color: #ffffff !important;
      box-shadow: 6px 6px 0px #000000 !important;
    }

    html[data-theme="dark"] .social-preview-card::after {
      border-color: transparent transparent #ffffff transparent !important;
    }

    html[data-theme="dark"] .social-preview-card::before {
      border-color: transparent transparent #1a1d24 transparent !important;
    }

    html[data-theme="dark"] .github-avatar,
    html[data-theme="dark"] .x-avatar,
    html[data-theme="dark"] .x-header-banner,
    html[data-theme="dark"] .linkedin-avatar {
      border-color: #ffffff !important;
    }
    
    html[data-theme="dark"] .x-avatar {
      background-color: #1a1d24 !important;
    }

    html[data-theme="dark"] .github-contributions-count {
      color: #cbd5e1 !important;
    }

    html[data-theme="dark"] .github-handle,
    html[data-theme="dark"] .x-handle,
    html[data-theme="dark"] .linkedin-school,
    html[data-theme="dark"] .x-stats,
    html[data-theme="dark"] .linkedin-stats {
      color: #cbd5e1 !important;
    }
    
    html[data-theme="dark"] .x-stats,
    html[data-theme="dark"] .linkedin-stats {
      border-top-color: #3f4454 !important;
    }
    
    html[data-theme="dark"] .x-stat strong {
      color: #ffffff !important;
    }

    html[data-theme="dark"] .x-bio,
    html[data-theme="dark"] .linkedin-title {
      color: #ffffff !important;
    }

    html[data-theme="dark"] .github-chart {
      border-color: #ffffff !important;
      background-color: #15181f !important;
    }

    html[data-theme="dark"] .email-address {
      background-color: #15181f !important;
      border-color: #ffffff !important;
      color: #ffffff !important;
    }
    
    html[data-theme="dark"] .email-btn {
      border-color: #ffffff !important;
    }

    html[data-theme="dark"] .email-copy-btn {
      color: #0d0e12 !important;
      box-shadow: 2px 2px 0px #000000 !important;
    }
    
    html[data-theme="dark"] .email-send-btn {
      background-color: #ffffff !important;
      color: #0d0e12 !important;
      box-shadow: 2px 2px 0px #000000 !important;
    }
    
    html[data-theme="dark"] .email-btn:hover {
      box-shadow: 3px 3px 0px #000000 !important;
    }

    html[data-theme="dark"] .linkedin-btn {
      border-color: #ffffff !important;
      box-shadow: 2px 2px 0px #000000 !important;
    }

    /* Prose link border color */
    html[data-theme="dark"] .prose a {
      border-bottom-color: rgba(255, 107, 74, 0.4) !important;
    }

    /* Scrollspy Sidebar (ToC) overrides */
    html[data-theme="dark"] .toc-item {
      color: #cbd5e1 !important;
    }
    html[data-theme="dark"] .toc-item.active {
      color: #ffffff !important;
    }
    html[data-theme="dark"] .toc-dot {
      border-color: #cbd5e1 !important;
    }
    html[data-theme="dark"] .toc-item.active .toc-dot {
      background-color: #ffffff !important;
      border-color: #ffffff !important;
    }
    html[data-theme="dark"] .minimap-line {
      background-color: #3f4454 !important;
    }
    html[data-theme="dark"] .minimap-line.line-h2,
    html[data-theme="dark"] .minimap-line.line-h3 {
      background-color: #cbd5e1 !important;
    }
    html[data-theme="dark"] .minimap-line.active-line {
      background-color: #ffffff !important;
    }
    html[data-theme="dark"] .minimap-line.line-h2.active-line,
    html[data-theme="dark"] .minimap-line.line-h3.active-line {
      background-color: #ff6b4a !important;
    }
    html[data-theme="dark"] .minimap-lens {
      border-color: #ffffff !important;
      background-color: rgba(255, 255, 255, 0.05) !important;
      box-shadow: 2px 2px 0px #000000 !important;
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
