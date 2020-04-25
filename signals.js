$(document).ready(function() {
    $('input[name=radiotime],input[name=radio]').change(function(e){
        url = 'q.php';
        var time = $('input[name=radiotime]:checked').val();
        type = $('input[name=radio]:checked').val();
        items = [];
        dates = [];
        $.ajax({
            url: url,
            type: 'POST',
            data: {time: time, type: type }
        })
            .done(function(data) {
                if (data == 'error')
                {
                    alert('Please try again later')
                }
                else
                {
                    alert(time);
                    $.each( jQuery.parseJSON(data), function( key, val ) {
                        json_obj = val;
                        months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        daten = new Date(json_obj.dt_send*1000);
                        month = months_arr[daten.getMonth()];
                        var day = daten.getDate();
                        items.push(json_obj.pips);
                        dates.push(day+'-'+month);
                    });
                    var ctx = document.getElementById("myChart").getContext('2d');
                    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(89,203,247,24)');
                    gradient.addColorStop(1, 'rgba(82,236,200,49)');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: dates,
                            datasets: [{
                                radius: 0,
                                label: '# of Votes',
                                data: items,
                                fill:false,


                                borderColor:gradient,

                                borderWidth: 15
                            }]
                        },

                        options: {
                            title: {
                                text: 'Chart.js Time Scale'
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        maxTicksLimit: 7,
                                        fontColor: "#bad6ff",
                                        fontStyle: "bold",
                                        beginAtZero:true

                                    },
                                    gridLines: {
                                        display:false
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        maxTicksLimit: 8,
                                        fontColor: "#bad6ff",
                                        fontStyle: "bold",
                                        beginAtZero:true
                                    }
                                    ,
                                    gridLines: {
                                        display:false
                                    }
                                }]
                            },
                            legend: {
                                display: false
                            },
                            tooltips: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.yLabel;
                                    }
                                }
                            }

                        }

                    });
                }

            })
            .fail(function(){
                alert('Please refresh the page ...');
            });

    });

});
