// ============================================================
// iPediatria & iDoctor — Cookie consent banner
// ============================================================

(function () {
  var CONSENT_KEY = 'ipediatria-cookies-consent';

  function initBanner() {
    if (localStorage.getItem(CONSENT_KEY)) return;

    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    // Slide in after a short delay so it doesn't fight with page load
    setTimeout(function () {
      banner.classList.add('show');
    }, 1200);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'all');
      hideBanner(banner);
    });

    document.getElementById('cookie-reject').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'necessary');
      hideBanner(banner);
    });
  }

  function hideBanner(banner) {
    banner.classList.remove('show');
    banner.classList.add('hide');
    setTimeout(function () {
      banner.remove();
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
  } else {
    initBanner();
  }
})();
