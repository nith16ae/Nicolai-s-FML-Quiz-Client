$(document).ready(() => {

    SDK.Storage.remove("user_id");
    SDK.Storage.remove("username");
    SDK.Storage.remove("type");

    $('.message a').click(function () {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });



    $(".login-btn").click((e) => {
        e.preventDefault();
        const username = $(".usernameInput").val();
        const password = $(".passwordInput").val();

        SDK.User.login(username, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
                return alert("400 - Shit don't work yo!");
            } else if (err) {
                alert("Login credentials incorrect - Please try again or sign up");
                return console.log("Bad stuff happened", err)
            } else {
                window.location.href = "MainPage.html";
            }
        });

    });


    $(".register-btn").click((e) => {
        e.preventDefault();
        const username = $(".signupName").val();
        const password = $(".signupPassword").val();
        const passwordAgain = $(".signupPassword2").val();
        const firstName = $(".signupFirstName").val();
        const lastName = $(".signupLastName").val();
        const type = 1;

        if (passwordAgain !== password) {
            alert("Passwords does not match");
            $(".signupPassword").val("");
            $(".signupPassword2").val("");

        } else {
            alert("Thanks for signing up " + firstName + ". You can now log in. ")

            SDK.User.create(username, password, firstName, lastName, type, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("has-error");
                    return alert("400 - Shit don't work yo!");
                } else if (err) {
                    alert("Something went wrong - Contact your local IT-support!");
                    return console.log("Bad stuff happened", err)
                }

                window.location.href = "LoginPage.html";

            });



        }
    });

});