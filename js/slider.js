/* slider.js — slider + simple modal with zoom (wheel/dblclick/+/−) and drag-to-pan (pointer).
   Edit the gallery array paths to match your images (URL-encode spaces). */
(function () {
  /* ====== CONFIG ====== */
  const gallery = [
    './images/certificate/tech/API%2016A.jpg',
    './images/certificate/tech/API%205CT.jpg',
    './images/certificate/tech/API%206A.jpg',
    './images/certificate/tech/API%207-1.jpg',
    './images/certificate/tech/API%20Q1.jpg',
    './images/certificate/tech/ISO%209001-2015%20(TUV).jpg'
  ];
  const FIRST_COUNT = 4;
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
    console.warn('CSW: required elements missing — slider not initialized.');
    return;
  }

  /* ====== STATE ====== */
  let idx = 0;
  let autoplayInterval = null;
  let edgeHideTimeout = null;
  let raf = null;
  let previewVisible = false;

  /* ====== DOT BUILDERS ====== */
  function buildInnerDots() {
    if (!innerDots) return;
    innerDots.innerHTML = '';
    const innerCount = Math.min(FIRST_COUNT, gallery.length);
    for (let i = 0; i < innerCount; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.index = String(i);
      b.title = `Show ${i + 1}`;
      b.addEventListener('click', () => goTo(i));
      innerDots.appendChild(b);
    }
  }

  function buildOuterDots() {
    outerDots.innerHTML = '';
    for (let i = 0; i < gallery.length; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.index = String(i);
      b.title = `Jump to ${i + 1}`;
      b.addEventListener('click', () => goTo(i));
      outerDots.appendChild(b);
    }
  }

  /* ====== UI UPDATE ====== */
  function updateUI() {
    const innerCount = Math.min(FIRST_COUNT, gallery.length);
    Array.from(outerDots.children).forEach((b, i) => b.classList.toggle('is-active', i === idx));

    if (idx < innerCount) {
      if (darkCard) darkCard.style.display = 'flex';
      if (innerDots) { innerDots.style.display = 'flex'; innerDots.setAttribute('aria-hidden', 'false'); }
      if (singleView) { singleView.style.display = 'none'; singleView.setAttribute('aria-hidden', 'true'); }

      if (thumbImg) { thumbImg.src = gallery[idx] || ''; thumbImg.alt = `Certificate ${idx + 1}`; }
      if (innerDots) Array.from(innerDots.children).forEach((b, i) => b.classList.toggle('is-active', i === idx));
    } else {
      if (darkCard) { darkCard.style.display = 'none'; darkCard.setAttribute('aria-hidden', 'true'); }
      if (singleView) { singleView.style.display = 'flex'; singleView.setAttribute('aria-hidden', 'false'); }
      if (singleImage) { singleImage.src = gallery[idx] || ''; singleImage.alt = `Certificate ${idx + 1}`; }
      if (innerDots) { innerDots.style.display = 'none'; innerDots.setAttribute('aria-hidden', 'true'); }
    }
    schedulePositionEdgeButtons();
  }

  /* ====== NAV ====== */
  function prev() { idx = (idx - 1 + gallery.length) % gallery.length; updateUI(); }
  function next() { idx = (idx + 1) % gallery.length; updateUI(); }
  function goTo(i) { idx = ((i % gallery.length) + gallery.length) % gallery.length; updateUI(); }

  navLeft.addEventListener('click', () => {
    const innerCount = Math.min(FIRST_COUNT, gallery.length);
    if (idx < innerCount) idx = (idx - 1 + innerCount) % innerCount;
    else {
      const remStart = innerCount, remLen = gallery.length - remStart;
      if (remLen <= 0) idx = (idx - 1 + gallery.length) % gallery.length;
      else { const pos = idx - remStart; idx = remStart + ((pos - 1 + remLen) % remLen); }
    }
    updateUI();
  });

  navRight.addEventListener('click', () => {
    const innerCount = Math.min(FIRST_COUNT, gallery.length);
    if (idx < innerCount) idx = (idx + 1) % innerCount;
    else {
      const remStart = innerCount, remLen = gallery.length - remStart;
      if (remLen <= 0) idx = (idx + 1) % gallery.length;
      else { const pos = idx - remStart; idx = remStart + ((pos + 1) % remLen); }
    }
    updateUI();
  });

  /* ====== EDGE BUTTONS ====== */
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

  function showEdgeButtons() {
    if (!previewVisible) return;
    document.body.classList.add('csw-edge-visible');
    positionEdgeButtons();
  }
  function hideEdgeButtonsImmediate() {
    document.body.classList.remove('csw-edge-visible');
    if (edgeHideTimeout) { clearTimeout(edgeHideTimeout); edgeHideTimeout = null; }
  }
  function scheduleHideEdgeButtons() {
    if (edgeHideTimeout) clearTimeout(edgeHideTimeout);
    edgeHideTimeout = setTimeout(() => { document.body.classList.remove('csw-edge-visible'); edgeHideTimeout = null; }, EDGE_HIDE_DELAY_MS);
  }

  function onDocMouseMove(e) {
    if (!previewVisible) { hideEdgeButtonsImmediate(); return; }
    if (window.innerWidth <= 720) return;
    const x = e.clientX, y = e.clientY;
    const vw = window.innerWidth;
    const rect = preview.getBoundingClientRect();
    const sliderCenterY = rect.top + rect.height / 2;
    const nearLeft = x <= EDGE_PROXIMITY_PX;
    const nearRight = x >= (vw - EDGE_PROXIMITY_PX);
    const verticalOk = Math.abs(y - sliderCenterY) <= EDGE_VERTICAL_TOLERANCE_PX;
    if ((nearLeft || nearRight) && verticalOk) { if (edgeHideTimeout) { clearTimeout(edgeHideTimeout); edgeHideTimeout = null; } showEdgeButtons(); }
    else { scheduleHideEdgeButtons(); }
  }

  preview.addEventListener('mouseenter', () => { if (edgeHideTimeout) { clearTimeout(edgeHideTimeout); edgeHideTimeout = null; } showEdgeButtons(); });
  preview.addEventListener('mouseleave', () => { if (edgeHideTimeout) clearTimeout(edgeHideTimeout); scheduleHideEdgeButtons(); });
  preview.addEventListener('focusin', () => { if (edgeHideTimeout) { clearTimeout(edgeHideTimeout); edgeHideTimeout = null; } showEdgeButtons(); });
  preview.addEventListener('focusout', () => { scheduleHideEdgeButtons(); });

  document.addEventListener('mousemove', onDocMouseMove, { passive: true });
  window.addEventListener('scroll', schedulePositionEdgeButtons, { passive: true });
  window.addEventListener('resize', () => { positionEdgeButtons(); schedulePositionEdgeButtons(); });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      previewVisible = entry.isIntersecting && entry.intersectionRatio > 0.10;
      if (!previewVisible) hideEdgeButtonsImmediate();
      else schedulePositionEdgeButtons();
    });
  }, { threshold: [0, 0.1, 0.5] });
  io.observe(preview);

  if (edgeLeft) edgeLeft.addEventListener('click', (e) => { e.preventDefault(); prev(); });
  if (edgeRight) edgeRight.addEventListener('click', (e) => { e.preventDefault(); next(); });

  /* ====== MODAL: zoom + pan state ====== */
  let zoomScale = 1;
  const ZOOM_MIN = 0.6;
  const ZOOM_MAX = 3;

  // pan state (pixels)
  let translateX = 0;
  let translateY = 0;

  // pointer pan
  let isPanning = false;
  let panStart = { x: 0, y: 0 };
  let panStartTranslate = { x: 0, y: 0 };

  function updateZoomDisplay() {
    if (zoomPct) zoomPct.textContent = `${Math.round(zoomScale * 100)}%`;
  }

  function clampPan() {
    if (!modalBody || !modalImg || !modalImg.naturalWidth || !modalImg.naturalHeight) return;
    const bw = modalBody.clientWidth;
    const bh = modalBody.clientHeight;
    const iw = modalImg.naturalWidth;
    const ih = modalImg.naturalHeight;
    const scaledW = iw * zoomScale;
    const scaledH = ih * zoomScale;

    // max allowed offset from center in each axis
    const maxOffsetX = Math.max(0, (scaledW - bw) / 2);
    const maxOffsetY = Math.max(0, (scaledH - bh) / 2);

    if (translateX > maxOffsetX) translateX = maxOffsetX;
    if (translateX < -maxOffsetX) translateX = -maxOffsetX;
    if (translateY > maxOffsetY) translateY = maxOffsetY;
    if (translateY < -maxOffsetY) translateY = -maxOffsetY;
  }

  function applyTransform() {
    if (!modalImg) return;
    // translate(-50%,-50%) centers; we add pixel offsets for panning
    modalImg.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${zoomScale})`;
    modalImg.style.cursor = (zoomScale > 1.05 && !isPanning) ? 'grab' : (isPanning ? 'grabbing' : (zoomScale > 1.05 ? 'grab' : 'zoom-in'));
    updateZoomDisplay();
  }

  function setModalZoom(newScale, preservePan = true) {
    if (!modalImg) return;
    newScale = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, newScale));
    if (preservePan && zoomScale > 0.001) {
      // preserve pan proportionally (so pan keeps relative spot)
      const ratio = newScale / zoomScale;
      translateX = translateX * ratio;
      translateY = translateY * ratio;
    } else {
      translateX = 0; translateY = 0;
    }
    zoomScale = newScale;
    clampPan();
    applyTransform();
  }

  function resetModalTransform() {
    zoomScale = 1;
    translateX = 0; translateY = 0;
    if (modalImg) modalImg.style.transform = '';
    applyTransform();
  }

  /* ====== open/close modal ====== */
  function openModalAt(i) {
    idx = ((i % gallery.length) + gallery.length) % gallery.length;
    if (modalImg) {
      modalImg.src = gallery[idx] || '';
      modalImg.style.transition = 'transform .18s ease';
      modalImg.style.left = '50%';
      modalImg.style.top = '50%';
      modalImg.style.position = 'absolute';
      // unhide controls if any
      document.querySelectorAll('.csw-modal-controls, .csw-zoom-controls').forEach(el => { el.style.display = 'flex'; el.style.pointerEvents = 'auto'; });
      setModalZoom(1, false);
    }
    if (modal) { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
    stopAutoplay();
    setTimeout(() => { schedulePositionEdgeButtons(); }, 20);
  }

  function closeModal() {
    if (modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
    if (modalImg) {
      modalImg.style.transform = '';
      modalImg.style.cursor = '';
    }
    // reset pan/zoom for next open
    translateX = 0; translateY = 0; zoomScale = 1;
    startAutoplay();
  }

  if (thumbImg) thumbImg.addEventListener('click', () => openModalAt(idx));
  if (singleImage) singleImage.addEventListener('click', () => openModalAt(idx));
  if (thumbImg) thumbImg.addEventListener('keydown', (e) => { if (e.key === 'Enter') openModalAt(idx); });
  if (singleImage) singleImage.addEventListener('keydown', (e) => { if (e.key === 'Enter') openModalAt(idx); });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (modal && modal.classList.contains('open')) {
      if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
    }
  });

  if (modalImg) {
    modalImg.addEventListener('load', () => {
      // when natural size known, clamp pan and apply transform
      clampPan();
      applyTransform();
    });
  }

  /* ====== zoom interactions (wheel/dblclick/buttons) ====== */
  if (modalImg) {
    modalImg.addEventListener('wheel', (e) => {
      if (!modal || !modal.classList.contains('open')) return;
      e.preventDefault();
      const delta = e.deltaY;
      const factor = delta > 0 ? 0.90 : 1.12;
      setModalZoom(zoomScale * factor, true);
    }, { passive: false });

    modalImg.addEventListener('dblclick', (e) => {
      if (!modal || !modal.classList.contains('open')) return;
      if (zoomScale > 1.05) setModalZoom(1, false);
      else setModalZoom(2, false);
    });
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setModalZoom(Math.min(zoomScale * 1.25, ZOOM_MAX), true);
    });
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setModalZoom(Math.max(zoomScale * 0.8, ZOOM_MIN), true);
    });
  }
  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setModalZoom(1, false);
    });
  }

  /* ====== pan interactions (pointer-based, supports mouse & touch) ====== */
  if (modalImg) {
    modalImg.addEventListener('pointerdown', (e) => {
      if (!modal || !modal.classList.contains('open')) return;
      // only begin panning if zoomed > 1 (or allow small pan at 1 if you want)
      if (zoomScale <= 1.05) return;
      isPanning = true;
      modalImg.setPointerCapture && modalImg.setPointerCapture(e.pointerId);
      panStart = { x: e.clientX, y: e.clientY };
      panStartTranslate = { x: translateX, y: translateY };
      modalImg.classList.add('dragging');
      applyTransform();
    });

    modalImg.addEventListener('pointermove', (e) => {
      if (!isPanning) return;
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      translateX = panStartTranslate.x + dx;
      translateY = panStartTranslate.y + dy;
      clampPan();
      applyTransform();
    });

    function endPan(e) {
      if (!isPanning) return;
      isPanning = false;
      modalImg.releasePointerCapture && modalImg.releasePointerCapture(e && e.pointerId);
      modalImg.classList.remove('dragging');
      applyTransform();
    }

    modalImg.addEventListener('pointerup', endPan);
    modalImg.addEventListener('pointercancel', endPan);
  }

  /* ====== AUTOPLAY ====== */
  function startAutoplay() {
    stopAutoplay();
    if (!AUTOPLAY_MS || gallery.length <= 1) return;
    autoplayInterval = setInterval(() => {
      const innerCount = Math.min(FIRST_COUNT, gallery.length);
      if (idx < innerCount - 1) idx = idx + 1;
      else if (idx === innerCount - 1 && gallery.length > innerCount) idx = innerCount;
      else idx = (idx + 1) % gallery.length;
      updateUI();
    }, AUTOPLAY_MS);
  }
  function stopAutoplay() { if (autoplayInterval) { clearInterval(autoplayInterval); autoplayInterval = null; } }

  /* ====== PRELOAD & INIT ====== */
  function preloadAll() {
    return Promise.all(gallery.map(src => new Promise(res => { const i = new Image(); i.onload = i.onerror = res; i.src = src; })));
  }

  (function init() {
    buildInnerDots();
    buildOuterDots();
    preloadAll().then(() => { updateUI(); startAutoplay(); }).catch(() => { updateUI(); startAutoplay(); });
    schedulePositionEdgeButtons();
    window.CSWSlider = { prev, next, open: openModalAt, goTo };
  })();

})();






