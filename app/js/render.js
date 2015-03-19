
$(function(){
  //instantiate
  var boardSize = 50;
  var minWaitBetweenSteps = 60; // in millisenconds


  var timer = null;
  $('.genStart').click(function(){
      if(timer == null){
        timer = window.setInterval(nextStep, minWaitBetweenSteps);
      }
  });
  $('.genStop').click(function(){
      window.clearInterval(timer);
      timer = null;
  });
  $('.genClear').click(function(){
      $('.genStop').click();
      conwaysBoard.newBoard(boardSize);
      initBoard();
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

    $("#conway").on('click', '.cell', function(){
      conwaysBoard.cells[$(this).data('row')][$(this).data('col')].setAlive(true);
      syncDisplay();
    })


    for(var row = 0; row < conwaysBoard.cells.length; row++){
      var r = $("<div>").addClass('row').attr('id', 'row'+row);
      for(var col = 0; col < conwaysBoard.cells[row].length; col++){
        $("<div>")
          .addClass('cell')
          .attr('id', 'cell'+row+col)
          .data({'row': row, 'col': col})
          .appendTo(r);
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
          var t = $("#cell" + row + col);
          //var alive =
          if(conwaysBoard.cells[row][col].isAlive()){
            t.addClass('alive');
            t.removeClass('dead');
          }else {
            if(t.hasClass('alive')){t.addClass('dead');}
            t.removeClass('alive');
          }
      }
    }
    $('.gen span').html(conwaysBoard.generation);
    $('.pop span').html(conwaysBoard.population);
    $('.tme span').html(conwaysBoard.genTime);
    $('.stm span').html(Date.now() - syncStart);
  }


});
