const gameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  let isOver = false;
  let isTie = false;
  let markWinner = "";
  let status;

  const pickCell = function (mark, index) {
    if (isOver == true) {
      return;
    }
    if (board[index] != "") {
      return;
    }
    draw(mark, index);
    board[index] = mark;
    status = gameStatus(mark, index);
    if (status.isOver == false) {
      return;
    }
    isOver = true;
    isTie = status.isTie;
    markWinner = status.winnerMark;
    // darwn line
    drawWinner(status.winningCombination);
  };

  const robotPickCell = function (mark) {
    //calcular espacios vacios para obtener un index
    let rndm;
    const getRandomNum = () => {
      const min = Math.ceil(0);
      const max = Math.floor(board.length - 1);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const checkEmptyCell = () => {
      if (board.every((ind) => ind != "")) {
        //aqui va funcion para saber quien gano
        return;
      }
      rndm = getRandomNum();
      if (board[rndm] != "") {
        checkEmptyCell();
      }

      return rndm;
    };
    checkEmptyCell();

    console.log({ rndm });
    console.log({ mark });
    pickCell(mark, rndm);
    console.log(board);
  };

  const gameStatus = function (mark, index) {
    //agregar los casos en que se termina el juego, sacar el winner, empate etc.
    let winningCombo;
    const winningCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8]
    ];
    //checar si el contenido en board es igual a mark en los indices del arreglo filtrado
    winningCombo = winningCases.filter((x) => x.includes(index));
    const areEquals = (elem) => elem == mark;

    console.log({ winningCombo });
    console.log({ board });

    let isGameOver = false;
    let returnMark = "";
    let winningCombination;
    winningCombo.forEach((conv) => {
      let arr = [];
      arr.push(board[conv[0]]);
      arr.push(board[conv[1]]);
      arr.push(board[conv[2]]);

      if (arr.every(areEquals)) {
        winningCombination = conv;
        isGameOver = true;
        returnMark = mark;
      }
    });

    return {
      winningCombination: winningCombination,
      isOver: isGameOver,
      winnerMark: returnMark,
      tie: false,
    };
  };

  const draw = function (mark, index) {
    document.getElementById(index).textContent = mark;
  };

  const drawWinner = (arr) => {
    arr.forEach(element => document.getElementById(element.toString()).classList.add('winner'))
  }
  
  return {
    pickCell,
    robotPickCell,
  };
})();

const Player = (name, mark, isAI) => {
  return { name, mark, isAI };
};

const displayController = (function () {
  let nextPlayer = 1;
  const container = document.getElementById("grid");
  container.addEventListener("click", function (event) {
    if (nextPlayer == 1) {
      mark = player1.mark;
    } else {
      mark = player2.mark;
    }
    gameBoard.pickCell(mark, parseInt(event.target.id));
    if (nextPlayer == 1) {
      if (player2.isAI) {
        gameBoard.robotPickCell(player2.mark);
      } else {
        nextPlayer = 2;
      }
    } else {
      nextPlayer = 1;
    }
    if (gameBoard.isOver) {
      //hacer una funcion para que pinte quien es el ganador
      console.log(gameBoard.markWinner);
    }
  });

  let player1 = null;
  let player2 = null;
  const start = document.getElementById("start-btn");
  const radios = document.getElementsByName("marks");

  let singlePlayerName = "";
  let singlePlayerMark = "";
  let pcPlayerMark = "";

  radios.forEach((r) => {
    r.addEventListener("click", function (event) {
      event.target.setAttribute("checked", "checked");
      singlePlayerMark = event.target.value;
      singlePlayerName = document.getElementById("name").value;
      if (singlePlayerMark === "x") {
        pcPlayerMark = "o";
      } else {
        pcPlayerMark = "x";
      }
    });
  });

  start.addEventListener("click", function (event) {
    //sacar name y mark del event target
    event.preventDefault();
    player1 = Player(singlePlayerName, singlePlayerMark, false);
    console.log(player1);
    player2 = Player("pc", pcPlayerMark, true);
    console.log(player2);
  });
})();
