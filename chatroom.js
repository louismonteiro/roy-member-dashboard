$('#sendmessage').keypress(function (e) {
    if (e.keyCode == 13 && !e.shiftKey)
    {
        // prevent default behavior
        e.preventDefault();
        alert("Sent");
        return false;
    }
});
$(document).ready(function() {
    $('input[name=chatradio]').change(function(e){
        url = 'q.php';
        var type = $('input[name=chatradio]:checked').val();
        $.ajax({
            url: url,
            type: 'POST',
            data: {type: type }
        })
            .done(function(data) {
                if (data == '1'){
                    alert(" changed ");
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