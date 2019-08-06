$(document).ready(function(){
	$.ajax({
        dataType: "json",
        url: "https://recruitment.dev.rollingglory.com/mapi/gift",
        success: function (response) {
            console.log(response);
            //$('body').append(response.gifts[0]['info']);
            var data = response.data.gifts;
            console.log(data.length);
            var col, colInit = Math.floor($(window).width()/320);
            var row = 1;
            $('main .container').append('<div class="container-fluid"><div class="row" id="row'+row+'"></div></div>');
            //console.log($(document).width());
            $.each(data, function(i, data){
            	//console.log(data.info);
            	if (col < 1){
            		row++;
            		$('main .container > div.container-fluid').append('<div class="row" id="row'+row+'"></div>');
            		col = colInit;
            	}
            	$('#row'+row+'.row').append('<div class="col-md-'+(12/colInit)+'"><div class="card rounded"><div class="card-image"><img class="img-fluid" src="'+data.image+'" alt="Alternate Text" /></div>')
            	col--;
            });
        }
    });
});