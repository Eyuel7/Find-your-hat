const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]){
    this.field = field;
    this.vPosition = 0;
    this.hPosition = 0;
    this.field[0][0] = pathCharacter;
  }

  isGameOver(){
    let status = '';

    if(this.isInBounds()){

    if(this.field[this.vPosition][this.hPosition] === hat){
      status = 'Win';
    }
    else if(this.field[this.vPosition][this.hPosition] === hole){
      status = 'Loss';
    }
    else if(this.field[this.vPosition][this.hPosition] === fieldCharacter || this.field[this.vPosition][this.hPosition] === pathCharacter){
      status = '';
    }
    else{
      status = 'Loss';
    }
    }
    return status;
  }

  playerLocation(){
    let input = prompt('Which direction do you want to go(R, L, D or U)').toUpperCase();
    if(input === 'R'){
      this.hPosition++;
    }
    else if(input === 'L'){
      this.hPosition--;
    }
    else if(input === 'D'){
      this.vPosition++;
    }
    else if(input === 'U'){
      this.vPosition--;
    }
    else{
      console.log('Enter R, L, D or U')
      this.playerLocation();
    }
  }

  gameplay(){
    let inPlay = true;
    while(inPlay){
      this.print();
      this.playerLocation();

      if(this.isInBounds()){
      if(this.isGameOver() === 'Win'){
        console.log('You Won');
        inPlay = false;
        break;
      }
      else if(this.isGameOver() === 'Loss'){
        console.log('You Lost');
        inPlay = false;
        break;
      }
      this.field[this.vPosition][this.hPosition] = pathCharacter;
      }
      else {
        console.log('Out of Bounds');
        inPlay = false;
        break;
        }
    }
    
  }

  isInBounds(){
    return (
      this.vPosition >= 0 &&
      this.hPosition >= 0 &&
      this.vPosition < this.field.length &&
      this.hPosition < this.field[0].length
    );
  }
  static generateField(height, width){
    
  }

  print(){
    for(let i=0; i<this.field.length; i++){
      console.log(this.field[i].join(' '));
    }
  }
}

const game = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

//game.print();
//console.log(game.isGameOver());
game.gameplay();