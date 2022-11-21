

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});

// Cache selectors
var topMenu = $(".linkbox"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   // Set/remove active class
   menuItems
     .parent().removeClass("active")
     .end().filter("[href='#"+id+"']").parent().addClass("active");
});



function checkOffset() {
  if($('.linkbox').offset().top + $('.linkbox').height() 
                                         >= $('#footer').offset().top - 10)
      $('.linkbox').css('position', 'absolute');
  if($(document).scrollTop() + window.innerHeight < $('.footer').offset().top)
      $('#social-float').css('position', 'fixed'); // restore when you scroll up
  $('.linkbox').text($(document).scrollTop() + window.innerHeight);
}
$(document).scroll(function() {
  checkOffset();
});