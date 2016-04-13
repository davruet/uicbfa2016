
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
  return encodeURIComponent( name.replace(" ", "-"));
}

function showPage(p){
  var page = pageMap[p];
  console.log(page);
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

      for (var i = 0; i < count * 4; i++){
        html.push("<div class='brick' style: 'width: 300px; height: 300px; background-color: rgb(0, 106, 63);'><div>Test</div></div>");
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
var themeMap = {};

function addPage(page){
  pageMap[encodeName(page.name)] = page;
}

yamlObj.map(addPage);
console.log(pageMap);


$(document).ready(function(){
    $('#index-toggle').click(function() {
        $('#index').toggle();
    });

    $('.close-index').click(function() {
        $('#index').toggle();
    });

    $('.section').click(function() {
        $('#index').toggle();
    });

    $('#info-toggle').click(function() {
        $('#info').toggle();
    });

    $('.close-info').click(function() {
        $('#info').toggle();
    });

    $('#exhibition-toggle').click(function() {
        $('#exhibition').toggle();
    });

    $('.close-exhibition').click(function() {
        $('#exhibition').toggle();
    });

    $( ".section a").each(function(){
        this.href="#" + encodeName(this.innerHTML);
    });

    function pageChange(){
      showPage(location.hash.substring(1))
    }

    if (location.hash){
      pageChange();
    }    

    window.onhashchange = pageChange;

});