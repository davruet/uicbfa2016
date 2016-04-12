$( document ).ready(function() {

var togglerid;							//var get the ID of a btn hidding content
var menutogglerid; 						//var get the ID of a btn opening a menu (Infos, News, etc.)
var thismenu; 							//var selecting which menu is being opened
var hash = window.location.hash;
var slideSpeed;
slideSpeed = 400;



/*---- Experiment ----*/



/*------------- AUDIO -------------*/
/*
 		var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'content/audio/bell.mp3');
        audioElement.setAttribute('autoplay', 'autoplay');
        //audioElement.load()

        $.get();
/*
        audioElement.addEventListener("load", function() {
            audioElement.play();
        }, true);/*

        $('.play').click(function() {
            audioElement.play();
        });

        $('.pause').click(function() {
            audioElement.pause();
        });*/

/*------------- Header Menus -------------*/

var togglerId;
var menuId;
var showMenuAnim;
var hideMenuAnim;

showMenuAnim = {direction:'right', duration: 900, easing:'easeOutQuart'};
hideMenuAnim = {direction:'right', duration: 700, easing:'easeInQuart'};

$('.menu-toggler').click(function(e){
	e.preventDefault();
	togglerId = $(this).attr("id");
	menuClass = $('.menu.'+togglerId);
	
	if($('.active').not(menuClass).length){
		$('.active').not(menuClass).hide('slide', hideMenuAnim);
		$('.active').not(menuClass).removeClass('active');
		menuClass.show('slide', showMenuAnim);
		menuClass.addClass('active');
	}else{
		menuClass.show('slide', showMenuAnim);
		menuClass.addClass('active');
	}
});

$('.menu .close-btn').click(function(e) {
  e.preventDefault();
  $(this).parent().hide('slide', hideMenuAnim);
  $(this).parent().removeClass('active');
});

//Swipe on Mobile closes the Window

$('.menu').on("swiperight",function(){
  $(this).hide('slide', hideMenuAnim);
  $(this).removeClass('active');
});


$(document).mouseup(function (e)
{
    var container = $(".active");
    var exceptions = $('.menu-toggler, a');

    if (!container.is(e.target) && !exceptions.is(e.target)// if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {   
        container.hide('slide', hideMenuAnim);
		container.removeClass('active'); 
    }
});

/*------------- Shop Warning Note -------------*/

$('#warning .close-btn').click(function(){
	$('#warning').fadeOut();
});

/*------------- Selected Projects Menu -------------*/

$("#list-trigger").click(function(){
	$("#list").fadeIn();
});

$('.list-trigger .close-btn').click(function(e) {
  e.preventDefault();
  $(this).parent().fadeOut();
});

$(document).mouseup(function (e)
{
    var container = $("#list");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.fadeOut();}
});


/*------------- Project Infos -------------*/

$(".img-infos").each(function(){
	$(this).css("height", $(this).height());
});

var gethref;
var projectInfoShowAnim;
var projectInfoHideAnim;

projectInfoShowAnim = {direction:'down', duration: 700, easing:'easeOutQuart'};
projectInfoHideAnim = {direction:'down', duration: 500, easing:'easeInQuad'};

$("#projects .img-anchor, #list a.anchorLink").click(function(){
	
	var gethref = $(this).attr('projectdescription');
	
	if($('.img-infos-active').not('.'+gethref).length){
		$('.img-infos-active').not('.'+gethref).hide('slide', projectInfoHideAnim);
		$('.img-infos-active').not('.'+gethref).removeClass('img-infos-active');	
		$('.'+gethref).addClass('img-infos-active');
		$('.'+gethref).show('slide', projectInfoShowAnim);
	}else{
		$('.'+gethref).addClass('img-infos-active');
		$('.'+gethref).show('slide', projectInfoShowAnim);
	}
});

$(".img-close-btn").click(function(){
	$(this).parent().hide('slide', projectInfoHideAnim);
	$('.img-infos').removeClass('img-infos-active');
});

$(document).mouseup(function (e)
{
    var container = $(".img-infos-active");

    if (!container.is(e.target) && !$('img, #list').is(e.target)// if the target of the click isn't the container nor an image of the portfolio...
        && container.has(e.target).length === 0 && $('#list').has(e.target).length === 0 )// ... nor a descendant of the container
    {
       
        container.hide('slide', projectInfoHideAnim, function(){
        	container.removeClass('img-infos-active'); 
        	});
    }
});

/*------------- Shop Menus -------------*/

var imgrelative;
var itemDetailsShowAnim;
var itemDetailsHideAnim;
var itemDetailsShowPosition;
var itemDetailsHidePosition;

itemDetailsShowAnim = {queue:false, duration:900, easing:'easeOutQuart'};
itemDetailsHideAnim = {queue:false, duration:500, easing:'easeInQuad'};
itemDetailsShowPosition = {top:'50%'};
itemDetailsHidePosition = {top:'-700px'};

$('.imgdetails').click(function(){

	var imgrelative = $(this).parent().parent().parent().siblings('.item-details');
	
	if($('.active-time').length){
		$('.active-item').animate(itemDetailsHidePosition, itemDetailsHideAnim, function(){
			$('.active-item').removeClass('active-item');
		});
		imgrelative.addClass('active-item');
		imgrelative.animate(itemDetailsShowPosition, itemDetailsShowAnim);
	}else{
	imgrelative.addClass('active-item');
	imgrelative.animate(itemDetailsShowPosition, itemDetailsShowAnim);
	}
});

var buybtnrelative;

$('.buy-btn').click(function(){

	var buybtnrelative = $(this).parent().parent().parent().parent().parent().siblings('.item-details');
	
	if($('.active-time').length){
		$('.active-item').animate(itemDetailsHidePosition, itemDetailsHideAnim, function(){
			$('.active-item').removeClass('active-item');
		});
		buybtnrelative.addClass('active-item');
		buybtnrelative.animate(itemDetailsShowPosition, itemDetailsShowAnim);
	}else{
	buybtnrelative.addClass('active-item');
	buybtnrelative.animate(itemDetailsShowPosition, itemDetailsShowAnim);
	}
});


$('.close-btn').click(function(){
	$('.active-item').animate(itemDetailsHidePosition, itemDetailsHideAnim, function(){
		$('.active-item').removeClass('active-item');
		});
});

$(document).mouseup(function (e)
{
    var container = $(".active-item");

    if (!container.is(e.target) && !$('.imgdetails').is(e.target)// if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
       
        container.animate(itemDetailsHidePosition, itemDetailsHideAnim, function(){
        	container.hide();
        	container.removeClass('active-item'); 
        	});
    }
});


/*------------- Other Stuff -------------*/

//Text Content Hider
$(".toggler").click(function(){
 togglerid = $(this).attr("id");
 $(".hidden-content."+togglerid).toggle(); 
 $(this).children().toggle();
});

//For Bookmarking
if(window.location.hash){
	$(".menu-toggler"+hash+"-trigger").click(); 
}

//List Draggable

$(function() {
    $( "#list" ).draggable();
  });

//B-Lazy

	var bLazy = new Blazy({ 
        breakpoints: [{
	    width: 420 // Max-width
          , src: 'data-src-small'
	}]
      , success: function(element){
      		if ($('img').hasClass("b-loaded")){
				$('img.b-loaded').parent().parent().animate({backgroundColor: 'transparent'}, 400);
			}
			if ($('img').hasClass("b-loaded") && $('img').hasClass("shop-img")){
				$('img.b-loaded').parent().parent().animate({backgroundColor: 'transparent'}, 400);
			}
	    setTimeout(function(){
		// We want to remove the loader gif now.
		// First we find the parent container
		// then we remove the "loading" class which holds the loader image
		var parent = element.parentNode;
		parent.className = parent.className.replace(/\bloading\b/,'');
	    }, 200);
        }
   });

//Magnific Popup

$('.popup-vimeo').magnificPopup({
	type:'iframe',
	removalDelay: 300,
	mainClass: 'mfp-fade'
	//,gallery:{enabled:true}
	});
	
//Fade Out On Leaving

$('.leavinglink').click(function(){
  var leavingURL = $(this).attr('href');
  $('#preloader').fadeIn('slow', function(){
    document.location.href = leavingURL;
  });

  return false;
});

//Colour change for black background

if ($("body").css('background-color')=="rgb(41, 41, 41)"){
	$("#title").css('color', '#e5e5e5');
	$("#icon-instagram").attr("src", "content/img/icons/social-icons/instagram-24-white.png");
	$("#icon-tumblr").attr("src", "content/img/icons/social-icons/tumblr-24-white.png");
	$("#icon-twitter").attr("src", "content/img/icons/social-icons/twitter-24-white.png");
	$("#social-icons img").hover(function(){
		$(this).css('border-bottom', '5px');	
	});
	
//#social-icons img:hover{border-bottom: 1px solid black;
};


/*------------- End -------------*/

});


