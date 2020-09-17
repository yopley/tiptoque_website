/*================ FUNCTIONS ================*/

/* Sticky Header */
function stickyHeader(distance){ 
  var elemH = $('#stickyMenu').height();
  if ($(window).scrollTop() >= distance ) {
    if ($(window).width() > 992) {
      $('#stickyMenu').addClass('navbar-fixed-top');
      $('body').css('margin-top', elemH);
    }    
  } else {
    $('#stickyMenu').removeClass();
    $('body').css('margin-top', '');
  }
}

/* Global management of feedback messages */
function feedback(message) {
  $('#overlay').empty().append('<div id="feedback"><h2 class="text-center neutral">' + message + '</h2></div>');                                   
  $('#overlay').animate({
    opacity: "toggle"
  }, 1000, "linear", function() {
       $(this).delay('3000').animate({
          opacity: "toggle",
       }, 500, "linear");
  }) 
}


/*================ EXECUTIONS ================*/

  /* Manage edit address submit form to open addresses tab in account when it's done */
  if ($('body').hasClass('template-customers/account')) {
      /* Notify that edit address has been submit via cookies */
      $('form.edit-address-form').one('submit', function(e) {
          e.preventDefault();
          Cookies.set('addressesNote', 'edited' , { expires: 0.05 });
          $(this).submit();
      });
    /* Get cookie value, open tab if status is edited, then remove it */
    var currentStatus = Cookies.get('addressesNote');
    if (currentStatus === 'edited') {
      $('a[data-toggle="collapse"]').addClass('collapsed');
      $('.collapse').removeClass('in');      
      $('a[href$="#addresses"]').removeClass('collapsed');
      $('#addresses').addClass('in');
      Cookies.remove('addressesNote');
    }
  }

 /*Hide form feedbacks after delay */
  $('.form-feedback').delay(3500).fadeToggle(1000);

  
  /* Swipe Boostrap Carousels */
    $('.carousel').on('swipeleft', function(event) { 
        $('.carousel').carousel('next');
    }); 
    $('.carousel').on('swiperight', function(event) { 
        $('.carousel').carousel('prev');
    });  
  

  /* Gestion de l'affichage des images blogs & pages */
  $('.page-container .rte img').addClass('img-responsive');
  

  /* Scroll To Top */
  if ($('#topMe').length) {
      var scrollTrigger = 100, // px
          backToTop = function () {
              var scrollTop = $(window).scrollTop();
              if (scrollTop > scrollTrigger) {
                  $('#topMe').addClass('show');
              } else {
                  $('#topMe').removeClass('show');
              }
          };
      backToTop();
      $(window).on('scroll', function () {
          backToTop();
      });
      $('#topMe').on('click', function (e) {
          e.preventDefault();
          $('html,body').animate({
              scrollTop: 0
          }, 700);
      });
  }                                  
                 

  /* Page height management */
  if ($(window).height() > $('body').height()) {
    var wh = $(window).height(),
    	hh = $('header').height(),
        fh = $('footer').height(),
        ch = wh - hh - fh;
    $('.content').css('min-height', ch);
  }
  /* Window Resize Event */
  $(window).resize(function() {
    if ($(window).height() > $('body').height()) {
      var wh = $(window).height(),
          hh = $('header').height(),
          fh = $('footer').height(),
          ch = wh - hh - fh;
      $('.content').css('min-height', ch);
    } else {
      $('.content').css('min-height', '');
    }
  });  
 
  
  /* SCROLL execution */
  $(window).scroll(function() {
    stickyHeader(distance);
  });  


/*================ MOBILE - RESPONSIVE ================*/
$(document).on('click', '#toggleMenu', function() {
  $('.right-menu').toggle();
});

$(document).on('click', '#mobileMenuToggleTrigger', function() {
  $('#collections_nav, #delivery_nav').toggle();
});

/*================ OTHERS ================*/

/*IE 10 Mobil Phone Compatibility*/
// Copyright 2014-2015 Twitter, Inc.
// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle)
}


  /* sTICKY iNIT */
  var distance = $('#stickyMenu').offset().top;
  stickyHeader(distance);


