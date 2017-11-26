$(document).ready(() => {


    $('#Header').append('<h1 id="takeQuizHeader">' + SDK.Storage.load('Quiz name') +'</h1>');
    $('#Header').append('<div class="lineAddQuestionsPage"></div>');
    $('#Header').append('<p id="takeQuizSubheader">' + SDK.Storage.load('Quiz course') +'</p>');
    $('#startQuizButtonDiv').append('<button id="startQuizButton">Start Quiz</button>');

    let questionCounter = 0;
    let rightAnswers = 0;

    let questions = [];
    let choices = [];
    let currentQuestion;
    let currentQuestionID;
    let quizID = SDK.Storage.load("Quiz ID");


    $('#startQuizButtonDiv').click((e) => {
                e.preventDefault();
                $('#startQuizButtonDiv').hide();

                SDK.Question.GetQuestions(quizID, (err, data) => {
                    data = JSON.parse(data);
                    questions = data;

                    currentQuestion = questions[questionCounter].questionTitle;
                    currentQuestionID = questions[questionCounter].questionId;
                    console.log(currentQuestion);
                    $('#quizandquestionsDiv').append('<p class="questionBox">' + currentQuestion + '</p>');

                    SDK.Choice.GetChoices(currentQuestionID, (err, data) => {
                        data = JSON.parse(data);
                        console.log(data);
                        choices = data;

                        choices.forEach((choice) => {
                            $('#quizandquestionsDiv').append(`<button data-id="${choice.choiceId}" class="choiceBox">` + choice.choiceTitle +`</button><br>`);
                        });
                        $('#quizandquestionsDiv').append('<button id="nextQuestionButton">Next Question</button>');

                        $('.choiceBox').click((e) => {
                            let id = parseInt(e.currentTarget.getAttribute("data-id"));

                            for (let i = 0 ; i < choices.length ; i++) {
                                if (parseInt(choices[i].choiceId) === id) {
                                    if (choices[i].answer === 2) {
                                        console.log (e.currentTarget);
                                        e.currentTarget.classList.add("correct");
                                        rightAnswers++;
                                        questionCounter++;
                                        console.log("wuhuu");
                                    } else {
                                        e.currentTarget.classList.add("incorrect");
                                        questionCounter++;
                                        console.log("øv");
                                    }

                                } else {}

                            }
                            if (questionCounter >= questions.length) {
                                $('#nextQuestionButton').hide();
                                $('#quizandquestionsDiv').empty();
                                $('#quizandquestionsDiv').append('<div class="questionBox"><p>You finished the quiz!</p><br><p>You answered correctly on ' + rightAnswers + ' out of ' + questionCounter +' </p></div>');
                                $('.questionBox').append('<button id="returnToQuizzes">Return to Quizzes</button>');

                                $('#returnToQuizzes').click((e) => {
                                    alert("Works!");
                                    e.preventDefault();
                                    SDK.Storage.remove("Quiz course");
                                    SDK.Storage.remove("Quiz ID");
                                    SDK.Storage.remove("Quiz name");
                                    window.location.href = "Quizzes.html";
                                });

                            }
                            $('#nextQuestionButton').click((e) => {
                                e.preventDefault();
                                $('#quizandquestionsDiv').empty();
                                $('#startQuizButtonDiv').click();







                            });

                        });


                    });






                });









    });






});