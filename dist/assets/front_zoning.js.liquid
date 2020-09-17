/*---------- Retrieve collections related to delivery zone ----------*/

    /* 1 - FUNCTIONS */
	/* Init global ajax calls counters */
    var chefsCounter = 0,
        chefsCall = 0;

	/* init results count*/
    function retrieveChef (thisCollection,thisID) {
      var queryURL = '/collections/' + thisCollection;
      $.ajax({
             type: 'GET',
             url: queryURL,
             beforeSend: function() {
             },
             success: function(data) {
               // Sort and display
               var sortedData = $('<div>').html(data).find('.container-collection'),
                   sortedID = '#' + sortedData.attr('id');
               $('#locatedCollections').append(sortedData);
               if($('body').hasClass('template-index')) {
                 templatingChefMini(sortedID);
               } else if($('body').hasClass('prestations')) {
                 templatingChefClassic(sortedID);
               } else {
                 templatingChef(sortedID);
               }
             },
              complete: function() {
                //Showing results
                $('#locatedCollections').fadeIn(1800);
                console.log('chef retrieved');


                getAvailableChief();
                showServiceByDate();
                setTimeout(function() {checkResults()}, 1810);
              },
           error: function(html) {
             console.log('error : ' + html);
           }
          });
      //console.log('zoning retrieveChefs executed');
    };


    function templatingChef(sortedID) {
        var templatingSummary = $('.summary-template').clone().removeClass('summary-template').addClass('summary').show(),
            templatingBefore = sortedID  + ' .collection-products',
            templatingSelector = sortedID + ' .summary',
            templatingImg = $(sortedID).attr('data-img'),
            templatingTitle = $(sortedID).attr('data-title'),
            templatingDesc = $(sortedID).attr('data-desc'),
            templatingServices = $('.services-template').html(),
            serviceSelector = $(sortedID).find('.modal-body .services-container');
        $(templatingSummary).insertBefore(templatingBefore);
        $(templatingSelector).find('.img-container img').attr('src',templatingImg);
        $(templatingSelector).find('.summary-title').html(templatingTitle);
        $(templatingSelector).find('.summary-desc').html(templatingDesc);
          serviceSelector.html(templatingServices);
          //console.log('zoning templatingChef executed');
    };

    function templatingChefClassic(sortedID) {
        var templatingSummary = $('.summary-template').clone().removeClass('summary-template').addClass('summary').show(),
            templatingBefore = sortedID  + ' .collection-products',
            templatingSelector = sortedID + ' .summary',
            templatingTitle = $(sortedID).attr('data-title'),
            templatingServices = $('.services-template').html(),
            serviceSelector = $(sortedID).find('.modal-body .services-container');
        $(templatingSummary).insertBefore(templatingBefore);
        $(templatingSelector).find('.summary-title').html(templatingTitle);
          serviceSelector.html(templatingServices);
          //console.log('zoning templatingChefClassic executed');
    };

    function templatingChefMini(sortedID) {
      /* Update columns in index template */
      $('.template-index #locatedCollections .collection-products .col-sm-4').removeClass('col-sm-4').addClass('col-sm-3');
      /* Insert chef description */
        var templatingSummary = $('.summary-template').clone().removeClass('summary-template').addClass('summary').show(),
            templatingBefore = sortedID  + ' .collection-products .row .col-sm-3:first-child',
            templatingSelector = sortedID + ' .summary',
            templatingImg = $(sortedID).attr('data-img'),
            templatingTitle = $(sortedID).attr('data-title');
        $(templatingSummary).insertBefore(templatingBefore);
        $(templatingSelector).find('.img-container img').attr('src',templatingImg);
        $(templatingSelector).find('h3').html(templatingTitle);
      //console.log('zoning templatingChefMini executed');
    }

    function getChefs(deliveryZone) {
      var chefsCounter = 0;
      if (deliveryZone) {
        $('#collections_list').fadeOut(800);
        $('.loading').fadeIn(500);
        $('#locatedCollections').fadeOut(200).empty();
          $('#collections_list .container-collection').each (function() {
            var method = $(this).attr('data-zoning'),
            	availableZones = $(this).attr('data-zone'),
                deliveryDept = deliveryZone.substr(0, 2),
                thisStatus = $(this).attr('data-default'),
                thisCollection = $(this).attr('data-handle'),
                thisID = $(this).attr('id');

           /* Management of checking amongst method by dept or by zip code */
            if(method === '2') {
              //alert(availableZones + deliveryDept);
              if (availableZones.indexOf(deliveryDept) > -1) {
                  chefRequest = retrieveChef(thisCollection,thisID);
                  chefsCounter++;
              } else {
                $('#locatedCollections .container-collection[data-handle="' + thisCollection + '"]').remove();
              }
            } else {
              if (availableZones.indexOf(deliveryZone) > -1) {
                  chefRequest = retrieveChef(thisCollection,thisID);
                  chefsCounter++;
              } else {
                $('#locatedCollections .container-collection[data-handle="' + thisCollection + '"]').remove();
              }
            }

          });

          $('.loading').fadeOut(500);
          /* Update ajax calls counter for functions ex*/
          $('body').attr('data-counter', chefsCounter);
          //console.log('zoning getChefs executed');
          /* if no ajax, check results to display empty message if needed*/
          if (chefsCounter === 0) {checkResults();}
        } else {
          $('#locatedCollections').fadeOut(200).empty();
          if($('body').hasClass('template-index') || $('body').hasClass('plateaux_repas') || $('body').hasClass('prestations')) {
            /* Index, plateaux and services case get collections via Ajax because of Liquid limitations */
            $('#collections_list .container-collection.visible').each (function() {
              var thisCollection = $(this).attr('data-handle'),
                  thisID = $(this).attr('id');
              retrieveChef(thisCollection,thisID);
            });
          } else {
            /* If not liquid limited simply display collections container */
            if ($('#collections_list #zone').find('div').length > 0){
              $('#collections_list').fadeIn(800);
            }
          }
        }


        // console.log('getchefs');
    };


    function checkResults() {
      // Check if results are empty, if they are, display a message
      if ((!$.trim( $('#locatedCollections').html()).length && $('#collections_list').is(':hidden')) || $('#locatedCollections .container-collection:visible').length == 0) {
        $('#collections_empty').fadeIn(800);
      } else {
        $('#collections_empty').fadeOut(800);
      }
      // console.log('zoning checkResults executed');
    }

    /* 2 - EXECUTIONS */
    $(document).ready(function() {
      var deliveryZone = $('#postal_code').val();
      getChefs(deliveryZone);


    });

    $('#delivery_form').submit(function(event) {
      event.preventDefault();
      var deliveryZone = $('#postal_code').val();
      getChefs(deliveryZone);

    });


	$('#delivery_place_customer').change(function() {
      var deliveryZone = $('#postal_code').val();
      getChefs(deliveryZone);

    });


    // Ajax queries performed, update counters for collections
    $(document).ajaxComplete(function( event, xhr, settings ) {
      if (settings.url.indexOf('/collections') >= 0) {
        var finalChefsCounter = parseInt($('body').attr('data-counter'));
        chefsCall++;
        if(finalChefsCounter == chefsCall) {
          var finalChefsCounter = $('body').attr('data-chefs-counter', chefsCall);
        }
      }

    });


