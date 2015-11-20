//alert(1);
$.fn.raty.defaults.path = 'images/star';

$(function () {

   $('#divDefault').raty();

$('#default').raty();   
  /*  $('#default').raty({
        click: function (score, evt) {
            alert(score)
        }
    });*/

});