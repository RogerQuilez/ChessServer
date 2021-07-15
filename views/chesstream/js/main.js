jQuery(document).ready(function ($) {


  //Funcion Scroll
  $('a.scrollTo').on('click', function () {

    // data-scrollTo = seccion de desplazamiento al nombre
    var scrollTo = $(this).attr('data-scrollTo');


    //activar y desactivar la clase activa
    $("a.scrollTo").each(function () {
      if (scrollTo == $(this).attr('data-scrollTo')) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });

    $('body, html').animate({
      "scrollTop": $('#' + scrollTo).offset().top
    }, 1000);
    return false;

  })

  //Funcion ir a la pagina principal
  document.getElementById("buscador").onclick = confirmacion;
  function confirmacion() {
    var confirmado = confirm("Seras redirigido, quieres continuar?");
    if (confirmado == true) {
      window.open("MAIN PAGE", "_self");
    } else {
      return;
    }

  }





  //-----------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------//







  //------------------------------------------VIDEOS-----------------------------------------------------//

  //--VARIABLES GLOBALES--//
  var frame;
  var url;
  //video1

  document.getElementById("img1").onclick = video1;
  function video1() {
    frame = $('#video');
    url = 'https://player.twitch.tv/?channel=anna_chess&parent=localhost';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  //video2
  document.getElementById("img2").onclick = video2;
  function video2() {
    frame = $('#video');
    url = 'https://player.twitch.tv/?channel=gmhikaru&parent=localhost';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  //video3
  document.getElementById("img3").onclick = video3;
  function video3() {
    frame = $('#video');
    url = 'https://player.twitch.tv/?channel=juanjogameplay&parent=localhost';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  //video4
  document.getElementById("img4").onclick = video4;
  function video4() {
    frame = $('#video');
    url = 'https://player.twitch.tv/?channel=xntentacion&parent=localhost';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video4') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  //video5
  document.getElementById("img5").onclick = video5;
  function video5() {
    frame = $('#video');
    url = 'https://player.twitch.tv/?channel=GOTHAMCHESS&parent=localhost';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video5') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  //video6
  document.getElementById("img6").onclick = video6;
  function video6() {
    frame = $('#video');
    url = 'https://player.twitch.tv/?channel=chessbrah&parent=localhost';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video6') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  //video7
  document.getElementById("img7").onclick = video7;
  function video7() {
    frame = $('#video');
    url = 'https://player.twitch.tv/?channel=gmnaroditsky&parent=localhost';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video7') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  //video8
  document.getElementById("img8").onclick = video8;
  function video8() {
    frame = $('#video');
    url = 'https://player.twitch.tv/?channel=annacramling&parent=localhost';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video8') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  //video9
  document.getElementById("img9").onclick = video9;
  function video9() {
    frame = $('#video');
    url = 'https://player.twitch.tv/?channel=alessiasanteramo&parent=localhost';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video9') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  //TERMINAR LA LLAMADA A LA API
  var httpRequest = new XMLHttpRequest();

  httpRequest.addEventListener('load', clipsLoaded);
  httpRequest.open('GET', 'https://api.twitch.tv/helix/clips?broadcaster_id=151904708&first=5');
  httpRequest.setRequestHeader('Client-ID', 'mqpwvzmcys5d6bfxurx6030v09cb67');
  httpRequest.setRequestHeader('Authorization', '2gbdx6oar67tqtcmt49t3wpcgycthx');
  httpRequest.send();

  //Mejores clips
  function clipsLoaded() {
    var clipsDisplay = document.getElementById('clips-display'),
      clipList = JSON.parse(httpRequest.responseText);

    clipList.clips.forEach(function (clip, index, array) {
      clipItem = document.createElement('clips');
      clipItem.innerHTML = clip.embed_html;
      clipsDisplay.appendChild(clipItem);
    });
  }
});