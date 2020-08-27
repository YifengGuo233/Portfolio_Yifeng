class Player{
  constructor(name, color){
    this.name = name;
    this.color = color;
  }
}

class Chess{
  constructor(player, name, color, symbol, id){
    this.player = player;
    this.name = name;
    this.color = color;
    this.symbol = symbol;
    this.id = id;
    this.alive = true;
  }
}

let CurrentlySelected = null;
let Player1 = new Player("Player1", "W");
let Player2 = new Player("Player2", "B");
document.getElementById("player1").innerHTML = "Player1 Name : " + Player1.name;
document.getElementById("player2").innerHTML = "Player2 Name : " + Player2.name;


let KingB = new Chess("B", "King", "LightGreen", "🤴", "1BK");
let QueenB = new Chess("B", "Queen", "LightGreen", "👑", "1BQ");
let Rock1B = new Chess("B", "Rock", "LightGreen", "🛸", "1BR");
let Rock2B = new Chess("B", "Rock", "LightGreen", "🛸", "2BR");
let Bishop1B = new Chess("B", "Bishop", "LightGreen", "💂‍♂️", "1BB");
let Bishop2B = new Chess("B", "Bishop", "LightGreen", "💂‍♂️", "2BB");
let Knight1B = new Chess("B", "Knight", "LightGreen", "🐎", "1BKn");
let Knight2B = new Chess("B", "Knight", "LightGreen", "🐎", "2BKn");
let Pawn1B = new Chess("B", "Pawn", "LightGreen", "🤽‍♂️", "1BP");
let Pawn2B = new Chess("B", "Pawn", "LightGreen", "🤽‍♂️", "2BP");
let Pawn3B = new Chess("B", "Pawn", "LightGreen", "🤽‍♂️", "3BP");
let Pawn4B = new Chess("B", "Pawn", "LightGreen", "🤽‍♂️", "4BP");
let Pawn5B = new Chess("B", "Pawn", "LightGreen", "🤽‍♂️", "5BP");
let Pawn6B = new Chess("B", "Pawn", "LightGreen", "🤽‍♂️", "6BP");
let Pawn7B = new Chess("B", "Pawn", "LightGreen", "🤽‍♂️", "7BP");
let Pawn8B = new Chess("B", "Pawn", "LightGreen", "🤽‍♂️", "8BP");

let KingW = new Chess("W", "King", "LightYellow", "🤴", "1WK");
let QueenW = new Chess("W", "Queen", "LightYellow", "👑", "1WQ");
let Rock1W = new Chess("W", "Rock", "LightYellow", "🛸", "1WR");
let Rock2W = new Chess("W", "Rock", "LightYellow", "🛸", "2WR");
let Bishop1W = new Chess("W", "Bishop", "LightYellow", "💂‍♂️", "1WB");
let Bishop2W = new Chess("W", "Bishop", "LightYellow", "💂‍♂️", "2WB");
let Knight1W = new Chess("W", "Knight", "LightYellow", "🐎", "1WKn");
let Knight2W = new Chess("W", "Knight", "LightYellow", "🐎", "2WKn");
let Pawn1W = new Chess("W", "Pawn", "LightYellow", "🤽‍♂️", "1WP");
let Pawn2W = new Chess("W", "Pawn", "LightYellow", "🤽‍♂️", "2WP");
let Pawn3W = new Chess("W", "Pawn", "LightYellow", "🤽‍♂️", "3WP");
let Pawn4W = new Chess("W", "Pawn", "LightYellow", "🤽‍♂️", "4WP");
let Pawn5W = new Chess("W", "Pawn", "LightYellow", "🤽‍♂️", "5WP");
let Pawn6W = new Chess("W", "Pawn", "LightYellow", "🤽‍♂️", "6WP");
let Pawn7W = new Chess("W", "Pawn", "LightYellow", "🤽‍♂️", "7WP");
let Pawn8W = new Chess("W", "Pawn", "LightYellow", "🤽‍♂️", "8WP");


function startGame(){
  document.getElementById("A1").value = Rock1W
  document.getElementById("B1").value = Knight1W
  document.getElementById("C1").value = Bishop1W
  document.getElementById("D1").value = QueenW
  document.getElementById("E1").value = KingW
  document.getElementById("F1").value = Bishop2W
  document.getElementById("G1").value = Knight2W
  document.getElementById("H1").value = Rock2W

  document.getElementById("A2").value = Pawn1W
  document.getElementById("B2").value = Pawn2W
  document.getElementById("C2").value = Pawn3W
  document.getElementById("D2").value = Pawn4W
  document.getElementById("E2").value = Pawn5W
  document.getElementById("F2").value = Pawn6W
  document.getElementById("G2").value = Pawn7W
  document.getElementById("H2").value = Pawn8W

  document.getElementById("A7").value = Pawn1B
  document.getElementById("B7").value = Pawn2B
  document.getElementById("C7").value = Pawn3B
  document.getElementById("D7").value = Pawn4B
  document.getElementById("E7").value = Pawn5B
  document.getElementById("F7").value = Pawn6B
  document.getElementById("G7").value = Pawn7B
  document.getElementById("H7").value = Pawn8B

  document.getElementById("A8").value = Rock1B
  document.getElementById("B8").value = Knight1B
  document.getElementById("C8").value = Bishop1B
  document.getElementById("D8").value = QueenB
  document.getElementById("E8").value = KingB
  document.getElementById("F8").value = Bishop2B
  document.getElementById("G8").value = Knight2B
  document.getElementById("H8").value = Rock2B
}

function checkGame(){
  for(i = 1; i <= 8; i++){
    if(document.getElementById("A"+i).value){
      let rowA = document.getElementById("A"+i).value
      document.getElementById("A"+i).textContent = rowA.symbol
      document.getElementById("A"+i).style.background = rowA.color
    }
    else{
        document.getElementById("A"+i).textContent = ""
        document.getElementById("A"+i).style.background = "lightgrey"
    }
    if(document.getElementById("B"+i).value){
      let rowB = document.getElementById("B"+i).value
      document.getElementById("B"+i).textContent = rowB.symbol
      document.getElementById("B"+i).style.background = rowB.color
    }
    else{
        document.getElementById("B"+i).textContent = ""
        document.getElementById("B"+i).style.background = "lightgrey"
    }
    if(document.getElementById("C"+i).value){
      let rowC = document.getElementById("C"+i).value
      document.getElementById("C"+i).textContent = rowC.symbol
      document.getElementById("C"+i).style.background = rowC.color
    }
    else{
        document.getElementById("C"+i).textContent = ""
        document.getElementById("C"+i).style.background = "lightgrey"
    }
    if(document.getElementById("D"+i).value){
      let rowD = document.getElementById("D"+i).value
      document.getElementById("D"+i).textContent = rowD.symbol
      document.getElementById("D"+i).style.background = rowD.color
    }
    else{
        document.getElementById("D"+i).textContent = ""
        document.getElementById("D"+i).style.background = "lightgrey"
    }
    if(document.getElementById("E"+i).value){
      let rowE = document.getElementById("E"+i).value
      document.getElementById("E"+i).textContent = rowE.symbol
      document.getElementById("E"+i).style.background = rowE.color
    }
    else{
        document.getElementById("E"+i).textContent = ""
        document.getElementById("E"+i).style.background = "lightgrey"
    }
    if(document.getElementById("F"+i).value){
      let rowF = document.getElementById("F"+i).value
      document.getElementById("F"+i).textContent = rowF.symbol
      document.getElementById("F"+i).style.background = rowF.color
    }
    else{
        document.getElementById("F"+i).textContent = ""
        document.getElementById("F"+i).style.background = "lightgrey"
    }
    if(document.getElementById("G"+i).value){
      let rowG = document.getElementById("G"+i).value
      document.getElementById("G"+i).textContent = rowG.symbol
      document.getElementById("G"+i).style.background = rowG.color
    }
    else{
        document.getElementById("G"+i).textContent = ""
        document.getElementById("G"+i).style.background = "lightgrey"
    }
    if(document.getElementById("H"+i).value){
      let rowH = document.getElementById("H"+i).value
      document.getElementById("H"+i).textContent = rowH.symbol
      document.getElementById("H"+i).style.background = rowH.color
    }
    else{
        document.getElementById("H"+i).textContent = ""
        document.getElementById("H"+i).style.background = "lightgrey"
    }
  }
}
function addListener(){
  for(i = 1; i <= 8; i++){
    document.getElementById("A"+i).addEventListener("click", clickCheck);
    document.getElementById("B"+i).addEventListener("click", clickCheck);
    document.getElementById("C"+i).addEventListener("click", clickCheck);
    document.getElementById("D"+i).addEventListener("click", clickCheck);
    document.getElementById("E"+i).addEventListener("click", clickCheck);
    document.getElementById("F"+i).addEventListener("click", clickCheck);
    document.getElementById("G"+i).addEventListener("click", clickCheck);
    document.getElementById("H"+i).addEventListener("click", clickCheck);
  }
}

function clickCheck(e){

  //checkGame()
  if(CurrentlySelected){
    console.log("当前选中...")
    console.log(CurrentlySelected)
    //如果这个选中的东西有值
    if(e.target.value){
      //并且不是一样的id
      if(CurrentlySelected.value.id != e.target.value.id)
      {
        //选择的是自己阵营的
        if(CurrentlySelected.value.player == e.target.value.player){
          CurrentlySelected = e.target
          checkGame()
          CurrentlySelected.style.background = "Green"
        }
        //不是自己阵营的代表攻击
        else{
          //Attack Another Player's Chess
          console.log("attack")
          //Need to check move is valid or not
          let result = moveCheck(e.target.id)
          if(result){
            e.target.value = CurrentlySelected.value
            CurrentlySelected.value = null
          }
          else{
            //Not Valid
            console.log("Not Valid");
          }
          CurrentlySelected = null
        }
      }
      //选了同一样东西
      else{
        console.log("选了同一个东西")
      }
    }
    //如果选中的东西没值，代表是空格
    else{
      console.log("move")
      //Need to check move is valid or not
      let result = moveCheck(e.target.id)
      if(result){
        CurrentlySelected.style.background = "lightgrey"
        e.target.value = CurrentlySelected.value
        CurrentlySelected.value = null
        CurrentlySelected = null;
        checkGame()
      }
      else{
        //Not Valid Move
        console.log("Not Valid");
      }
    }
  }
  //如果没有选过
  else{
    if(e.target.value){
      if(e.target.value.id != null){
        console.log("第一次选")
        CurrentlySelected = e.target
        CurrentlySelected.style.background = "Green"
      }
    }
    else{
      console.log("It's a empty space");
    }
  }

}

function moveCheck(targetId){
  console.log(CurrentlySelected.id)
  console.log(targetId)
  if(CurrentlySelected.value.name == "Pawn"){
    //Pawn只可以竖着走，所以需要检查他们的竖坐标
    if(targetId[0] == CurrentlySelected.id[0]){
      if(CurrentlySelected.value.player == "W"){
        if(targetId[1] - CurrentlySelected.id[1] == 1){
            console.log("valid");
            return true
        }
      }
      else{
        if(targetId[1] - CurrentlySelected.id[1] == -1){
            console.log("valid");
            return true
        }
      }
    }
    else{
      return false
    }
  }
  if(CurrentlySelected.value.name == "Rock"){
    if(targetId[0] == CurrentlySelected.id[0]){
      //需要检查前方有没有障碍
      console.log("竖着走");
      let targetcol = targetId[0]
      let targetrow = targetId[1]
      let sourcerow = CurrentlySelected.id[1]
      for(i = 1; i <= targetrow; i++){
        console.log(i)
        console.log(sourcerow)
        if(i != sourcerow){
          let value = document.getElementById(targetcol+i).value
          console.log(value);
          if(value){
            return false
          }
        }
      }
      return true
    }
    else if (targetId[1] == CurrentlySelected.id[1]) {

      let col = targetId[0]
      let row = targetId[1]
      console.log("A".charCodeAt(0))

    }
  }



}
startGame()
checkGame()
addListener()
