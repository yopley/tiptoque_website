/*--------- Additionnal Services Management Functions----------*/

  /* Activate or deactivate service add amongst cart content */
  function serviceActivation() {
    var serviceActive = false;
    if (CartJS.cart.item_count > 0) {
      var currType = $('.product-bloc').attr('data-clear-type');
      $.each(CartJS.cart.items, function (i, item) {
        if(item.product_type === currType) {
          enableServices();
          return serviceActive = true;
        } else if(item.properties.pour == currType) {
          $('#locatedCollections .service-checkbox[data-variant="' + item.id + '"][data-type="' + item.properties.pour + '"]').prop('checked', true);
          $('#locatedCollections .service--icon[data-variant="' + item.id + '"] img').removeClass('greyscale');
        }
      });
    } else {
        disableServices();
    }
    return serviceActive;
  };

  /* Check services already in cart */
  function checkServices() {
    if (CartJS.cart.item_count > 0) {
      var currType = $('.product-bloc').attr('data-clear-type');
      /* Browse all services in cart then check them in collection page if needed (eq service & eq product type) */
      $.each(CartJS.cart.items, function (i, item) {
        if(item.product_type == 'Service') {
          if(item.properties.pour == currType) {
            $('#locatedCollections .service-checkbox[data-variant="' + item.id + '"][data-type="' + item.properties.pour + '"]').prop('checked', true);
            $('#locatedCollections .service--icon[data-variant="' + item.id + '"] img').removeClass('greyscale');
          }
        }
      });
      //console.log('services checkservices executed');
    }
  }

  /* Enable services */
  function enableServices() {
    $('#locatedCollections .container-collection input[name="service"]').prop('disabled',false);
    $('[data-toggle="tooltip"]').tooltip();
    //console.log('SERVICE AVAILABLE');
  }

  /* Disable services */
  function disableServices() {
    $('#locatedCollections .container-collection input[name="service"]').prop('disabled',true).prop('checked', false);
    $('.service--icon img').addClass('greyscale');
    // console.log('SERVICE UNAVAILABLE');
  }

  /* Manage add & remove from cart when collection */
  function serviceToCart(current) {
      var currVariant = $(current).attr('data-variant'),
          currType = $('.product-bloc').attr('data-clear-type'),
          quantity = $('.type_counter[data-type="' + currType + '"]').attr('data-count');
      if(current.checked) {
          CartJS.addItem(currVariant, quantity, {"pour": currType}, {
            "success": function(data, textStatus, jqXHR) {
              //serviceCounter();
              getCartServices();
            },
            "error": function(jqXHR, textStatus, errorThrown) {
             var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
             if(errorThrown === 'Unprocessable Entity') {
                feedback(message);
             }
            }
          });
        $('.service-checkbox-[data-variant="' + currVariant + '"][data-type="' + currType + '"]').prop('checked', true);
        $('.service--icon[data-variant="' + currVariant + '"] img').removeClass('greyscale');
      }else {
        var cartLine = $('.cart-container .service-checkbox-cart[data-variant="' + currVariant + '"][data-type="' + currType + '"]').attr('data-line');
        CartJS.removeItem(cartLine, {
            "success": function(data, textStatus, jqXHR) {
              getCartServices();
            },
            "error": function(jqXHR, textStatus, errorThrown) {
             var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
             if(errorThrown === 'Unprocessable Entity') {
                feedback(message);
             }
            }
          });
        $('.service-checkbox[data-variant="' + currVariant + '"][data-type="' + currType + '"]').prop('checked', false);
        $('.service--icon[data-variant="' + currVariant + '"] img').addClass('greyscale');

      }
      //checkServices();
      // console.log('FORM LISTENER ' + currVariant + currType);
  };

  /* Manage remove from cart when cart */
  function serviceCartRemover(current) {
      var currVariant = $(current).attr('data-variant'),
          currType = $('.product-bloc').attr('data-clear-type'),
          line = $(current).attr('data-line');
        CartJS.removeItem(line, {
            "success": function(data, textStatus, jqXHR) {
              getCartServices();
            },
            "error": function(jqXHR, textStatus, errorThrown) {
             var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
             if(errorThrown === 'Unprocessable Entity') {
                feedback(message);
             }
            }
          });
        $('.service-checkbox[data-variant="' + currVariant + '"][data-type="' + currType + '"]').prop('checked', false);
        $('.service--icon[data-variant="' + currVariant + '"] img').addClass('greyscale');

      //checkServices();
      // console.log('FORM REMOVER ' + currVariant + currType);
  };

  /* Manage add from cart when cart */
  function serviceCartAdder(current) {
      var currVariant = $(current).attr('data-variant'),
          currType = $('.product-bloc').attr('data-clear-type'),
          quantity = $('.type_counter[data-type="' + currType + '"]').attr('data-count');
      if(current.checked) {
          CartJS.addItem(currVariant, quantity, {"pour": currType}, {
            "success": function(data, textStatus, jqXHR) {
              //serviceCounter();
              getCartServices();
            },
            "error": function(jqXHR, textStatus, errorThrown) {
             var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
             if(errorThrown === 'Unprocessable Entity') {
                feedback(message);
             }
            }
          });
        $('.service-checkbox-[data-variant="' + currVariant + '"][data-type="' + currType + '"]').prop('checked', true);
        $('.service--icon[data-variant="' + currVariant + '"] img').removeClass('greyscale');
      }
      // console.log('FORM LISTENER ' + currVariant + currType);
  };

/*--------- Additionnal Services Management Executions----------*/
//checkServices();

  // Cart request complete
  $(document).on('cart.requestComplete', function(event, cart) {
    serviceActivation();
  });

  /* Cart Manager : add & remove from when collection */
  $(document).on('change', '.service-checkbox', function() {
    var current = this;
    serviceToCart(current);
  });

  /* Cart Manager : remove directly from cart */
  $(document).on('change', '.service-checkbox-cart', function() {
    var current = this;
    serviceCartRemover(current);
  });

  /* Cart Manager : add directly from cart */
  $(document).on('change', '.service-checkbox-addtocart', function() {
    var current = this;
    serviceCartAdder(current);
  });

  /* Customer address change */
  /*$('#delivery_place_customer').change(function() {
    serviceActivation();
  });*/

  /* Check services if needed when all collections are zoned */
  $(document).ajaxComplete(function( event, xhr, settings ) {
      if (settings.url.indexOf('/collections') >= 0) {
      /* Check counters and wait for last call executed */
      var chefsCounter = parseInt($('body').attr('data-counter')),
          finalChefsCounter = parseInt($('body').attr('data-chefs-counter'));
      if(chefsCounter === finalChefsCounter) {
          serviceActivation();
          //checkServices();
      }
    }
  });







