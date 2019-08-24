
var allEnemies = []; // stores all enemy objects
var player;
var score_value;
var winning=0;
var Utl = function(){};

// function to get random values from an array 
Utl.returnRandomValue = function(items){
    var randomStartingPosition = Math.floor(Math.random() * items.length);
    return items[randomStartingPosition];
};
// takes two figures and sees if they touch
Utl.collision = function(player,fig1){
    if( player.x + fig1.xoffset > (fig1.x + fig1.width)  ||  // player is to the right of figure 1
            (player.x + player.width - fig1.xoffset) < fig1.x    ||  // player is to the left of fig 1
            player.y + (player.height - fig1.yoffset) < (fig1.y) ||  //player is above fig1
            player.y  > (fig1.y + (fig1.height - fig1.yoffset))) //player is below fig1
            {return false;
    } 
    else {return true};
};

// console.log(Utl.collision)
var dt = Utl.returnRandomValue([100,200,300]);
// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    this.sprite = 'images/enemy-bug.png';
    this.x = Utl.returnRandomValue([-10,-15,-20]);
    this.y = y;
    this.width=101;
    this.height=101;
    this.xoffset = 50;
    this.yoffset = 100;
    this.speed = Utl.returnRandomValue([150,200,300]);
    
    //console.log("Print in constructor: " + this.x)
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
   
};

// Update the enemy's position, required method for game

// Parameter: dt, a time delta between ticks/
// You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};

Enemy.prototype.update = function(dt) {
   console.log("this is speed " + this.speed); 
    // console.log("Print from update " + this.x)
    if (this.x < 550){
        this.x +=this.speed*dt;
    }
    else if (this.x > 550){
        this.x = -30;
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.playerIcon = 'images/char-boy.png';
    this.x = 100;
    this.y = 375;
    this.width = 171;
    this.height = 101;

};
Player.prototype.update = function(){
    allEnemies.forEach(function (enemy,index) {
        if (Utl.collision(player,enemy)){
            player.y=375;
            winning = 0;
            score_value=document.getElementById("score");
            score_value.innerHTML = `score: ${winning}`;
            console.log("COLLISION")
        }
    })
}  
//draw the player on the screen
Player.prototype.render = function(){
    // console.log("rendering player");
    ctx.drawImage(Resources.get(this.playerIcon),this.x, this.y);

};

//takes in palyer inputs and handles location on/off screen
Player.prototype.handleInput = function(keyCode) {
    if(keyCode === 'left'){
        if(this.x - 101 < 0){ 
            this.x = 0;  
        } else {
            this.x -= 100; // If it's on the grid, move left by 100
        }  
    } else if(keyCode == 'up'){ // 
        if(this.y - 100 < 0){ // resets player to bottom when they get to water 
            
            this.y =  375;  
            winning += 1;

            score_value=document.getElementById("score");
            score_value.innerHTML = `score: ${winning}`;
        }
         else {
            this.y -= 80; 
        } 
    } else if(keyCode == 'right'){ 
         if(this.x + 101 > 400){  //Player's max rightward position
                this.x = 400; 
            } 
        else{
                this.x += 100; 
            }
    } else if(keyCode == 'down') { 
            if(this.y + 90 > 380) {  //Players max distance from the top 
                this.y = 375; 
            } else {
                this.y += 80; 
            } 
        
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//this method will generate the enemies and add them to the array

// Place the player object in a variable called player
player = new Player();
var enemy = new Enemy(55);
var enemy1 = new Enemy(135);
var enemy2 = new Enemy(215);
allEnemies.push(enemy);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-arra
//stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas