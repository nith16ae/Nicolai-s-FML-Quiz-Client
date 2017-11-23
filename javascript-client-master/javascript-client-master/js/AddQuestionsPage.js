$(document).ready(() => {

    let title = SDK.Storage.load("quiz title");
    $('#createQuizTitle').text(title);


    $('#howItWorks').hide();
    //let questionCounter = 0;

    if (SDK.Storage.load("quiz courseID") === 1) {
        $('#createQuizCourse').text("Distribuerede Systemer");
    } else if (SDK.Storage.load("quiz courseID") === 2) {
        $('#createQuizCourse').text("IT-Forandringsledelse");
    } else if (SDK.Storage.load("quiz courseID") === 3) {
        $('#createQuizCourse').text("Makroøkonomi");
    } else if (SDK.Storage.load("quiz courseID") === 4) {
        $('#createQuizCourse').text("VØS 3: Finansiering");
    } else {
        $('#createQuizCourse').hide();
    }
    $('.topnav').append('<p>Quiz ID: ' + SDK.Storage.load("quiz ID") + '</p>');


        let counterQuestion = 0;
    $('#addQuestionButton').click((e) => {
        e.preventDefault();
        counterQuestion++;
        if (counterQuestion < 2) {
            $('#questionsAndAnswers').append('<input id="question" class="question" type="text" placeholder="Type in question text"><br>');
        } else {
            alert("Please save question, before adding a new one.");
        }


        let counter = 1;
        let textcounter = 1;

        $('#addChoicesButton').click((e) => {
            e.preventDefault();
            if (counter >= 5) {
                alert("It is not recommended to add more than 5 choices per question");
            $('#answers').append('<div><p id="counterNotation">' + counter++ + '. </p><input class=choiceInputBox type="text" placeholder="Type in choice ' + textcounter++ + '"><input class="radioBtn" id="checkBox" type="checkbox"></div><br>');
            } else {
                $('#answers').append('<div><p id="counterNotation">' + counter++ + '. </p><input class=choiceInputBox type="text" placeholder="Type in choice ' + textcounter++ +'"><input class="radioBtn" id="checkBox" type="checkbox"></div><br>');
            }
        });

        $('#saveQuestionButton').click((e) => {
            if (confirm('Are you done with your questions? You will not be able to edit it later!')) {
                if ($('#question').val().length < 5) {
                    alert("Please finish question, before saving")
                } else {


                    let quizId = SDK.Storage.load("quiz ID");
                    let questionTitle = $('#question').val();


                    let question = {
                        quizId:  quizId,
                        questionTitle: questionTitle
                        };

                    SDK.Question.create(question, (err, data) => {
                        if (err && err.xhr.status === 401) {
                            return alert("400 - Shit don't work yo!");
                        } else if (err) {
                            alert("ERROR is " + err);
                            return console.log("Bad stuff happened", err)
                        } else {
                            //console.log(data);

                            data = JSON.parse(data);
                            let questionId = data.questionId;
                            let choiceAnswer = 1;
                            let choice;
                            let e = $('#answers input[type=text]');
                            for (let i = 0 ; i < e.length ; i++) {
                                let j = e[i];

                                //Lagrer ikke det rigtige svar!
                                if ($('.radioBtn').is(":checked")) {
                                    choiceAnswer = 2;
                                } else {}
                                console.log(choiceAnswer);

                                choice = {
                                    questionId: questionId,
                                    choiceTitle: j.value,
                                    answer: choiceAnswer
                                };

                                SDK.Choice.create(choice, (err, choiceData) => {

                                    if (err && err.xhr.status === 401) {
                                        return alert("400 - Shit don't work yo!");
                                    } else if (err) {
                                       // alert("ERROR is " + err);
                                        return console.log("Bad stuff happened", err)
                                    } else {
                                        data = JSON.parse(choiceData);
                                        console.log(data);
                                    }
                                });
                            }

                            alert("Question has been added!");
                            $('#question').val("");
                            window.location.href = "AddQuestionsPage.html";

                        }
                    });

                }
            } else {}
        });

    });

    $('#discardQuizButton').click((e) => {
        e.preventDefault();
        if (confirm('If you choose to discard the quiz, it will be deleted, and you will not be able to access it again.')) {

            const deletionQuizID = SDK.Storage.load("quiz ID");


            SDK.Quiz.delete(deletionQuizID, (err) => {
                if (err && err.xhr.status === 401) {
                    return alert("400 - Shit don't work yo!");
                } else if (err) {
                    alert("ERROR is " + err);
                    return console.log("Bad stuff happened", err)
                } else {

                    alert("Quiz has been discarded.");
                    $('#question').val("");
                    window.location.href = "MainPage.html";
                    SDK.Storage.remove("quiz ID");
                    SDK.Storage.remove("quiz title");
                    SDK.Storage.remove("quiz courseID");
                }
            });

        } else {}
    });

    $('#saveQuizButton').click((e) => {
        e.preventDefault();
        if (confirm('Have you saved your last question? Remember that you will not be able to access your quiz again, once you save and exit ' +
                'the editor.')) {
            window.location.href = "MainPage.html";
            SDK.Storage.remove("quiz ID");
            SDK.Storage.remove("quiz title");
            SDK.Storage.remove("quiz courseID");
        } else {}
    });

    $('#howItWorksBtn').click(() => {
        $('#howItWorks').toggle();
    });


});