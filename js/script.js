/* scripts.js
   Put this file after jQuery / OwlCarousel / Bootstrap JS includes
*/

console.log('scripts.js loaded'); // quick sanity check

(function () {
  'use strict';

  // -----------------------
  // Dependency checks
  // -----------------------
  function warnIfMissingDeps() {
    if (typeof jQuery === 'undefined') {
      console.error('scripts.js ▶ jQuery is NOT loaded. Include jQuery BEFORE scripts.js');
    }
    if (typeof window.owlCarousel === 'undefined' && !(jQuery && jQuery.fn && jQuery.fn.owlCarousel)) {
      console.warn('scripts.js ▶ OwlCarousel plugin not found. Include owl.carousel.min.js BEFORE scripts.js');
    }
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.collapse === 'undefined') {
      // bootstrap collapse optional; warn only if you rely on it
      console.warn('scripts.js ▶ Bootstrap collapse (show.bs.collapse) NOT found. If you use bootstrap collapse include bootstrap.min.js BEFORE scripts.js');
    }
  }
  warnIfMissingDeps();

  // -----------------------
  // Vanilla JS: submenu (mobile)
  // executed on DOMContentLoaded (does not require jQuery)
  // -----------------------
  document.addEventListener('DOMContentLoaded', function () {
    var MOBILE_Q = window.matchMedia('(max-width: 991px)');

    function onDocClick(e) {
      if (!MOBILE_Q.matches) return; // only on mobile
      if (!e.target) return;
      var parent = e.target.closest && e.target.closest('.ps-parent');
      if (!parent) return;
      var li = parent.closest && parent.closest('.ps-item');
      if (!li) return;

      // prevent navigation unless explicitly allowed
      if (parent.getAttribute('data-nav') !== 'true') {
        e.preventDefault();
      }

      li.classList.toggle('dropdown-holder');
      parent.setAttribute('aria-expanded', li.classList.contains('dropdown-holder') ? 'true' : 'false');
    }

    function cleanupOnDesktop() {
      if (MOBILE_Q.matches) return;
      var open = document.querySelectorAll('.ps-item.dropdown-holder');
      Array.prototype.forEach.call(open, function (li) {
        li.classList.remove('dropdown-holder');
        var p = li.querySelector('.ps-parent');
        if (p) p.setAttribute('aria-expanded', 'false');
      });
    }

    document.addEventListener('click', onDocClick);
    window.addEventListener('resize', function () {
      clearTimeout(window._ps_resize_t);
      window._ps_resize_t = setTimeout(cleanupOnDesktop, 180);
    });

    // init aria attributes
    var parents = document.querySelectorAll('.ps-dropdown .ps-parent');
    Array.prototype.forEach.call(parents, function (p) {
      if (!p.hasAttribute('aria-expanded')) p.setAttribute('aria-expanded', 'false');
    });

    cleanupOnDesktop();
  });


  // -----------------------
  // jQuery parts (owlCarousel + mobile menu behaviours that use jQuery)
  // wrap in a jQuery DOM-ready guard so they run *after* jQuery and plugins loaded
  // -----------------------
  if (typeof jQuery !== 'undefined') {
    (function ($) {
      $(function () {
        // ---------- Companies slider (Owl Carousel) ----------
        try {
          if ($.fn && $.fn.owlCarousel) {
            if ($('.companies-slider').length) {
              $('.companies-slider').owlCarousel({
                items: 3,
                margin: 30,
                loop: true,
                nav: false,
                dots: true,
                dotsContainer: '.companies-dots',
                autoplay: true,
                autoplayTimeout: 5000,
                responsive: {
                  0: { items: 1 },
                  600: { items: 2 },
                  1000: { items: 3 }
                }
              });
              console.log('scripts.js ▶ Owl init done');
            } else {
              console.warn('scripts.js ▶ No .companies-slider element found on page.');
            }
          } else {
            console.warn('scripts.js ▶ $.fn.owlCarousel is not available. Owl Carousel likely not loaded.');
          }
        } catch (err) {
          console.error('scripts.js ▶ Error initializing OwlCarousel:', err);
        }

        // ---------- Mobile-only hamburger + submenu toggle (Bootstrap collapse) ----------
        try {
          var $nav = $('#navbar-collapse-1');
          var MOBILE_Q = window.matchMedia('(max-width: 991px)');

          // When hamburger opens, close all submenus
          if ($nav && $nav.on) {
            $nav.on('show.bs.collapse', function () {
              $nav.find('li.menu-open').removeClass('menu-open');
              $nav.find('.sub-menu, .ps-dropdown, .ps-sub').hide();
            });
          }

          // Delegated click on top-level anchors inside collapsed navbar
          $(document).on('click', '#navbar-collapse-1 li > a', function (e) {
            if (!MOBILE_Q.matches) return; // only on mobile
            var $a = $(this);
            var $li = $a.parent('li');

            // child submenu (any variant)
            var $child = $li.children('.sub-menu, .ps-dropdown, .ps-sub').first();
            if (!$child.length) {
              // no submenu → allow normal navigation
              return;
            }

            // has submenu: toggle
            e.preventDefault();
            e.stopPropagation();

            if ($li.hasClass('menu-open')) {
              $li.removeClass('menu-open');
              $child.stop(true, true).slideUp(180);
            } else {
              $li.siblings('li.menu-open').removeClass('menu-open').children('.sub-menu, .ps-dropdown, .ps-sub').stop(true, true).slideUp(180);
              $li.addClass('menu-open');
              $child.stop(true, true).slideDown(200);
            }
          });

          // Cleanup on desktop
          $(window).on('resize', function () {
            clearTimeout(window._nav_resize_t);
            window._nav_resize_t = setTimeout(function () {
              if (!MOBILE_Q.matches) {
                $nav.find('li.menu-open').removeClass('menu-open');
                $nav.find('.sub-menu, .ps-dropdown, .ps-sub').removeAttr('style').hide();
              }
            }, 120);
          });

          // On DOM ready, defensive collapse
          if (MOBILE_Q.matches) {
            $nav.find('li.menu-open').removeClass('menu-open');
            $nav.find('.sub-menu, .ps-dropdown, .ps-sub').hide();
          }
        } catch (err) {
          console.error('scripts.js ▶ Error in mobile menu code:', err);
        }
      }); // end $(function)
    })(jQuery);
  } // end if jQuery exists

})(); // end IIFE


// ================= YouTube Thumbnail to Video =================
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".vp-youtube-thumbnail").forEach(function(el) {
    el.addEventListener("click", function() {
      const videoId = this.getAttribute("data-video-id");
      const iframe = document.createElement("iframe");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "330"); // match thumbnail height
      iframe.setAttribute("src", "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "true");

      this.innerHTML = ""; 
      this.appendChild(iframe); 
    });
  });
});

//end//

// for the following company (our value based services) //

$(".companies-slider").owlCarousel({
  items: 3,
  margin: 30,
  loop: true,
  nav: false,                   // ❌ no arrows
  dots: true,                   // ✅ keep dots
  dotsContainer: '.companies-dots', // ✅ send dots here
  autoplay: true,
  autoplayTimeout: 5000,
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 3 }
  }
});


// for the APECO section gallery //

document.addEventListener('DOMContentLoaded', function () {
  // Options for outer carousels (Industrial Supply + QA/QC)
  const outerOptions = {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    autoplay: true,
    interval: 2000,   // move every 2 seconds
    pagination: true, // ✅ keep dots only for outer carousels
    arrows: false,    // ✅ no big arrows for outer carousels
    gap: '25px',
    breakpoints: {
      992: { perPage: 2 },
      600: { perPage: 1 }
    }
  };

  // Mount outer carousels
  if (document.querySelector('#productsSplide')) {
    new Splide('#productsSplide', outerOptions).mount();
  }
  if (document.querySelector('#qaQcSplide')) {
    new Splide('#qaQcSplide', outerOptions).mount();
  }

  // Options for inner product sliders (inside each card)
  const innerOptions = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    arrows: true,     // ✅ left/right buttons visible
    pagination: false, // ✅ no dots inside cards
    gap: '0.5rem',
    keyboard: true,
    drag: true,
    height: '160px',
    breakpoints: {
      992: { height: '150px' },
      600: { height: '210px' }
    }
  };

  // Mount all inner sliders (one per product card)
  document.querySelectorAll('.product-splide').forEach(function (el) {
    new Splide(el, innerOptions).mount();
  });
});


//END//

// for the BITS section our partners (bayanat&inf) //

document.addEventListener('DOMContentLoaded', function () {
  const cards = Array.from(document.querySelectorAll('.partner-card'));

  if (!cards.length) return;

  // Ensure cards are focusable (keyboard accessibility)
  cards.forEach(card => {
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
  });

  // Toggle on click/tap (ignore if clicking the CTA link)
  document.addEventListener('click', function (e) {
    const clickedCard = e.target.closest('.partner-card');
    const clickedLink = e.target.closest('.cta-link');

    if (clickedLink) {
      // let link work normally
      return;
    }

    if (clickedCard) {
      // close other cards first
      cards.forEach(c => { if (c !== clickedCard) c.classList.remove('is-open'); });
      // toggle clicked card
      clickedCard.classList.toggle('is-open');
    } else {
      // click outside -> close all
      cards.forEach(c => c.classList.remove('is-open'));
    }
  });

  // Close on Escape when a card is focused
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      cards.forEach(c => c.classList.remove('is-open'));
    }
  });
});
//END//

// google translate //

  function triggerTranslate(lang) {
    var select = document.querySelector("select.goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  }

  document.getElementById("switchEn").addEventListener("click", function(e) {
    e.preventDefault();
    triggerTranslate("en");
  });

  document.getElementById("switchAr").addEventListener("click", function(e) {
    e.preventDefault();
    triggerTranslate("ar");
  });

  // end//
  

  // mobile nav bar //


function toggleMobileNav(btn) {
  btn.classList.toggle('active');
  document.getElementById('mobileNav').classList.toggle('open');
}
function toggleDropdown(el) {
  el.nextElementSibling.classList.toggle('open');
}
function toggleSub(el) {
  el.nextElementSibling.classList.toggle('open');
}



// end //


