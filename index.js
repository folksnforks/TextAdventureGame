// Code for COMPLETELY ORIGINAL game. Patent pending.

// Required for Node console input.
const readline = require('readline-sync');

// Variable that holds the player's input from the console.
let playerResponse;


// Class for general character properties
class Character {
   constructor(name, hp, atkPower) {
      this.name = name,
      this.hp = hp,
      this.atkPower = atkPower,
      this.evade
   }

   isAlive() {
      return (this.hp > 0 ? true : false);
   }

   // Generates a random integer between 1 and 0 and stores it in this.evade
   evadeRandomNum() {
      this.evade = Math.ceil(Math.random() * 10);
   }

   // Attack method
   attack(opponent) {
      console.log('');

      if (opponent.evade === 1 || opponent.evade === 2) {
         console.log(`${opponent.name} evaded the attack`);
      } else if (opponent.evade === 3) {
         opponent.hp -= (this.atkPower + 1);
         console.log(`${opponent.name} received + 1 attack damage`);
      } else if (opponent.evade === 4) {
         opponent.hp -= (this.atkPower - 1);
         console.log(`${this.name}'s attack was reduced by 1`);
      } else {
         opponent.hp -= this.atkPower;
      }
      
      // Ensures that we never display negative health values.
      if (opponent.hp < 0) {
         opponent.hp = 0;
      }
   }
   
   // Method for printing character health to the screen.
   printStatus() {
      console.log(`${this.name} has ${this.hp} HP remaining`);
   }
}

// Menu asking name and type of character
console.log('\n|￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣|')
console.log('|   Welcome to Original Game... for real   |')
console.log('|＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿|')
console.log('  (\\__/)  || ')
console.log('  (•ㅅ•)  || ')
console.log('  / 　 づ  \'\)\n')
console.log('What is your name?\n')

const userName = readLine.question();

console.log(`\nHey, ${userName}, you just finished & a monster appears`);

function mainGameFunc() {

   // Build hero and monster objects

   const hero = new Character(userName, 10, 3);
   const monster = new Character('monster', 10, 2);

   do {
      hero.evadeRandomNum();
      monster.evadeRandomNum();

      // Main game menu
      console.log(`\nWhat do you want to do ${userName}?`);
      console.log(`1. Fight monster`);
      console.log(`2. No nothing`);
      console.log(`3. Flee`);
      response = readline.question('> ');

      // Fight monster sequence, hero attacks monster and monster attacks hero.
      if (response === '1') {
         hero.attack(monster);
         monster.attack(hero);
      }

      // Do nothing sequence, hero does nothing and only monster attacks hero
      else if (response === '2') {
         monster.attack(hero);
      }

      //Hero runs away, game ends
      else if (response === '3') {
         console.log(`Goodbye, ${userName}. It's been real`);
         console.log(`________________________________________
         < boooooooooooooo I came to see a fight >
         ----------------------------------------
                 \\   ^__^
                 \\  (oo)\\_______
                     (__)\\       )\\/\\
                         ||----w |
                         ||      ||`,);
         playAgain(); // Function invoked asking if you want to play
         break;
      }

      else {
         console.log(`\ndon\'t get creative, ${userName}`);
         continue;
      }

      // The health status of the hero and the monster are printed to the screen by invoking the .printStatus() method
      hero.printStatus();
      monster.printStatus();

      // If case for when the monster dies and the hero is still alive
      if (monster.hp <= 0 && hero.hp > 0) {
         console.log(`Congratulations ${userName}, you win win win no matter what`);
         playAgain();
         break;
      }

      // If case for when the monster is still alive and the hero dies.
      if (hero.hp <= 0) {
         console.log('you lose, what happened!?');
         playAgain(); // Invoke play again function.
         break;
      }

   } while (hero.isAlive()); // While loop condition - the isAlive() method returns true if the heros health is above 0, false if 0 or less


} // Close mainGameFunc

// Play again function asks the player if they want to play again
// If the choose yes
function playAgain() {
   console.log(`${userName}, would you like to play again? y/n`);
   if (readline.question('> ') === 'y') mainGameFunc();
   else console.log(`Alright, its been lit`);
}

mainGameFunc();