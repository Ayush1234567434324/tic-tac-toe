
const block = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const ans = [["1", "2", "3"], ["1", "5", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["3", "5", "7"], ["7", "8", "9"], ["4", "5", "6"]];
var player1 = new Array;
var player2 = new Array;
var winner = new Array;
let count = 0, run = 0;
var cnt = 1;
var jump= new Audio("Audio/click.wav");
var win= new Audio("Audio/win.wav");


//exit
$(".bye").click(
  function () {
    jump.play();
    $(".st").css("visibility", "hidden");
    $(".tell").css("visibility", "visible");
    $("h1").text("Are you sure?");
    $(".fa").css("visibility", "hidden");
    $(".st").css("height", "0");
    $(".st").css("width", "0");
    $(".tell").css("height", "6rem");
    $(".tell").css("width", "35rem");
    $(".tell").css("opacity", "1");
    $(".start").css("height", "33rem");
    $(".start").css("bottom", "55rem");
    $(".screen").css("margin-top", "-10rem");
    $(".yes").click(function () {
      window.close();

    });
    $(".no").click(function () {
      window.location.reload();

    });
  }
);

//one vs one
$(".you").click(
  function () {
    jump.play();
    $('.fa').attr('title', 'If you quit you will have to start with origin');
    $(".start").css("visibility", "hidden");
    $(".start").css("bottom", "0");
    $(".block").css("animation", "rotating 0s infinite");
    $(".threeD").css("animation", "rotating 0s infinite");
    $(".fa").removeClass("fa-gear");
    $(".fa").addClass("fa-close");
    shut();
    $(".block").click(function () { check(this.id); });
  });

//you vs computer
$(".computer").click(
  function () {
    jump.play();
    $('.fa').attr('title', 'If you quit you will have to start with origin');
    $(".start").css("visibility", "hidden");
    $(".start").css("bottom", "0");
    $(".block").css("animation", "rotating 0s infinite");
    $(".threeD").css("animation", "rotating 0s infinite");
    $(".fa").removeClass("fa-gear");
    $(".fa").addClass("fa-close");
    shut();
    $(".block").click(function () { Bot(this.id); });

  }
);






//hover properity
$(document).ready(function () {
  $(".block").hover(function () {
    $(this).css("animation", "rotate 1.5s infinite");
  }, function () {
    $(this).css("animation", "rotate 0s infinite");
  });
});



//for Bot 
function Bot(drop) {
  var touch = drop;
  var index = touch - '0';
  index--;

  if ($("#" + touch).html() == '') {
    if (count % 2 == 0) {
      jump.play();
      $("." + block[index]).text("X");
      $("." + block[index]).addClass("cross");
      player1.push(touch);
      var out = valid(player1);
      if (out == 1) {
        final(winner);
        $("h1").text("You won");
        cnt++;
        setTimeout(function () {
          hakai();
        }, 1000);

        return;
      }
      else if (player1.length + player2.length == 9) {

        $("h1").text("Tie");
        setTimeout(function () {
          hakai();
        }, 1000);
        return;

      }
    }

    setTimeout(function () {
      var delta = workbot();
      jump.play();
      $("." + block[delta]).text("O");
      $("." + block[delta]).addClass("zero");
      delta++;
      var x = delta.toString();
      player2.push(x);
      var out = valid(player2);
      if (out == 1) {
        final(winner);
        $("h1").text("Computer won");
        if (cnt > 1)
          cnt--;
        setTimeout(function () {
          hakai();
        }, 1000);
        return;

      }
      else if (player1.length + player2.length == 9) {

        $("h1").text("Tie");
        setTimeout(function () {
          hakai();
        }, 1000);
        return;

      }


      count += 2;
    }, 500);

    $("h1").text("Level " + cnt);

  }



}


//Bot values
function workbot() {

   var index = Math.floor(Math.random() * 9 + 1);
   var p = 0;
 
  while ($("." + block[index - 1]).text() != '') {
    p++;
    index = p;
    if (index == 10) {
      hakai();
      return 0;
    }
  }

  return index - 1;

}



//for multi player check function
function check(drop) {
  var touch = drop;
  var index = touch - '0';
  index--;

  if ($("#" + touch).html() == '') {
    if (count % 2 == 0) {
      jump.play();
      $("." + block[index]).text("X");
      $("." + block[index]).addClass("cross");
      player1.push(touch);
      var out = valid(player1);
      if (out == 1) {
        final(winner);
        $("h1").text("Player 1 won");
        setTimeout(function () {
          hakai();
        }, 1000);
      }
      else if (player1.length + player2.length == 9) {

        $("h1").text("Tie");
        setTimeout(function () {
          hakai();
        }, 1000);

      }
    }
    else {
      jump.play();
      $("." + block[index]).text("O");
      $("." + block[index]).addClass("zero");
      player2.push(touch);
      var out = valid(player2);
      if (out == 1) {
        final(winner);
        $("h1").text("Player 2 won");
        setTimeout(function () {
          hakai();
        }, 1000);

      }
      else if (player1.length + player2.length == 9) {

        $("h1").text("Tie");
        setTimeout(function () {
          hakai();
        }, 1000);

      }

    }
    count++;

  }



}





//mark the winning blocks
function final(info) {
  for (var i = 0; i < info.length; i++) {
    var x = info[i] - '0';
    x--;
    $("." + block[x]).addClass("Winner");
         win.play();
  }

}


//condition for winning the pieces check
function valid(info) {
  for (var i = 0; i < 8; i++) {
    let detail = 0;
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < info.length; k++) {
        if (ans[i][j] == info[k]) {
          winner.push(info[k]);

          detail++;

        }
      }
      if (detail == 3) {

        return 1;
      }


    }

    while (winner.length > 0) {
      winner.pop();
    }

  }
  return 0;

}




//Erase all unused data to restore the original verse
function hakai() {
  while (player1.length > 0) {
    player1.pop();
  }
  while (player2.length > 0) {
    player2.pop();
  }
  while (winner.length > 0) {
    winner.pop();
  }

  $(".block").text('');
  $(".block").removeClass("cross");
  $(".block").removeClass("zero");
  $(".threeD").removeClass("zero");
  $(".threeD").removeClass("cross");
  $(".block").removeClass("Winner");
  $(".threeD").removeClass("Winner");
  $("h1").text("Tic-Tac-Toe");
  count = 0;
  lvl = -1;

}

//close click
function shut() {


  $(".fa-close").click(
     
    function () {
      jump.play();
      $(".block").css("visibility", "hidden");
      window.location.reload();
    }

  );
}



//tooltip option
$(function () {

  
  $("#tooltip-1").tooltip();
});

//Arena color
var bell = 0;
$(".fa-gear").click(function () {
  bell++;
  jump.play();
  if (bell == 1) {
    $(".block").css("background", " #00c1ed");
    $(".shadow").css("background", " #00c1ed");

  }
  else if (bell == 2) {

    $(".block").css("background", "linear-gradient( 95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% )");
    $(".shadow").css("background", "linear-gradient( 95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% )");

  }
  else if (bell == 3) {

    $(".block").css("background", "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)");
    $(".shadow").css("background", "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)");

  }
  else if (bell == 4) {

    $(".block").css("background", "#FF6F61");
    $(".shadow").css("background", "#FF6F61");

  }
  else if (bell == 5) {

    $(".block").css("background", "#88B04B");
    $(".shadow").css("background", "#88B04B");

  }
  else if (bell == 6) {

    $(".block").css("background", "#9B2335");
    $(".shadow").css("background", "#9B2335");

  } else if (bell == 7) {

    $(".block").css("background", "#C3447A");
    $(".shadow").css("background", "#C3447A");

  } else if (bell == 8) {

    $(".block").css("background", " linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)");
    $(".shadow").css("background", " linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)");

  } else if (bell == 9) {

    $(".block").css("background", "rgba(50, 115, 220, 0.3)");
    $(".shadow").css("background", "rgba(50, 115, 220, 0.3)");

  }
  else {
    bell = 0;
    $(".block").css("background", "#000000");
    $(".shadow").css("background", "white");

  }





});

