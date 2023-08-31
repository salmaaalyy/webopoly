const roundText = document.getElementById("round");
const p1Text = document.getElementById("p1");
const p2Text = document.getElementById("p2");
const gameText = document.getElementById("text");
const agreeButton = document.getElementById("agree");
const nextButton = document.getElementById("next");

class BoardPiece {
  constructor(name, action, price) {
    this.name = name;
    this.action = action;
    this.price = price;
  }
  getName() {
    return this.name;
  }
  getAction() {
    return this.action;
  }
  getPrice() {
    return this.price;
  }
}

// Property class represents a property on the board.
class Property extends BoardPiece {
  constructor(name, price, rent) {
    super(name, 'buy ' + name + ' for $' + price + '. rent is $' + rent, price);
    this.sold = false;
    this.owner = null;
    this.rent = rent;
  }
  getRent() {
    return this.rent;
  }
  isSold() {
    this.sold = true;
  }
  getSold() {
    return this.sold;
  }
  setOwner(str) {
    this.owner = str;
  }
  getOwner() {
    return this.owner;
  }
  toString() {
    return this.name + ': $' + this.rent + ' rent';
  }
}

class Player {
  constructor(str) {
    this.win = false;
    this.name = str;
    this.money = 1000;
    this.properties = [];
  }
  addMoney(input){
    this.money += input;
  }
  minusMoney(input) {
    this.money -= input;
  }
  addProperty(p) {
    if (!(p instanceof Property)) {
      throw new IllegalArgumentException();
    }
    this.properties.push(p);
  }
  setWin() {
    this.win = true;
  }
}

class Board {
  constructor() {
    this.board = [];
    this.addComunityChests();
    this.addProperties();
  }
  addComunityChests() {
    this.board.push(new BoardPiece('maintenance fees', 'maintenance fees, pay $150', 150));
    this.board.push(new BoardPiece('school fees', 'school ain\'t cheap, pay $100.', 100));
    this.board.push(new BoardPiece('hospital bills', 'oh no, you just received your hospital bill. pay $200', 200));
    this.board.push(new BoardPiece('credit card fees', 'you maxed out your credit card, pay $250', 250));
    this.board.push(new BoardPiece('income tax', 'tax the rich. pay $500', 500));
  }
  addProperties() {
    this.board.push(new Property('webopoly avenue', 400, 200));
    this.board.push(new Property('html avenue', 60, 30));
    this.board.push(new Property('swe drive', 300, 150));
    this.board.push(new Property('world wide web', 280, 140));
    this.board.push(new Property('css road', 140, 70));
    this.board.push(new Property('javascript boulevard', 400, 200));
    this.board.push(new Property('programming street', 100, 50));
    this.board.push(new Property('code circle', 200, 100));
    this.board.push(new Property('runtime alley', 260, 130));
    this.board.push(new Property('university way', 80, 20));
    this.board.push(new Property('github lane', 150, 80));
  }
  getBoard(pos) {
    return this.board.at(pos);
  }
}

class Game {
  constructor(b, pl, pl2) {
    this.board = b;
    this.p1 = pl;
    this.p2 = pl2;
    this.round = 1;
    this.play();
  }
  delay(ms){
    return new Promise(resolve=> setTimeout(resolve, ms));
  }
  async play() {
    if (this.p1.win === false && this.p2.win === false) {
      roundText.innerHTML=`round ${this.round}`
      p1Text.innerHTML=`player 1<br>$${this.p1.money}<br>${this.p1.properties.length} properties`;
      p2Text.innerHTML=`player 2<br>$${this.p2.money}<br>${this.p2.properties.length} properties`;
      gameText.innerHTML=`player 1, it's your turn`;

      let b1 = this.board.getBoard(Math.floor(Math.random() * this.board.board.length));
      this.playerTurn(b1, this.p1, this.p2);
      this.didWin();
      // p1Text.innerHTML=`player 1<br>$${this.p1.money}<br>${this.p1.properties.length} properties`;
      
      await this.delay(5000);
      gameText.innerHTML=`player 2, it's your turn`;
      let b2 = this.board.getBoard(Math.floor(Math.random() * this.board.board.length));
      this.playerTurn(b2, this.p2, this.p1);
      // p2Text.innerHTML=`player 2<br>$${this.p2.money}<br>${this.p2.properties.length} properties`;
      this.didWin();

      console.log(this.p1.properties);
      console.log(this.p2.properties);

      this.p1.addMoney(50);
      this.p2.addMoney(50);
      this.round += 1;
    }
  }
  async playerTurn(b, p, otherP) {
    console.log(b instanceof Property);
    console.log(p.name);
    if (b instanceof Property){
      if(!b.getSold()) {
        console.log("buy unsold property");
        gameText.innerHTML=`${p.name}, you landed on ${b.getName()}<br>${b.getAction()}. do you agree?`;
        console.log(b.getAction());
        p.minusMoney(b.price);
        p.addProperty(b);
        b.isSold();
        b.setOwner(p.name);
        agreeButton.addEventListener("click", function(){
          gameText.innerHTML=`${p.name}, you now own ${b.name} and have $${p.money}`;
          console.log('You now have: $' + p.money + '.');
          console.log('You now have ' + p.properties.length + ' properties.');
        });
      } else {
          if (b.getOwner() === p.name) {
            console.log("you already own this property");
            gameText.innerHTML=`${p.name}, you landed on ${b.getName()}<br>your turn has been skipped, you already own ${b.getName()}`;
            console.log('Your turn has been skipped, you already own ' + b.getName());
          } else {
            console.log("pay rent");
              gameText.innerHTML=`${p.name}, you landed on ${b.getName()}<br> which is owned by ${(b).getOwner()}. you need to pay $${(b).getRent()}.<br>do you agree?`;
              console.log('You landed on ' + b.getName() + ' which is owned by ' + (b).getOwner() + '. You need to pay $' + (b).getRent());
              p.minusMoney(b.getRent());
              otherP.money += b.rent;

              agreeButton.addEventListener("click", function(){
                gameText.innerHTML=`${p.name}, you now have $${p.money}`;
                console.log('You now have: $' + p.money + '.');
              });
          }
      } 
    } else {
      console.log("community chest");
        // await this.delay(5000);
        gameText.innerHTML=`${p.name},<br>${b.getAction()}. do you agree?`;
        console.log(b.getAction());
        // p.minusMoney(b.getPrice());
        p.money -= b.getPrice();

        agreeButton.addEventListener("click", function(){
          gameText.innerHTML=`${p.name}, you now have $${p.money}`
          console.log('You now have: $' + p.money + '.');
          console.log('You now have ' + p.properties.length + ' properties.');
        });
    }
    this.didWin();
  }

  didWin() {
    if (this.p1.money <= 0 && this.p2.money > 0) {
      this.p2.setWin();
      this.won(this.p2);
    } else {
      if (this.p1.money > 0 && this.p2.money <= 0) {
        this.p1.setWin();
        this.won(this.p1);
      }
    }
  }
  won(p) {
    gameText.innerHTML=`<h3>congrats, ${p.name}! you won!</h3>`;
    console.log('You had $' + p.money + ' and owned a total of ' + p.properties.length + ' properties!');
    console.log('You owned the following properties: ' + p.properties);
  }
}


function startGame(){
  const b = document.getElementById("board");
  b.style.display = "block";

  const board = new Board();
  console.log(board);
  const p1 = new Player("player 1");
  const p2 = new Player("player 2");
  const game = new Game(board, p1, p2);
  console.log(game);

  nextButton.addEventListener("click", function() {
    game.play();
  });
}