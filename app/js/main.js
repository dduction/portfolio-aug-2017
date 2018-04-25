//typekit ====================

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



//function to check whether the device is a phone (EXPERIMENTAL) ====================

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// scrollbar (Disabled due to UX issues) ====================

// var scroll = new Smooth({ native: true, preload: false });
// scroll.init();

//Navigation menu scroll function for mobile devices ====================

function ffScrollTo(e) {
  var t = document.querySelector(e.getAttribute("href")),
    i = t.getBoundingClientRect().top;
  if ((e.getAttribute("href")) == "#") {
    document.querySelector('nav').classList.remove('header__menu--active');
    [].map.call(document.querySelectorAll('#header__menu--hamburger span'), function (el) {

      // classList is the key here - contains functions to manipulate
      // classes on an element
      el.classList.remove('header__menu--open');
    });
  } else {
    t.scrollIntoView({
      behavior: 'smooth'
    });
    document.body.classList.add("y-scroll");
    document.body.classList.remove("hide");
    setTimeout(function () {
      document.querySelector('nav').classList.remove('header__menu--active');
      [].map.call(document.querySelectorAll('#header__menu--hamburger span'), function (el) {

        // classList is the key here - contains functions to manipulate
        // classes on an element
        el.classList.remove('header__menu--open');
      });
    }, 700);
  }
}

// Smooth scrolling to anchor links ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


// parallax initialization ================

var scene = document.querySelector('.parallax');
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
      document.body.classList.remove("y-scroll");
      document.body.classList.add("hide");
    } else {
      document.body.classList.add("y-scroll");
      document.body.classList.remove("hide");
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