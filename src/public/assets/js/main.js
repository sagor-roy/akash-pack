


(function($) { "use strict";




	// Avoid `console` errors in browsers that lack a console.
	(function() {
	  var method;
	  var noop = function () {};
	  var methods = [
	    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
	    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
	    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
	    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	  ];
	  var length = methods.length;
	  var console = (window.console = window.console || {});

	  while (length--) {
	    method = methods[length];

	    // Only stub undefined methods.
	    if (!console[method]) {
	      console[method] = noop;
	    }
	  }
	}());



/******************************************************************
	
	Hide Loading Box (Preloader)

******************************************************************/	

	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(1200).fadeOut(500);
		}
	}
	
	function handlePagePreloader() {
		if($('.page-preloader').length){
			$('.page-preloader').delay(1200).fadeOut(500);
		}
	}

	handlePagePreloader();


	$(function() {
		var header = $(".start-style");
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= 100) {
				header.removeClass('start-style').addClass("scroll-on");
			} else {
				header.removeClass("scroll-on").addClass('start-style');
			}
		});
	});		
	


/******************************************************************
	
	Store Filtering

******************************************************************/	

	$('.district-wise-filter').select2({
		placeholder: "Select District",
	});

	$('.thana-wise-filter').select2({
		placeholder: "Select Thana",
	});




/******************************************************************
	
	Menu On Hover

******************************************************************/	

		
	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();



	// scroll
  var scrollWindow = function() {
    $(window).scroll(function(){
      var $w = $(this),
          st = $w.scrollTop(),
          navbar = $('.js-site-navbar'),
          sd = $('.js-scroll-wrap'), 
          toggle = $('.site-menu-toggle');

      if ( toggle.hasClass('open') ) {
        $('.site-menu-toggle').trigger('click');
      }
      

      if (st > 150) {
        if ( !navbar.hasClass('scrolled') ) {
          navbar.addClass('scrolled');  
        }
      } 
      if (st < 150) {
        if ( navbar.hasClass('scrolled') ) {
          navbar.removeClass('scrolled sleep');
        }
      } 
      if ( st > 350 ) {
        if ( !navbar.hasClass('awake') ) {
          navbar.addClass('awake'); 
        }
        
        if(sd.length > 0) {
          sd.addClass('sleep');
        }
      }
      if ( st < 350 ) {
        if ( navbar.hasClass('awake') ) {
          navbar.removeClass('awake');
          navbar.addClass('sleep');
        }
        if(sd.length > 0) {
          sd.removeClass('sleep');
        }
      }
    });
  };
  scrollWindow();





/******************************************************************
	
	Parallax Animation

******************************************************************/	

	$('.parallax-bg').parallax({
		position: 'center center',
	});



/******************************************************************
	
	Self Care Slider

******************************************************************/	

	$('.self-care-slider').slick({
		dots: false,
		arrows: true,
		infinite: true,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		speed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<span class="slick-prev slick-arrow  mdi mdi-chevron-left"></span>',
		nextArrow: '<span class="slick-next slick-arrow  mdi mdi-chevron-right"></span>',
		responsive: 
		[
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					arrows: true,
					dots: false,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: false
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					arrows: false,
				}
			}
		]
	});


/******************************************************************
	
	Tutorial Carousel

******************************************************************/	


	$('.tutorial-carousel').slick({
		dots: false,
		arrows: true,
		infinite: true,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		speed: 3000,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<span class="slick-prev slick-arrow  mdi mdi-chevron-left"></span>',
		nextArrow: '<span class="slick-next slick-arrow  mdi mdi-chevron-right"></span>',
		responsive: 
		[
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					arrows: true,
					dots: false,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true
				}
			}
		]
	});

	$('.offer-carousel').slick({
        centerMode: true,
        centerPadding: '0',
		dots: false,
		arrows: true,
		autoplay: false,
		// autoplaySpeed: 2000,
		// speed: 3000,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<span class="slick-prev slick-arrow  mdi mdi-chevron-left"></span>',
		nextArrow: '<span class="slick-next slick-arrow  mdi mdi-chevron-right"></span>',
		responsive: 
		[
			{
				breakpoint: 1024,
				settings: {
					centerMode: true,
					centerPadding: '0',
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '20',
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true
				}
			}
		]
	});


		var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		if (isMobile) {
			$('.why-akash-usp').addClass('why-akash-usp-carousel');
			$('.why-akash-usp-carousel').slick({
				dots: false,
				arrows: true,
				infinite: true,
				slidesToScroll: 1,
				autoplay: false,
				autoplaySpeed: 2000,
				speed: 300,
				slidesToShow: 1,
				slidesToScroll: 1,
				prevArrow: '<span class="slick-prev slick-arrow  mdi mdi-chevron-left"></span>',
				nextArrow: '<span class="slick-next slick-arrow  mdi mdi-chevron-right"></span>',
				responsive: 
				[
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: true,
							dots: false,
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true
						}
					}
				]
			});

			$(".loader p").text("Tap to Launch");


			$(document).on('click', ".preloader", function(){

				$('.loader h2').addClass('animated fadeOut');
				$('.loader p').addClass('animated fadeOut');
				$('.ship').css( 'animation' , 'spaceboots 0.1s infinite step-start' );
				$('.clouds-wrapper').show();

				var tl = new TimelineMax({repeat: 0, repeatDelay: 0});

				tl.from('.cloud', 1, {alpha: 0})
					.to('.rocket-wrapper', 2, { y: -1000, ease:Expo.easeIn, onComplete: function(){ 
						 $("html, body").animate({ scrollTop: 0 }, "slow");
						handlePreloader();
					} })
					.to('.cloud', 2, { attr:{ cy: 185}, ease:Expo.easeOut , onComplete: function(){ $('.clouds-wrapper').addClass(' animated fadeOut ') } }, "-=3")
					.set('.cloud', {clearProps:"all"})
					.set('.rocket-wrapper', { y: 450 })
					.to('.rocket-wrapper', 4, { y:0, ease:Elastic.easeOut.config(0, 0) })
					.to('.trail-wrapper', 2.5, { scaleX:0.5, scaleY:0, alpha:0, ease:Expo.easeOut }, "-=2.0")

			})



		}else {
			// $('.why-akash-usp').removeClass('why-akash-usp-carousel')

			$(document).on('click', ".preloader", function(){

				$('.loader h2').addClass('animated fadeOut');
				$('.loader p').addClass('animated fadeOut');
				$('.ship').css( 'animation' , 'spaceboots 0.1s infinite step-start' );
				$('.clouds-wrapper').show();

				var tl = new TimelineMax({repeat: 0, repeatDelay: 0});

				tl.from('.cloud', 1, {alpha: 0})
					.to('.rocket-wrapper', 2, { y: -1000, ease:Expo.easeIn, onComplete: function(){ 
						 $("html, body").animate({ scrollTop: 0 }, "slow");
						handlePreloader();
					} })
					.to('.cloud', 2, { attr:{ cy: 185}, ease:Expo.easeOut , onComplete: function(){ $('.clouds-wrapper').addClass(' animated fadeOut ') } }, "-=3")
					.set('.cloud', {clearProps:"all"})
					.set('.rocket-wrapper', { y: 450 })
					.to('.rocket-wrapper', 4, { y:0, ease:Elastic.easeOut.config(0, 0) })
					.to('.trail-wrapper', 2.5, { scaleX:0.5, scaleY:0, alpha:0, ease:Expo.easeOut }, "-=2.0")

			})

		}

        $.validator.addMethod(
            "regex",
            function(value, element, regexp) {
                var check = false;
                return this.optional(element) || regexp.test(value);
            },
            "Please check your input."
        );


		$( "#contactForm" ).validate({
		        rules: {
		            name: {
		                required: true,
		                minlength: 2
		            },
		            contact_number: {
		                required: true,
		                maxlength: 11,
		                regex: /^[0]+[1]+[1,3-9]+[0-9]{8}$/
		            },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true
                    },

		        },
		        messages: {
		            name: {
		                required: "Please enter your Name.",
		                minlength: "Your name must consist of at least 5 characters"
		            },
		            contact_number: {
		                required: "Please enter Contact Number.",
		                regex: "Invalid Contact Number"
		            },
		            email: {
		                required: "Please enter your Email.",
		                email: "Please enter a valid email address"
		            },
		            message: {
		                required: "Please enter your Message."
		            }

		        },
		        submitHandler: function (form) {
		            $.ajax({
		                type: "POST",
		                url: url + '/contactEmail',
		                data: $(form).serialize(),
		                beforeSend: function() {
                          $("#sbtn").prop( "disabled", true );
                        },
		                success: function () {
		                    $('#signUpModal').modal('hide');
		                    swal("Success!", "Thank you for your message. We will get back to you shortly.", "success");
		                    $('#contactForm')[0].reset();
		                    grecaptcha.reset();
		                    $("#sbtn").prop( "disabled", false );
		                },
		                error :function (data) {
		                    var errors = data.responseJSON;
		                    if ($.isEmptyObject(errors) === false) {
		                        $.each(errors.errors, function (key, value) {
		                            $('#' + key).closest('.form-control').addClass('is-invalid');
		                            $('#' + key)
		                                .closest('.form-group')
		                                .append('<em class="error invalid-feedback">' + value + '</em>');
		                        });
		                    }
		                    toastr.error( errors.message , "Error Alert", {timeOut: 3000});
		                }
		            });
		            return false; // required to block normal submit since you used ajax
		        },
		        errorElement: "em",
		        errorPlacement: function ( error, element ) {
		            // Add the `invalid-feedback` class to the error element
		            error.addClass( "invalid-feedback" );
		            if ( element.prop( "type" ) === "checkbox" ) {
		                error.insertAfter( element.next( "label" ) );
		            } else {
		                error.insertAfter( element );
		            }
		        },
		        highlight: function ( element, errorClass, validClass ) {
		            $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
		        },
		        unhighlight: function (element, errorClass, validClass) {
		            $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
		        }
		    });

	 new WOW().init();

	 AOS.init();
	
	
 })(jQuery); 