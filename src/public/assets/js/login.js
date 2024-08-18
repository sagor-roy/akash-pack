// login callback
function loginCallback(response) {
    if (response.status === "PARTIALLY_AUTHENTICATED") {
        var code = response.code;
        var csrf = response.state;
        $('#lowerForm').show();
        $('#submit-btn-con').hide();
        $('input#code').val(code);
        // Send code to server to exchange for access token
    }
    else if (response.status === "NOT_AUTHENTICATED") {
        console.log('ok');
        // handle authentication failure
    }
    else if (response.status === "BAD_PARAMS") {
        console.log('ok2');
        // handle bad parameters
    }
}

// phone form submission handler
function smsLogin() {
    var countryCode = '+880';
    var phone_no = $('#contact_no').val();
    AccountKit.login(
        'PHONE',
        {countryCode: countryCode, phoneNumber: phone_no}, // will use default values if not specified
        loginCallback
    );
}


// email form submission handler
function emailLogin() {
    var emailAddress = document.getElementById("email").value;
    AccountKit.login(
        'EMAIL',
        {emailAddress: emailAddress},
        loginCallback
    );
}

//resend button count down

let resendIntervalFlag = null;
function initResendInterval(){
    if(resendIntervalFlag){
        clearInterval(resendIntervalFlag);
    }

    let seconds = 300;
    document.getElementById("resend").disabled = true;
    resendIntervalFlag = setInterval(function() {
        seconds--;

        var minutes = Math.floor(seconds / 60);
        var seconds_left = seconds - minutes * 60;
        var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds_left,'0',2);


        // Display the result in the element with id="demo"
        document.getElementById("resend").innerHTML = "<span class='text-right pull-right'>Resend in " + finalTime + "</span>";

        // If the count down is finished, write some text
        if (seconds < 0) {
            clearInterval(resendIntervalFlag);
            document.getElementById("resend").innerHTML = "Resend";
            document.getElementById("resend").disabled = false;
        }
    }, 1000);
}

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

$(document).ready(function(){

    if(window.location.hash) {
        var hash = window.location.hash.substring(1);
        console.log(hash);
        if(hash==='register'){
            $('#signInModal').modal();
            $("#signInModal .modal-title").text('Please wait');
            $("#loginForm").fadeOut(function(){
                $("#signInModal .modal-title").text('Sign Up');
                $('.signup-submit-btn-text').text('Register');
                $('.terms-checkbox').show();
                $("#signUpFrom").fadeIn();
                $('#f_pass_flag').val(0);
            });
        }
        if(hash==='forget_password'){
            $('#signInModal').modal();
            $("#signInModal .modal-title").text('Please wait');
            $("#loginForm").fadeOut(function(){
                $("#signInModal .modal-title").text('PIN Reset');
                $('.signup-submit-btn-text').text('Save PIN');
                $('.terms-checkbox').hide();
                $("#signUpFrom").fadeIn();
                $('#f_pass_flag').val(1);
            });
        }

    } else {

    }

    $('#signInModal').on('hidden.bs.modal', function () {
        $("#loginBack").trigger("click");
    });

    $("#loginBack").on('click', function(e){
        $("#signUpFrom").hide();
        $("#signInModal .modal-title").text("Sign In");
        $("#loginForm").show();
        $(".dont-know-subid-msg").show();
        // register form
        $('#lowerForm').hide();
        $('#submit-btn-con').show();
        document.getElementById("loginForm").reset();
        document.getElementById("signUpFrom").reset();
    });

    $('#showRegister').on('click', function(e){
        e.preventDefault();
        $("#signInModal .modal-title").text('Please wait');
        $("#loginForm").fadeOut(function(){
            $("#signInModal .modal-title").text('Sign Up');
            $('.signup-submit-btn-text').text('Register');
            $('.terms-checkbox').show();
            $("#signUpFrom").fadeIn();
            $('#f_pass_flag').val(0);
        });
    });

    $('#showForgotPass').on('click', function(e){
        e.preventDefault();
        $("#signInModal .modal-title").text('Please wait');
        $("#loginForm").fadeOut(function(){
            $("#signInModal .modal-title").text('PIN Reset');
            $('.signup-submit-btn-text').text('Save PIN');
            $('.terms-checkbox').hide();
            $("#signUpFrom").fadeIn();
            $('#f_pass_flag').val(1);
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

    $( "#signUpFrom" ).validate({
        rules: {
            subscriber_id: {
                required: true,
                digits: true,
                minlength: 8,
                maxlength: 8
            },
            contact_no: {
                required: true,
                maxlength: 11,
                regex: /^[0]+[1]+[1,3-9]+[0-9]{8}$/
            },
            code: {
                required: true,
                digits: true,
                minlength: 6,
                maxlength: 6
            },
            password: {
                required: true,
                digits: true,
                minlength: 6,
                maxlength: 6
            },
            repassword: {
                equalTo: "#password"
            }
        },
        messages: {
            subscriber_id: {
                required: "Please enter your Subscriber Id",
                minlength: "Please enter valid Subscriber Id",
                maxlength: "Please enter valid Subscriber Id",
                digits: "Please enter numeric value only"
            },
            contact_no: {
                required: "Please enter Phone Number.",
                regex: "Invalid Phone Number"
            },
            code: {
                required: "Please input valid opt",
                digits: "Please enter numeric value only",
                minlength: "OTP needs to be 6 digits",
                maxlength: "OTP needs to be 6 digits"
            },
            password: {
                required: "Please enter your PIN",
                minlength: "PIN needs to be 6 digits",
                digits: "Please enter numeric value only"
            },
            repassword: {
                equalTo: "PIN did not match"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: url + '/set-pass',
                data: $('#signUpFrom').serialize(),
                beforeSend: function() {
                    $("#register").prop("disabled", true);
                },
                success: function (response) {
                    $("#register").prop("disabled", false);
                    if( parseInt($('#f_pass_flag').val()) == 1 )
                        swal("Success!", "Your new PIN is now set", "success");
                    else
                        swal("Success!", "Successfully signed up. Sign In with your credentials!", "success");

                    $("#signUpFrom").hide();
                    $("#signInModal .modal-title").text("Sign In");
                    $("#loginForm").show();
                    $(".dont-know-subid-msg").show();
                    // register form
                    $('#lowerForm').hide();
                    $('#submit-btn-con').show();
                    document.getElementById("loginForm").reset();
                    document.getElementById("signUpFrom").reset();
                },
                error :function (data) {
                    $("#register").prop("disabled",false);
                    var errors = data.responseJSON;
                    if ($.isEmptyObject(errors) === false) {
                        $.each(errors.errors, function (key, value) {
                            $('#' + key).closest('.form-control').addClass('is-invalid');
                            $('#' + key)
                                .closest('.form-group')
                                .find('.invalid-feedback')
                                .hide();
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
            $( element ).addClass( "is-invalid" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).removeClass( "is-invalid" );
        }
    });


    $( "#loginForm" ).validate({
        rules: {
            username: {
                required: true,
                minlength: 8,
                maxlength: 8,
                digits: true
            },
            subPassword: {
                required: true,
                digits: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: "Please enter your Subscriber Id",
                minlength: "Please enter valid Subscriber Id",
                maxlength: "Please enter valid Subscriber Id",
                digits: "Please enter valid Subscriber Id"
            },
            subPassword: {
                required: "Please enter your PIN",
                minlength: "PIN has to be minimum of 6 digits",
                digits: "Please enter valid PIN"
            }
        },
        submitHandler: function (form) {
            $('#lbtn').prop('disabled', true);
            $.ajax({
                type: "POST",
                url: url + '/user-login',
                data: $(form).serialize(),
                success: function (response) {
                    window.location.href = url+'/my-account';
                },
                error :function (data) {
                    $('#lbtn').prop('disabled', false);
                    if(data.status === 429){
                        //rate limited.
                        swal("Warning", "Too many wrong PIN attempts. Check about forget PIN below this form. You can reset your PIN with your RMN.", "info");
                        return;
                    }
                    var errors = data.responseJSON;
                    if ($.isEmptyObject(errors) === false) {
                        console.log(errors.errors);
                        $.each(errors.errors, function (key, value) {
                            $('#' + key).closest('.form-control').addClass('is-invalid');
                            $('#' + key)
                                .closest('.form-group')
                                .find('.invalid-feedback')
                                .hide();
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
            $( element ).addClass( "is-invalid" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).removeClass( "is-invalid" );
        }
    });

    $('#rbtn').on('click', function(){
        var subId = $('#subscriber_id').val();
        var contactNo = $('#contact_no').val();
        var f_pass_flag = $('#f_pass_flag').val();
        var terms_checked = $('#terms_checkbox').is(":checked");
        if( parseInt($('#f_pass_flag').val()) == 0 && !terms_checked){
            swal("Warning", "Please indicate that you have read, understood and agreed to our ‘Subscription Agreement’ and  ‘Refund Policy and Process’", "info");
            return false;
        }
        if( $( "#signUpFrom" ).valid()){
            $('#rbtn').prop('disabled', true);
            $.ajax({
                type: "POST",
                url: url + '/checkSubId',
                data: {sub_id: subId, contact_no: contactNo, f_pass_flag: f_pass_flag},
                success: function (response) {
                    $('#rbtn').prop('disabled', false);
                    $(".dont-know-subid-msg").hide();
                    $('.terms-checkbox').hide();
                    $('#lowerForm').show();
                    $('#submit-btn-con').hide();
                    initResendInterval();
                },
                error :function (data) {
                    $('#rbtn').prop('disabled', false);
                    var errors = data.responseJSON;
                    if ($.isEmptyObject(errors) === false) {
                        $.each(errors.errors, function (key, value) {
                            $('#' + key).closest('.form-control').addClass('is-invalid');
                            $('#' + key)
                                .closest('.form-group')
                                .find('.invalid-feedback')
                                .hide();
                            $('#' + key)
                                .closest('.form-group')
                                .append('<em class="error invalid-feedback">' + value + '</em>');
                        });
                    }
                    toastr.error( errors.message , "Error Alert", {timeOut: 3000});
                }
            });
        }
    });

    $('.package-name-rename').on('click', function(){
        let $form = $(this).closest('form');
        $form.find('.package-name-text').hide();
        $form.find('.package-name-form').show();

    });
    $('.package-name-submit').on('click', function(){
        console.group('package-name-submit');
        $(this).attr('disabled', true);
        let $form = $(this).closest('form');
        $.ajax({
            type: "POST",
            url: url + '/set-package-name',
            data: $form.serialize(),
            success: function (response) {
                console.log(response);
                window.location.reload();
            },
            error :function (data) {
                console.log(data);
            }
        });
        console.groupEnd();
    });

    $('#resend').on('click', function(){
        var subId = $('#subscriber_id').val();
        var contactNo = $('#contact_no').val();
        var f_pass_flag = $('#f_pass_flag').val();
        $.ajax({
            type: "POST",
            url: url + '/checkSubId',
            data: {sub_id: subId, contact_no: contactNo, resend: 1},
            success: function (response) {
                initResendInterval();
            },
            error :function (data) {
                if(data.status === 422){
                    //rate limited.
                    swal("Warning", "Too many OTP attempts for today. You can get up to 5 OTP per day. Please try again tomorrow!", "info");
                }
            }
        });
        console.log("in resend")
    })
});