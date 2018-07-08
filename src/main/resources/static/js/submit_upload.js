$('#uploadform').submit(function (e) {
    var frm = $('#uploadform');
    submit_url = frm.attr('action');
    data = frm.serialize();
    e.preventDefault();
    $("#submit_message").remove();
    var message = "";
    var success_function = function () {
        $('#uploadform').trigger("reset");
        $("#submit_message").remove();
        frm.append('<p id="submit_message" style="font-size: large; color: green">  <i class="fa fa-check" aria-hidden="true"></i> Successfully Submitted! </p>')
    };
    var error_function = function (data) {
        console.log(data.responseText);
        var json = $.parseJSON(data.responseText);
        message = json["message"];

        if (json["statusCode"] / 100 == 5)
            message = (message == null) ? "Oops, something went wrong at server side." : message;

        frm.append('<p id="submit_message" style="font-size: large; color: red"> Error: ' + message + '</p>');
        console.log(json);
    };
    single_upload(submit_url, data, success_function, error_function);
    return false;
});

$("#bulkUploadForm").submit(function (e) {
    e.preventDefault();
    $("#submit_message").remove();
    var submit_url = $('#uploadform').attr('action');
    var dummyFunction = function () {
    };
    $('#urls').val().split("\n").forEach(function (url) {
        single_upload(submit_url, {url: url}, dummyFunction, dummyFunction)
    });
    $("#bulkUploadForm").append('<p id="submit_message" style="font-size: large; color: green">  <i class="fa fa-check" aria-hidden="true"></i> Successfully Submitted! </p>')
    return false;
});

function single_upload(submit_url, data, success_function, error_function) {
    $.ajax({
        type: 'post',
        url: submit_url,
        data: data,
        dataType: "json",
        cache: false,
        success: success_function,
        error: error_function
    });
}
