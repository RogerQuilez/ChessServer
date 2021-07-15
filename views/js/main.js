jQuery(document).ready(function ($) {
  //------------------------------------------VIDEOS-----------------------------------------------------//

  //--VARIABLES GLOBALES--//
  var frame;
  var url;
  var info = document.getElementById("info");
  //video1

  document.getElementById("video1").onclick = video1;
  function video1() {
    frame = $('#video');
    url = 'https://media.chesscomfiles.com/videos/square/ESP-NUE-the-king-and-the-goal-o9w.mp4';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    info.style.display = "none";
  }

  //video2
  document.getElementById("video2").onclick = video2;
  function video2() {
    frame = $('#video');
    url = 'https://media.chesscomfiles.com/videos/square/ESP-NUE-notation-h3s.mp4';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    info.style.display = "none";

  }


  //video3
  document.getElementById("video3").onclick = video3;
  function video3() {
    frame = $('#video');
    url = 'https://media.chesscomfiles.com/videos/square/ESP-OP-control-the-center-k1q.mp4';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    info.style.display = "none";
  }

  //video4
  document.getElementById("video4").onclick = video4;
  function video4() {
    frame = $('#video');
    url = 'https://media.chesscomfiles.com/videos/square/ESP-PRI-the-4-move-checkmate-a9s.mp4';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video4') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    info.style.display = "none";
  }


  //video5
  document.getElementById("video5").onclick = video5;
  function video5() {
    frame = $('#video');
    url = 'https://media.chesscomfiles.com/videos/square/ESP-PRI-value-of-the-pieces-g8f.mp4';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video5') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    info.style.display = "none";
  }

  //video6
  document.getElementById("video6").onclick = video6;
  function video6() {
    frame = $('#video');
    url = 'https://media.chesscomfiles.com/videos/square/ESP-PRI-pawn-race-f9c.mp4';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video6') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    info.style.display = "none";
  }

  //video7
  document.getElementById("video7").onclick = video7;
  function video7() {
    frame = $('#video');
    url = 'https://media.chesscomfiles.com/videos/square/ESP-PRI-1-e4-openings-for-beginners-white-h1a.mp4';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video7') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    info.style.display = "none";
  }


  //video8
  document.getElementById("video8").onclick = video8;
  function video8() {
    frame = $('#video');
    url = 'https://media.chesscomfiles.com/videos/square/ESP-INT-using-your-bishops-p3f.mp4';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video8') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    info.style.display = "none";
  }


  //video9
  document.getElementById("video9").onclick = video9;
  function video9() {
    frame = $('#video');
    url = 'https://media.chesscomfiles.com/videos/square/ESP-INT-passed-pawns-p0q.mp4';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if ($('#video9') == iframes[i]) {
        iframes[i].parentNode.appendChild(frame.attr('src', url).show());
      }
    }
    frame.attr('src', url).show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    info.style.display = "none";
  }



  const SELECTORS = {
    section: '[data-section]',
    scrollTo: '[data-scroll-to]',
    scrollDir: '[data-scroll-dir]'
  }
  const sectionsArray = Array.from(document.querySelectorAll(SELECTORS.section))
  const scrollToElements = document.querySelectorAll(SELECTORS.scrollTo)
  const scrollDirElements = document.querySelectorAll(SELECTORS.scrollDir)
  
  let currentSectionIndex = 0
  
  const getScrollTarget = dir => {
    if (dir === 'prev' && currentSectionIndex > 0) {
      currentSectionIndex--
      return sectionsArray[currentSectionIndex]
    }
    if (dir === 'next' && currentSectionIndex < sectionsArray.length-1) {
      currentSectionIndex++
      return sectionsArray[currentSectionIndex]
    }
    return false
  }
  
  scrollDirElements.forEach(el => {
    el.addEventListener('click', () => {
      const direction = el.dataset.scrollDir
      const target = getScrollTarget(direction)
      
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    })
  })
  
  scrollToElements.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault()
      const targetId = el.getAttribute('href')
      const target = document.querySelector(targetId)
      
      if (target) {
        sectionsArray.forEach((section, index) => {
          if (section.id === targetId.replace('#','')) {
            currentSectionIndex = index
          }
        })
        target.scrollIntoView({ behavior: 'smooth' });
      }
    })
  })

  
});