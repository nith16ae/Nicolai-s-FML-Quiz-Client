$(document).ready(() => {

    if(SDK.Storage.load("user_id") == 1) {
        alert("Hold on a minute! You are not supposed to be here!");
        SDK.User.logOut();
    }

    $(".register-btnAdmin").click((e) => {
        e.preventDefault();
        const username = $(".signupNameAdmin").val();
        const password = $(".signupPasswordAdmin").val();
        const passwordAgain = $(".signupPassword2Admin").val();
        const firstName = $(".signupFirstNameAdmin").val();
        const lastName = $(".signupLastNameAdmin").val();
        const type = 2;
2
        if (passwordAgain !== password) {
            alert("Passwords does not match");
            $(".signupPasswordAdmin").val("");
            $(".signupPassword2Admin").val("");

        } else {
            alert("You have created an admin.\n\nUsernamme: " + username + "\nPassword: " + password + "\n\nDon't forget them! You will now" +
                "be directed to the Main page");

            SDK.User.createAdmin(username, password, firstName, lastName, type, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("has-error");
                    return alert("400 - Shit don't work yo!");
                } else if (err) {
                    alert("Something went wrong - Contact your local IT-support!");
                    return console.log("Bad stuff happened", err)
                }

                window.location.href = "MainPage.html";

            });



        }
    });

});