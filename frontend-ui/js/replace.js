/*!
 *  replaceme.js - text rotating component in vanilla JavaScript
 *  @version 1.1.0
 *  @author Adrian Klimek
 *  @link https://adrianklimek.github.io/replaceme/
 *  @copyright Addrian Klimek 2016
 *  @license MIT
 */
!(function (a, b) {
  "use strict";
  function c(a, b) {
    for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
    return a;
  }

  function d() {
    "function" == typeof b &&
      b.fn.extend({
        ReplaceMe: function (a) {
          return this.each(function () {
            new e(this, a);
          });
        },
      });
  }

  function e(a, b) {
    var d = {
      animation: "animated fadeIn",
      speed: 2e3,
      separator: ",",
      hoverStop: !1,
      clickChange: !1,
      loopCount: "infinite",
      autoRun: !0,
      onInit: !1,
      onChange: !1,
      onComplete: !1,
    };
    if (
      ("object" == typeof b ? (this.options = c(d, b)) : (this.options = d),
      "undefined" == typeof a)
    )
      throw new Error(
        'ReplaceMe [constructor]: "element" parameter is required'
      );
    if ("object" == typeof a) this.element = a;
    else {
      if ("string" != typeof a)
        throw new Error('ReplaceMe [constructor]: wrong "element" parameter');
      this.element = document.querySelector(a);
    }
    this.init();
  }
  (e.prototype.init = function () {
    "function" == typeof this.options.onInit && this.options.onInit(),
      (this.words = this.escapeHTML(this.element.innerHTML).split(
        this.options.separator
      )),
      (this.count = this.words.length),
      (this.position = this.loopCount = 0),
      (this.running = !1),
      this.bindAll(),
      this.options.autoRun === !0 && this.start();
  }),
    (e.prototype.bindAll = function () {
      this.options.hoverStop === !0 &&
        (this.element.addEventListener("mouseover", this.pause.bind(this)),
        this.element.addEventListener("mouseout", this.start.bind(this))),
        this.options.clickChange === !0 &&
          this.element.addEventListener("click", this.change.bind(this));
    }),
    (e.prototype.changeAnimation = function () {
      this.change(),
        (this.loop = setTimeout(
          this.changeAnimation.bind(this),
          this.options.speed
        ));
    }),
    (e.prototype.start = function () {
      this.running !== !0 &&
        ((this.running = !0),
        this.changeWord(this.words[this.position]),
        this.position++),
        (this.loop = setTimeout(
          this.changeAnimation.bind(this),
          this.options.speed
        ));
    }),
    (e.prototype.change = function () {
      return this.position > this.count - 1 &&
        ((this.position = 0),
        this.loopCount++,
        this.loopCount >= this.options.loopCount)
        ? void this.stop()
        : (this.changeWord(this.words[this.position]),
          this.position++,
          void (
            "function" == typeof this.options.onChange &&
            this.options.onChange()
          ));
    }),
    (e.prototype.stop = function () {
      (this.running = !1),
        (this.position = this.loopCount = 0),
        this.pause(),
        "function" == typeof this.options.onComplete &&
          this.options.onComplete();
    }),
    (e.prototype.pause = function () {
      clearTimeout(this.loop);
    }),
    (e.prototype.changeWord = function (a) {
      this.element.innerHTML =
        '<span class="' +
        this.options.animation +
        '" style="display:inline-block;">' +
        a +
        "</span>";
    }),
    (e.prototype.escapeHTML = function (a) {
      var b = /<\/?\w+\s*[^>]*>/g;
      return b.test(a) === !0 ? a.replace(b, "") : a;
    }),
    (a.ReplaceMe = e),
    d();
})(window, window.jQuery);
