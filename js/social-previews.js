(function() {
  let githubContributions = '642 contributions in 2026';

  // Fetch dynamic GitHub contributions count on load
  fetch('https://github-contributions-api.jogruber.de/v4/vidhanm')
    .then(res => res.json())
    .then(data => {
      const currentYear = new Date().getFullYear().toString();
      const count = data.total[currentYear] || data.total['2026'] || 642;
      githubContributions = `${count.toLocaleString()} contributions in ${currentYear}`;
      
      const elements = document.querySelectorAll('.github-contributions-count');
      elements.forEach(el => {
        el.textContent = githubContributions;
      });
    })
    .catch(err => {
      console.error('Error fetching contributions:', err);
    });

  // 1. Inject Stylesheets dynamically
  const css = `
    .navbar-social {
      position: relative !important;
    }

    .social-preview-card {
      position: absolute !important;
      top: 100% !important;
      left: 50% !important;
      transform: translateX(-50%) translateY(-12px) scale(0.95) !important;
      opacity: 0 !important;
      visibility: hidden !important;
      width: 320px !important; /* Made wider for better readability */
      background: rgba(255, 255, 255, 0.99) !important;
      border: 3px solid black !important;
      border-radius: 8px !important;
      box-shadow: 6px 6px 0px rgba(0,0,0,1) !important;
      padding: 16px !important; /* More spacious padding */
      z-index: 99999 !important;
      transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      pointer-events: none !important;
      text-align: left !important;
      color: black !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      line-height: 1.45 !important;
      cursor: default !important;
    }

    /* Arrow indicators pointing UP to social buttons (default center) */
    .social-preview-card::after {
      content: '' !important;
      position: absolute !important;
      bottom: 100% !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      border-width: 8px !important;
      border-style: solid !important;
      border-color: transparent transparent black transparent !important;
    }

    .social-preview-card::before {
      content: '' !important;
      position: absolute !important;
      bottom: 100% !important;
      left: 50% !important;
      transform: translateX(-50%) translateY(3px) !important;
      border-width: 8px !important;
      border-style: solid !important;
      border-color: transparent transparent white transparent !important;
      z-index: 1 !important;
    }

    /* Active state when parent is hovered (default center) */
    .navbar-social:hover .social-preview-card:not(.social-preview-right) {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateX(-50%) translateY(12px) scale(1) !important;
      pointer-events: auto !important;
    }

    /* ── RIGHT ALIGNMENT (Prevents viewport clipping on X & Email) ── */
    .social-preview-card.social-preview-right {
      left: auto !important;
      right: -10px !important;
      transform: translateY(-12px) scale(0.95) !important;
    }

    .navbar-social:hover .social-preview-card.social-preview-right {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(12px) scale(1) !important;
      pointer-events: auto !important;
    }

    /* Shift arrow to the right edge of the card */
    .social-preview-card.social-preview-right::after {
      left: auto !important;
      right: 14px !important;
      transform: none !important;
    }
    .social-preview-card.social-preview-right::before {
      left: auto !important;
      right: 14px !important;
      transform: none !important;
    }

    /* GitHub Specific styling */
    .github-preview {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .github-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .github-avatar {
      width: 36px;
      height: 36px;
      border: 2px solid black;
      border-radius: 50%;
      object-fit: cover;
    }
    .github-info {
      display: flex;
      flex-direction: column;
    }
    .github-username {
      font-weight: 700;
      font-size: 15px;
      line-height: 1.2;
    }
    .github-handle {
      font-size: 11px;
      color: #666;
    }
    .github-chart {
      width: 100%;
      height: auto;
      border: 2px solid black;
      border-radius: 4px;
      margin-top: 4px;
      background: #fcfcfc;
      padding: 6px;
    }

    /* X / Twitter Card styling */
    .x-preview {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .x-header-banner {
      height: 64px;
      background: url('/public/twitter-background.png') no-repeat center/cover !important;
      border: 2px solid black;
      border-radius: 4px;
      position: relative;
      margin-bottom: 24px;
    }
    .x-avatar {
      width: 42px;
      height: 42px;
      border: 2px solid black;
      border-radius: 50%;
      position: absolute;
      top: 36px;
      left: 10px;
      background: white;
      object-fit: cover;
    }
    .x-profile-info {
      display: flex;
      flex-direction: column;
      padding-left: 2px;
    }
    .x-name {
      font-weight: 700;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 3px;
      line-height: 1.2;
    }
    .x-name::after {
      content: '✦';
      color: #e8a020;
      font-size: 11px;
    }
    .x-handle {
      font-size: 11px;
      color: #666;
    }
    .x-bio {
      font-size: 12px;
      color: #222;
      margin-top: 4px;
      line-height: 1.4;
    }
    .x-stats {
      display: flex;
      gap: 14px;
      font-size: 11px;
      color: #666;
      margin-top: 8px;
      border-top: 1px solid #eee;
      padding-top: 6px;
    }
    .x-stat strong {
      color: black;
      font-weight: 700;
    }

    /* LinkedIn Card styling */
    .linkedin-preview {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .linkedin-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .linkedin-avatar {
      width: 38px;
      height: 38px;
      border: 2px solid black;
      border-radius: 50%;
      object-fit: cover;
    }
    .linkedin-info {
      display: flex;
      flex-direction: column;
    }
    .linkedin-name {
      font-weight: 700;
      font-size: 15px;
      line-height: 1.2;
    }
    .linkedin-title {
      font-size: 12px;
      color: #222;
      font-weight: 500;
      margin-top: 2px;
    }
    .linkedin-school {
      font-size: 11px;
      color: #666;
      margin-top: 2px;
    }
    .linkedin-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      font-size: 11px;
      color: #666;
      border-top: 1px solid #eee;
      padding-top: 6px;
    }
    .linkedin-btn {
      background: #0077b5;
      color: white !important;
      border: 2px solid black;
      font-weight: 700;
      font-size: 9.5px;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: 2px 2px 0 black;
      text-decoration: none;
    }

    /* Email Card styling */
    .email-preview {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .email-title {
      font-weight: 700;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .email-address {
      font-family: monospace;
      font-size: 11.5px;
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 6px 8px;
      border-radius: 4px;
      color: #333;
      word-break: break-all;
    }
    .email-actions {
      display: flex;
      gap: 8px;
      margin-top: 4px;
    }
    .email-btn {
      flex: 1;
      padding: 7px 4px;
      font-size: 9.5px;
      font-weight: 700;
      text-align: center;
      border: 2px solid black;
      border-radius: 4px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.15s;
    }
    .email-copy-btn {
      background: #ffe66d;
      color: black !important;
      box-shadow: 2px 2px 0 black;
    }
    .email-copy-btn.copied {
      background: #4ae380 !important;
      box-shadow: none !important;
      transform: translate(2px, 2px) !important;
    }
    .email-send-btn {
      background: black;
      color: white !important;
      box-shadow: 2px 2px 0 #555;
      text-decoration: none;
    }
    .email-btn:hover {
      transform: translate(-1px, -1px);
      box-shadow: 3px 3px 0 black;
    }
    .email-btn:active {
      transform: translate(2px, 2px);
      box-shadow: none;
    }
  `;

  // Inject CSS style element into Head
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // 2. Templates generator for Previews HTML (with enlarged elements)
  const getPreviewHTML = (type) => {
    switch (type) {
      case 'github':
        return `
          <div class="github-preview">
            <div class="github-header">
              <img class="github-avatar" src="/public/profile.jpg" alt="Vidhan" onerror="this.src='https://vidhanmertiya.vercel.app/public/profile.jpg'">
              <div class="github-info">
                <span class="github-username">Vidhan Mertiya</span>
                <span class="github-handle">@vidhanm</span>
                <span class="github-contributions-count" style="font-size: 11px; color: #555; margin-top: 2px; font-weight: 500;">${githubContributions}</span>
              </div>
            </div>
            <img class="github-chart" src="https://ghchart.rshah.org/40c463/vidhanm" alt="Vidhan's GitHub Contributions chart">
          </div>
        `;

      case 'twitter':
        return `
          <div class="x-preview">
            <div class="x-header-banner">
              <img class="x-avatar" src="/public/twitter-main-photo.jpg" alt="Vidhan" onerror="this.src='/public/profile.jpg'">
            </div>
            <div class="x-profile-info">
              <span class="x-name">Vidhan | Talkbook</span>
              <span class="x-handle">@vidhanmertiya</span>
              <span class="x-bio">Building the future of reading Books.</span>
              <div style="font-size: 9.5px; color: #555; margin-top: 4px; display: flex; flex-direction: column; gap: 2px;">
                <span>📍 Distorted Reality &nbsp;·&nbsp; 🔗 <a href="https://talkbook.live" target="_blank" style="color:#1da1f2;text-decoration:none;">talkbook.live</a></span>
                <span>📅 Joined May 2024</span>
              </div>
            </div>
            <div class="x-stats">
              <span class="x-stat"><strong>519</strong> Following</span>
              <span class="x-stat"><strong>34</strong> Followers</span>
            </div>
          </div>
        `;

      case 'linkedin':
        return `
          <div class="linkedin-preview">
            <div class="linkedin-header">
              <img class="linkedin-avatar" src="/public/profile.jpg" alt="Vidhan" onerror="this.src='https://vidhanmertiya.vercel.app/public/profile.jpg'">
              <div class="linkedin-info">
                <span class="linkedin-name">Vidhan Mertiya</span>
                <span class="linkedin-title">Full-Stack Builder & Developer</span>
              </div>
            </div>
            <div class="linkedin-school">IIT Madras • Building TalkBook</div>
            <div class="linkedin-stats">
              <span>500+ connections</span>
              <span class="linkedin-btn">Connect</span>
            </div>
          </div>
        `;

      case 'email':
        return `
          <div class="email-preview">
            <div class="email-title">Drop a Message</div>
            <div class="email-address">vidhanmertiya.vm@gmail.com</div>
            <div class="email-actions">
              <div class="email-btn email-copy-btn" id="email-copy-trigger">Copy Email</div>
              <a href="mailto:vidhanmertiya.vm@gmail.com" class="email-btn email-send-btn">Send Email</a>
            </div>
          </div>
        `;

      default:
        return '';
    }
  };

  // 3. Initialize hover cards on DOM content load
  function initPreviews() {
    const socialLinks = document.querySelectorAll('.navbar-social');

    socialLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      let type = '';

      if (href.includes('github.com')) {
        type = 'github';
      } else if (href.includes('linkedin.com')) {
        type = 'linkedin';
      } else if (href.includes('x.com') || href.includes('twitter.com')) {
        type = 'twitter';
      } else if (href.startsWith('mailto:') || link.getAttribute('aria-label') === 'Email') {
        type = 'email';
      }

      if (type) {
        // Create the card element
        const card = document.createElement('div');
        
        // Add right alignment styling classes dynamically to prevent viewport clipping
        if (type === 'twitter' || type === 'email' || type === 'linkedin') {
          card.className = 'social-preview-card social-preview-right';
        } else {
          card.className = 'social-preview-card';
        }
        
        card.innerHTML = getPreviewHTML(type);

        // Prevent default click actions (navigation) when elements inside the card are clicked
        card.addEventListener('click', (e) => {
          e.stopPropagation();
          // If a standard button/link is clicked, allow it, otherwise block anchor navigation
          if (!e.target.closest('a') && !e.target.closest('#email-copy-trigger')) {
            e.preventDefault();
          }
        });

        // Add Clipboard Copying logic for email
        if (type === 'email') {
          const copyBtn = card.querySelector('#email-copy-trigger');
          if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              
              navigator.clipboard.writeText('vidhanmertiya.vm@gmail.com').then(() => {
                copyBtn.textContent = '✓ Copied!';
                copyBtn.classList.add('copied');

                setTimeout(() => {
                  copyBtn.textContent = 'Copy Email';
                  copyBtn.classList.remove('copied');
                }, 2000);
              }).catch(err => {
                console.error('Could not copy email: ', err);
              });
            });
          }
        }

        // Append to the navbar social icon parent
        link.appendChild(card);
      }
    });
  }

  // Ensure DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreviews);
  } else {
    initPreviews();
  }
})();
