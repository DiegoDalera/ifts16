
var VIDEO_WIDTH = 1280, VIDEO_HEIGHT = 720;

function init(){
  
  $("nav a").not(".click-contactate").bind("click", goto);

  $("#close-aside-ingresantes").bind("click", function(){
    $("#alumnos-ingresantes").hide();
  })
  $("#close-nav").bind("click", function(){
    $("#smartphone-nav").hide();
  })
  $("#smartphone-menu").bind("click", function(){
    $("#smartphone-nav").toggle();
  })

  $("#ver-todas-materias").click(function(){
    $("#mas-materias").show();
    $(".anio").eq(0).show();
  });
  
  $(".selector-carrera").bind("click", function(){
    $(".selector-carrera").removeClass("active");  
    $(this).addClass("active");
    $(".carrera").hide();
    $(".carrera").eq( $(".selector-carrera").index($(this)) ).show();

  })

  $(".selector-anioA").bind("click", function(){
    $(".selector-anioA").removeClass("active");  
    $(this).addClass("active");
    $(".anioA").hide();
    $(".anioA").eq( $(".selector-anioA").index($(this)) ).show();

  })
  
  $(".selector-anioB").bind("click", function(){
    $(".selector-anioB").removeClass("active");  
    $(this).addClass("active");
    $(".anioB").hide();
    $(".anioB").eq( $(".selector-anioB").index($(this)) ).show();

  })

  $(".click-alumnos").unbind("click").bind("click", function(){
    $("#alumnos").show();
    $("#smartphone-nav").hide();
    return false;
  });

  

  $("#formulario-contacto form").bind("submit", function(){
    $("#formulario-contacto .enviando").show();
    $.ajax({
      type:"post",
      url:"enviar_formulario.php",
      data:{
        nombre:$("#formulario-contacto form #nombre").val(),
        apellido:$("#formulario-contacto form #apellido").val(),
        email:$("#formulario-contacto form #email").val(),
        comentario:$("#formulario-contacto form #comentario").val()
      },
      success:function(){
        $("#formulario-contacto .enviando").hide();
        $("#formulario-contacto .enviado").show();
      }
    });
    return false;
  });
  
  
  $(".click-contactate").unbind("click").bind("click", function(){
    $("#formulario-contacto").show();
    $("#smartphone-nav").hide();
    return false;
  })

  $(".cross").bind("click", function(){
      $("aside").hide();
  })

  function goto(){
      var $target = $("#" + $(this).attr("href"));
      
      if ($target.length>0){
        if ($(this).attr("href")=="landing"){
          TweenMax.to($("html,body"),1,{ scrollTop : 0, ease:Expo.easeOut});
        }else{
          TweenMax.to($("html,body"),1,{ scrollTop : $target.offset().top, ease:Expo.easeOut});
        }
        
      }
      $("#smartphone-nav").hide();
      return false;
  }

  resize();
  scroll();
  $(document).bind("scroll", scroll);

  function scroll(){
    var pos = $(window).height()+10-$(document).scrollTop();
    if (pos<0) pos = 0;
    TweenMax.set("#fixed",{y:pos});

    if ($(document).scrollTop()>10){
      
      $("#inscripcion").addClass("black");
    }else{
      $("#inscripcion").removeClass("black");
    }

    if ($(document).scrollTop()>$(window).height()){
      $(".text-center").hide();
    }else{
      $(".text-center").show();
    }

    var scroll = $(document).scrollTop();
    TweenMax.set('.video .title,.video .texto', { y: 0 -(scroll / 10) });
    TweenMax.set('.video .line-top-left,.video .line-top-bottom,.video .line-bottom-bottom,.video .line-bottom-right', { y: 0 -(scroll / 20) });
  }

  $(window).bind("resize", resize)
  new Swiper ('.swiper-container', {
		  direction: 'horizontal',
	    pagination: '.swiper-pagination',
      autoplay:false,
      speed: 1000,
      effect:"slide"
	  });


  /*var options = {
      zoom: 18,
      center: new google.maps.LatLng(-34.614196, -58.498299), 
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl: false,
      scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false
  };

  

  var map = new google.maps.Map(document.getElementById('mapa'), options);

  var marker = new google.maps.Marker({
    position: options.center,
    map: map,
    title: 'Hello World!'
  });*/

}

function resize(){
    $(".viewport-height").css({
      height:$(window).height()
    });

    var video_width, video_height;

    if ($(window).width()/$(window).height() > VIDEO_WIDTH/VIDEO_HEIGHT){
        video_width = $(window).width();
        video_height = video_width*VIDEO_HEIGHT/VIDEO_WIDTH;
    }else{
        video_height = $(window).height();
        video_width = video_height*VIDEO_WIDTH/VIDEO_HEIGHT;
    }

    $("video").css({
      width: video_width,
      height: video_height
    });

    

    $("video").css({
      marginLeft:0 - (video_width/2),
      marginTop:0 - (video_height/2)
    });

    $(".text-center").each(function(){
      $(this).css({
        marginLeft:-$(this).width()/2,
        marginTop:-$(this).height()/2,
        top:"50%",
        left:"50%"
      });
    });

    TweenMax.to("html,body",1,{opacity:1});
}

$(document).bind("ready", init);
