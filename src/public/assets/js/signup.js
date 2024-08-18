$(document).ready(function() {
    $('#district').on('change', function(){
        $('#thana').html('<option value="">Select Thana</option>');
        $('#thana_locator').html('<option value="">Select Thana</option>');
        $.ajax({
            type: "POST",
            url: url + '/getThana',
            data: {district: this.value},
            success: function (data) {
                $.each(data, function (key, entry) {
                    $('#thana').append($('<option></option>').attr('value', entry.thana).text(entry.thana));
                });
            }
        });
    });
    
     $('#district').on('change', function(){
        if($('#district').val() === "") return false;
        
        $('#stores').html('');
        var data = {
            'district': $('#district').val(),
            'thana': 'all',
        }
        $.ajax({
            type: "POST",
            url: url + '/getStore',
            data: data,
            success: function (data) {
                $.each(data, function (key, entry) {
                    var contact = entry.contact.split(',');
                    var phone = '';
                    for(var i = 0; i < contact.length; i++){
                        phone += '<i class="mdi mdi-phone"></i> '+contact[i];
                    }
                    $('#stores').append('<div class="col-sm-4 col-xxl-3"><div class="single-store"><div class="store-info"><h2>'+entry.store_name+'</h2><p class="address">'+entry.address+'</p><p class="contact">'+phone+'</p></div></div></div>');
                });
            }
        });
    });
    
    $('.store-filter [name=thana]').on('change', function(){
        if(this.value === "") return false;
        $('#stores').html('');
        var data = {
            'district': $('#district').val(),
            'thana': this.value,
        }
        $.ajax({
            type: "POST",
            url: url + '/getStore',
            data: data,
            success: function (data) {
                $.each(data, function (key, entry) {
                    var contact = entry.contact.split(',');
                    var phone = '';
                    for(var i = 0; i < contact.length; i++){
                        phone += '<i class="mdi mdi-phone"></i> '+contact[i];
                    }
                    $('#stores').append('<div class="col-sm-4 col-xxl-3"><div class="single-store"><div class="store-info"><h2>'+entry.store_name+'</h2><p class="address">'+entry.address+'</p><p class="contact">'+phone+'</p></div></div></div>');
                });
            }
        });
    });
    
    $('#showAllStores').on('click', function(){
        $('#stores').html('');
        
        $('#thana').val('').prop('selected', true);
        $('#district').val('').prop('selected', true);
        
        $('#thana').select2().trigger('change');
        $('#district').select2().trigger('change');
        
        var data = {
            'district': 'all',
            'thana': 'all',
        }
        $.ajax({
            type: "POST",
            url: url + '/getStore',
            data: data,
            success: function (data) {
                $.each(data, function (key, entry) {
                    var contact = entry.contact.split(',');
                    var phone = '';
                    for(var i = 0; i < contact.length; i++){
                        phone += '<i class="mdi mdi-phone"></i> '+contact[i];
                    }
                    $('#stores').append('<div class="col-sm-4 col-xxl-3"><div class="single-store"><div class="store-info"><h2>'+entry.store_name+'</h2><p class="address">'+entry.address+'</p><p class="contact">'+phone+'</p></div></div></div>');
                });
            }
        });
    });
    
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var check = false;
            return this.optional(element) || regexp.test(value);
        },
        "Please check your input."
    );
    // $( "#signupBtn" ).on('click', function(e){
    //     $.ajax({
    //         type: "POST",
    //         url: url + '/addCustomer',
    //         data: $('#signupForm').serialize(),
    //         success: function () {
    //             $('#signUpModal').modal('hide');
    //             swal("Good job!", "You clicked the button!", "success");
    //         },
    //         error :function ( error, element ) {
    //             console.log(element);
    //             // Add the `invalid-feedback` class to the error element
    //             error.addClass( "invalid-feedback" );
    //             if ( element.prop( "type" ) === "checkbox" ) {
    //                 error.insertAfter( element.next( "label" ) );
    //             } else {
    //                 error.insertAfter( element );
    //             }
    //         }
    //     });
    // });
    $( "#signupForm" ).validate({
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
                email: true
            },
            district: {
                required: true,
            },
            thana: {
                required: true,
            },
            address: {
                required: true,
            },
            agree: {
                required: true
            }
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
                email: "Please enter a valid email address."
            },
            district: {
                required: "Please select your district.",
            },
            thana: {
                required: "Please select your thana.",
            },
            address: {
                required: "Please enter your address.",
            },
            agree: "Please aggree with our terms &amp; condition."
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: url + '/addCustomer',
                data: $(form).serialize(),
                success: function () {
                    $('#signUpModal').modal('hide');
                    swal("Success!", "Thanks for your interest we will contact you soon.", "success");
                    $('#signupForm')[0].reset();
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
});