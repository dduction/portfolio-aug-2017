  //typekit

  (function (d) {
    var config = {
        kitId: 'aws5xnr',
        scriptTimeout: 3000,
        async: true
      },
      h = d.documentElement,
      t = setTimeout(function () {
        h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
      }, config.scriptTimeout),
      tk = d.createElement("script"),
      f = false,
      s = d.getElementsByTagName("script")[0],
      a;
    h.className += " wf-loading";
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
    tk.async = true;
    tk.onload = tk.onreadystatechange = function () {
      a = this.readyState;
      if (f || a && a != "complete" && a != "loaded") return;
      f = true;
      clearTimeout(t);
      try {
        Typekit.load(config)
      } catch (e) {}
    };
    s.parentNode.insertBefore(tk, s)
  })(document);

  var options = {
    speed: 1,
    damping: 0.1,
    overscrollDamping: 0.2,
    thumbMinSize: 20,
    renderByPixels: true,
    alwaysShowTracks: false,
    continuousScrolling: 'auto',
    overscrollEffect: navigator.userAgent.match(/Android/) ? 'glow' : false,
    overscrollEffectColor: '#87ceeb',
  };

  // scrollbar ====================

  var scrollbar = Scrollbar.init(document.body, options);

  function ffScrollTo(e) {
    var scrollbar = Scrollbar.init(document.body, options);
    scrollbar.scrollIntoView(document.querySelector(e.getAttribute("href")));
    setTimeout(function() {
      document.querySelector('nav').classList.remove('header__menu--active');
      [].map.call(document.querySelectorAll('#header__menu--hamburger span'), function (el) {
  
        // classList is the key here - contains functions to manipulate
        // classes on an element
        el.classList.remove('header__menu--open');
      });
    }, 700);
  }

  // parallax initialization ================

  var scene = document.getElementById('hero');
  var parallax = new Parallax(scene);

  // mobile menu =============================

  function mobileMenu() {

    document.querySelector('#header__menu--hamburger').addEventListener('click', function (e) {
      e.preventDefault();

      // querySelectorAll returns all the nodes it finds with the selector
      // however, you can't iterate over querySelectorAll results (!!)
      // so this is a workaround - call Array.map and pass in the 
      // list of nodes along with a function
      // technically querySelectorAll returns a NodeList not an Array so
      /// doesn't have standard array functions
      if (!document.querySelector('nav').classList.contains('header__menu--active')) {
        Scrollbar.destroy();
      } else {
        var scrollbar = Scrollbar.init(document.body, options);
      }

      [].map.call(document.querySelectorAll('nav'), function (el) {

        // classList is the key here - contains functions to manipulate
        // classes on an element
        el.classList.toggle('header__menu--active');
      });

      [].map.call(document.querySelectorAll('#header__menu--hamburger span'), function (el) {

        // classList is the key here - contains functions to manipulate
        // classes on an element
        el.classList.toggle('header__menu--open');
      });

    });
  }
  mobileMenu();