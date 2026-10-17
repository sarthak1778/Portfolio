/**
 * PORTFOLIO ENHANCEMENT ENGINE
 * 20 Interactive UX/UI, Accessibility, and Tracking Features
 * Sarthak Choudhary Portfolio
 */

(function () {
  'use strict';

  // =========================================================================
  // UTILITY HELPERS
  // =========================================================================
  function $(selector) {
    return document.querySelector(selector);
  }

  function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function safeEscape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // =========================================================================
  // 01. SKIP TO CONTENT LINK
  // =========================================================================
  function initSkipToContent() {
    const skipLink = $('#skipToContentLink');
    const mainEl = $('#main');
    if (skipLink && mainEl) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        mainEl.tabIndex = -1;
        mainEl.focus({ preventScroll: false });
        mainEl.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // =========================================================================
  // 02. SCROLL PROGRESS BAR
  // =========================================================================
  function initScrollProgressBar() {
    const progressBar = $('#scrollProgressBar');
    if (!progressBar) return;

    let ticking = false;
    function updateProgress() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      progressBar.style.width = progress + '%';
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  // =========================================================================
  // 03. DARK MODE TOGGLE ENHANCEMENTS
  // =========================================================================
  function initDarkModeToggle() {
    const toggleBtns = $$('#themeToggleBtn, #mobileThemeToggleBtn');
    const themeIcon = $('#themeIcon');

    function applyTheme(theme, notify = false) {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
      localStorage.setItem('sarthak_portfolio_theme', theme);

      const isDark = theme === 'dark';
      toggleBtns.forEach(btn => {
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      });

      if (themeIcon) {
        themeIcon.innerHTML = isDark
          ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
          : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      }

      if (notify && typeof window.showToast === 'function') {
        window.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
      }
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') ||
      localStorage.getItem('sarthak_portfolio_theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    applyTheme(currentTheme, false);

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(activeTheme, true);
      });
    });

    // Listen to OS theme changes if user has not explicitly chosen
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('sarthak_portfolio_theme')) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  // =========================================================================
  // 04. SIMPLE COOKIE BANNER
  // =========================================================================
  function initCookieBanner() {
    const banner = $('#cookieBanner');
    const acceptBtn = $('#cookieAcceptBtn');
    const declineBtn = $('#cookieDeclineBtn');
    const prefsBtn = $('#cookiePreferencesBtn');
    const footerLink = $('#footerCookieSettings');

    if (!banner) return;

    const consent = localStorage.getItem('sarthak_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        banner.classList.add('show');
      }, 1200);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('sarthak_cookie_consent', 'all');
        banner.classList.remove('show');
        if (typeof window.showToast === 'function') {
          window.showToast('Preferences saved: All cookies & local storage enabled', 'success');
        }
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('sarthak_cookie_consent', 'essential');
        banner.classList.remove('show');
        if (typeof window.showToast === 'function') {
          window.showToast('Preferences saved: Essential storage only', 'info');
        }
      });
    }

    if (prefsBtn) {
      prefsBtn.addEventListener('click', () => {
        if (window.showConfirmModal) {
          window.showConfirmModal({
            title: 'Privacy & Storage Settings',
            message: 'Choose your storage preference. Essential storage remembers theme choice and search preferences. Analytics helps calculate anonymous visit counts without tracking identity.',
            confirmText: 'Accept All',
            cancelText: 'Essential Only',
            icon: '🔒',
            onConfirm: () => {
              localStorage.setItem('sarthak_cookie_consent', 'all');
              banner.classList.remove('show');
            },
            onCancel: () => {
              localStorage.setItem('sarthak_cookie_consent', 'essential');
              banner.classList.remove('show');
            }
          });
        }
      });
    }

    if (footerLink) {
      footerLink.addEventListener('click', (e) => {
        e.preventDefault();
        banner.classList.add('show');
      });
    }
  }

  // =========================================================================
  // 05. SITE SEARCH & COMMAND PALETTE
  // =========================================================================
  function initSiteSearch() {
    const searchModal = $('#searchModal');
    const searchInput = $('#siteSearchInput');
    const searchResults = $('#searchResultsList');
    const clearBtn = $('#searchClearBtn');
    const openBtns = $$('#siteSearchBtn, #mobileSearchBtn');
    const filterChips = $$('.search-chip');

    if (!searchModal || !searchInput || !searchResults) return;

    let activeFilter = 'all';
    let selectedIndex = -1;
    let currentMatches = [];

    // Build Search Index from DOM + PROFILE_DATA
    function buildSearchIndex() {
      const items = [];

      // 1. Page Sections
      const sections = [
        { title: 'Home / Hero', desc: 'Introduction, engineering discipline, Google Ambassador badge', target: '#hero', type: 'sections' },
        { title: 'Overview & Highlights', desc: 'Core engineering summary, latest builds, key credentials', target: '#overview', type: 'sections' },
        { title: 'About Sarthak', desc: 'Engineering philosophy, interdisciplinary dimensions, hardware-software integration', target: '#about', type: 'sections' },
        { title: 'Technical Skills Matrix', desc: 'Embedded C, MATLAB/Simulink, IoT firmware, Python, Power Electronics', target: '#skills', type: 'skills' },
        { title: 'Engineering Projects', desc: 'PMSM Hybrid ANN-PID control, IoT Smart Irrigation, ESP8266 prototypes', target: '#projects', type: 'projects' },
        { title: 'Repositories & Code', desc: 'GitHub active repositories, source code commits, hardware schemas', target: '#github', type: 'projects' },
        { title: 'Live Activity Telemetry', desc: 'Live engineering activity, GitHub builds, LinkedIn updates', target: '#activity', type: 'sections' },
        { title: 'Experience & Leadership', desc: 'Google Gemini Campus Ambassador, EEE Department responsibilities', target: '#experience', type: 'experience' },
        { title: 'Certificates & Credentials', desc: 'Google, MATLAB, Siemens, IoT credentials and full verification links', target: '#certificates', type: 'certificates' },
        { title: 'Creative Nature Photography', desc: 'Nature visual storytelling, photographic works @_nature_156', target: '#creative-photography', type: 'sections' },
        { title: 'Frequently Asked Questions (FAQ)', desc: 'Interviews, hiring availability, PMSM simulations, embedded hardware', target: '#faq', type: 'sections' },
        { title: 'Work With Me / Collaboration', desc: 'Engineering internships, embedded IoT prototyping, motor control consulting', target: '#work-with-me', type: 'sections' },
        { title: 'Direct Contact & Inquiries', desc: 'Send structured inquiry, call +91 93416 64156, direct email', target: '#contact', type: 'sections' }
      ];
      items.push(...sections);

      // 2. Profile Data (if available)
      if (window.PROFILE_DATA) {
        const pd = window.PROFILE_DATA;
        if (pd.projects) {
          pd.projects.forEach(p => {
            items.push({
              title: p.title,
              desc: p.summary || p.description || p.category,
              target: '#projects',
              type: 'projects',
              extra: p.technologies ? p.technologies.join(', ') : ''
            });
          });
        }
        if (pd.certifications) {
          pd.certifications.forEach(c => {
            items.push({
              title: c.name || c.title,
              desc: `Issued by ${c.issuer || c.organization} (${c.issueDate || c.year || 'Verified'})`,
              target: '#certificates',
              type: 'certificates'
            });
          });
        }
        if (pd.technicalSkills) {
          Object.values(pd.technicalSkills).forEach(cat => {
            if (cat.skills) {
              cat.skills.forEach(s => {
                items.push({
                  title: s.name,
                  desc: `${cat.category} • Related project: ${s.project || 'Embedded Architecture'}`,
                  target: '#skills',
                  type: 'skills'
                });
              });
            }
          });
        }
      }

      return items;
    }

    const searchIndex = buildSearchIndex();

    function openSearch() {
      searchModal.classList.add('open');
      searchModal.removeAttribute('inert');
      searchModal.setAttribute('aria-hidden', 'false');
      searchInput.value = '';
      selectedIndex = -1;
      renderResults('');
      setTimeout(() => searchInput.focus(), 50);
      document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
      searchModal.classList.remove('open');
      searchModal.setAttribute('inert', '');
      searchModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function renderResults(query) {
      const q = query.trim().toLowerCase();
      clearBtn.style.display = q ? 'block' : 'none';

      let filtered = searchIndex;
      if (activeFilter !== 'all') {
        filtered = filtered.filter(item => item.type === activeFilter);
      }

      if (q) {
        filtered = filtered.filter(item => {
          return item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            (item.extra && item.extra.toLowerCase().includes(q));
        });
      }

      currentMatches = filtered.slice(0, 15);
      selectedIndex = currentMatches.length > 0 ? 0 : -1;

      if (currentMatches.length === 0) {
        searchResults.innerHTML = `
          <div class="search-empty-state">
            <p>No results found for "<strong>${safeEscape(query)}</strong>"</p>
            <p style="font-size: 12px; margin-top: 4px; color: var(--text-faint);">Try searching for "PMSM", "Simulink", "Arduino", "Google", "Certificates", or "Contact".</p>
          </div>
        `;
        return;
      }

      searchResults.innerHTML = currentMatches.map((item, idx) => `
        <div class="search-result-item ${idx === selectedIndex ? 'selected' : ''}" data-index="${idx}" data-target="${item.target}">
          <div>
            <div class="search-result-title">${highlightMatch(item.title, q)}</div>
            <div class="search-result-snippet">${highlightMatch(item.desc, q)}</div>
          </div>
          <span class="search-result-badge">${item.type}</span>
        </div>
      `).join('');

      // Click listener for items
      $$('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          const target = el.getAttribute('data-target');
          selectItem(target);
        });
      });
    }

    function highlightMatch(text, query) {
      if (!query || !text) return safeEscape(text);
      const safeText = safeEscape(text);
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      return safeText.replace(regex, '<mark style="background:var(--copper-soft); color:var(--copper); border-radius:2px; padding:0 2px;">$1</mark>');
    }

    function selectItem(target) {
      closeSearch();
      if (target && target.startsWith('#')) {
        const dest = $(target);
        if (dest) {
          dest.scrollIntoView({ behavior: 'smooth' });
          if (dest.tabIndex < 0) dest.tabIndex = -1;
          dest.focus();
        }
      }
    }

    // Open events
    openBtns.forEach(btn => btn.addEventListener('click', openSearch));

    // Global keyboard shortcut: Ctrl+K, Cmd+K, or "/"
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchModal.classList.contains('open')) {
          closeSearch();
        } else {
          openSearch();
        }
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openSearch();
      } else if (e.key === 'Escape' && searchModal.classList.contains('open')) {
        closeSearch();
      }
    });

    // Modal navigation via arrow keys
    searchInput.addEventListener('keydown', (e) => {
      if (currentMatches.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % currentMatches.length;
        updateSelectedVisual();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + currentMatches.length) % currentMatches.length;
        updateSelectedVisual();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && currentMatches[selectedIndex]) {
          selectItem(currentMatches[selectedIndex].target);
        }
      }
    });

    function updateSelectedVisual() {
      const items = $$('.search-result-item');
      items.forEach((item, idx) => {
        item.classList.toggle('selected', idx === selectedIndex);
        if (idx === selectedIndex) {
          item.scrollIntoView({ block: 'nearest' });
        }
      });
    }

    searchInput.addEventListener('input', (e) => {
      renderResults(e.target.value);
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      renderResults('');
    });

    // Filter bar chips
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeFilter = chip.getAttribute('data-filter') || 'all';
        renderResults(searchInput.value);
      });
    });

    // Click outside search container to close
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        closeSearch();
      }
    });
  }

  // =========================================================================
  // 06. EXPANDABLE FAQ ACCORDION
  // =========================================================================
  function initFAQ() {
    const faqItems = $$('.faq-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Close other accordion items for clean accordion behavior
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('active', !isOpen);
        btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });
    });
  }

  // =========================================================================
  // 07. PASSWORD VISIBILITY TOGGLE
  // =========================================================================
  function initPasswordToggle() {
    const toggleBtn = $('#passwordToggleBtn');
    const passwordInput = $('#contactAccessCode');
    if (!toggleBtn || !passwordInput) return;

    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      toggleBtn.setAttribute('aria-label', isPassword ? 'Hide passcode' : 'Show passcode');
      toggleBtn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
      toggleBtn.innerHTML = isPassword
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  }

  // =========================================================================
  // 08. FORM SUCCESS & ERROR STATES
  // =========================================================================
  function initEnhancedForm() {
    const form = $('#directContactForm');
    const successCard = $('#formSuccessCard');
    const resetFormBtn = $('#resetFormBtn');
    const clearFormBtn = $('#clearFormBtn');

    if (!form) return;

    const nameInput = $('#contactSenderName');
    const emailInput = $('#contactSenderEmail');
    const msgInput = $('#contactBodyText');
    const topicInput = $('#contactTopic');

    function validateField(input, errorId, validator, message) {
      const errorEl = $(errorId);
      const val = (input.value || '').trim();
      const isValid = validator(val);

      if (!isValid) {
        input.classList.add('input-has-error');
        if (errorEl) {
          errorEl.textContent = message;
          errorEl.style.display = 'block';
        }
      } else {
        input.classList.remove('input-has-error');
        if (errorEl) {
          errorEl.style.display = 'none';
        }
      }
      return isValid;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time blur validation
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        validateField(nameInput, '#nameErrorMsg', v => v.length >= 2, 'Please enter your name (at least 2 characters)');
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        validateField(emailInput, '#emailErrorMsg', v => emailRegex.test(v), 'Please enter a valid email address');
      });
    }

    if (msgInput) {
      msgInput.addEventListener('blur', () => {
        validateField(msgInput, '#msgErrorMsg', v => v.length >= 10, 'Please enter a message of at least 10 characters');
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, '#nameErrorMsg', v => v.length >= 2, 'Please enter your name (at least 2 characters)');
      const isEmailValid = validateField(emailInput, '#emailErrorMsg', v => emailRegex.test(v), 'Please enter a valid email address');
      const isMsgValid = validateField(msgInput, '#msgErrorMsg', v => v.length >= 10, 'Please enter a message of at least 10 characters');

      if (!isNameValid || !isEmailValid || !isMsgValid) {
        form.classList.remove('form-shake');
        void form.offsetWidth; // Force reflow
        form.classList.add('form-shake');
        if (typeof window.showToast === 'function') {
          window.showToast('Please correct the highlighted fields in the form', 'error');
        }
        return;
      }

      // Capture UTM tracking params if present
      const utmData = window.__utmTrackingData || {};
      const utmNotes = Object.keys(utmData).length > 0
        ? `\n\n[UTM Attribution: ${JSON.stringify(utmData)}]`
        : '';

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const topic = topicInput ? topicInput.value : 'General Inquiry';
      const msg = msgInput.value.trim();

      // Launch Mailto link
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${topic} - from ${name}`);
      const body = encodeURIComponent(`Hi Sarthak,\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${msg}${utmNotes}\n\n---\nSent via sarthak-choudhary.vercel.app portfolio inquiry form.`);
      const mailtoUrl = `mailto:sarthakchoudhary1778@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      // Show animated Form Success State
      if (successCard) {
        form.style.display = 'none';
        successCard.style.display = 'block';
        const senderNameEl = $('#successSenderName');
        if (senderNameEl) senderNameEl.textContent = name;
        const topicEl = $('#successTopic');
        if (topicEl) topicEl.textContent = topic;
      }

      if (typeof window.showToast === 'function') {
        window.showToast('Inquiry prepared! Launching your email client...', 'success');
      }
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        form.reset();
        form.style.display = 'block';
        if (successCard) successCard.style.display = 'none';
        $$('.field-error-msg').forEach(el => el.style.display = 'none');
        $$('.input-has-error').forEach(el => el.classList.remove('input-has-error'));
      });
    }

    if (clearFormBtn) {
      clearFormBtn.addEventListener('click', () => {
        if (nameInput.value || emailInput.value || msgInput.value) {
          if (window.showConfirmModal) {
            window.showConfirmModal({
              title: 'Clear inquiry form?',
              message: 'Are you sure you want to discard your entered message? This cannot be undone.',
              confirmText: 'Yes, clear form',
              cancelText: 'Keep writing',
              icon: '🗑️',
              onConfirm: () => {
                form.reset();
                $$('.field-error-msg').forEach(el => el.style.display = 'none');
                $$('.input-has-error').forEach(el => el.classList.remove('input-has-error'));
              }
            });
          } else {
            form.reset();
          }
        }
      });
    }
  }

  // =========================================================================
  // 09. REUSABLE CONFIRMATION MODALS
  // =========================================================================
  function initConfirmModal() {
    const modal = $('#confirmModal');
    const titleEl = $('#confirmModalTitle');
    const descEl = $('#confirmModalDesc');
    const iconEl = $('#confirmModalIcon');
    const confirmBtn = $('#confirmModalConfirmBtn');
    const cancelBtn = $('#confirmModalCancelBtn');

    if (!modal) return;

    let activeConfirmCallback = null;
    let activeCancelCallback = null;

    window.showConfirmModal = function (opts) {
      if (titleEl) titleEl.textContent = opts.title || 'Confirm Action';
      if (descEl) descEl.textContent = opts.message || 'Are you sure you want to proceed?';
      if (iconEl) iconEl.textContent = opts.icon || '⚠️';
      if (confirmBtn) confirmBtn.textContent = opts.confirmText || 'Confirm';
      if (cancelBtn) cancelBtn.textContent = opts.cancelText || 'Cancel';

      activeConfirmCallback = opts.onConfirm || null;
      activeCancelCallback = opts.onCancel || null;

      modal.classList.add('open');
      modal.removeAttribute('inert');
      modal.setAttribute('aria-hidden', 'false');
      if (confirmBtn) confirmBtn.focus();
    };

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('inert', '');
      modal.setAttribute('aria-hidden', 'true');
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        closeModal();
        if (activeConfirmCallback) activeConfirmCallback();
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        closeModal();
        if (activeCancelCallback) activeCancelCallback();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
        if (activeCancelCallback) activeCancelCallback();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
        if (activeCancelCallback) activeCancelCallback();
      }
    });
  }

  // =========================================================================
  // 10. FLOATING CONTACT BUTTON & QUICK MENU
  // =========================================================================
  function initFloatingContact() {
    const wrap = $('#floatingContactWrap');
    const btn = $('#floatingContactBtn');
    const copyBtn = $('#floatingCopyEmailBtn');
    const formLink = $('#floatingJumpForm');

    if (!wrap || !btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (wrap.classList.contains('open') && !wrap.contains(e.target)) {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wrap.classList.contains('open')) {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('sarthakchoudhary1778@gmail.com').then(() => {
          if (typeof window.showToast === 'function') {
            window.showToast('Copied sarthakchoudhary1778@gmail.com to clipboard!', 'success');
          }
          wrap.classList.remove('open');
        });
      });
    }

    if (formLink) {
      formLink.addEventListener('click', () => {
        wrap.classList.remove('open');
        setTimeout(() => {
          const nameInput = $('#contactSenderName');
          if (nameInput) nameInput.focus();
        }, 600);
      });
    }
  }

  // =========================================================================
  // 11. UTM TRACKING ENGINE & SHARE LINK
  // =========================================================================
  function initUTMTracking() {
    const params = new URLSearchParams(window.location.search);
    const utmData = {};

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref'].forEach(key => {
      if (params.has(key)) {
        utmData[key] = params.get(key);
      }
    });

    if (Object.keys(utmData).length > 0) {
      sessionStorage.setItem('portfolio_utm', JSON.stringify(utmData));
      window.__utmTrackingData = utmData;

      // Show welcome pill in hero if arrived from a campaign
      const source = utmData.utm_source || utmData.ref;
      if (source) {
        const heroActions = $('.hero-actions');
        if (heroActions && !$('#utmWelcomeBadge')) {
          const badge = document.createElement('div');
          badge.id = 'utmWelcomeBadge';
          badge.className = 'utm-welcome-badge';
          badge.innerHTML = `<span>👋 Welcome visitor via <strong>${safeEscape(source)}</strong></span>`;
          heroActions.parentNode.insertBefore(badge, heroActions);
        }
      }
    } else {
      const stored = sessionStorage.getItem('portfolio_utm');
      if (stored) {
        try {
          window.__utmTrackingData = JSON.parse(stored);
        } catch (e) { }
      }
    }

    // Share Portfolio Button with UTM parameters
    const shareBtns = $$('.btn-share-portfolio, #sharePortfolioBtn');
    shareBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const shareUrl = new URL('https://sarthak-choudhary.vercel.app/');
        shareUrl.searchParams.set('utm_source', 'shared_link');
        shareUrl.searchParams.set('utm_medium', 'direct_share');
        shareUrl.searchParams.set('utm_campaign', 'peer_network');

        if (navigator.share) {
          navigator.share({
            title: 'Sarthak Choudhary | EEE & Embedded Systems Portfolio',
            text: 'Explore the engineering portfolio of Sarthak Choudhary (Sir MVIT 8.39 CGPA, Google Student Ambassador 2026, PMSM simulations & IoT prototypes).',
            url: shareUrl.toString()
          }).catch(() => { });
        } else {
          navigator.clipboard.writeText(shareUrl.toString()).then(() => {
            if (typeof window.showToast === 'function') {
              window.showToast('Shareable portfolio link with tracking copied to clipboard!', 'success');
            }
          });
        }
      });
    });
  }

  // =========================================================================
  // 12. LAST UPDATED DATE FORMATTER
  // =========================================================================
  function initLastUpdated() {
    const lastUpdatedElements = $$('.last-updated-text, #footerLastUpdated, #heroLastUpdated');
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formatted = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    lastUpdatedElements.forEach(el => {
      el.textContent = `Updated: ${formatted} • v2.4 Verified`;
    });
  }

  // =========================================================================
  // 13. LOADING ANIMATIONS & SCROLL REVEAL
  // =========================================================================
  function initScrollReveal() {
    // Add reveal-on-scroll class to main sections and cards
    const targets = $$('.section-pad, .project-card, .cert-card, .service-card, .about-card, .faq-item');
    targets.forEach(el => el.classList.add('reveal-on-scroll'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      targets.forEach(el => observer.observe(el));
    } else {
      targets.forEach(el => el.classList.add('revealed'));
    }
  }

  // =========================================================================
  // 14. GENERIC COPY BUTTON HANDLER
  // =========================================================================
  function initCopyButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-copy-text], [data-copy-target]');
      if (!btn) return;

      let textToCopy = btn.getAttribute('data-copy-text');
      const targetSelector = btn.getAttribute('data-copy-target');
      if (targetSelector) {
        const targetEl = $(targetSelector);
        if (targetEl) textToCopy = targetEl.textContent.trim();
      }

      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<span>✓ Copied!</span>';
        if (typeof window.showToast === 'function') {
          window.showToast(`Copied "${textToCopy.substring(0, 32)}${textToCopy.length > 32 ? '...' : ''}" to clipboard!`, 'success');
        }
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2200);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }

  // =========================================================================
  // 15. PRINT STYLESHEET TRIGGER
  // =========================================================================
  function initPrintTrigger() {
    const printBtns = $$('#printPortfolioBtn, .btn-print-portfolio');
    printBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
      });
    });
  }

  // =========================================================================
  // INITIALIZE ALL 20 FEATURES ON DOM READY
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initSkipToContent();
    initScrollProgressBar();
    initDarkModeToggle();
    initCookieBanner();
    initSiteSearch();
    initFAQ();
    initPasswordToggle();
    initEnhancedForm();
    initConfirmModal();
    initFloatingContact();
    initUTMTracking();
    initLastUpdated();
    initScrollReveal();
    initCopyButtons();
    initPrintTrigger();
  });

})();
