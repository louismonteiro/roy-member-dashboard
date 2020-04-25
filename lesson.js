$(document).ready(function() {
    $('#markbutton').click(function(e){
        url = 'q.php';
        $.ajax({
            url: url,
            type: 'POST',
            data: {code: $('#code').val()}
        })
            .done(function(data) {
                if (data == '1'){
                    alert('Done');
                    $('#markbutton').css("background-color", "green");
                    $('#markbutton').css("color", "white");
                    $('#markbutton').css("border", "none");
                    $("#markbutton").html('Completed');
                }

                else
                {
                    alert(2);
                }
            })
            .fail(function(){
                alert('Please refresh the page ...');
            });

    });

});