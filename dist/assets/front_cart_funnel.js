/* Cart Funnel */

/* Step 1 Click */
$(document).on('click', '#cart_funnel #step1 a', function(e) {
  e.preventDefault();
  $('#cart_funnel #step1').hide();
  $('#cart_funnel #step2').fadeIn(500); 
  
  
  /* Go to checkout with right cart attributes */
    /*var date = $('#datepicker').val(),
        hour = $('#delivery_hour').val();
      $('#date-de-livraison').val(date);
      $('#heure-de-livraison').val(hour);*/
});

/* Step 2 Click Yes */
$(document).on('click', '#cart_funnel #step2 #yes_account', function(e) { 
  e.preventDefault();
  $('#cart_funnel #step2').hide();
  $('#cart_funnel #step3_yes').fadeIn(500);  
});

/* Step 3 Click No */
$(document).on('click', '#cart_funnel #step2 #no_account', function() {
  $('#cart_funnel #step2').hide();
  $('#cart_funnel #step3_no').fadeIn(500);  
});

/* Step 3 Create Acount */
$(document).on('click', '#cart_funnel #new_account', function() {
  /* Hide Cart Window */
  $('#cart_display').hide();
  /* Reset Cart steps*/
  $('#cart_funnel #step3_no').hide();
  $('#cart_funnel #step1').show();
  /* Show register window */
  $('#register_display').fadeIn(500);  
});

/* Manage register window close button */
$(document).on('click', '#register_display .close', function() {
  //$('#register_display').fadeOut(500);  
  $('#register_display').hide('slide', { direction: 'right' }, 400);
  $('#overlayCart').fadeOut(400);  
  $('body').css('overflow','');  
});


