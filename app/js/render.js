
$(function(){
  //instantiate
  var boardSize = 80;
  var minWaitBetweenSteps = 100; // in millisenconds


  var timer = null;
  $('.genStart').click(function(){
      timer = window.setInterval(nextStep, minWaitBetweenSteps);
  });
  $('.genStop').click(function(){
      window.clearInterval(timer);
  });
  $('.genReset').click(function(){
      $('.genStop').click();
      conwaysBoard.newRandomBoard(boardSize);
      initBoard();

  });

  $('.genReset').click();


  function nextStep(){
    conwaysBoard.stepForward();
    syncDisplay();
  }

  function initBoard(){
    $("#conway").empty();
    for(var row = 0; row < conwaysBoard.cells.length; row++){
      var r = $("<div>").addClass('row').attr('id', 'row'+row);
      for(var col = 0; col < conwaysBoard.cells[row].length; col++){
        $("<div>").addClass('cell').attr('id', 'cell'+row+col).appendTo(r);
      }
      r.appendTo("#conway");
    }

    syncDisplay();
  }

  //get in sync
  function syncDisplay(){
    var syncStart = Date.now();

    for(var row = conwaysBoard.cells.length -1; row > 0; row--){
      for(var col = conwaysBoard.cells[row].length -1; col > 0; col--){
          if(conwaysBoard.cells[row][col].isAlive()){
            $("#cell" + row + col).addClass('alive');
          }else {
            $("#cell" + row + col).removeClass('alive');
          }
      }
    }
    $('.gen span').html(conwaysBoard.generation);
    $('.pop span').html(conwaysBoard.population);
    $('.tme span').html(conwaysBoard.genTime);
    $('.stm span').html(Date.now() - syncStart);
  }


});
