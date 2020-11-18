const gameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  let isOver = false;
  let isTie = false;
  let markWinner = "";
  let status;

  const pickCell = function (playerName, mark, index) {
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
    if(isTie == true){
      document.getElementById("legend").textContent = `It's a tie`
      document.getElementById("score").classList.remove("no-display");
      return
    }
    // darwn line
    drawWinner(status.winningCombination);
    //add logic if is tie show gameover section is not show winner
    showWinner(playerName);
  };

  const robotPickCell = function (playerName, mark) {
    //get random index
    let rndm;
    const getRandomNum = () => {
      const min = Math.ceil(0);
      const max = Math.floor(board.length - 1);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const checkEmptyCell = () => {
      if(board.every(elem=> elem != "")){
        return
      }
      rndm = getRandomNum();
      if (board[rndm] != "") {
        checkEmptyCell();
      }

      return rndm;
    };
    checkEmptyCell();

    pickCell(playerName, mark, rndm);

  };

  const gameStatus = function (mark, index) {
    //winning cases
    let winningCombo;
    const winningCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    //check if selected cell is in one of the winning cases
    winningCombo = winningCases.filter((x) => x.includes(index));
    const areEquals = (elem) => elem == mark;

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

    if(board.every(elem => elem != "") && returnMark == ""){
      isTie = true;
      isGameOver = true;
    }
    return {
      winningCombination: winningCombination,
      isOver: isGameOver,
      winnerMark: returnMark,
      isTie: isTie,
    };
  };

  const draw = function (mark, index) {
    document.getElementById(index).textContent = mark;
  };

  const drawWinner = (arr) => {
    arr.forEach((element) =>
      document.getElementById(element.toString()).classList.add("winner")
    );
  };

  const showWinner = (str) => {
    document.getElementById("legend").textContent = `The winner is: ${str}`;
    document.getElementById("score").classList.remove("no-display");
  };


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
  let numPlayers;
  const container = document.getElementById("grid");
  container.addEventListener("click", function (event) {
    if (nextPlayer == 1) {
      mark = player1.mark;
      playerName = player1.name;
    } else {
      mark = player2.mark;
      playerName = player2.name;
    }
    gameBoard.pickCell(playerName, mark, parseInt(event.target.id));
    if (nextPlayer == 1) {
      if (player2.isAI) {
        gameBoard.robotPickCell(player2.name, player2.mark);
      } else {
        nextPlayer = 2;
      }
    } else {
      nextPlayer = 1;
    }
  });

  let player1 = null;
  let player2 = null;
  const start = document.getElementById("start-btn");
  const radios = document.getElementsByName("marks");

  const playerX = "x";
  const playerO = "o";
  let singlePlayerName;
  let singlePlayerMark = playerX;
  let pcPlayerMark = playerO;
  let playerXName;
  let playerOName;
  

  radios.forEach((r) => {
    r.addEventListener("click", function (event) {
      event.target.setAttribute("checked", "checked");
      singlePlayerMark = event.target.value;
      if (singlePlayerMark === "x") {
        pcPlayerMark = playerO;
      } else {
        pcPlayerMark =playerX;
      }  
    });
  });
 
  start.addEventListener("click", function (event) {
    //one or two players
    event.preventDefault();
    singlePlayerName = document.getElementById("name").value;
    if(singlePlayerName === ''){
      singlePlayerName = singlePlayerMark;
    }
    playerXName = document.getElementById('x-name').value;
    if(playerXName == ""){
      playerXName = playerX;
    }

    playerOName = document.getElementById('o-name').value;
    if(playerOName == ""){
      playerOName = playerO;
    }

    
    if (numPlayers === 1) {
      player1 = Player(singlePlayerName, singlePlayerMark, false);
      console.log(player1);
      player2 = Player("Computer", pcPlayerMark, true);
      console.log(player2);
    }else{
      player1 = Player(playerXName, playerX, false);
      console.log(player1);
      player2 =Player(playerOName, playerO, false);
      console.log(player2);
    }

    document.getElementById("players").classList.add("no-display");
  });

  document
    .getElementById("play-again")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.reload();
    });
  document
    .getElementById("one-player")
    .addEventListener("click", function (event) {
      event.preventDefault();
      numPlayers = 1;
      document.getElementById("two-players").classList.add("no-display");
      document.getElementById("one-player").classList.add("no-display");
      document.getElementById("info-one").classList.remove("no-display");
      document.getElementById("start-btn").classList.remove("no-display");
    });
  document
    .getElementById("two-players")
    .addEventListener("click", function (event) {
      numPlayers = 2;
      event.preventDefault();
      document.getElementById("two-players").classList.add("no-display");
      document.getElementById("one-player").classList.add("no-display");
      document.getElementById("info-two").classList.remove("no-display");
      document.getElementById("start-btn").classList.remove("no-display");
    });
})();