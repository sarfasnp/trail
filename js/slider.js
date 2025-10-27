/* ==========================================================
   UNIVERSAL CERTIFICATE SLIDER (Techno Serve + GHI + iss)
   Supports multiple black containers (A/B) with local slides
   and smooth transitions between sections via edge arrows.
   Includes zoom, modal, pan, preload, & accessibility.
   ========================================================== */
(function () {
  /* ====== CONFIG ====== */
  let gallery = [];
  let SECTION_MAP = [];

  const path = window.location.pathname.toLowerCase();

  console.log('🔍 Certificate Slider - Detecting page...', path);

  // === AUTO DETECT PAGE ===
  if (path.includes("ghi")) {
    console.log('✅ GHI page detected');
    // ===== GHI PAGE =====
    gallery = [
      // ===== Container A (2 certificates) =====
      './images/certificate/ghi/group1/GHI approval letter with heat exchanger-04-07-2023-1.jpg',
      './images/certificate/ghi/group1/GHI approval letter with heat exchanger-04-07-2023-2.jpg',

      // ===== Container B (3 certificates) =====
      './images/certificate/ghi/group2/U U2 S -Certificate 24-Nov-2023-1.jpg',
      './images/certificate/ghi/group2/U U2 S -Certificate 24-Nov-2023-2.jpg',
      './images/certificate/ghi/group2/U U2 S -Certificate 24-Nov-2023-3.jpg',

      // ===== Outside (3 certificates) =====
      './images/certificate/ghi/GHI ISO certificate 09-01-2026 (New).jpg',
      './images/certificate/ghi/GHI NB certificate 30214.jpg',
      './images/certificate/ghi/R- Certificate 3777 24-nov-2023.jpg'
    ];

    SECTION_MAP = [
      { name: "A", start: 0, end: 1 },      // Container A: 2 certs
      { name: "B", start: 2, end: 4 },      // Container B: 3 certs
      { name: "outside", start: 5, end: 7 } // Outside: 3 certs
    ];
  }
  else if (path.includes("techno-serve")) {
    console.log('✅ Techno page detected');
    // ===== TECHNO SERVE PAGE =====
    gallery = [
      // ===== Container A (4 certificates) =====
      './images/certificate/tech/API 16A.jpg',
      './images/certificate/tech/API 5CT.jpg',
      './images/certificate/tech/API 6A.jpg',
      './images/certificate/tech/API 7-1.jpg',
      
      // ===== Outside (2 certificates) =====
      './images/certificate/tech/API Q1.jpg',
      './images/certificate/tech/ISO 9001-2015 (TUV).jpg'
    ];

    SECTION_MAP = [
      { name: "A", start: 0, end: 3 },      // Container A: 4 certs
      { name: "outside", start: 4, end: 5 } // Outside: 2 certs
    ];
  }
  else if (path.includes("iss")) {
  console.log('✅ ISS page detected');
  // ===== ISS PAGE =====
  gallery = [
   

    // ===== Container A (14 certificates) =====
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-01.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-02.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-03.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-04.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-05.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-06.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-07.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-08.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-09.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-10.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-11.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-12.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-13.jpg',
    './images/certificate/iss/group2/1.9 CL-SASO + Scope, 16-09-1445 - Latest-14.jpg',

     // ===== Container B (7 certificates) =====
    './images/certificate/iss/group1/1.8 ISO 17025 + Scope, 22-09-2022 - Latest-1.jpg',
    './images/certificate/iss/group1/1.8 ISO 17025 + Scope, 22-09-2022 - Latest-2.jpg',
    './images/certificate/iss/group1/1.8 ISO 17025 + Scope, 22-09-2022 - Latest-3.jpg',
    './images/certificate/iss/group1/1.8 ISO 17025 + Scope, 22-09-2022 - Latest-4.jpg',
    './images/certificate/iss/group1/1.8 ISO 17025 + Scope, 22-09-2022 - Latest-5.jpg',
    './images/certificate/iss/group1/1.8 ISO 17025 + Scope, 22-09-2022 - Latest-6.jpg',
    './images/certificate/iss/group1/1.8 ISO 17025 + Scope, 22-09-2022 - Latest-7.jpg',

    // ===== Outside (5 certificates) =====
    './images/certificate/iss/1.6 SCA Certificate 2021.jpg',
    './images/certificate/iss/1.8 ISO 9001 - 15-02-2024 -.jpg',
    './images/certificate/iss/1.8 ISO 17025 - 22-09-2022 - Latest.jpg',
    './images/certificate/iss/1.10 PME, 11-09-2021 - Latest.jpg',
    './images/certificate/iss/1.11 Monshaat.jpg'
  ];

  SECTION_MAP = [
    { name: "A", start: 0, end: 6 },       // 7 certs
    { name: "B", start: 7, end: 20 },      // 14 certs
    { name: "outside", start: 21, end: 25 } // 5 certs
  ];
}
else if (path.includes("apeco")) {
  console.log('✅ APECO page detected');
  // ===== APECO PAGE =====
  gallery = [
    './images/certificate/apeco/APECO CR.jpg',
    './images/certificate/apeco/APECO VAT Cert.jpg',
    './images/certificate/apeco/ISO APECO.jpg',
    './images/certificate/apeco/Saudi Aramco Approval APECO.jpg'
  ];

  SECTION_MAP = [
    { name: "A", start: 0, end: 3 } // Single dark container (4 certificates)
  ];
}

  else {
    console.warn('⚠️ CSW: Page not recognized. Path:', path);
    return;
  }

  console.log('📦 Gallery loaded:', gallery.length, 'images');

  const AUTOPLAY_MS = 0;
  const EDGE_PROXIMITY_PX = 120;
  const EDGE_VERTICAL_TOLERANCE_PX = 140;
  const EDGE_HIDE_DELAY_MS = 600;

  /* ====== ELEMENTS ====== */
  const preview = document.getElementById('cswPreviewArea');
  const darkCard = document.getElementById('cswDarkCard');
  const certFrame = document.getElementById('cswCertFrame');
  const thumbImg = document.getElementById('cswThumbImage');
  const innerDots = document.getElementById('cswInnerDots');
  const singleView = document.getElementById('cswSingleView');
  const singleImage = document.getElementById('cswSingleImage');
  const navLeft = document.getElementById('cswNavLeft');
  const navRight = document.getElementById('cswNavRight');
  const outerDots = document.getElementById('cswOuterDots');
  const edgeLeft = document.getElementById('cswEdgeLeft');
  const edgeRight = document.getElementById('cswEdgeRight');
  const modal = document.getElementById('cswModal');
  const modalBackdrop = document.getElementById('cswModalBackdrop');
  const modalBody = document.getElementById('cswModalBody');
  const modalImg = document.getElementById('cswModalImg');
  const modalClose = document.getElementById('cswModalClose');
  const zoomInBtn = document.getElementById('cswZoomIn');
  const zoomOutBtn = document.getElementById('cswZoomOut');
  const zoomResetBtn = document.getElementById('cswZoomReset');
  const zoomPct = document.getElementById('cswZoomPct');

  if (!preview || !outerDots || !navLeft || !navRight) {
    console.error('❌ CSW: Required elements missing!');
    console.log('Preview:', preview, 'Dots:', outerDots, 'NavLeft:', navLeft, 'NavRight:', navRight);
    return;
  }

  console.log('✅ All slider elements found');

  /* ====== STATE ====== */
  let idx = 0;
  let autoplayInterval = null;
  let edgeHideTimeout = null;
  let raf = null;
  let previewVisible = false;

  /* ====== HELPERS ====== */
  function getCurrentSection(index) {
    return SECTION_MAP.find(s => index >= s.start && index <= s.end);
  }

  function updateInnerDots(section) {
    if (!innerDots) return;
    innerDots.innerHTML = '';
    const current = getCurrentSection(idx);
    const total = current.end - current.start + 1;
    for (let i = 0; i < total; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.index = i;
      b.addEventListener('click', () => {
        idx = current.start + i;
        updateUI();
      });
      innerDots.appendChild(b);
    }
  }

  /* ====== UI UPDATE ====== */
  function updateUI() {
    const current = getCurrentSection(idx);
    const innerCount = current.end - current.start + 1;

    // Update outer section dots
const currentSectionIndex = SECTION_MAP.findIndex(s => idx >= s.start && idx <= s.end);
Array.from(outerDots.children).forEach((b, i) =>
  b.classList.toggle('is-active', i === currentSectionIndex)
);


    if (current.name !== "outside") {
      if (darkCard) darkCard.style.display = 'flex';
      if (innerDots) {
        innerDots.style.display = 'flex';
        updateInnerDots(current);
        Array.from(innerDots.children).forEach((b, i) =>
          b.classList.toggle('is-active', i === idx - current.start)
        );
      }
      if (singleView) singleView.style.display = 'none';
      if (thumbImg) {
        thumbImg.src = gallery[idx] || '';
        thumbImg.alt = `Certificate ${idx + 1}`;
      }
    } else {
      if (darkCard) darkCard.style.display = 'none';
      if (singleView) singleView.style.display = 'flex';
      if (singleImage) singleImage.src = gallery[idx] || '';
      if (innerDots) innerDots.style.display = 'none';
    }

    schedulePositionEdgeButtons();
  }

  /* ====== NAVIGATION (INSIDE BUTTONS) ====== */
  navLeft.addEventListener('click', () => {
    const current = getCurrentSection(idx);
    if (idx > current.start) {
      // Add slide animation
      if (thumbImg) {
        thumbImg.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
        thumbImg.style.transform = 'translateX(20px)';
        thumbImg.style.opacity = '0';
        
        setTimeout(() => {
          idx--;
          updateUI();
          thumbImg.style.transform = 'translateX(-20px)';
          
          setTimeout(() => {
            thumbImg.style.transform = 'translateX(0)';
            thumbImg.style.opacity = '1';
            
            setTimeout(() => {
              thumbImg.style.transition = '';
            }, 400);
          }, 50);
        }, 200);
      } else {
        idx--;
        updateUI();
      }
    }
  });

  navRight.addEventListener('click', () => {
    const current = getCurrentSection(idx);
    if (idx < current.end) {
      // Add slide animation
      if (thumbImg) {
        thumbImg.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
        thumbImg.style.transform = 'translateX(-20px)';
        thumbImg.style.opacity = '0';
        
        setTimeout(() => {
          idx++;
          updateUI();
          thumbImg.style.transform = 'translateX(20px)';
          
          setTimeout(() => {
            thumbImg.style.transform = 'translateX(0)';
            thumbImg.style.opacity = '1';
            
            setTimeout(() => {
              thumbImg.style.transition = '';
            }, 400);
          }, 50);
        }, 200);
      } else {
        idx++;
        updateUI();
      }
    }
  });

  /* ====== EDGE BUTTONS (SWITCH SECTIONS) ====== */
  function slideToSection(newSection) {
    preview.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';
    preview.style.transform = 'translateX(-30px) scale(0.98)';
    preview.style.opacity = '0.7';
    
    setTimeout(() => {
      idx = newSection.start;
      preview.style.transform = 'translateX(30px) scale(0.98)';
      
      setTimeout(() => {
        preview.style.transform = 'translateX(0) scale(1)';
        preview.style.opacity = '1';
        updateUI();
        
        setTimeout(() => {
          preview.style.transition = '';
        }, 600);
      }, 50);
    }, 300);
  }

  edgeLeft.addEventListener('click', () => {
    const i = SECTION_MAP.findIndex(s => idx >= s.start && idx <= s.end);
    if (i > 0) slideToSection(SECTION_MAP[i - 1]);
  });

  edgeRight.addEventListener('click', () => {
    const i = SECTION_MAP.findIndex(s => idx >= s.start && idx <= s.end);
    if (i < SECTION_MAP.length - 1) slideToSection(SECTION_MAP[i + 1]);
  });

  /* ====== EDGE HOVER VISIBILITY ====== */
  let isInSliderSection = false;

  function positionEdgeButtons() {
    if (!edgeLeft || !edgeRight || !preview) return;
    const rect = preview.getBoundingClientRect();
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    let centerY = rect.top + rect.height / 2;
    const pad = 48;
    if (centerY < pad) centerY = pad;
    if (centerY > viewportHeight - pad) centerY = viewportHeight - pad;
    edgeLeft.style.top = `${centerY}px`;
    edgeRight.style.top = `${centerY}px`;
  }

  function schedulePositionEdgeButtons() {
    if (raf) return;
    raf = requestAnimationFrame(() => { positionEdgeButtons(); raf = null; });
  }

  function checkIfInSliderSection(x, y) {
    // Get the entire slider widget section
    const sliderWidget = document.getElementById('cert-slider-widget');
    if (!sliderWidget) return false;
    
    const rect = sliderWidget.getBoundingClientRect();
    
    // Check if mouse is anywhere inside the entire slider section
    return (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    );
  }

  let lastMouseX = 0, lastMouseY = 0;

  document.addEventListener('mousemove', e => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    
    const x = e.clientX, y = e.clientY;
    
    // Check if mouse is in entire slider widget section
    const inSection = checkIfInSliderSection(x, y);
    
    if (inSection !== isInSliderSection) {
      isInSliderSection = inSection;
      
      // Immediately toggle visibility - no delay
      if (isInSliderSection) {
        document.body.classList.add('csw-edge-visible');
        schedulePositionEdgeButtons();
      } else {
        document.body.classList.remove('csw-edge-visible');
      }
    }
  });

  // Update button positions on scroll and recheck if still in section
  window.addEventListener('scroll', () => {
    schedulePositionEdgeButtons();
    
    // Recheck if mouse is still in section after scroll
    const inSection = checkIfInSliderSection(lastMouseX, lastMouseY);
    if (inSection !== isInSliderSection) {
      isInSliderSection = inSection;
      document.body.classList.toggle('csw-edge-visible', isInSliderSection);
    }
  });

  window.addEventListener('resize', () => {
    schedulePositionEdgeButtons();
    
    // Recheck if mouse is still in section after resize
    const inSection = checkIfInSliderSection(lastMouseX, lastMouseY);
    if (inSection !== isInSliderSection) {
      isInSliderSection = inSection;
      document.body.classList.toggle('csw-edge-visible', isInSliderSection);
    }
  });

  /* ====== MODAL ZOOM / PAN ====== */
  let zoomScale = 1, translateX = 0, translateY = 0;
  const ZOOM_MIN = 0.6, ZOOM_MAX = 3;
  let isPanning = false, panStart = { x: 0, y: 0 }, panStartTranslate = { x: 0, y: 0 };

  function updateZoomDisplay() { 
    if (zoomPct) zoomPct.textContent = `${Math.round(zoomScale * 100)}%`; 
  }
  
  function applyTransform() {
    if (!modalImg) return;
    // Reset all positioning and apply only scale and pan offset
    modalImg.style.position = 'absolute';
    modalImg.style.left = '50%';
    modalImg.style.top = '50%';
    modalImg.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
    modalImg.style.transformOrigin = 'center center';
    updateZoomDisplay();
  }
  
  function setModalZoom(newScale) {
    zoomScale = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, newScale));
    applyTransform();
  }
  
  function resetModalPosition() {
    translateX = 0;
    translateY = 0;
    zoomScale = 1;
  }
  
  function openModalAt(i) {
    if (!modal || !modalImg) return;
    resetModalPosition();
    modalImg.src = gallery[i];
    modal.classList.add('open');
    
    // Apply transform immediately and after load
    applyTransform();
    modalImg.onload = () => {
      applyTransform();
    };
  }
  
  zoomInBtn?.addEventListener('click', () => setModalZoom(zoomScale * 1.25));
  zoomOutBtn?.addEventListener('click', () => setModalZoom(zoomScale * 0.8));
  zoomResetBtn?.addEventListener('click', () => {
    resetModalPosition();
    applyTransform();
  });
  
  modalClose?.addEventListener('click', () => {
    modal.classList.remove('open');
    resetModalPosition();
  });
  
  modalBackdrop?.addEventListener('click', () => {
    modal.classList.remove('open');
    resetModalPosition();
  });
  
  thumbImg?.addEventListener('click', () => openModalAt(idx));
  singleImage?.addEventListener('click', () => openModalAt(idx));

  // Pan functionality
  if (modalBody && modalImg) {
    modalImg.addEventListener('mousedown', e => {
      if (zoomScale > 1) {
        isPanning = true;
        modalImg.classList.add('dragging');
        panStart = { x: e.clientX, y: e.clientY };
        panStartTranslate = { x: translateX, y: translateY };
        e.preventDefault();
      }
    });

    document.addEventListener('mousemove', e => {
      if (isPanning) {
        const dx = e.clientX - panStart.x;
        const dy = e.clientY - panStart.y;
        translateX = panStartTranslate.x + dx;
        translateY = panStartTranslate.y + dy;
        applyTransform();
      }
    });

    document.addEventListener('mouseup', () => {
      if (isPanning) {
        isPanning = false;
        modalImg.classList.remove('dragging');
      }
    });
  }

  /* ====== INIT ====== */
  function preloadAll() {
    console.log('🖼️ Preloading', gallery.length, 'images...');
    return Promise.all(gallery.map(src => new Promise(res => { 
      const i = new Image(); 
      i.onload = () => { console.log('✅ Loaded:', src); res(); };
      i.onerror = () => { console.error('❌ Failed to load:', src); res(); };
      i.src = src; 
    })));
  }
  
function buildOuterDots() {
  outerDots.innerHTML = '';
  SECTION_MAP.forEach((section, i) => {
    const b = document.createElement('button');
    b.addEventListener('click', () => {
      idx = section.start;
      updateUI();
    });
    outerDots.appendChild(b);
  });
  console.log('✅ Built', SECTION_MAP.length, 'section dots');
}

  preloadAll().then(() => {
    console.log('🎉 All images preloaded!');
    buildOuterDots();
    updateUI();
    console.log('🚀 Slider initialized successfully!');
  });
})();
