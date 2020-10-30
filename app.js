const gameBoard = (function(){
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];
    
    let isOver = false;
    let isTie = false;
    let markWinner = "";

    const pickCell = function(mark, index){
        if(isOver == true){
            return
        }
        if(board[index] != ""){
            return
        }
        draw(mark, index);
        board[index] = mark;
        let gameSatus = gameStatus();
        if(gameStatus.isOver == false){
            return
        }
        isOver = true;
        isTie = gameStatus.isTie;
        markWinner = gameStatus.winnerMark;
        

    }
    const robotPickCell = function(mark){
        //calcular espacios vacios para obtener un index 
        pickCell(mark, index)
    }

    const gameStatus = function(){
        //agregar los casos en que se termina el juego, sacar el winner, empate etc.
        return {
            isOver: false,
            winnerMark: "",
            tie: false
        }
        
    }
    

    const draw = function(mark, index){
        document.getElementById(index).textContent = mark;

    }
    return {
        pickCell
    }
    

          
})();

const Player = (name, mark, isAI) => {
    return {name, mark, isAI}

} 

const displayController = (function(){
    let nextPlayer = 1;
    const container = document.getElementById('grid');
    container.addEventListener('click', function(event){
        
        if(nextPlayer == 1){
            mark = player1.mark;
        }else{
            mark = player2.mark;
        }
        gameBoard.pickCell(mark, event.target.id);
        if(nextPlayer == 1){
            if(player2.isAI){
                gameBoard.robotPickCell(player2.mark)
            }else{
                nextPlayer = 2;
            }
        }else{
            nextPlayer = 1;
        }
        if(gameBoard.isOver){
             //hacer una funcion para que pinte quien es el ganador
             console.log(gameBoard.markWinner);
        }

    })

    let player1 = null;
    let player2 = null;
    const start = document.getElementById('start-btn');
    const radios = document.getElementsByName('marks');


    let singlePlayerName = "";
    let singlePlayerMark = "";

    radios.forEach(r => {r.addEventListener('click', function(event){
        event.target.setAttribute("checked", "checked");
        singlePlayerMark = event.target.value;
        singlePlayerName = document.getElementById("name").value;
    })});

    start.addEventListener('click', function(event){
        //sacar name y mark del event target
        event.preventDefault()
        player1 = Player(singlePlayerName, singlePlayerMark, false);
        console.log(player1)
        //player2 = Player(name, mark)
    })
})();

