$(document).ready(function() {
  $('.slideshow').slideshow();
});

(function($) {
  $.fn.slideshow = function(settings) {
    // Specify default settings
    var config = {
     timeout: 4000,
     speed: 600 // 'normal'
    };
    // Use custom settings, if any
    if (settings) {
     $.extend(config, settings);
    };
    this.wrapInner('<div id="images">');
    this.append('<ul class="navigation"></ul>');
    
    var navigation = $('.navigation', this);

    var i=1;
    $('#images img', this).each(function() {
      $(this).attr('data-index', i);
      thumb_img = $(this).attr('data-thumb');
      link = $('<a href="#">'+i+'</a><img src="' + thumb_img +'" />');
      link.click(function(event){
        slideshow_jump($(this).html());
        event.preventDefault();
      })
      li = $('<li class="th_' + i + '"></li>').append(link);
      navigation.append(li);
      i=i+1;
    });
    
    $('li.th_1 a').addClass('active');
    
    // We loop through the selected elements, in case the slideshow was called on more than one element e.g. `$('.foo, .bar').slideShow();`
    this.each(function() {
     // Inside the setInterval() block, `this` references the window object instead of the slideshow container element, so we store it inside a var
     var $images = $('#images', this);
     $images.children().eq(0).appendTo($images).show();
     // Iterate through the slides
     setInterval(function() {
      next = $images.children().eq(0)
       .hide().appendTo($images)
       .fadeIn(config.speed);
      
      $('li a').removeClass('active');
      $('li.th_' + next.attr('data-index') + ' a').addClass('active');
     }, config.timeout);
    });
    // Allow chaining
    return this;
   };
   
   function slideshow_jump(index){
     $('li a').removeClass('active');
     $('li.th_' + index + ' a').addClass('active');
     
     var $images = $('#images');
     var active_image = null;
     
     $images.children().each(function(){
       if (active_image != null) return;
       img = $images.children().eq(0).appendTo($images);
       
       if ($(img).attr('data-index') == index) {
         $images.children().hide();
         active_image = $(img).show();
       } 
       
     });
   }
})(jQuery);


