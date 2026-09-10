/**
 * ForgeNest — Residential Gate & Grill Fabrication
 * Core Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Theme (Dark / Light Mode) Controller ---
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('forgenest-theme');

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggles.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'bi bi-sun-fill';
        const label = btn.querySelector('span');
        if (label) label.textContent = 'Light Mode';
        btn.setAttribute('aria-label', 'Switch to light mode');
        btn.setAttribute('title', 'Switch to light mode');
      });
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggles.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'bi bi-moon-stars-fill';
        const label = btn.querySelector('span');
        if (label) label.textContent = 'Dark Mode';
        btn.setAttribute('aria-label', 'Switch to dark mode');
        btn.setAttribute('title', 'Switch to dark mode');
      });
    }
    localStorage.setItem('forgenest-theme', theme);
  }

  // Initialize theme
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDarkScheme.matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  themeToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  // --- 2. Direction (RTL / LTR) Controller ---
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('forgenest-dir');

  function setDirection(dir) {
    if (dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      rtlToggles.forEach(btn => {
        const span = btn.querySelector('.rtl-label, span:not(.bi)');
        if (span) span.textContent = 'LTR';
        btn.setAttribute('aria-label', 'Switch to LTR layout');
        btn.setAttribute('title', 'Switch to LTR layout');
      });
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      rtlToggles.forEach(btn => {
        const span = btn.querySelector('.rtl-label, span:not(.bi)');
        if (span) span.textContent = 'RTL';
        btn.setAttribute('aria-label', 'Switch to RTL layout');
        btn.setAttribute('title', 'Switch to RTL layout');
      });
    }
    localStorage.setItem('forgenest-dir', dir);
  }

  if (savedDir) {
    setDirection(savedDir);
  } else {
    setDirection('ltr');
  }

  rtlToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
      setDirection(currentDir === 'rtl' ? 'ltr' : 'rtl');
    });
  });

  // --- 3. Sticky Navbar Elevation on Scroll ---
  const header = document.querySelector('.site-header');
  function handleScrollNav() {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScrollNav, { passive: true });
  handleScrollNav();

  // --- 4. Mobile & Tablet Drawer Menu ---
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.mobile-drawer a:not(.drawer-dropdown-toggle)');

  function openDrawer() {
    mobileDrawer?.classList.add('active');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('active');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('active')) {
      closeDrawer();
    }
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // --- 5. Mobile Drawer Dropdown Toggle ---
  const drawerDropdownToggles = document.querySelectorAll('.drawer-dropdown-toggle');
  drawerDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;
      const chevron = toggle.querySelector('.bi-chevron-down, .bi-chevron-up');
      if (submenu) {
        const isShow = submenu.classList.toggle('show');
        if (chevron) {
          chevron.className = isShow ? 'bi bi-chevron-up' : 'bi bi-chevron-down';
        }
      }
    });
  });

  // --- 6. Interactive FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherHeader = otherItem.querySelector('.faq-header');
        const otherBody = otherItem.querySelector('.faq-body');
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ item by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstHeader = firstItem.querySelector('.faq-header');
    const firstBody = firstItem.querySelector('.faq-body');
    firstItem.classList.add('active');
    firstHeader?.setAttribute('aria-expanded', 'true');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // --- 7. Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --- 8. Design Gallery Dual Filtering & Lightbox Modal ---
  const galleryContainer = document.getElementById('masonry-gallery');
  if (galleryContainer) {
    const galleryItems = Array.from(galleryContainer.querySelectorAll('.gallery-grid-item'));
    const catBtns = document.querySelectorAll('.filter-cat-btn');
    const styleBtns = document.querySelectorAll('.filter-style-btn');
    const resetBtn = document.getElementById('reset-filters-btn');
    const emptyState = document.getElementById('gallery-empty-state');
    const resultCountEl = document.getElementById('gallery-result-count');

    let currentCategory = 'all';
    let currentStyle = 'all';

    function applyFilters() {
      let visibleCount = 0;

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category') || 'all';
        const itemStyle = item.getAttribute('data-style') || 'all';

        const matchCat = (currentCategory === 'all' || itemCat === currentCategory);
        const matchStyle = (currentStyle === 'all' || itemStyle === currentStyle);

        if (matchCat && matchStyle) {
          item.classList.remove('gallery-hidden');
          item.style.display = '';
          visibleCount++;
        } else {
          item.classList.add('gallery-hidden');
          item.style.display = 'none';
        }
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }

      if (resultCountEl) {
        resultCountEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'Design' : 'Designs'} Showing`;
      }
    }

    // Category button clicks
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category') || 'all';
        applyFilters();
      });
    });

    // Style button clicks
    styleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        styleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentStyle = btn.getAttribute('data-style') || 'all';
        applyFilters();
      });
    });

    // Reset button
    function resetAllFilters() {
      currentCategory = 'all';
      currentStyle = 'all';
      catBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
      styleBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-style') === 'all'));
      applyFilters();
    }

    if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
    const emptyResetBtn = document.getElementById('empty-reset-btn');
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);

    // Initialize filter count
    applyFilters();

    // --- Lightbox Modal Logic ---
    const lightbox = document.getElementById('gallery-lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbTitle = document.getElementById('lightbox-title');
    const lbCat = document.getElementById('lightbox-cat');
    const lbStyle = document.getElementById('lightbox-style');
    const lbCounter = document.getElementById('lightbox-counter');
    const lbClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');

    // All clickable items across the gallery page
    const allClickableCards = Array.from(document.querySelectorAll('.gallery-card[data-lightbox="true"], .gallery-grid-item[data-lightbox="true"]'));
    let currentLbIndex = 0;
    let activeLbList = [];

    function openLightbox(index, list) {
      if (!lightbox || !lbImg) return;
      activeLbList = list;
      currentLbIndex = index;
      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function updateLightboxContent() {
      if (activeLbList.length === 0) return;
      const targetItem = activeLbList[currentLbIndex];
      if (!targetItem) return;

      const imgSrc = targetItem.getAttribute('data-src') || targetItem.querySelector('img')?.getAttribute('src') || '';
      const title = targetItem.getAttribute('data-title') || targetItem.querySelector('.gallery-card-title')?.textContent || 'ForgeNest Design';
      const cat = targetItem.getAttribute('data-cat-label') || targetItem.querySelector('.gallery-card-tag')?.textContent || '';
      const style = targetItem.getAttribute('data-style-label') || '';

      if (lbImg) {
        lbImg.src = imgSrc;
        lbImg.alt = title;
      }
      if (lbTitle) lbTitle.textContent = title;
      if (lbCat) lbCat.textContent = cat;
      if (lbStyle) {
        lbStyle.textContent = style;
        lbStyle.style.display = style ? 'inline-block' : 'none';
      }
      if (lbCounter) {
        lbCounter.textContent = `${currentLbIndex + 1} / ${activeLbList.length}`;
      }
    }

    function prevLightbox() {
      if (activeLbList.length === 0) return;
      currentLbIndex = (currentLbIndex - 1 + activeLbList.length) % activeLbList.length;
      updateLightboxContent();
    }

    function nextLightbox() {
      if (activeLbList.length === 0) return;
      currentLbIndex = (currentLbIndex + 1) % activeLbList.length;
      updateLightboxContent();
    }

    // Attach click listeners to cards
    document.querySelectorAll('.gallery-grid-item, .gallery-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking a direct action link that isn't lightbox trigger, don't open lightbox
        if (e.target.closest('a') && !e.target.closest('.lightbox-trigger')) {
          return;
        }

        // Get visible items in same section or all visible items
        const parentGrid = card.closest('#masonry-gallery');
        let currentPool = [];
        if (parentGrid) {
          currentPool = Array.from(parentGrid.querySelectorAll('.gallery-grid-item:not(.gallery-hidden)'));
        } else {
          const sectionCards = Array.from(card.closest('.section')?.querySelectorAll('.gallery-card') || []);
          currentPool = sectionCards.length > 0 ? sectionCards : [card];
        }

        const idx = currentPool.indexOf(card);
        if (idx !== -1) {
          openLightbox(idx, currentPool);
        } else {
          openLightbox(0, [card]);
        }
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', prevLightbox);
    if (lbNext) lbNext.addEventListener('click', nextLightbox);

    // Click outside backdrop to close
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
          closeLightbox();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    });
  }

  // --- 9. Materials Studio Interactive Handlers (materials.html) ---

  // 9A. Interactive Material Switcher (Section 03)
  const matTabBtns = document.querySelectorAll('.mat-tab-btn');
  const matSwitchImg = document.getElementById('mat-switch-img');
  const matSwitchTag = document.getElementById('mat-switch-tag');
  const matSwitchTitle = document.getElementById('mat-switch-title');
  const matSwitchDesc = document.getElementById('mat-switch-desc');
  const matSpecChar = document.getElementById('mat-spec-char');
  const matSpecApp = document.getElementById('mat-spec-app');
  const matSpecFinish = document.getElementById('mat-spec-finish');
  const matSpecGauge = document.getElementById('mat-spec-gauge');

  const matSwitchData = {
    ms: {
      img: 'assets/images/materials/materials-ms.jpg',
      tag: '01 / MILD STEEL',
      title: 'Mild Steel (MS)',
      desc: 'Strong visual presence with freedom for expressive residential designs. Excellent structural rigidity for wide entrances, sliding systems, and customized architectural profiles.',
      char: 'Expressive, Structured, Custom',
      app: 'Entrance Gates, Grills, Boundary Details',
      finish: 'Matte Charcoal / Satin Graphite Powder Coat',
      gauge: 'Heavy-Gauge Hollow Sections'
    },
    ss: {
      img: 'assets/images/materials/materials-ss.jpg',
      tag: '02 / STAINLESS STEEL',
      title: 'Stainless Steel (SS 304 / 316)',
      desc: 'Clean lines, precise detailing, and contemporary sophistication. Naturally weather-resistant and visually sharp, ideal for minimalist balustrades and precision railings.',
      char: 'Clean, Refined, Contemporary',
      app: 'Staircase Railings, Balcony Balustrades, Spigots',
      finish: 'Brushed Satin / Hairline / Electro-Black',
      gauge: 'Solid Flat Bar & Precision Tubes'
    },
    aluminium: {
      img: 'assets/images/materials/materials-aluminium.jpg',
      tag: '03 / ALUMINIUM',
      title: 'Architectural Aluminium',
      desc: 'Light visual weight with modern, minimal profiles. Effortless glide for automated sliding systems, zero rust degradation, and clean planar horizontal louvers.',
      char: 'Light, Modern, Minimal',
      app: 'Slatted Gates, Window Screens, Privacy Louvers',
      finish: 'Anodized Bronze / Textured Powder Coat',
      gauge: 'Extruded Architectural Sections'
    },
    glass: {
      img: 'assets/images/materials/materials-glass-metal.jpg',
      tag: '04 / GLASS + METAL',
      title: 'Glass + Metal Systems',
      desc: 'Open spatial transparency meets rigid metallic structure. Allows maximum natural daylight and panoramic exterior views while maintaining robust boundary protection.',
      char: 'Open, Light, Balanced, Modern',
      app: 'Balcony Glass Balustrades, Terrace Railings',
      finish: 'Toughened Laminated + Matte Stainless Clamps',
      gauge: '12mm Tempered Safety Glass'
    },
    compound: {
      img: 'assets/images/materials/materials-compound-wall.jpg',
      tag: '05 / COMPOUND WALL',
      title: 'Compound Wall Materials',
      desc: 'Solid, grounded, and contextual perimeter boundary materials that connect the main entrance gate seamlessly to the home facade and street frontage.',
      char: 'Solid, Grounded, Contextual',
      app: 'Boundary Wall Inserts, Coping Caps, Pedestrian Gates',
      finish: 'Textured Multi-Coat Powder Coat on Steel',
      gauge: 'Integrated Post Anchors'
    }
  };

  if (matTabBtns.length > 0) {
    matTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        matTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.getAttribute('data-mat');
        const data = matSwitchData[key];
        if (data) {
          if (matSwitchImg) {
            matSwitchImg.src = data.img;
            matSwitchImg.alt = data.title;
          }
          if (matSwitchTag) matSwitchTag.textContent = data.tag;
          if (matSwitchTitle) matSwitchTitle.textContent = data.title;
          if (matSwitchDesc) matSwitchDesc.textContent = data.desc;
          if (matSpecChar) matSpecChar.textContent = data.char;
          if (matSpecApp) matSpecApp.textContent = data.app;
          if (matSpecFinish) matSpecFinish.textContent = data.finish;
          if (matSpecGauge) matSpecGauge.textContent = data.gauge;
        }
      });
    });
  }

  // 9B. Interactive Home Style Selector (Section 12)
  const styleBtns = document.querySelectorAll('.style-btn');
  const styleContent = document.getElementById('style-dynamic-content');
  const styleData = {
    minimal: {
      tag: 'Aesthetic Direction: Modern Minimal',
      title: 'Clean Geometry & Quiet Detailing',
      material: 'Consider: Architectural Aluminium or MS Box Sections',
      character: 'Consider: Planar, uncluttered, horizontal shadow gaps',
      finish: 'Consider: Matte Charcoal or Fine-Textured Deep Bronze',
      approach: 'Consider: Concealed tracks, flush push-plates, minimal ornamentation'
    },
    contemporary: {
      tag: 'Aesthetic Direction: Contemporary Warmth',
      title: 'Structured Balance & Mixed Materials',
      material: 'Consider: Mild Steel Structural Frame + Composite Wood / Glass',
      character: 'Consider: Warm tactile texture with crisp geometric steel framing',
      finish: 'Consider: Satin Graphite + Natural Dark Wood Louvers',
      approach: 'Consider: Integrated warm LED conduits and asymmetric divide bars'
    },
    classic: {
      tag: 'Aesthetic Direction: Classic Character',
      title: 'Timeless Elegance & Refined Symmetry',
      material: 'Consider: Solid Forged Mild Steel Pickets',
      character: 'Consider: Slender vertical balusters, subtle cast collars, molded rails',
      finish: 'Consider: Deep Satin Black or Aged Architectural Bronze',
      approach: 'Consider: Traditional proportions, mitered moldings, heritage brass hardware'
    },
    statement: {
      tag: 'Aesthetic Direction: Bold Statement',
      title: 'Sculptural Scale & Architectural Presence',
      material: 'Consider: Heavy Structural Steel Frame + Architectural Bronze Accents',
      character: 'Consider: Monolithic pivot stance, wide planar blades, dramatic shadows',
      finish: 'Consider: Textured Multi-Tone Powder Coat with Metallic Trim',
      approach: 'Consider: Custom offset pivot bearings, bespoke full-height pull handles'
    }
  };

  if (styleBtns.length > 0 && styleContent) {
    styleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        styleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.getAttribute('data-style');
        const data = styleData[key];
        if (data) {
          styleContent.innerHTML = `
            <div class="style-card-header">
              <span class="style-tag">${data.tag}</span>
              <h3 class="style-title">${data.title}</h3>
            </div>
            <div class="style-guidance-grid">
              <div class="style-guide-item">
                <span class="style-guide-label"><i class="bi bi-layers-fill"></i> Suggested Material Direction</span>
                <span class="style-guide-val">${data.material}</span>
              </div>
              <div class="style-guide-item">
                <span class="style-guide-label"><i class="bi bi-eye-fill"></i> Suggested Visual Character</span>
                <span class="style-guide-val">${data.character}</span>
              </div>
              <div class="style-guide-item">
                <span class="style-guide-label"><i class="bi bi-palette-fill"></i> Suggested Finish Direction</span>
                <span class="style-guide-val">${data.finish}</span>
              </div>
              <div class="style-guide-item">
                <span class="style-guide-label"><i class="bi bi-tools"></i> Suggested Design Approach</span>
                <span class="style-guide-val">${data.approach}</span>
              </div>
            </div>
          `;
        }
      });
    });
  }

  // 9C. Interactive Material Decision Map (Section 15)
  const decisionBtns = document.querySelectorAll('.decision-opt-btn');
  const decisionDisplay = document.getElementById('decision-dynamic-content');
  const decisionData = {
    quiet: {
      title: 'A Quiet, Minimal Look',
      recommend: 'Explore Direction: Architectural Aluminium or MS Box Louvers',
      desc: 'Consider horizontal shadow gaps and matte non-reflective powder coats that allow the architecture of your facade to take center stage without visual competition.'
    },
    presence: {
      title: 'A Strong Structural Presence',
      recommend: 'Explore Direction: Heavy-Gauge Mild Steel Framed Gates',
      desc: 'Consider substantial rectangular steel box sections with solid infill or composite panels that convey security, solidity, and permanent architectural grounding.'
    },
    light: {
      title: 'A Light Visual Feel',
      recommend: 'Explore Direction: Laminated Glass + Stainless Steel Spigots',
      desc: 'Consider transparent toughened glass balustrades anchored with low-profile satin stainless clamps to maintain clear garden sightlines and airy natural light.'
    },
    distinctive: {
      title: 'A Distinctive, Bespoke Design',
      recommend: 'Explore Direction: CNC Fiber-Laser Geometric Screens',
      desc: 'Consider custom perforated steel panels with tailored geometric rhythms, paired with subtle perimeter LED channel illumination for night-time depth.'
    },
    contemporary: {
      title: 'A Warm Contemporary Aesthetic',
      recommend: 'Explore Direction: Steel Frame + Weather-Resilient Composite Battens',
      desc: 'Consider pairing dark architectural steel frames with warm polymer wood louvers for low-maintenance organic warmth that softens modern concrete facades.'
    }
  };

  if (decisionBtns.length > 0 && decisionDisplay) {
    decisionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        decisionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.getAttribute('data-decision');
        const data = decisionData[key];
        if (data) {
          decisionDisplay.innerHTML = `
            <div>
              <h4 class="decision-display-title">${data.title}</h4>
              <p class="decision-display-recommend" style="font-weight:600; color:var(--text); font-size:0.90625rem; margin-bottom:4px;">${data.recommend}</p>
            </div>
            <div>
              <p class="decision-display-desc">${data.desc}</p>
            </div>
          `;
        }
      });
    });
  }

  // 9D. Materials Studio Lookbook & Detail Lightbox
  const matLightboxItems = document.querySelectorAll('.lookbook-tile, .mat-detail-card');
  if (matLightboxItems.length > 0) {
    const lb = document.getElementById('materials-lightbox');
    const lbImg = document.getElementById('mat-lb-img');
    const lbTitle = document.getElementById('mat-lb-title');
    const lbTag = document.getElementById('mat-lb-tag');
    const lbCounter = document.getElementById('mat-lb-counter');
    const lbClose = document.getElementById('mat-lb-close');
    const lbPrev = document.getElementById('mat-lb-prev');
    const lbNext = document.getElementById('mat-lb-next');

    let currentMatIdx = 0;
    const itemsArr = Array.from(matLightboxItems);

    function showMatLightbox(index) {
      if (!lb || !lbImg) return;
      currentMatIdx = (index + itemsArr.length) % itemsArr.length;
      const el = itemsArr[currentMatIdx];
      const src = el.getAttribute('data-img') || el.querySelector('img')?.getAttribute('src') || '';
      const title = el.getAttribute('data-title') || el.querySelector('.mat-detail-title, .lookbook-badge')?.textContent || 'Material Studio';
      const tag = el.getAttribute('data-tag') || 'ForgeNest Material';

      lbImg.src = src;
      lbImg.alt = title;
      if (lbTitle) lbTitle.textContent = title;
      if (lbTag) lbTag.textContent = tag;
      if (lbCounter) lbCounter.textContent = `${currentMatIdx + 1} / ${itemsArr.length}`;

      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    itemsArr.forEach((item, idx) => {
      item.addEventListener('click', () => showMatLightbox(idx));
    });

    if (lbClose) lbClose.addEventListener('click', () => {
      lb?.classList.remove('active');
      document.body.style.overflow = '';
    });

    if (lbPrev) lbPrev.addEventListener('click', () => showMatLightbox(currentMatIdx - 1));
    if (lbNext) lbNext.addEventListener('click', () => showMatLightbox(currentMatIdx + 1));

    if (lb) {
      lb.addEventListener('click', (e) => {
        if (e.target === lb || e.target.classList.contains('lightbox-backdrop')) {
          lb.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lb || !lb.classList.contains('active')) return;
      if (e.key === 'Escape') {
        lb.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (e.key === 'ArrowLeft') showMatLightbox(currentMatIdx - 1);
      if (e.key === 'ArrowRight') showMatLightbox(currentMatIdx + 1);
    });
  }


  // --- 10. Design Gallery Interactive Direction Selector ---
  const directionBtns = document.querySelectorAll('.direction-picker-btn');
  const dirContentEl = document.getElementById('direction-dynamic-content');
  if (directionBtns.length && dirContentEl) {
    const directionData = {
      quiet: {
        title: "Quiet & Minimal Architecture",
        tag: "Understated Elegance",
        desc: "Characterized by horizontal shadow gaps, flush profiles, planar infill panels, and concealed fasteners. Perfect for modern residential facades seeking clean sightlines without visual clutter.",
        materials: "Mild Steel Box Sections + Matte Charcoal Powder Coat or Warm Composite Louvers",
        profiles: "Slim 40x20mm horizontal battens, concealed sliding tracks, flush push-plates",
        idealFor: "Modern cubic villas, minimalist facades, private courtyard entries",
        ctaText: "Explore Minimal Gates",
        ctaLink: "#masonry-gallery-section"
      },
      geometric: {
        title: "Modern & Geometric Interplay",
        tag: "Structured Rhythm",
        desc: "Interlocking vertical bars, asymmetrical divide lines, CNC laser-cut perimeter accents, and crisp rectangular proportions that complement contemporary dual-tone exterior finishes.",
        materials: "Heavy-Gauge MS Frame + 304 Grade Stainless Steel or Laser-Cut Accent Panels",
        profiles: "Varied-spacing vertical square hollow sections (SHS), brushed metallic trims",
        idealFor: "Contemporary split-level homes, urban residences, designer boundary walls",
        ctaText: "Explore Contemporary Designs",
        ctaLink: "#masonry-gallery-section"
      },
      classic: {
        title: "Classic & Detailed Craftsmanship",
        tag: "Timeless Refinement",
        desc: "Slender solid-bar vertical balusters, subtle forged spear-tips or spherical finials, mitered perimeter moldings, and elegant symmetry that harmonize with traditional or transitional homes.",
        materials: "Solid Mild Steel Forged Components + Multi-Coat Satin Graphite or Deep Bronze",
        profiles: "16mm solid square bars, hand-dressed scroll collars, continuous flat-bar top rails",
        idealFor: "Colonial homes, heritage bungalows, arched entryways, traditional residences",
        ctaText: "Explore Classic Gates",
        ctaLink: "#masonry-gallery-section"
      },
      bold: {
        title: "Bold & Distinctive Architectural Statement",
        tag: "High Visual Impact",
        desc: "Deep monolithic frames, architectural louvers, textured metal infill with integrated warm LED illumination channels, and custom sculptural pull handles designed to be the defining visual feature.",
        materials: "Composite Metal Panels + Heavy Structural Steel Frame with Architectural Bronze Trim",
        profiles: "Wide 100mm planar slats, custom laser-perforated crest, bespoke integrated handles",
        idealFor: "Grand residential entrances, luxury villas, wide street-facing frontages",
        ctaText: "Explore Statement Fabrications",
        ctaLink: "#masonry-gallery-section"
      }
    };

    directionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        directionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.getAttribute('data-direction');
        const data = directionData[key];
        if (data && dirContentEl) {
          dirContentEl.innerHTML = `
            <div class="direction-card-header">
              <span class="direction-tag">${data.tag}</span>
              <h3 class="direction-title">${data.title}</h3>
              <p class="direction-desc">${data.desc}</p>
            </div>
            <div class="direction-specs-grid">
              <div class="dir-spec-item">
                <span class="dir-spec-label"><i class="bi bi-layers-fill"></i> Material & Finish</span>
                <span class="dir-spec-val">${data.materials}</span>
              </div>
              <div class="dir-spec-item">
                <span class="dir-spec-label"><i class="bi bi-bounding-box-circles"></i> Profile Detailing</span>
                <span class="dir-spec-val">${data.profiles}</span>
              </div>
              <div class="dir-spec-item">
                <span class="dir-spec-label"><i class="bi bi-house-check-fill"></i> Ideal Architecture</span>
                <span class="dir-spec-val">${data.idealFor}</span>
              </div>
            </div>
            <div class="direction-actions">
              <a href="${data.ctaLink}" class="btn btn-primary btn-sm">${data.ctaText}</a>
              <a href="contact.html#measurement-form" class="btn btn-secondary btn-sm">Consult With a Specialist</a>
            </div>
          `;
        }
      });
    });
  }


  // --- 11. Project Brief Builder (Pricing Guide Page) ---
  const briefProjectBtns = document.querySelectorAll('[data-brief-step="project"]');
  const briefDesignBtns = document.querySelectorAll('[data-brief-step="design"]');
  const briefStageBtns = document.querySelectorAll('[data-brief-step="stage"]');
  const briefProjectVal = document.getElementById('brief-project-val');
  const briefDesignVal = document.getElementById('brief-design-val');
  const briefStageVal = document.getElementById('brief-stage-val');

  function setupBriefButtons(buttonList, outputElement) {
    if (!buttonList.length || !outputElement) return;
    buttonList.forEach(btn => {
      btn.addEventListener('click', () => {
        buttonList.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const value = btn.getAttribute('data-value') || btn.textContent.trim();
        outputElement.textContent = value;
      });
    });
  }

  setupBriefButtons(briefProjectBtns, briefProjectVal);
  setupBriefButtons(briefDesignBtns, briefDesignVal);
  setupBriefButtons(briefStageBtns, briefStageVal);

  // --- 12. Testimonials Filtering Controller (testimonials.html) ---
  const storiesContainer = document.getElementById('editorial-stories-stack') || document.getElementById('testimonial-stories-list');
  if (storiesContainer) {
    const storyCards = Array.from(storiesContainer.querySelectorAll('.editorial-story-row, .story-item-card'));
    const catFilterBtns = document.querySelectorAll('.t-cat-btn, .t-cat-filter-btn');
    const focusFilterBtns = document.querySelectorAll('.t-focus-btn, .t-focus-filter-btn');
    const resetFilterBtn = document.getElementById('t-reset-all-btn') || document.getElementById('t-filter-reset-btn');
    const emptyStateEl = document.getElementById('t-empty-state');
    const resultCountEl = document.getElementById('t-count-indicator') || document.getElementById('t-result-count');

    let currentCategory = 'all';
    let currentFocus = 'all';

    function applyTestimonialFilters() {
      let visibleCount = 0;

      storyCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || 'all';
        const cardFocus = card.getAttribute('data-focus') || 'all';

        const matchCat = (currentCategory === 'all' || cardCat === currentCategory);
        const matchFocus = (currentFocus === 'all' || cardFocus === currentFocus);

        if (matchCat && matchFocus) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (emptyStateEl) {
        emptyStateEl.style.display = visibleCount === 0 ? 'block' : 'none';
      }

      if (resultCountEl) {
        resultCountEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'Homeowner Story' : 'Homeowner Stories'} Showing`;
      }
    }

    catFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category') || 'all';
        applyTestimonialFilters();
      });
    });

    focusFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        focusFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFocus = btn.getAttribute('data-focus') || 'all';
        applyTestimonialFilters();
      });
    });

    function resetTestimonialFilters() {
      currentCategory = 'all';
      currentFocus = 'all';
      catFilterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
      focusFilterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-focus') === 'all'));
      applyTestimonialFilters();
    }

    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', resetTestimonialFilters);
    }

    const emptyReset = document.getElementById('t-empty-reset') || document.getElementById('t-empty-reset-btn');
    if (emptyReset) {
      emptyReset.addEventListener('click', resetTestimonialFilters);
    }

    applyTestimonialFilters();
  }

  // --- 11. Journal / Blog Dynamic Filtering & Search Controller ---
  const journalGrid = document.getElementById('blog-articles-grid') || document.getElementById('journal-articles-grid');
  if (journalGrid) {
    const articleCards = Array.from(journalGrid.querySelectorAll('.blog-card, .article-item'));
    const categoryBtns = document.querySelectorAll('.t-cat-btn, .journal-cat-btn');
    const searchInput = document.getElementById('blog-search-input') || document.getElementById('journal-search-input');
    const emptyState = document.getElementById('journal-empty-state');
    const resetBtn = document.getElementById('reset-journal-filter');

    let currentCategory = 'all';
    let searchQuery = '';

    function applyJournalFilters() {
      let visibleCount = 0;

      articleCards.forEach(card => {
        const cat = card.getAttribute('data-category') || 'all';
        const titleEl = card.querySelector('h3, .article-item-title');
        const excerptEl = card.querySelector('p, .article-item-excerpt');
        
        const titleText = titleEl ? titleEl.textContent.toLowerCase() : '';
        const excerptText = excerptEl ? excerptEl.textContent.toLowerCase() : '';
        const cardText = `${titleText} ${excerptText}`;

        const matchCat = (currentCategory === 'all' || cat.toLowerCase() === currentCategory.toLowerCase());
        const matchSearch = (searchQuery === '' || cardText.includes(searchQuery));

        if (matchCat && matchSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category') || 'all';
        applyJournalFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyJournalFilters();
      });
    }

    function resetJournalFilter() {
      currentCategory = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      categoryBtns.forEach(b => b.classList.toggle('active', (b.getAttribute('data-category') || 'all') === 'all'));
      applyJournalFilters();
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetJournalFilter);
    }
  }

  // --- 13. Contact Page Project Enquiry Form Validator ---
  const contactForm = document.getElementById('contact-enquiry-form') || document.getElementById('contact-booking-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs
      const nameInput = contactForm.querySelector('#contact-name') || contactForm.querySelector('input[name="name"]');
      const phoneInput = contactForm.querySelector('#contact-phone') || contactForm.querySelector('input[name="phone"]');
      const emailInput = contactForm.querySelector('#contact-email') || contactForm.querySelector('input[name="email"]');
      const locationInput = contactForm.querySelector('#contact-location') || contactForm.querySelector('input[name="location"]');
      const serviceSelect = contactForm.querySelector('#contact-service') || contactForm.querySelector('select[name="service"]');
      const consentCheckbox = contactForm.querySelector('#contact-consent') || contactForm.querySelector('input[type="checkbox"]');
      const successMsg = document.getElementById('form-success-msg') || document.getElementById('form-feedback');

      function validateField(input, condition, errorSelector) {
        const errorEl = errorSelector ? contactForm.querySelector(errorSelector) : (input ? input.nextElementSibling : null);
        if (!condition) {
          if (input) input.classList.add('is-invalid');
          if (errorEl && errorEl.classList.contains('form-error-msg')) errorEl.style.display = 'block';
          isValid = false;
        } else {
          if (input) input.classList.remove('is-invalid');
          if (errorEl && errorEl.classList.contains('form-error-msg')) errorEl.style.display = 'none';
        }
      }

      // Name validation
      if (nameInput) {
        validateField(nameInput, nameInput.value.trim().length >= 2, '#error-name');
      }

      // Phone validation
      if (phoneInput) {
        const phoneRegex = /^[0-9+\s()-]{7,20}$/;
        validateField(phoneInput, phoneRegex.test(phoneInput.value.trim()), '#error-phone');
      }

      // Email validation (optional but must be valid format if provided)
      if (emailInput && emailInput.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(emailInput, emailRegex.test(emailInput.value.trim()), '#error-email');
      } else if (emailInput) {
        emailInput.classList.remove('is-invalid');
        const emailError = contactForm.querySelector('#error-email');
        if (emailError) emailError.style.display = 'none';
      }

      // Location validation
      if (locationInput) {
        validateField(locationInput, locationInput.value.trim().length >= 2, '#error-location');
      }

      // Service validation
      if (serviceSelect) {
        validateField(serviceSelect, serviceSelect.value !== '' && serviceSelect.value !== 'select', '#error-service');
      }

      // Consent checkbox validation
      if (consentCheckbox) {
        const consentError = contactForm.querySelector('#error-consent');
        if (!consentCheckbox.checked) {
          isValid = false;
          if (consentError) consentError.style.display = 'block';
        } else {
          if (consentError) consentError.style.display = 'none';
        }
      }

      if (isValid) {
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.textContent = 'Thank you. Your project enquiry has been received.';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
      }
    });

    // Realtime error clearing on input
    contactForm.querySelectorAll('.form-input, .form-select, .form-textarea, input[type="checkbox"]').forEach(el => {
      el.addEventListener('input', () => {
        el.classList.remove('is-invalid');
        const err = el.nextElementSibling;
        if (err && err.classList.contains('form-error-msg')) err.style.display = 'none';
      });
      el.addEventListener('change', () => {
        el.classList.remove('is-invalid');
        const err = el.nextElementSibling;
        if (err && err.classList.contains('form-error-msg')) err.style.display = 'none';
      });
    });
  }

});




