$(document).ready(function(){
    var pageParams = new URLSearchParams(window.location.search);
    if (pageParams.has("detail")){
        console.log(pageParams.get("detail"));
        appendDetail(pageParams.get("detail"));
    } else {
        $('title').append('Product List');
        appendList();
    }
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
function appendList(){
    $.ajax({
        dataType: "json",
        url: "https://recruitment.dev.rollingglory.com/mapi/gift",
        success: function (response) {
            console.log(response);
            //$('body').append(response.gifts[0]['info']);
            var data = response.data.gifts;
            //console.log(data.length);
            var col, colInit = Math.floor($(window).width()/320);

            $('main .container').append('<div class="container-fluid"><div class="row all-list" id="row"></div></div>');
            //console.log($(document).width());
            $.each(data, function(i, data){
                var entry = '';
                var hover = '';
                entry += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"><div class="card rounded" id="content">';
                if (data.isNew > 0){
                    entry += '<img class="img-fluid new" src="assets/images/ic_new.png" alt="New">';//srcset="assets/images/ic_new@2x.png 768w"
                }

                hover += '<div class="card-img-overlay d-flex flex-column justify-content-between ';
                if (data.stock == 0){
                    entry += '<p id="stock">Out of stock</p>';
                    hover += 'out-of-stock">';
                    hover += '<img class="img-fluid hover" src="assets/images/ic_batik_abu@2x.png" srcset="assets/images/ic_batik_abu.png 320w" alt="Like">';
                } else {
                    hover += 'in-stock">';
                    hover += '<img class="img-fluid hover" src="assets/images/ic_batik_ijo@2x.png" srcset="assets/images/ic_batik_ijo.png 320w" alt="Like">';
                }
                hover += '<a href="?detail='+data.id+'" class="btn btn-primary btn-view">';
                hover += '<img class="img-fluid view-detail" src="assets/images/ic_mata@2x.png" srcset="assets/images/ic_mata.png 320w" alt="View Detail">';
                hover += '<p>View detail</p></a>';

                entry += '<a href="#" class="btn btn-primary btn-like">';
                entry += '<img class="img-fluid like" src="assets/images/ic_love%20–%201.png" alt="Like">';//srcset="assets/images/ic_love%20–%201.png 320w"
                entry += '</a><div class="card-image">';
                entry += '<img class="img-fluid" src="'+data.image+'" alt="'+data.name+'" />';
                entry += '<p id="product-name">'+data.name+'</p><br/>';
                entry += '<div id="points">';
                entry += '<img class="img-fluid point" src="assets/images/ic_point-1.png" alt="Point">';// srcset="assets/images/ic_point-1.png 320w"
                entry += '<p>'+data.points+' points</p></div>';
                entry += '<div id="reviews">';
                for (var j = Math.floor(data.rating); j >= 0; j--) {
                    entry += '<img class="img-fluid point" src="assets/images/ic_bintang.png" alt="Rating">';// srcset="assets/images/ic_bintang.png 320w"
                }

                entry += '<p>'+data.num_reviews+' reviews</p><br/></div>';
                entry += hover;
                entry += '</div></div></div></div>';
                
                $('#row.row').append(entry);
            });
        }
    });
}

function appendDetail(id){
    $.ajax({
        dataType: "json",
        url: "https://recruitment.dev.rollingglory.com/mapi/gift",
        success: function (response) {
            var data = response.data.gifts;

            $.each(data, function(i, data){
                if (data.id == id){
                    $('title').append(data.name);
                    var entry = '';
                    var bread = '';
                    var card = '';

                    entry += '<div class="container-fluid"><div class="row detail" id="row">';
                    
                    bread += '<div class="col-md-12"><nav><ol class="breadcrumb">';
                    bread += '<li class="breadcrumb-item"><a href="./">List</a></li>';
                    bread += '<li class="breadcrumb-item active">';
                    bread += data.name;
                    bread += '</li></ol></nav></div>';
                    entry += bread;

                    entry += '<div class="row"><div class="col-md-6">';
                    entry += '<img class="img-fluid new" src="assets/images/ic_new.png" alt="New">';
                    entry += '<img class="img-fluid" src="'+data.image+'" alt="'+data.name+'" />';
                    entry += '</div><div class="col-md-6"><div class="card">';

                    card += '<p class="card-header">'+data.name+'</p>';
                    card += '<div class="card-body">';

                    card += '<div id="reviews">';
                    for (var j = Math.floor(data.rating); j >= 0; j--) {
                        card += '<img class="img-fluid point" src="assets/images/ic_bintang.png" alt="Rating">';// srcset="assets/images/ic_bintang.png 320w"
                    }
                    card += '<p>'+data.num_reviews+' reviews</p><br/></div>';

                    card += '<div id="points">';
                    card += '<img class="img-fluid point" src="assets/images/ic_point-1.png" alt="Point">';// srcset="assets/images/ic_point-1.png 320w"
                    card += '<p class="points">'+data.points+' points</p><p class="stock">';
                    if (data.stock == 0){
                        card += 'Out of Stock';
                    } else {
                        card += 'In Stock';
                    }
                    card += '</p></div>';
                    card += '<div id="info">'+data.info+'</div>';

                    card += '<div id="amount"><p>Jumlah</p>';
                    card += '<div class="row">';
                    card += '<div class="input-group col-lg-3">';
                    card += '<div class="input-group-prepend">';
                    card += '<button class="btn btn-default btn-number btn-outline-secondary" disabled="disabled" data-type="minus" data-field="quant[1]" type="button">-</button>';
                    card += '</div>';
                    card += '<input type="text" name="quant[1]" class="form-control input-number no-padding text-center" value="0" min="0" max="'+data.stock+'" aria-label="Amount">';
                    card += '<div class="input-group-append">';
                    card += '<button class="btn btn-default btn-number btn-outline-secondary" data-type="plus" data-field="quant[1]" type="button">+</button>';
                    card += '</div>';
                    card += '</div><div class="col-lg-9"></div></div></div>'; //end div amount

                    card += '<div class="card-footer">';
                    card += '<a href="#" class="btn btn-primary btn-like">';
                    card += '<img class="img-fluid like" src="assets/images/ic_love%20–%201.png" alt="Like">';//srcset="assets/images/ic_love%20–%201.png 320w"
                    card += '</a><a href="#" class="btn btn-primary btn-redeem">Redeem</a>';
                    card += '<a href="#" class="btn btn-primary btn-addtocart">Add to cart</a>';
                    card += '</div>'; //end div footer

                    card += '</div></div></div>'; //end div card

                    entry += card;

                    entry += '<div class="row description" id="row">';
                    entry += '<div class="row prodetail">';
                    entry += '<div class="col-lg-12"><h3>Info produk</h3>';
                    entry += '<div class="row lines">';
                    entry += '<div class="col-lg-2 boldline"></div><div class="col-lg-2 thinline"></div>';
                    entry += '<div class="row desc">';
                    entry += '<div class="col-lg-12"><h2>Rincian</h2>';
                    entry += data.description;

                    entry += '</div></div></div></div></div></div></div></div>';
                    
                    $('main .container').append(entry);

                    $('.btn-number').click(function(e){
                        e.preventDefault();
                        
                        fieldName = $(this).attr('data-field');
                        type      = $(this).attr('data-type');
                        var input = $("input[name='"+fieldName+"']");
                        var currentVal = parseInt(input.val());
                        if (!isNaN(currentVal)) {
                            if(type == 'minus') {
                                
                                if(currentVal > input.attr('min')) {
                                    input.val(currentVal - 1).change();
                                } 
                                if(parseInt(input.val()) == input.attr('min')) {
                                    $(this).attr('disabled', true);
                                }

                            } else if(type == 'plus') {

                                if(currentVal < input.attr('max')) {
                                    input.val(currentVal + 1).change();
                                }
                                if(parseInt(input.val()) == input.attr('max')) {
                                    $(this).attr('disabled', true);
                                }

                            }
                        } else {
                            input.val(0);
                        }
                    });
                    $('.input-number').focusin(function(){
                       $(this).data('oldValue', $(this).val());
                    });
                    $('.input-number').change(function() {
                        
                        minValue =  parseInt($(this).attr('min'));
                        maxValue =  parseInt($(this).attr('max'));
                        valueCurrent = parseInt($(this).val());
                        
                        name = $(this).attr('name');
                        if(valueCurrent >= minValue) {
                            $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled');
                        } else {
                            alert('Enter valid number');
                            $(this).val($(this).data('oldValue'));
                        }
                        if(valueCurrent <= maxValue) {
                            $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled');
                        } else {
                            alert('Sorry, stock insufficient');
                            $(this).val($(this).data('oldValue'));
                        }
                        
                        
                    });
                    $(".input-number").keydown(function (e) {
                            // Allow: backspace, delete, tab, escape, enter and .
                            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                                 // Allow: Ctrl+A
                                (e.keyCode == 65 && e.ctrlKey === true) || 
                                 // Allow: home, end, left, right
                                (e.keyCode >= 35 && e.keyCode <= 39)) {
                                     // let it happen, don't do anything
                                     return;
                            }
                            // Ensure that it is a number and stop the keypress
                            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                e.preventDefault();
                            }
                        });
                }
            });            
        }
    });
}