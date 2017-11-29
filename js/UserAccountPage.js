$(document).ready(() => {

    let ClearanceCheck = SDK.Storage.load("type");
    if (ClearanceCheck != 2 && ClearanceCheck != 1 ) {
        alert("Invalid access detected! You are being logged out");
        SDK.User.logOut();
    }


    $('#adminButton').hide();
    $('#userButton').hide();


    if (SDK.Storage.load("type") === 2) {
        $('#adminButton').show();
        $('#userButton').show();
    }

    $('.accountPageLabelUsername').text(SDK.Storage.load("username"));
    $('.accountPageLabelFirstname').text(SDK.Storage.load("firstname"));
    $('.accountPageLabelLastname').text(SDK.Storage.load("lastname"));
    $('.accountPageLabelUserID').text(SDK.Storage.load("user_id"));

    $("#deleteAccount").click(() => {

        const deletionUserID = $('#deleteUserAccountInput').val();
        if (confirm('Are you sure you want to delete user with ID ' + deletionUserID + "?")) {
            if (deletionUserID != SDK.Storage.load("user_id")) {
                    alert("Unable to delete another users account!")
            } else {
                SDK.User.delete(deletionUserID);
                alert("Your account have been deleted. You are now being logged out");
                SDK.User.logOut();
            }} else {
            $('#deleteUserInput').html("");
        }
    });

});