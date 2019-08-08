$(document).ready(function(){
	appendlist();
});
/*
$(window).resize(function () {
    waitForFinalEvent(function(){
      console.log('Resize...');
      $('main .container').empty();
      appendlist();
    }, 500, "some unique string");
});
*/

function appendlist(){
    $.ajax({
        dataType: "json",
        url: "https://recruitment.dev.rollingglory.com/mapi/gift",
        success: function (response) {
            console.log(response);
            //$('body').append(response.gifts[0]['info']);
            var data = response.data.gifts;
            console.log(data.length);
            var col, colInit = Math.floor($(window).width()/320);
            $('main .container').append('<div class="container-fluid"><div class="row" id="row"></div></div>');
            //console.log($(document).width());
            $.each(data, function(i, data){
                var list = '';
                var hover = '';
                list += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"><div class="card rounded" id="content">';
                if (data.isNew > 0){
                    list += '<img class="img-fluid new" src="assets/images/ic_new.png" srcset="assets/images/ic_new@2x.png 1281w" alt="New">';
                }
                hover += '<div class="card-img-overlay d-flex flex-column justify-content-between ';
                if (data.stock == 0){
                    list += '<p id="stock">Out of stock</p>';
                    hover += 'out-of-stock">';
                    hover += '<img class="img-fluid hover" src="assets/images/ic_batik_abu.png" srcset="assets/images/ic_batik_abu@2x.png 1281w" alt="Like">';
                } else {
                    hover += 'in-stock">';
                    hover += '<img class="img-fluid hover" src="assets/images/ic_batik_ijo.png" srcset="assets/images/ic_batik_ijo@2x.png 1281w" alt="Like">';
                }
                list += '<a href="#" class="btn btn-primary btn-like">';
                list += '<img class="img-fluid like" src="assets/images/ic_love – 1.png" srcset="assets/images/ic_love – 1@2x.png 1281w" alt="Like">';
                list += '</a><div class="card-image">';
                list += '<img class="img-fluid" src="'+data.image+'" alt="'+data.name+'" />';
                list += '<p id="product-name">'+data.name+'</p><br/>';
                list += '<div id="points">';
                list += '<img class="img-fluid point" src="assets/images/ic_point-1.png" srcset="assets/images/ic_point-1@2x.png 1281w" alt="Point">';
                list += '<p>'+data.points+' points</p></div>';
                list += '<div id="reviews">';
                for (var j = Math.floor(data.rating); j >= 0; j--) {
                    list += '<img class="img-fluid point" src="assets/images/ic_bintang.png" srcset="assets/images/ic_bintang@2x.png 1281w" alt="Rating">'
                }
                list += '<p>'+data.num_reviews+' reviews</p><br/></div>';
                list += hover;
                list += '</div></div></div></div>';
                
                $('#row.row').append(list);
            });
        }
    });
}