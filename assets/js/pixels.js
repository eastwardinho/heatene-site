/* HeatENE tracking pixel loader. Inactive until IDs are pasted AND visitor consents.
   Do not invent IDs. */
(function () {
  var CFG = {
    // PASTE IDs HERE (leave empty to keep inactive):
    META_PIXEL_ID: '',           // Meta / Facebook Pixel ID, e.g. '123456789012345'
    GOOGLE_TAG_ID: '',           // Google tag (gtag) ID, e.g. 'G-XXXXXXXX' or 'AW-XXXXXXXX'
    LINKEDIN_PARTNER_ID: ''      // LinkedIn Insight Tag partner ID, e.g. '123456'
  };

  var KEY = 'heatene_cookie_consent'; // values: 'accepted' | 'rejected' | null

  function hasMarketingConsent() {
    try { return localStorage.getItem(KEY) === 'accepted'; } catch (e) { return false; }
  }

  function setConsent(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    var b = document.getElementById('he-cookie');
    if (b) b.setAttribute('hidden', '');
    if (v === 'accepted') loadPixels();
  }

  function loadScript(src, attrs) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    if (attrs) Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
    return s;
  }

  function loadPixels() {
    if (!hasMarketingConsent()) return;

    // --- Meta Pixel (placeholder) ---
    // Paste META_PIXEL_ID above. Until then this block does nothing.
    if (CFG.META_PIXEL_ID) {
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CFG.META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }

    // --- Google tag / gtag.js (placeholder) ---
    // Paste GOOGLE_TAG_ID above. Until then this block does nothing.
    if (CFG.GOOGLE_TAG_ID) {
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CFG.GOOGLE_TAG_ID));
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', CFG.GOOGLE_TAG_ID);
    }

    // --- LinkedIn Insight Tag (placeholder) ---
    // Paste LINKEDIN_PARTNER_ID above. Until then this block does nothing.
    if (CFG.LINKEDIN_PARTNER_ID) {
      window._linkedin_partner_id = CFG.LINKEDIN_PARTNER_ID;
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(CFG.LINKEDIN_PARTNER_ID);
      loadScript('https://snap.licdn.com/li.lms-analytics/insight.min.js');
    }
  }

  function showBanner() {
    if (hasMarketingConsent() || (function () { try { return localStorage.getItem(KEY) === 'rejected'; } catch (e) { return false; } })()) {
      if (hasMarketingConsent()) loadPixels();
      return;
    }
    var el = document.getElementById('he-cookie');
    if (el) el.removeAttribute('hidden');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var a = document.getElementById('he-cookie-accept');
    var r = document.getElementById('he-cookie-reject');
    if (a) a.addEventListener('click', function () { setConsent('accepted'); });
    if (r) r.addEventListener('click', function () { setConsent('rejected'); });
    showBanner();
  });
})();
