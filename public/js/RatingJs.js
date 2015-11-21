//alert(1);
$.fn.raty.defaults.path = '/images/Star';

$(function () {

   $('#divDefault').raty({
  half     : true,
  starHalf : 'star-half.png'
}
   	);

$('#default').raty({
  half     : true,
  starHalf : 'star-half.png'
});   
  /*  $('#default').raty({
        click: function (score, evt) {
            alert(score)
        }
    });*/
   $('#fixstardefault').raty({ score: '3.5',
   half     : true,
  starHalf : 'star-half.png'
});

});