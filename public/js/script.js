$("#register-form").on('submit', (function (event) {

    var eForm = $(this);
    if (eForm[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    } else {


        event.preventDefault();
        var request;

        if (request) {
            request.abort();
        }
        var $form = $(this);
        var $inputs = $form.find("input");
        let f_name = $('#f_name').val();
        let l_name = $('#l_name').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        let username = $('#username').val();
        let password = $('#password').val();
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/users",
            type: "POST",
            data: JSON.stringify({
                first_name: f_name,
                last_name: l_name,
                email: email,
                phone: phone,
                username: username,
                password: password,
                role: "admin"
            }),
            contentType: "application/json",
        });

        request.done(function (response, textStatus, jqXHR) {

            $('#error').text("Account Created Successfully!");

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseJSON);
            console.error(
                "The following error occurred: " +
                textStatus, errorThrown
            );
            $('#error').text(jqXHR.responseJSON.message);
            $inputs.prop("disabled", false);

        });

    }
    eForm.addClass('was-validated');
})
);

// $("#login-form").on('submit', (function (event) {

//     var eForm = $(this);
//     if (eForm[0].checkValidity() === false) {
//         event.preventDefault()
//         event.stopPropagation()
//     } else {


//         event.preventDefault();
//         var request;

//         if (request) {
//             request.abort();
//         }
//         var $form = $(this);
//         var $inputs = $form.find("input");
//         let username = $('#username').val();
//         let password = $('#password').val();
//         $inputs.prop("disabled", true);

//         request = $.ajax({
//             url: "/auth/login",
//             type: "POST",
//             data: JSON.stringify({
//                 username: username,
//                 password: password
//             }),
//             contentType: "application/json",
//         });

//         request.done(function (response, textStatus, jqXHR) {
//             if (response.status == "200") {
//                 $('#error').text("Logged In Successfully!");
//             }
//             else {
//                 $('#error').text("There was an error while creating the account! Please try again.");
//                 $inputs.prop("disabled", false);

//             }
//         });

//         request.fail(function (jqXHR, textStatus, errorThrown) {

//             console.error(
//                 "The following error occurred: " +
//                 textStatus, errorThrown
//             );
//             $('#error').text(textStatus + "\r\n" + errorThrown);
//             $inputs.prop("disabled", false);

//         });

//     }
//     eForm.addClass('was-validated');
// })
// );




