const MAIN_PAGE_IMAGES_PER_ARTIST = 2;

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

function encodeName(name){

  var stripped = name.replace(new RegExp("[^a-zA-Z\\d]+", "g"), "-");
  var encoded =  encodeURIComponent(stripped);
  return encoded;
}

function showPage(p){
  var page;
  if (p){
    page = pageMap[p];
  } else {
    page = mainPage;
  }
  if (page){
    document.getElementById("title").innerHTML = page.name;

      /*var temp = "<div class='brick' style='width:{width}px;'><img src='photos/{index}.jpg' width='100%'></div>";
      var w = 1, h = 1, html = '', limitItem = 49;
      for (var i = 0; i < limitItem; ++i) {
        w = 1 + 3 * Math.random() << 0;
        html += temp.replace(/\{width\}/g, w*150).replace("{index}", i + 1);
      }*/
      var html = [];
      page.images.map(function (image){
        if (image.url){ // If it's an image, it has a url property
        var w = 200 + ((Math.random() * 3) * 50);
        var h = 200;
          html.push("<div class='brick' style='width: " + w + "px;'><a title='" + image.caption
                    + "' class='fancybox' rel='group' href='" 
                    + image.url + "'><img class='artist-image' src='" + image.thumb 
                    + "' width='100%'></a></div>");
        }
      });

      var count = html.length;

      for (var i = 0; i < count ; i++){
        html.push("<div class='brick' style: 'width: 300px; height: 300px; background-color: rgb(0, 106, 63);'></div>");
      }

      shuffle(html);
      
      $("#freewall").html(html);
      $(".fancybox").fancybox();

      var wall = new Freewall("#freewall");
      wall.reset({
        selector: '.brick',
        animate: true,
        cellW: 150,
        cellH: 'auto',
        onResize: function() {
          wall.fitWidth();
          //wall.fitZone($(window).width() - 30 , $(window).height() - 30);
        }
      });

      wall.fitWidth();

      var images = wall.container.find('.brick');
      images.find('img').load(function() {
        wall.fitWidth();
        //wall.fitZone($(window).width() - 30 , $(window).height() - 30);
      });

      $("#text").html(page.text);

  } else {
    alert("Page " + p + " not found.");
  }
}

// Load student data
var yamlObj = YAML.load('content.yml');
var pageMap = {};
var artistList = [];
var themeMap = {};

function addUserToTheme(user, theme){
  var images;
  if (!theme.images){
    theme.images = [];   
  }
  images = theme.images;
  user.images.map(function(img){
    images.push(img);
  });
}

function addPage(page){
  var encodedName = encodeName(page.name);
  pageMap[encodedName] = page;
  artistList.push(encodedName);
  // Create a theme page if it doesn't exist
  if (page.themes){
    page.themes.map(function(themeName){
      var theme = pageMap[encodeName(themeName)];
      if (!theme){
        theme = {};
        theme.text = "";
        theme.name = themeName;
        pageMap[encodeName(themeName)] = theme;
      };
      addUserToTheme(page, theme);
    });
  }
}

yamlObj.map(addPage);

var mainPage = {"text": "",
                "name": "As Little Defined As Anything Else",
                "images":[]};

// init main page images, one per artist, ramdomized.

for (var i = 0; i < artistList.length; i++){
  // get a copy of the image array
  var images = pageMap[artistList[i]].images.slice();
  shuffle(images);
  for (var j = 0; j < MAIN_PAGE_IMAGES_PER_ARTIST; j++){
    mainPage.images.push(images[j]);
  }
}


$(document).ready(function(){
    $('#index-toggle').click(function() {
        $('#index').toggle();
    });

    $('.close-index').click(function() {
        $('#index').toggle();
    });

    $('.off-index').click(function() {
        $('#index').toggle();
    });

    $('.off-about').click(function() {
        $('#about').toggle();
    });

    $('#about-toggle').click(function() {
        $('#about').toggle();
    });

    $('.close-about').click(function() {
        $('#about').toggle();
    });

    $('#exhibition-toggle').click(function() {
        $('#exhibition').toggle();
    });

    $('.close-exhibition').click(function() {
        $('#exhibition').toggle();
    });

    $( ".change-page a").each(function(){
        this.href="#" + encodeName(this.innerHTML);
    });

    function pageChange(){
      var page;
      if (location.hash) page = location.hash.substring(1);
      showPage(page);
      $('#header-main').css('display','block')
      $("html, body").scrollTop(0);
      return false;
    }

    pageChange();

    window.onhashchange = pageChange;

});
