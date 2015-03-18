

describe('conway', function(){

  it('should have a board', function () {
    expect(conwaysBoard).toBeDefined();
  });

  it('The board should have cells', function () {
    expect(conwaysBoard.cells).toBeDefined();
  });

  it('should have a method to determine number of live neighbors', function () {
    expect(conwaysBoard.determineLiveNeighbors).toBeDefined();
  });

  it('should be able to track population', function(){
    expect(conwaysBoard.population).toBeDefined();
  });
  it('should be able to count population', function(){
    expect(conwaysBoard.countPopulation).toBeDefined();
  });
  it('should count population acurrately', function(){
    var tempBoard = conwaysBoard.newBoardFromString('010110000');
    conwaysBoard.syncTemp(tempBoard);
    expect(conwaysBoard.countPopulation()).toEqual(3);
  })

  describe('advancing generations', function(){
    it('should have a function for advancing a generation', function(){
      expect(conwaysBoard.stepForward).toBeDefined();
    })

    it('should have a property for tracking generations', function(){
      expect(conwaysBoard.generation).toBeDefined();
    })

    it('should be at generation 0 after creating a new board', function(){
      conwaysBoard.newBoard(3);
      expect(conwaysBoard.generation).toEqual(0);
    });

    it('should increment the generation property when advancing generations', function(){
      conwaysBoard.newBoard(3);
      var currentGeneration = conwaysBoard.generation;
      conwaysBoard.stepForward();
      expect(conwaysBoard.generation).toEqual(currentGeneration + 1);
    })

    it('should create a temporary instance of a new board', function(){
      conwaysBoard.newBoard(3);
      var tempBoard = conwaysBoard.stepForward();
      expect(tempBoard).toBeDefined();
    });

    it('should have a function to sync temp boards with cells', function(){
      expect(conwaysBoard.syncTemp).toBeDefined();
    });

    it('should have a function to create a temp board', function(){
      expect(conwaysBoard.createTemp).toBeDefined();
    })

    it('should create a flat array from the cell objects', function(){
      conwaysBoard.newBoard(2);
      conwaysBoard.cells[0][0].setAlive(true);
      var temp = conwaysBoard.createTemp();
      var ref = [[true, false],[false, false]];
      expect(temp).toEqual(ref);
    })


    it('should be able to sync a temp board to cells', function(){
      var ref = [
        [false,true,false],
        [true,true,false],
        [false,false,false]
      ];
      conwaysBoard.newBoard(3);
      conwaysBoard.syncTemp(ref);
      var tempBoard = conwaysBoard.createTemp();
      expect(tempBoard).toEqual(ref);
    });

    it('should advance generations', function(){
      var ref = [
        [false,true,false],
        [true,true,false],
        [false,false,false]
      ];
      var expectedRef = [
        [true, true, false],
        [true, true, false],
        [false, false, false]
      ]
      conwaysBoard.newBoard(3);
      conwaysBoard.syncTemp(ref);
      conwaysBoard.stepForward();
      expect(conwaysBoard.createTemp()).toEqual(expectedRef);

    })
    it('should be able to time a generation', function(){
      //
    })
    it('should count population at the end of each generation', function(){
      var tempBoard = conwaysBoard.newBoardFromString('010110000');
      conwaysBoard.syncTemp(tempBoard);
      conwaysBoard.stepForward();
      console.log(conwaysBoard.population);
      expect(conwaysBoard.population).toEqual(4);
    });

  });

  describe('board creation', function(){
    it('should have a board constructor function', function(){
      expect(conwaysBoard.newBoard).toBeDefined();
    });

    it('should accept a number and generate a 2d array', function(){
      for(var s = 1; s < 10; s++){
        var board = conwaysBoard.newBoard(s);
        expect(board.length).toBe(s);
        for(var i = 0; i < board.length; i++){
          expect(board[i].length).toBe(s);
        }
      }
    });

    it("should have the ability to create randomized boards", function(){
      expect(conwaysBoard.newRandomBoard).toBeDefined();
    })

    it("it should create cells of type Cell", function(){
      var board = conwaysBoard.newBoard(3);
      expect(board[2][2] instanceof Cell).toBe(true);
    });

    it('should set cells when generating a new board', function(){
      var board = conwaysBoard.newBoard(3);
      expect(conwaysBoard.cells).toEqual(board);
    })

    it('should have a method to clear the current board', function(){
      expect(conwaysBoard.resetBoard).toBeDefined();
    })

    it('should reset cells to null when clearing board', function(){
      var board = conwaysBoard.newBoard(3);
      conwaysBoard.resetBoard();

      expect(conwaysBoard.cells).toEqual(null);
    })

    it('should be able to create a board from a string of 1s and 0s', function(){
      expect(conwaysBoard.newBoardFromString).toBeDefined();
    });

    it('should be able to create a temp board from string', function(){
      var ref = [
        [false,true,false],
        [true,true,false],
        [false,false,false]
      ];
      var tempBoard = conwaysBoard.newBoardFromString('010110000');
      expect(conwaysBoard.newBoardFromString('010110000')).toEqual(ref);
      expect(conwaysBoard.createTemp()).toEqual(tempBoard);
    })

  });//define



  describe('determing if a cell lives or dies', function () {
    it('Determine if a cell will live or die', function(){
      expect(conwaysBoard.liveOrDie()).toMatch(jasmine.any(Boolean));
    });

    it('should die if it has fewer than 2 live neighbors', function() {
      expect(conwaysBoard.liveOrDie(true, 1)).toEqual(false);
    });

    it("should live if it is already alive and has 2 or 3 live neighbors", function(){
      expect(conwaysBoard.liveOrDie(true, 2)).toEqual(true);
      expect(conwaysBoard.liveOrDie(true, 3)).toEqual(true);
    })

    it('should die if more than 3 live neighbors', function() {
      expect(conwaysBoard.liveOrDie(true, 4)).toEqual(false);
    });

    it('should stay dead if it is dead and has 2 live neighbors', function(){
      expect(conwaysBoard.liveOrDie(false, 2)).toEqual(false);
    })

  });//define

  describe("the cell class", function(){
    it("should be able to create cells", function(){
      expect(Cell).toBeDefined();
    });

    it('should have a method to determine if a cell is alive or dead', function(){
      var cell = new Cell();
      expect(cell.isAlive).toBeDefined();
    });

    it('isAlive should return false', function() {
      var cell = new Cell();
      expect(cell.isAlive()).toBe(false);
    });

    it('should be able to set it\'s own alive-ness', function(){
      var cell = new Cell();
      expect(cell.setAlive).toBeDefined();

    });

    it('should return alive state from setAlive', function(){
      var cell = new Cell();
      expect(cell.setAlive(true)).toEqual(true);
      expect(cell.setAlive(false)).toEqual(false);
    })
  })


  describe("find neighbors", function(){

    it('should calculate the number of neighbors', function(){
      conwaysBoard.newBoard(3);
      conwaysBoard.cells[0][0].setAlive(true);
      conwaysBoard.cells[0][1].setAlive(true);
      conwaysBoard.cells[0][2].setAlive(true);
      conwaysBoard.cells[1][0].setAlive(true);
      expect(conwaysBoard.determineLiveNeighbors(1, 1)).toEqual(4);
    })

    it('should be able to find an eastern neighbor', function(){
      conwaysBoard.newBoard(3);
      conwaysBoard.cells[0][1].setAlive(true);
      expect(conwaysBoard.determineLiveNeighbors(0, 0)).toEqual(1);
    });

    it('should be able to find a western neighbor', function(){
      conwaysBoard.newBoard(3);
      conwaysBoard.cells[0][0].setAlive(true);
      expect(conwaysBoard.determineLiveNeighbors(0, 1)).toEqual(1);
    });

    it('should be able to find a southern neighbor', function(){
      conwaysBoard.newBoard(3);
      conwaysBoard.cells[1][1].setAlive(true);
      expect(conwaysBoard.determineLiveNeighbors(0, 1)).toEqual(1);
    });

    it('should be able to find a northern neighbor', function(){
      conwaysBoard.newBoard(3);
      conwaysBoard.cells[0][1].setAlive(true);
      expect(conwaysBoard.determineLiveNeighbors(1, 1)).toEqual(1);
    });

    it('should be able to find a north-western neighbor', function(){
      conwaysBoard.newBoard(3);
      conwaysBoard.cells[0][0].setAlive(true);
      expect(conwaysBoard.determineLiveNeighbors(1, 1)).toEqual(1);
    });

    it('should be able to find a north-eastern neighbor', function(){
      conwaysBoard.newBoard(3);
      conwaysBoard.cells[0][2].setAlive(true);
      expect(conwaysBoard.determineLiveNeighbors(1, 1)).toEqual(1);
    });

    it('should be able to find a south-western neighbor', function(){
      conwaysBoard.newBoard(3);
      conwaysBoard.cells[2][0].setAlive(true);
      expect(conwaysBoard.determineLiveNeighbors(1, 1)).toEqual(1);
    });

    it('should be able to find a south-eastern neighbor', function(){
      conwaysBoard.newBoard(3);
      conwaysBoard.cells[2][2].setAlive(true);
      expect(conwaysBoard.determineLiveNeighbors(1, 1)).toEqual(1);
    });


  })


})//define
