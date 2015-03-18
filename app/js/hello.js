
var conwaysBoard = {
  cells: null,
  generation: 0,
  population: 0,
  genTime: 0,
  stepForward: function(){
    var startStep = Date.now();
    var board = this.createTemp();

    for(var row = board.length - 1; row > -1; row--){
      for(var col = board[row].length -1;col > -1; col--){
        board[row][col] = this.liveOrDie(this.cells[row][col].isAlive(), this.determineLiveNeighbors(row, col));
      }
    }

    this.syncTemp(board);
    this.generation++;

    //console.log(Date.now() - startStep);
    this.genTime = (Date.now() - startStep);
    return board;

  },
  countPopulation: function(){
    var counter = 0;
    for(var row = this.cells.length - 1; row > -1; row--){
      for(var col = this.cells[row].length -1;col > -1; col--){
        if(this.cells[row][col].isAlive()){counter++}
      }
    }
    this.population = counter;
    return counter;
  },
  createTemp: function(){
    var board = [];
    for(var i = 0; i < this.cells.length; i++){
      board.push(this.cells[i].map(function(c){ return c.isAlive(); }));
    }
    return board;
  },
  syncTemp: function(board){
    var count = 0;

    for(var row = board.length - 1; row > -1; row--){
      for(var col = board[row].length -1;col > -1; col--){
        this.cells[row][col].setAlive( board[row][col] );
        if(board[row][col]){count++;}
      }
    }
    this.population = count;
  },
  newRandomBoard: function(num){
    this.newBoard(num);
    for(var row = 0; row < num; row++){
      for(var col = 0; col < num; col++){
        if(Math.random() > .5){
            this.cells[row][col].setAlive( true );
        }
      }
    }

  },
  newBoardFromString: function(str){
    var size = Math.ceil(Math.sqrt(str.length));

    this.newBoard(size);

    var total = 0;
    var board = [];
    for(var row = 0; row < size; row++){
      board.push([]);
      for(var col = 0; col < size; col++){
        if(total < str.length && parseInt(str.charAt(total))> 0){
          board[row].push(true)
        } else {
          board[row].push(false)
        }
        total++;
      }
    }

    this.syncTemp(board);

    return board;
  },
  determineLiveNeighbors: function(row, col){

    if(this.cells !== null){
      var liveNeighbors = 0;

      if(row > 0 ){ //find northern neighbors
        r = row - 1;
        liveNeighbors += addIfAlive( this.cells[r][col].isAlive() );
        if((col - 1) > -1 ){ //find western neighbor
          liveNeighbors += addIfAlive( this.cells[r][col-1].isAlive() );
        }
        if((col + 1) < this.cells[row].length ){ //find eastern neighbor
          liveNeighbors += addIfAlive( this.cells[r][col+1].isAlive() );
        }
      }

      if((col + 1) < this.cells[row].length ){ //find eastern neighbor
        liveNeighbors += addIfAlive( this.cells[row][col+1].isAlive() );
      }
      if((col - 1) > -1 ){ //find western neighbor
        liveNeighbors += addIfAlive( this.cells[row][col-1].isAlive() );
      }

      if((row + 1) < this.cells[row].length ){ //find southern neighbors
        r = row + 1;
        liveNeighbors += addIfAlive( this.cells[r][col].isAlive() );
        if((col + 1) < this.cells[row].length ){ //find eastern neighbor
          liveNeighbors += addIfAlive( this.cells[r][col+1].isAlive() );
        }
        if((col - 1) > -1 ){ //find western neighbor
          liveNeighbors += addIfAlive( this.cells[r][col-1].isAlive() );
        }
      }

      //if(this.cells[row][col].isAlive()){liveNeighbors++}

      return liveNeighbors;
    } else {
      return null
    }

    function addIfAlive(test){ if(test){ return 1; } return 0; }
  },
  liveOrDie: function(alive, neighbors) {
    if(neighbors < 2 || neighbors > 3 || (alive == false && neighbors == 2)){
      return false;
    }
    return true;
  },
  resetBoard: function(){
    this.cells = null;
    this.generation = 0;
  },
  newBoard: function(size) {
    this.resetBoard();
    var board = [];
    for(var row = 0; row < size; row++){
      board.push([])
      for(var col = 0; col < size; col++){
        board[row].push( new Cell() );
      }
    }
    this.cells = board;
    return board;
  }
}

var Cell = function() {
  this.alive = false;
  this.isAlive = function() {
    return this.alive;
  }
  this.setAlive = function(vida){
    if(vida == true){
      this.alive = true;
    } else {
      this.alive = false;
    }
    return this.isAlive();
  }
}
