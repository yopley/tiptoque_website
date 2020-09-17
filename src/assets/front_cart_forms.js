/*---------- FUNCTIONS ----------*/

/* Retrieve chosen delivery datas and compare to now information */
function deliveryListener() {
    var now = new Date(),
    	selectedDay = $('#datepicker').val(),
        splitDay = selectedDay.split('/'),
        formattedDay = splitDay[2] + '-' + splitDay[1] + '-' + splitDay[0],
        today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
        dayDifference = Math.floor(( Date.parse(formattedDay) - Date.parse(today) ) / 86400000),
        timer = parseInt(now.getHours() + (now.getMinutes()<10?'0':'') + now.getMinutes());
  	//console.log('cart_forms deliveryListener executed');
  	return {dayDifference: dayDifference, timer: timer};
}


/* Managing Time Limitation amongst product types */
function checkTime () {
    // Browse each product form to check type and time limitation for this one
    $('.form-cart').each (function() {
      var currType = $(this).attr('data-type'),
          currForm = $(this);
      // Map types object (view global_delivery_limits section) to compare to current
      jQuery.map(types, function(type) {
        var type;
        if(type.type === currType) {
          var delivery = deliveryListener(),
              dayDiff = delivery.dayDifference,
              now = delivery.timer,
              hourLimit = parseInt(type.hourLimit.replace(':', ''));
          // Check current time and remove one day more to limit if is missing deadline for today
          if(now >= hourLimit) {
            var dayDiff = dayDiff - 1;
          }
          // Check if delay is longer enough
          if (dayDiff < type.dayLimit) {
 			// Store information
            $('body').attr('data-delay', 'delayed');
          } else {
            $('body').attr('data-delay', 'inTime');
          }
        }

      });

    });
  // console.log('cart_forms checkTime executed');
};

/* Managing chefs activation & deactivation */
function checkActiveChef () {
  if(!$('body').hasClass('classic')) {
    var activeChef = false;

      $.each(CartJS.cart.items, function (i, item) {
          var activeSelector = '#locatedCollections .container-collection[data-vendor="' + item.vendor + '"][data-type="' + item.product_type + '"]';
        if($(activeSelector).length > 0) {
            $(activeSelector).removeClass('unactive-chef').addClass('active-chef').find('button').prop('disabled',false);
            $('#locatedCollections .container-collection:not(.active-chef)').removeClass('active-chef').addClass('unactive-chef').find('button:not(.close)').prop('disabled',true);
            $('#locatedCollections .container-collection:not(.active-chef) .no-order-container').html("Nous sommes désolés mais vous avez déjà une commande en cours sur ce type de prestation avec un autre chef.").show();
          return activeChef = true;
        }
      });
      if(!activeChef) {
         $('#locatedCollections .container-collection').removeClass('active-chef').removeClass('unactive-chef').find('button:not(.close, .cart-minus)').prop('disabled',false);
         $('#locatedCollections .no-order-container').hide();
      }
    return activeChef;
  }
};

/* Managing more button display */
function moreButton() {
  $('.more-button-container').empty();
  $('.more-button-template.active').clone().removeClass('more-button-template').addClass('more-button').appendTo('.more-button-container');
  $('.active-chef .more-button-container .more-button').removeClass('hide-content');
}

/* Check if global conditions are ok to add to cart, alert message if not, active form if ok */
function checkStatus () {
  if(!$('body').hasClass('classic')) {
      var deliveryStatus = $('body').attr('data-delivery'),
          deliveryDelay = $('body').attr('data-delay');
      if (deliveryStatus == 'completed') {
        if (deliveryDelay == 'inTime') {
          var activeChef = checkActiveChef();
          if(!activeChef) {
            $('#locatedCollections .form-cart .plus, #locatedCollections .form-cart .minus').prop('disabled', false);
            $('#locatedCollections .no-order-container').hide();
          }
          moreButton();

        } else {
          $('#locatedCollections .form-cart .plus, #locatedCollections .form-cart .minus').prop('disabled', true);
          $('#locatedCollections .no-order-container').html("Nous sommes désolés mais nous ne pouvons vous livrer ce produit dans les délais demandés. Veuillez sélectionner une autre date de livraison.").show();
        }
      } else {
          $('#locatedCollections .form-cart .plus, #locatedCollections .form-cart .minus').prop('disabled', true);
          $('#locatedCollections .no-order-container, #collections_list .no-order-container').html("Afin de pouvoir commander ce plat, veuillez renseigner la date, l'heure et le lieu de livraison souhaités").show();
      }
  }
  //console.log('cart_forms checkStatus executed');
}

/* Get cart then parse to targeted products on page */
function parseQty () {
  /* Clean previous datas */
  var productSelector = $('#locatedCollections .product-bloc, #locatedCollections .buy-container, #locatedCollections .reco-container');
  removedProduct(productSelector);
  /* Get cart then display added*/
    $.each(CartJS.cart.items, function (i, item) {
        var currSelector = $('#locatedCollections *[data-variant="' + item.variant_id + '"]'),
            qtyMinus = item.quantity - 1,
            qty = item.quantity,
            line = i + 1,
            /* Store type to avoid unecessary cart recalcultations */
            addedType = item.product_type;
        addedProduct(currSelector, item, qtyMinus, line, qty, addedType);
    });
  //console.log('cart_forms parseQty executed');
}

/* Item Added Case */
function addedProduct (currSelector, item, qtyMinus,line, qty, addedType) {
  currSelector.addClass('in-cart');
  currSelector.find('.overlay-qty').html(item.quantity);
  currSelector.find('.cart-qty').val(item.quantity).attr('data-quantity', qty);
  currSelector.find('.cart-minus').prop('disabled', false).attr('data-quantity', qtyMinus);
  //console.log('added');
}

/* Item removde Case */
function removedProduct (productSelector) {
  productSelector.removeClass('in-cart');
  productSelector.find('.overlay-qty').empty();
  productSelector.find('.cart-qty').val('0').attr('data-quantity', 0); ;
  productSelector.find('.cart-minus').prop('disabled', true);
}


/* Qty field case */
function updateQty (currProduct,currID,currQuantity,currVendor,baseQuantity) {
    if (baseQuantity > 0) {
      //console.log("yeaa");
      CartJS.updateItemById(currID, currQuantity, properties = {}, {
          "success": function(data, textStatus, jqXHR) {
              getCartProducts();
          },
          "error": function(jqXHR, textStatus, errorThrown) {
             var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
             if(errorThrown === 'Unprocessable Entity') {
                feedback(message);
             }
            //alert('Il y a eu une erreur : ' + errorThrown + '');
          }
      });
      return false;
    } else {
      var productComponents = {};
      var compSelector = '#bundle-modal-lg-' + currProduct + ' .component-infos';
      $(compSelector).each(function( index ) {
        if (index !== 0) {
          var compNameID = '_component_id_' + index,
              compID = $(this).attr('data-id'),
              compNameKey = '_Plat' + index,
              compName = $(this).attr('data-name'),
              compNameSKU = '_component_sku_' + index,
              compSKU = $(this).attr('data-sku');
          productComponents[compNameID] = compID;
          productComponents[compNameSKU] = compSKU;
          productComponents[compNameKey] = compName;
        }
      });
      productComponents['_Chef'] = currVendor;

      CartJS.addItem(currID, currQuantity,productComponents, {
          "success": function(data, textStatus, jqXHR) {
              getCartProducts();
          },
          "error": function(jqXHR, textStatus, errorThrown) {
             var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
             if(errorThrown === 'Unprocessable Entity') {
                feedback(message);
             }
            //alert('Il y a eu une erreur : ' + errorThrown + '');
          }
      });
      return false;
    }
  //console.log('frontCartForms updateQty executed');
}

/* Plus button case */
function updateQtyPus (currProduct,currID,currQuantity,currVendor,baseQuantity) {
      var productComponents = {};
      var compSelector = '#bundle-modal-lg-' + currProduct + ' .component-infos';
      $(compSelector).each(function( index ) {
        if (index !== 0) {
          var compNameID = '_component_id_' + index,
              compID = $(this).attr('data-id'),
              compNameKey = '_Plat' + index,
              compName = $(this).attr('data-name'),
              compNameSKU = '_component_sku_' + index,
              compSKU = $(this).attr('data-sku');
          productComponents[compNameID] = compID;
          productComponents[compNameSKU] = compSKU;
          productComponents[compNameKey] = compName;
        }
      });
      productComponents['_Chef'] = currVendor;

      CartJS.addItem(currID, currQuantity,productComponents,{
        "success": function(data, textStatus, jqXHR) {
          getCartProducts();
        },
        "error": function(jqXHR, textStatus, errorThrown) {
             var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
             if(errorThrown === 'Unprocessable Entity') {
                feedback(message);
             }
            //alert('Error: ' + errorThrown + '!');
        }
    });
      return false;
  //console.log('frontCartForms updateQty executed');
}

/* Less button case */
function updateQtyLess (currID,currQuantity) {
  CartJS.updateItemById(currID, currQuantity, properties = {}, {
      "success": function(data, textStatus, jqXHR) {
        getCartProducts();
       },
       "error": function(jqXHR, textStatus, errorThrown) {
             var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
             if(errorThrown === 'Unprocessable Entity') {
                feedback(message);
             }
        //alert('Il y a eu une erreur : ' + errorThrown + '');
       }
   });
   return false;
  //console.log('frontCartForms updateQty executed');
}

/* Update qties in cart */
function updateCartProduct (line,qty) {
  CartJS.updateItem(line, qty, properties = {}, options = {
    "success": function(data, textStatus, jqXHR) {
      getCartProducts();
      serviceCounter();
      deliveryManagement();
    },
    "error": function(jqXHR, textStatus, errorThrown) {
             var message = "Ce produit ne semble pas être disponible en quantité suffisante pour le moment";
             if(errorThrown === 'Unprocessable Entity') {
                feedback(message);
             }
        //alert('Error: ' + errorThrown + '!');
    }
  })
}


function getAvailableChief(){
  // console.log("Get Available Chef");
  var week_days = [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
  var selectedDay = $('#datepicker').val(); // 15/04/2019
  var splitDay = selectedDay.split('/').reverse(); // [15,04,2019] -> [2019, 04, 15]
  // new Date(2019,04,15,0,0,0,0)
  // console.log(splitDay);
  var yyyy = splitDay[0];
  var mm = splitDay[1];
  var d = splitDay[2];
  var h = 0;
  var m = 0;
  var s = 0;
  // console.log(yyyy);
  // console.log(mm);
  // console.log(d);
  // console.log(h);
  // console.log(m);
  // console.log(s);
  var delivery_week_day = new Date(yyyy, mm - 1 , d, 0, 0, 0, 0).getDay();
  // console.log(delivery_week_day);
  // console.log(week_days[delivery_week_day]);
  //
  //
  // console.log("---->");
  //

  // $('body').attr('delivery_week_day', week_days[$delivery_week_day]);
  var body = document.querySelector("body");
  body.setAttribute("delivery_week_day", week_days[delivery_week_day]);
}



/*---------- EXECUTIONS ----------*/




//Ready doc
$(document).ready(function() {

  	checkTime();
  	checkStatus();
    parseQty();
    // console.log(CartJS.cart.items);
});

// Delivery form submit
$('#delivery_form').submit(function() {
    getAvailableChief();
  	checkTime();
    checkStatus();
    setTimeout(checkActiveChef,1500);
});

// Ajax cart queries performed
$(document).on('cart.requestComplete', function(event, cart) {
   checkStatus();
   parseQty();
});

// Input Qty change listener
$('body').on('change', '#locatedCollections input.cart-qty', function(e){
    e.preventDefault();
    var currProduct=$(this).attr('data-product'),
    	currID=$(this).attr('data-variant'),
        currQuantity=$(this).val(),
        currVendor=$(this).attr('data-vendor'),
        baseQuantity= $(this).attr('data-quantity'),
        modifiedType = $(this).attr('data-clear-type');
    updateQty (currProduct,currID,currQuantity,currVendor,baseQuantity);
});

// Less button listener in collection
$(document).on('click', '#locatedCollections button.minus', function() {
    var currID=$(this).attr('data-variant'),
        currQuantity=$(this).attr('data-quantity');
    updateQtyLess (currID,currQuantity);
});

// Specific case Plus button listener in collections
$(document).on('click', '#locatedCollections button.plus', function() {
    var currProduct=$(this).attr('data-product'),
    	currID=$(this).attr('data-variant'),
        currQuantity=$(this).val(),
        currVendor=$(this).attr('data-vendor'),
        baseQuantity= $(this).attr('data-quantity'),
        modifiedType = $(this).attr('data-clear-type');
    updateQtyPus (currProduct,currID,currQuantity,currVendor,baseQuantity);
});

// Plus or less buttons listener in cart
$(document).on('click', '.qty-container a', function() {
  var line = $(this).attr('data-line'),
      qty = $(this).attr('data-quantity');
  updateCartProduct(line,qty);
  	//setTimeout(deliveryManagement,1500);
});

// Services checkbox Listener
$(document).on('click', '.service-checkbox', function() {
      //setTimeout(getCartServices,1000);
});


$(document).ajaxComplete(function( event, xhr, settings ) {
  //console.log(event);
 	if (settings.url.indexOf('/collections') >= 0) {
    /* Check counters and wait for last call executed */
    var chefsCounter = parseInt($('body').attr('data-counter')),
        finalChefsCounter = parseInt($('body').attr('data-chefs-counter'));
    if(chefsCounter === finalChefsCounter) {
      	checkStatus();
        parseQty();
    }
  }
});

