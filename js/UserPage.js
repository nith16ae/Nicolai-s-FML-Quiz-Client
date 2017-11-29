$(document).ready(() => {

    let ClearanceCheck = SDK.Storage.load("type");
    if (ClearanceCheck != 2 && ClearanceCheck != 1 ) {
        alert("Invalid access detected! You are being logged out");
        SDK.User.logOut();
    }

    $('#adminButton').hide();
    $('#userButton').hide();
    $('#deletionBoxUsers').hide();
    $('#deleteUserButton').hide();


    if (SDK.Storage.load("type") === 2) {
        $('#adminButton').show();
        $('#userButton').show();
        $('#deleteUserButton').show();

        $('#deleteUserButton').click((e) => {
            e.preventDefault();
            $('#deletionBoxUsers').toggle();
        });
    }

    $("#deleteUser").click(() => {

        const deletionUserID = $('#deleteUserInput').val();
        if (confirm('Are you sure you want to delete user with ID' + deletionUserID + "?")) {
            SDK.User.delete(deletionUserID, (err) => {

                if (err) {
                    alert("User was not deleted. Error occurred (" + err + ").");
                    $('#deleteUserInput').val("");
                } else {
                    alert("Quiz (ID " + deletionUserID + ") has been deleted!");
                    $('#deleteUserInput').val("");
                    $("#modal-tbody2").find('tr[data-id=' + deletionUserID +']').remove();
                }

            });

        }else {
            $('#deleteUserInput').html("");
            alert("The user was not deleted.")
        }

    });


    const $modalTbody = $("#modal-tbody2");

    $modalTbody.html("");
    SDK.User.findAll((err, users) => {
       // let users = (JSON.parse(data));

        users.forEach((user) => {
            $modalTbody.append(`<tr data-id="${user.userId}"><td>${user.userId}</td> <td>${user.username}</td> <td>${user.firstName}</td> <td>${user.lastName}</td> <tr/>`);

            $('#modal-tbody2 tr').hover(
                function () {
                    $(this).css("background","#304B58");
                },
                function () {
                    $(this).css("background","");
                }
            );

        });

    });



});