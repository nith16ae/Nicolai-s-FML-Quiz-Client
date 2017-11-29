$(document).ready(() => {

    let ClearanceCheck = SDK.Storage.load("type");
    if (ClearanceCheck != 2 && ClearanceCheck != 1 ) {
        alert("Invalid access detected! You are being logged out");
        SDK.User.logOut();
    }

         // SDK.User.loadNav();
        $('.quizzesPageMenu').slideUp(1).slideDown(1000);
        $('.quizzesButtons').hide().show().slideUp(1).delay(200).slideDown(900);

         $('#adminButton').hide();
         $('#userButton').hide();
         $('#deletionBoxQuizzes').hide();


    if (SDK.Storage.load("type") === 2) {
        $('#adminButton').show();
        $('#userButton').show();
        $('#deletionBoxQuizzes').show();
    }

        const $modalTbody = $("#modal-tbody");

    $("#deleteQuiz").click(() => {

        const deletionQuizID = $('#deleteQuizUserInput').val();
        if (confirm('Are you sure you want to delete quiz with ID ' + deletionQuizID + "?")) {
            SDK.Quiz.delete(deletionQuizID, (err) => {

                if (err) {
                    alert("Quiz was not deleted. Error occurred (" + err + ").");
                    $('#deleteQuizUserInput').val("");
                } else {
                    alert("Quiz (ID " + deletionQuizID + ") has been deleted!");
                    $('#deleteQuizUserInput').val("");
                    $("#modal-tbody").find('tr[data-id=' + deletionQuizID +']').remove();
                    }

            });

        }else {
            $('#deleteQuizUserInput').html("");
            alert("The quiz was not deleted.")
        }

    });

        $("#ITFbutton").click((e) => {
            e.preventDefault();
            $modalTbody.html("");
            SDK.Quiz.findITF((err, quizzes) => {
               // let quizzes = (JSON.parse(data));

                quizzes.forEach((quiz) => {
                    $modalTbody.append(`<tr data-id="${quiz.quizId}"><td>${quiz.quizTitle}</td> <td class="courseId">${quiz.courseId}</td> <td>${quiz.quizId}</td><td class="actionCell"><button data-name="${quiz.quizTitle}" data-id="${quiz.quizId}" class="takeQuizButton">Take Quiz</button></td> <tr/>`);
                    $('.courseId').html("IT-Forandringsledelse");

                    $('#modal-tbody tr').hover(
                        function () {
                            $(this).css("background","#304B58").css("color", "#fff9ff");
                        },
                        function () {
                            $(this).css("background","none").css("color", "#000000");
                        }
                    );

                });
                $('.takeQuizButton').click((e) => {
                    let id = e.currentTarget.getAttribute('data-id');
                    let name = e.currentTarget.getAttribute('data-name');
                    SDK.Storage.persist("Quiz ID", id);
                    SDK.Storage.persist("Quiz name", name);
                    SDK.Storage.persist("Quiz course", "IT-Forandringsledelse");

                    window.location.href = "TakeQuiz.html";

                });
            });
        });

        $("#DISbutton").click((e) => {
            e.preventDefault();
            $modalTbody.html("");
            SDK.Quiz.findDIS((err, quizzes) => {
               // let quizzes = (JSON.parse(data));

                quizzes.forEach((quiz) => {
                    $modalTbody.append(`<tr data-id="${quiz.quizId}"><td>${quiz.quizTitle}</td> <td class="courseId">${quiz.courseId}</td> <td id="quizID" class="quizID">${quiz.quizId}</td><td class="actionCell"><button data-name="${quiz.quizTitle}" data-id="${quiz.quizId}" class="takeQuizButton">Take Quiz</button></td> <tr/>`);
                    $('.courseId').html("Distribuerede Systemer");



                    $('#modal-tbody tr').hover(
                        function () {
                            $(this).css("background","#304B58").css("color", "#FFFFFF");
                        },
                        function () {
                            $(this).css("background","none").css("color", "#000000");
                        }
                    );

                });

                $('.takeQuizButton').click((e) => {
                    let id = e.currentTarget.getAttribute('data-id');
                    let name = e.currentTarget.getAttribute('data-name');
                    SDK.Storage.persist("Quiz name", name);
                    SDK.Storage.persist("Quiz ID", id);
                    SDK.Storage.persist("Quiz course", "Distribuerede Systemer");
                    window.location.href = "TakeQuiz.html";
                });




            });
        });

        $("#MAKRObutton").click((e) => {
            e.preventDefault();
            $modalTbody.html("");
            //Output ArrayList fra SDK-metoden og append til table. .
            SDK.Quiz.findMAKRO((err, quizzes) => {
               // let quizzes = (JSON.parse(data));

                quizzes.forEach((quiz) => {
                    $modalTbody.append(`<tr data-id="${quiz.quizId}"><td>${quiz.quizTitle}</td> <td class="courseId">${quiz.courseId}</td> <td>${quiz.quizId}</td><td class="actionCell"><button data-name="${quiz.quizTitle}" data-id="${quiz.quizId}" class="takeQuizButton">Take Quiz</button></td> <tr/>`);
                    $('.courseId').html("Makroøkonomi");

                    $('#modal-tbody tr').hover(
                        function () {
                            $(this).css("background","#304B58").css("color", "#FFFFFF");
                        },
                        function () {
                            $(this).css("background","none").css("color", "#000000");
                        }
                    );

                });

                $('.takeQuizButton').click((e) => {
                    let id = e.currentTarget.getAttribute('data-id');
                    let name = e.currentTarget.getAttribute('data-name');
                    SDK.Storage.persist("Quiz name", name);
                    SDK.Storage.persist("Quiz ID", id);
                    SDK.Storage.persist("Quiz course", "Makroøkonomi");
                    window.location.href = "TakeQuiz.html";
                });
            });
        });

        $("#VOESbutton").click((e) => {
            e.preventDefault();
            $modalTbody.html("");
            SDK.Quiz.findVOES((err, quizzes) => {
              //  let quizzes = (JSON.parse(data));

                quizzes.forEach((quiz) => {
                    $modalTbody.append(`<tr data-id="${quiz.quizId}"><td >${quiz.quizTitle}</td><td class="courseId">${quiz.courseId}</td><td>${quiz.quizId}</td><td class="actionCell"><button data-name="${quiz.quizTitle}" data-id="${quiz.quizId}" class="takeQuizButton">Take Quiz</button></td><tr/>`);
                    $('.courseId').html("VØS 3: Finansiering");

                    $('#modal-tbody tr').hover(
                        function () {
                            $(this).css("background","#304B58").css("color", "#FFFFFF");
                        },
                        function () {
                            $(this).css("background","none").css("color", "#000000");
                        }
                    );


                });

                $('.takeQuizButton').click((e) => {
                    let id = e.currentTarget.getAttribute('data-id');
                    let name = e.currentTarget.getAttribute('data-name');
                    SDK.Storage.persist("Quiz name", name);
                    SDK.Storage.persist("Quiz ID", id);
                    SDK.Storage.persist("Quiz course", "VØS 3: Finansiering");
                    window.location.href = "TakeQuiz.html";
                });
            });
        });
    });