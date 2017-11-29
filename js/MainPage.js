$(document).ready(() => {

    let ClearanceCheck = SDK.Storage.load("type");
    if (ClearanceCheck != 2 && ClearanceCheck != 1 ) {
        alert("Invalid access detected! You are being logged out");
        SDK.User.logOut();
    }

    $('.homeText').slideUp(1).slideDown(1000);

    $('#adminButton').hide();
    $('#userButton').hide();
    SDK.Storage.remove("Counter");

    const username = SDK.Storage.load("username");
    $('#mainpageDisplayUser').html("Welcome, " + username);


    if (SDK.Storage.load("type") === 2) {
        $('#adminButton').show();
        $('#userButton').show();
    }


    $("#courseITF").click((e) => {

        e.preventDefault();

        var quiz = {
            courseId: 2,
            quizTitle: prompt("What is the name of your quiz?")
        };

        SDK.Quiz.create(quiz, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
                return alert("400 - Shit don't work yo!");
            } else if (err) {
                alert("ERROR is " + err);
                return console.log("Bad stuff happened", err)
            } else {
                window.location.href = "AddQuestionsPage.html";

            }
        });

    });

    $("#courseMAKRO").click((e) => {

        e.preventDefault();

        var quiz = {
            courseId: 3,
            quizTitle: prompt("What is the name of your quiz?")
        };

        SDK.Quiz.create(quiz, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
                return alert("400 - Shit don't work yo!");
            } else if (err) {
                alert("ERROR is " + err);
                return console.log("Bad stuff happened", err)
            } else {
                window.location.href = "AddQuestionsPage.html";

                //Skal lagre et quiz ID på den oprettede quiz idet
                // Evt. gennem et 'getQuiz' kald her og så lagre det i local storage
                // SDK.Storage.load()

            }
        });

    });

    $("#courseDIS").click((e) => {

        e.preventDefault();

        var quiz = {
            courseId: 1,
            quizTitle: prompt("What is the name of your quiz?")
        };

        SDK.Quiz.create(quiz, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
                return alert("400 - Shit don't work yo!");
            } else if (err) {
                alert("ERROR is " + err);
                return console.log("Bad stuff happened", err)
            } else {
                window.location.href = "AddQuestionsPage.html";

            }
        });

    });

    $("#courseVOES").click((e) => {

        e.preventDefault();

        var quiz = {
            courseId: 4,
            quizTitle: prompt("What is the name of your quiz?")
        };

        SDK.Quiz.create(quiz, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
                return alert("400 - Shit don't work yo!");
            } else if (err) {
                alert("ERROR is " + err);
                return console.log("Bad stuff happened", err)
            } else {
                window.location.href = "AddQuestionsPage.html";

            }
        });

    });

    $('.logoutButton').click((e) => {
        e.preventDefault();
        SDK.User.logOut();

    });


});