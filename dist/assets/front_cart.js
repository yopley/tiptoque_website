/*================ FUNCTIONS ================*/

/* Retrieve cart via Ajax query */
function getCart () {
      var queryURL = '/cart',
          deliverySummary = $('#deliverySummary').html();
      $.ajax({
             type: 'GET',
             url: queryURL,
             beforeSend: function() {
               //Hiding and Cleaning previous datas
               $('#cartContent').fadeOut(1800).empty();
             },
             success: function(data) {
                console.log('cart query success');
               // Sort and display
               var sortedData = $('<div>').html(data).find('#cartContent');
               $('.cart-container').html(sortedData);
               // Empty then append deliverySummary
               $('#deliverySummary').empty().append(deliverySummary);
             },
              complete: function() {
                showServices();
                if ($('body').hasClass('template-cart')) {
                  deliveryManagement();
                }
              },
           error: function(html) {
             // @console.log('error : ' + html);
           }
          });
      // console.log('fronCart getCart executed');
}

function getCartProducts() {
  if (CartJS.cart.item_count > 1) {
      var queryURL = '/cart';
      $.ajax({
             type: 'GET',
             url: queryURL,
             beforeSend: function() {
               $('#cartContent .waiting-message').removeClass('hide-content');
             },
             success: function(data) {
               // console.log('cart query success');
               // Sort and display
               var sortedData = $('<div>').html(data).find('.items-list'),
                   servicesList = $('<div>').html(data).find('#servicesList'),
                   cartSubTotal = $('<div>').html(data).find('#cartSubTotal'),
                   cartVAT = $('<div>').html(data).find('#cartVAT'),
                   cartTotal = $('<div>').html(data).find('#cartTotal'),
                   cartCounter = $('<div>').html(data).find('#cart_counter'),
                   cartOrderDetails = $('<div>').html(data).find('#cartOrderDetails');
               /*Hiding and Cleaning previous datas before displaying new ones */
               $('#cartContent .items-list').replaceWith(sortedData);
               $('#servicesList').replaceWith(servicesList);
               showServices();
               $('#cartSubTotal').replaceWith(cartSubTotal);
               $('#cartVAT').replaceWith(cartVAT);
               $('#cartTotal').replaceWith(cartTotal);
               $('#cart_counter').replaceWith(cartCounter);
               $('#cartOrderDetails').replaceWith(cartOrderDetails);
                setTimeout(function(){
                  $('#cartContent .waiting-message').addClass('hide-content');
                }, 1000);
             },
              complete: function() {
              },
           error: function(html) {
             console.log('error : ' + html);
           }
          });
      // console.log('fronCart getCartProducts executed');
  } else {
      getCart();
  }
}

function getCartServices() {
      var queryURL = '/cart';
      $.ajax({
             type: 'GET',
             url: queryURL,
             beforeSend: function() {
               //$('#cartContent .waiting-message').removeClass('hide-content');
             },
             success: function(data) {
               // Sort and display
               var sortedData = $('<div>').html(data).find('.items-list'),
                   servicesList = $('<div>').html(data).find('#servicesList'),
                   cartSubTotal = $('<div>').html(data).find('#cartSubTotal'),
                   cartVAT = $('<div>').html(data).find('#cartVAT'),
                   cartTotal = $('<div>').html(data).find('#cartTotal'),
                   cartCounter = $('<div>').html(data).find('#cart_counter'),
                   cartOrderDetails = $('<div>').html(data).find('#cartOrderDetails');
               /*Hiding and Cleaning previous datas before displaying new ones */
               $('#cartContent .items-list').replaceWith(sortedData);
               $('#servicesList').replaceWith(servicesList);
               showServices();
               $('#cartSubTotal').replaceWith(cartSubTotal);
               $('#cartVAT').replaceWith(cartVAT);
               $('#cartTotal').replaceWith(cartTotal);
               $('#cart_counter').replaceWith(cartCounter);
               $('#cartOrderDetails').replaceWith(cartOrderDetails);
             },
              complete: function() {
              },
           error: function(html) {
             console.log('error : ' + html);
           }
          });
      // console.log('fronCart getCartServices executed');
}

function getCartDelivery() {
  if (CartJS.cart.item_count > 0) {
      var queryURL = '/cart';

      $.ajax({
             type: 'GET',
             url: queryURL,
             beforeSend: function() {
             },
             success: function(data) {
               // Get, sort and display

               var sortedData = $('<div>').html(data).find('.items-list'),
                   servicesList = $('<div>').html(data).find('#servicesList'),
                   deliveryItems = $('<div>').html(data).find('#delivery_items'),
                   cartSubTotal = $('<div>').html(data).find('#cartSubTotal'),
                   cartVAT = $('<div>').html(data).find('#cartVAT'),
                   cartTotal = $('<div>').html(data).find('#cartTotal'),
                   cartCounter = $('<div>').html(data).find('#cart_counter'),
                   cartOrderDetails = $('<div>').html(data).find('#cartOrderDetails');
               $('#cartContent .items-list').replaceWith(sortedData);
               $('#servicesList').replaceWith(servicesList);
               $('#delivery_items').replaceWith(deliveryItems);
               showServices();
               $('#cartSubTotal').replaceWith(cartSubTotal);
               $('#cartVAT').replaceWith(cartVAT);
               $('#cartTotal').replaceWith(cartTotal);
               $('#cart_counter').replaceWith(cartCounter);
               $('#cartOrderDetails').replaceWith(cartOrderDetails);               
             },
              complete: function() {               
              },
           error: function(html) {
             console.log('error : ' + html);
           }
          });
  } else {
    getCart();
  }
      // console.log('fronCart getCartDelivery executed');
}


/* Show disabled services in cart */
function showServices() {
  if($('body').hasClass('plateaux_repas') || $('body').hasClass('prestations')) {
    /* Manage unactive services display amongst current handle */
    var current_handle = $('body').attr('data-current-handle');
    $('.service-unactive-block[data-current-block="' + current_handle + '"]').show();
    // console.log('showservicesincart executed');


  }

}

/* Display chief depending of closing days */
function showServiceByDate() {
  // console.log('start showservice by date');
  // var selectedDay = $('#datepicker').val(),
  //     splitDay = selectedDay.split('/'),
  //     $delivery_date = new Date(splitDay.reverse().join(',')),
  //     dwd = $('body').attr('delivery_week_day');
  //fermetures hebdo
  var dwd = $('body').attr('delivery_week_day');


  var selectedDay = $('#datepicker').val();
  var splitDay = selectedDay.split('/').reverse();
  var yyyy = splitDay[0];
  var mm = splitDay[1];
  var d = splitDay[2];
  var h = 0;
  var m = 0;
  var s = 0;
  var $delivery_date = new Date(yyyy, mm - 1 , d, 0, 0, 0, 0);


  $('.container-collection').fadeIn();

  $('#delivery_sources .vendor').each(function() {
    var vendor = $(this).attr('data-vendor');
    var days = $(this).attr('data-fermetures'); // string -> 'lundi,mardi'
    var ferm_exc = $(this).attr('data-ferm-exc');

    // console.log("Pour "+vendor);
    // console.log('toutes les periodes de ferm ex is '+ferm_exc);

    if (ferm_exc != "") {
      var ferm_ex_range = ferm_exc.split(';');


      ferm_ex_range.forEach(function(date_range) {
        // console.log("Pour le range de ferm " + date_range);

        var dates = date_range.split(','); // 15-04-2019,15-04-2019

        var start = dates[0];
        var end = dates[1];

        // console.log("start on "+ start);
        // console.log("end on "+ end);

        var start = start.split('-').reverse(); // 15-04-2019 -> [15,04,2019]
        var yyyy = start[0];
        var mm = start[1];
        var d = start[2];
        var h = 0;
        var m = 0;
        var s = 0;
        start  = new Date(yyyy, mm - 1 , d, 0, 0, 0, 0);

        var end = end.split('-').reverse(); // 15-04-2019 -> [15,04,2019]
        var yyyy = end[0];
        var mm = end[1];
        var d = end[2];
        var h = 0;
        var m = 0;
        var s = 0;
        end  = new Date(yyyy, mm - 1 , d, 0, 0, 0, 0);

        // console.log(start);
        // console.log(end);
        // console.log($delivery_date);


        // var start = new Date(date[0].split("-").reverse().join(','));
        // var end = new Date(date[1].split("-").reverse().join(','));


        if ($delivery_date >= start && $delivery_date <= end) {
          // console.log("lets fade out chef "+ vendor);
          $('.container-collection[data-vendor="' + vendor + '"]').fadeOut();
        }
      })
    }

    if (days.includes(dwd)) {
      $('.container-collection[data-vendor="' + vendor + '"]').fadeOut();
      setTimeout(function() {
        $('.container-collection[data-vendor="' + vendor + '"]').fadeOut();
      }, 100);
      setTimeout(function() {
        $('.container-collection[data-vendor="' + vendor + '"]').fadeOut();
      }, 500);
    }

    // console.log($delivery_date + "______" + vendor + "_________" + days + "==" + dwd);
    // console.log(days.includes(dwd));
  })

   // Check if results are empty, if they are, display a message
  if ($('#locatedCollections .container-collection:visible').length == 0) {
    $('#collections_empty').fadeIn(800);
  } else {
    $('#collections_empty').fadeOut(800);
  }
  // console.log('date checkResults executed');
  // console.log('end showservice by date');

  //fermetures exceptionnelles

}

/* Update services quantities or remove them if needed*/
function serviceCounter () {
  $('body').attr('data-calculation', 'do');
  if (CartJS.cart.item_count > 0) {
    $.each(CartJS.cart.items, function (i, item) {
      if (item.product_type === 'Service' ) {
        var getQuantity = parseInt($('.type_counter[data-type="' + item.properties.pour + '"]').attr('data-count')),
            getLine = i + 1;
        // Check if associated product type exists in cart, if not, remove service from cart
        if (!$('.type_counter[data-type="' + item.properties.pour + '"]').length){
          CartJS.removeItem(getLine,
            {
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
        } else {
          // If associated exists, then calcultae quantity required
          if (item.quantity > getQuantity || item.quantity < getQuantity) {
              CartJS.updateItem(getLine, getQuantity, properties = {},
                {
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
          } else {
            return;
          }
        }
      }
    });
  }
  $('body').attr('data-calculation', 'dont');
  // console.log('fronCart serviceCounter executed');
}

/* Update delivery rates or remove them if needed*/
function getDistance (origin,destination) {
    function calculateDistance(origin, destination) {
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false
      }, callback);
    }

    function callback(response, status) {
      if (status != google.maps.DistanceMatrixStatus.OK) {
        //$('#result').html(err);
      } else {
        var origin = response.originAddresses[0];
        var destination = response.destinationAddresses[0];
        if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
          //alert("Better get on a plane. There are no roads between " + origin + " and " + destination);
        } else {
          var distance = response.rows[0].elements[0].distance;
          var distance_value = distance.value / 1000;
          //var distance_text = distance.text;
          //var miles = distance_text.substring(0, distance_text.length - 3);
          $('body').attr('data-distance',distance_value);

        }
      }
    }
    var distance_text = calculateDistance(origin, destination);
}

/* Calculate appropriate delivery rate and add the right product to cart*/
function deliveryManagement() {
  /* Execute for each product type in cart which are not service or delivery product to apply delivery product for each one */
  $('body').attr('data-calculation', 'do');

  //alert(calculationStatus);

    /* Clean previous delivery product for type already in cart */
    $('#delivery_items .delivery_item').each(function() {
        var toRemoveID = $(this).attr('data-id');
        CartJS.removeItemById(toRemoveID);
    });

  if (CartJS.cart.item_count > 0) {

    $('#cart_counter .type_counter').each(function(i) {
      //alert (i+1);
      /* Initiate vars and get what we already know */
      var type =$(this).attr('data-type'),
          quantity = $(this).attr('data-count'),
          vendor = $(this).attr('data-vendor'),
          destination = $('#delivery_place').val(),
          origin = $('#delivery_sources .vendor[data-vendor="' + vendor + '"]').attr('data-address'),
          distance = '';

      /* Set default delivery origin to prevent undefined case if no origin found for vendor */
      if (origin === undefined || origin === 'undefined') {
       var origin = $('#delivery_sources .default').attr('data-address');
      }

      /* Then calculate distance needed to deliver then retrieve it */
      getDistance (origin,destination);

      /* Wait for distance from Google */
      setTimeout(function(){
        var distance = $('body').attr('data-distance');
        /* Ici vérifier que le produit de livraison avec ce type existe,sinon appliquer le tarif du produit par defaut*/
        if ($('#delivery_rates .delivery_product[data-type="' + type + '"]').length){
          // console.log('TYPE TROUVE');
          $('#delivery_rates .delivery_product[data-type="' + type + '"] .delivery_variant').each(function() {
            var variant_distance_min = parseFloat($(this).attr('data-distance-min')),
                variant_distance_max = parseFloat($(this).attr('data-distance-max')),
                variant_quantity_min = parseFloat($(this).attr('data-quantity-min')),
                variant_quantity_max = parseFloat($(this).attr('data-quantity-max'));
            /* First check distance */
            if(distance >= variant_distance_min && distance <= variant_distance_max) {
              /* Then check quantity */
              if(quantity >= variant_quantity_min && quantity <= variant_quantity_max) {
                var variant_id = $(this).attr('data-id');
                CartJS.addItem(variant_id, 1, properties = {}, {
                    "success": function(data, textStatus, jqXHR) {
                        $('#clientOrderForm .big-submit').show();
                      //console.log($('#cartOrderDetails div').attr('data-vat-rate'));
                    //setTimeout(function(){  console.log($('#cartOrderDetails div').attr('data-vat-price')) }, 1000);
                        getCartDelivery();
                      // console.log('PRODUIT LIVRAISON AJOUTE');
                    },
                    "error": function(jqXHR, textStatus, errorThrown) {
                         var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
                         if(errorThrown === 'Unprocessable Entity') {
                            feedback(message);
                         }
                        //alert('Error: ' + errorThrown + '!');
                    }
                });
                $('body').attr('data-calculation', 'dont');
              }
            }
          });
          } else {
            var variant_id = $('#delivery_rates .default').attr('data-id');
            CartJS.addItem(variant_id, 1, properties = {}, {
                    "success": function(data, textStatus, jqXHR) {
                      $('#clientOrderForm .big-submit').show();
                      getCartDelivery();
                      // console.log('DEFAULT LIVRAISON AJOUTE');
                    },
                    "error": function(jqXHR, textStatus, errorThrown) {
                         var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
                         if(errorThrown === 'Unprocessable Entity') {
                            feedback(message);
                         }
                        //alert('Error: ' + errorThrown + '!');
                    }
            });
        }
      }, 1500);
    });

    // console.log('delivery rate recalculated');
  }

  /* Check if counter type is empty, if it is, display submit cart button anyway */
  function isEmpty(el){
      return !$.trim(el.html())
  }
  if (isEmpty($('#cart_counter'))) {
      $('#clientOrderForm .big-submit').show();
  }

  $('body').attr('data-calculation', 'dont');
}

/* Count items excluding service and delivery items and display count on cart icon */
function itemsCount() {
  var itemsCounter = 0;
  if (CartJS.cart.item_count > 0) {
    $.each(CartJS.cart.items, function (i, item) {
      if(item.product_type !== 'Livraison' && item.product_type !== 'Service') {
        itemsCounter = parseInt(itemsCounter) + item.quantity;
      }
    });
  }
    $('.cart-counter').html(itemsCounter);
}

    /* Retrieve bundle components and populate datas to use them in order form */
    /*function bundleComponents() {
      $('#cartOrderDetails div').each(function(index) {
        var currentSelector = $(this),
            components = $(this).attr('data-components'),
            arrComp = components.split(/\|/);
        if(components !== 'none') {
          $.each(arrComp, function(index, value) {
            $.getJSON('/products/' + value + '.js', function(product) {
              currentSelector.append('<div class="component" data-name="'+ product.title +'" data-sku="'+ product.variants[0].sku +'" data-comp-id="'+ product.variants[0].id +'"></div>');
            });
          });
        }
      });
    }*/

/* Cart Window opening management */
function openCart () {
  //getCart();
  if (!$('body').hasClass('template-cart')) {
    $('#clientOrderForm .big-submit').hide();

    serviceCounter();
    deliveryManagement();
    //setTimeout(function(){
      $('body').css('overflow','hidden');
      $('#cart_display').show('slide', { direction: 'right' }, 400);
      //$('#cart_display').slideToggle();
      $('#overlayCart').fadeIn(400);
  }

  //},200);
}

function closeCart () {
  $('#cart_display').hide('slide', { direction: 'right' }, 400);
  $('#overlayCart').fadeOut(400);
  $('body').css('overflow','');
}

/*================ EXECUTIONS ================*/

  /* Init Cart Window too avoid liquid queries overload and basic calculations for services and delivery pricing */
  if (!$('body').hasClass('template-cart')) {
      setTimeout(getCart,500);
  } else {
      //getCartProducts();
      serviceCounter();
      //setTimeout(deliveryManagement(), 2500);
      setTimeout(deliveryManagement,500);
      //bundleComponents();
  }

$(document).on('cart.ready', function(event, cart) {
  // console.log(cart);
});

$(document).on('cart.requestStarted', function(event, cart) {
});

$(document).on('cart.requestComplete', function(event, cart) {
  	itemsCount();
    if (CartJS.cart.item_count < 1) {getCart();};
});

/* Manage cart window manual opening and closing */
$('#cart_display .close, #overlayCart').click( function(e) {
	e.preventDefault();
	closeCart();
});


$('#globalCartButton, #globalCartButtonMobile').click( function(e) {
	e.preventDefault();
	openCart();
});
