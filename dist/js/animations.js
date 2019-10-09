'use strict';

$(document).ready(function () {

  var controller = new ScrollMagic.Controller();

  // Базовая анимация появления
  $('.fade-up').each(function () {
    var basicAnimation = new TimelineMax().staggerFromTo($(this), 2, {
      opacity: 0,
      y: '80'
    }, {
      ease: Power4.easeOut,
      opacity: 1,
      y: 0
    }, .2, "+=.2");
    new ScrollMagic.Scene({
      triggerHook: 1,
      triggerElement: this
    }).setTween(basicAnimation)
    // .addIndicators()
    .addTo(controller);
  });
});