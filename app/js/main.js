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

// canvas noise effect

  // var canvas = document.getElementById('canvas'),
  //   ctx = canvas.getContext('2d');

  // function resize() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }
  // resize();
  // window.onresize = resize;

  // function noise(ctx) {

  //   var w = ctx.canvas.width,
  //     h = ctx.canvas.height,
  //     idata = ctx.createImageData(w, h),
  //     buffer32 = new Uint32Array(idata.data.buffer),
  //     len = buffer32.length,
  //     i = 0;

  //   for (; i < len;)
  //     buffer32[i++] = ((255 * Math.random()) | 0) << 24;

  //   ctx.putImageData(idata, 0, 0);
  // }

  // var toggle = true;

  // // added toggle to get 30 FPS instead of 60 FPS
  // (function loop() {
  //   toggle = !toggle;
  //   if (toggle) {
  //     requestAnimationFrame(loop);
  //     return;
  //   }
  //   noise(ctx);
  //   requestAnimationFrame(loop);
  // })();

  // hero parallax

  var scene = document.getElementById('hero');
  var parallax = new Parallax(scene);