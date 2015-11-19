//alert(1);
$.fn.raty.defaults.path = 'images/Star';

$(function () {
 $('#divDefault').raty();
   
   $('#default').raty();
   
  /*  $('#default').raty({
        click: function (score, evt) {
            alert(score)
        }
    });*/

   $('#fixstardefault').raty({ score: 3 });

});