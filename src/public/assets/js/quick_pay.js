$(document).ready(function(){
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var check = false;
            return this.optional(element) || regexp.test(value);
        },
        "Please check your input."
    );

    $( "#quick-pay" ).validate({
        rules: {
            subscriberId: {
                required: true,
                number: true,
                minlength: 8,
                maxlength: 8,
                remote: {
                    url: url + '/checkSubscription',
                    type: "post",
                    data: {
                        subscriberId: function() {
                            return $( "#subscriberId" ).val();
                        }
                    }
                },
                onkeyup: false
            },
            phone_no: {
                required: true,
                maxlength: 11,
                regex: /^[0]+[1]+[1,3-9]+[0-9]{8}$/
            },
            amount: {
                required: true,
                number: true,
                min: 10
            },

        },
        messages: {
            subscriberId: {
                required: "Please enter your Subscriber Id",
                minlength: "Please enter valid Subscriber Id",
                maxlength: "Please enter valid Subscriber Id",
                number: "Please enter valid Subscriber Id",
                remote: 'Invalid Subscriber ID'
            },
            phone_no: {
                regex: "Invalid Phone Number"  
            },
            amount: {
                number: "Please enter a valid number",
                min: "Insufficient Amount"
            }
        },
        // submitHandler: function (form) {
        //     $.ajax({
        //         type: "POST",
        //         url: url + '/getPaymentUrl',
        //         data: $(form).serialize(),
        //         success: function (response) {
        //             window.open(response);
        //         },
        //         error :function (data) {
        //             var errors = data.responseJSON;
        //             if ($.isEmptyObject(errors) === false) {
        //                 $.each(errors.errors, function (key, value) {
        //                     $('#' + key).closest('.form-control').addClass('is-invalid');
        //                     $('#' + key)
        //                         .closest('.form-group')
        //                         .append('<em class="error invalid-feedback">' + value + '</em>');
        //                 });
        //             }
        //             toastr.error( errors.message , "Error Alert", {timeOut: 3000});
        //         }
        //     });
        //     return false; // required to block normal submit since you used ajax
        // },
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