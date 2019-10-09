'use strict';

$(document).ready(function () {

  // Шапка
  function HeaderScroll() {
    if ($(window).scrollTop() > 20) {
      $('.header').addClass('header--scroll');
    } else {
      $('.header').removeClass('header--scroll');
    }
  }

  $(window).scroll(function () {
    HeaderScroll();
  });

  // Преимущества
  $('.prem').matchHeight();

  $('.hero__slider').slick({
    arrows: false,
    dots: true
  });

  // accordion
  $('.faq').on('click', function () {
    $(this).toggleClass('faq--active');
    $(this).find('.faq__text').slideToggle();
  });

  // Modal video
  $('.modal-video').magnificPopup({
    type: 'iframe'
  });

  // Generic modal
  setTimeout(function () {
    $('.modal-open').magnificPopup({
      type: 'inline',
      removalDelay: 500,
      mainClass: 'mfp-fade'
    });
  }, 1000);

  // sidebar anchors
  $('.sidebar__link--anchor').on('click', function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    $('body, html').animate({ scrollTop: top - 80 }, 800);
    $('.sidebar__link--anchor').removeClass('sidebar__link--active');
    $(this).addClass('sidebar__link--active');
  });

  // sidebar mobile
  $('.sidebar__mobile').on('click', function () {
    $(this).toggleClass('sidebar__mobile--active');
    $('.sidebar__list').slideToggle();
  });

  // burger
  $('.burger').on('click', function () {
    $(this).toggleClass('burger--active');
    // $('.mobile-menu').toggleClass('mobile-menu--active');
    $('.mobile-menu').slideToggle();
  });

  $('.product-tabs__item').on('click', function () {
    // var _this = $(this);
    var index = $(this).index();
    $('.product-tabs__item').removeClass('product-tabs__item--active');
    $(this).addClass('product-tabs__item--active');
    $('.product-tabs__img').removeClass('product-tabs__img--active');
    $('.product-tabs__img').eq(index).addClass('product-tabs__img--active');
  });

  // form sweetalert
  $('#support-send').on('click', function (e) {
    e.preventDefault();

    var formValues = $("#support-form").serializeArray();

    if ($('#form-support-checkbox').prop('checked')) {

      $('#form-error-checkbox').removeClass('form-error--active');
      for (var i = 0; i < formValues.length; i++) {
        if (formValues[i].value.length) {
          $('#form-error-fields').removeClass('form-error--active');
          $.post("http://belogex.herokuapp.com/", formValues).done(function (data) {
            Swal.fire('Good job!', 'You clicked the button!', 'success');
          });
        } else {
          $('#form-error-fields').addClass('form-error--active');
        }
      }
    } else {
      $('#form-error-checkbox').addClass('form-error--active');
    }
  });

  // SVG magic
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');
      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }
      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');
      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });
});