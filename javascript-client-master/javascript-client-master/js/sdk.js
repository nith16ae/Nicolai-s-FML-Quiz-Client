const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },
    Quiz: {
        delete: (id, cb) => {
            SDK.request({
                method: "DELETE",
                url: "/quiz/" + id
            },
                (err, data) => {
                if (err) return cb(err);

                cb(null);
            })
        },
        findDIS: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/quiz/1"
                },
                (err, data) => {
                    if (err) return cb(err);

                    cb(null, data);
                })
        },
        findITF: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/quiz/2"
                },
                (err, data) => {
                    if (err) return cb(err);

                    cb(null, data);
                })
        },
        findMAKRO: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/quiz/3"
                },
                (err, data) => {
                    if (err) return cb(err);

                    cb(null, data);
                })
        },
        findVOES: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/quiz/4"
                },
                (err, data) => {
                    if (err) return cb(err);

                    cb(null, data);
                })
        },
        create: (quiz, cb) => {
            SDK.request({
                method: "POST",
                url: "/quiz",
                data: {
                    courseId: quiz.courseId,
                    quizTitle: quiz.quizTitle
                },
            }, (err, data) => {
                //On login-error
                if (err) return cb(err);

                data = JSON.parse(data);

                //Mangler at returnere quizID

                SDK.Storage.persist("quiz ID", data.quizId);
                SDK.Storage.persist("quiz title", quiz.quizTitle);
                SDK.Storage.persist("quiz courseID", quiz.courseId);


                cb(null, data);

            });
        }
    },
    Question: {
        create: (question, cb) => {
            SDK.request({
                method: "POST",
                url: "/question",
                data: {
                    quizId: question.quizId,
                    questionTitle: question.questionTitle
                },
            }, (err, data) => {
                // on login-error
                if (err) return cb(err);

                cb(null, data);

            });
        }

    },
    Choice: {
        create: (choice, cb) => {
            SDK.request({
                method: "POST",
                url: "/choice",
                data: {
                    questionId: choice.questionId,
                    choiceTitle: choice.choiceTitle,
                    answer: choice.answer
                },
            }, (err, data) => {
                // on login-error
                if (err) return cb(err);

                cb(null, data);

            });
        }

    },
    Courses: {
        getAllCourses: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/quiz{id}"
                }
                , cb);
        }
    },
    Order: {
        create: (data, cb) => {
            SDK.request({
                method: "POST",
                url: "/orders",
                data: data,
                headers: {authorization: SDK.Storage.load("tokenId")}
            }, cb);
        },
        findMine: (cb) => {
            SDK.request({
                method: "GET",
                url: "/orders/" + SDK.User.current().id + "/allorders",
                headers: {
                    authorization: SDK.Storage.load("tokenId")
                }
            }, cb);
        }
    },
    User: {
        findAll: (cb) => {
            SDK.request({method: "GET", url: "/user"}, cb);
        },
        current: () => {
            return SDK.Storage.load("user");
        },
        create: (username, password, firstName, lastName, type, cb) => {
            SDK.request({
                method: "POST",
                url: "/user",
                data: {username: username, password: password, firstName: firstName, lastName: lastName, type: type},
            }, (err, data) => {
                //On login-error
                if (err) return cb(err);


                cb(null, data);

            });
        },
        createAdmin: (username, password, firstName, lastName, type, cb) => {
            SDK.request({
                method: "POST",
                url: "/user",
                data: {username: username, password: password, firstName: firstName, lastName: lastName, type: type},
            }, (err, data) => {
                //On login-error
                if (err) return cb(err);


                cb(null, data);

            });
        },
        delete: (id, cb) => {
            SDK.request({
                    method: "DELETE",
                    url: "/user/" + id,
                },
                (err) => {
                    if (err) return cb(err);

                    cb(null);
                });
        },
        logOut: () => {
            SDK.Storage.remove("user_id");
            SDK.Storage.remove("user");
            SDK.Storage.remove("type");
            SDK.Storage.remove("firstname");
            SDK.Storage.remove("lastname");
            window.location.href = "LoginPage.html";
        },
        login: (username, password, cb) => {
            SDK.request({
                url: "/user/login",
                method: "POST",
                data: {
                    username: username,
                    password: password
                }
            }, (err, data) => {
                //On login-error
                if (err) return cb(err);


                data = JSON.parse(data);
                SDK.Storage.persist("user_id", data.userId);
                SDK.Storage.persist("username", data.username);
                SDK.Storage.persist("firstname", data.firstName);
                SDK.Storage.persist("lastname", data.lastName);
                SDK.Storage.persist("type", data.type);

                cb(null, data);

            });

        },
        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentUser = SDK.User.current();
                if (currentUser) {
                    $(".navbar-right").html(`
            <li><a href="my-page.html">Your orders</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
          `);
                }
                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            })
        }},
        Storage: {
            prefix: "FMLQUIZ ",
            persist: (key, value) => {
                window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
            },
            load: (key) => {
                const val = window.localStorage.getItem(SDK.Storage.prefix + key);
                try {
                    return JSON.parse(val);
                }
                catch (e) {
                    return val;
                }
            },
            remove: (key) => {
                window.localStorage.removeItem(SDK.Storage.prefix + key);
            }
        }
};