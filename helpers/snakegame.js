const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
{x: 200, y: 200},
{x: 190, y: 200},
{x: 180, y: 200},
{x: 170, y: 200},
{x: 160, y: 200}
]

// Horizontal velocity
let dx = 20;
// Vertical velocity
let dy = 0;
let food_x;
let food_y;
let score=0;
apple = new Image();
apple.src = './helpers/apple.png';
// Get the canvas element
const snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");
// Start game
main();

generateFood();

document.addEventListener("keydown", changeDirection);

// main function called repeatedly to keep the game running
function main() {
    if (hasEnded()){
        window.location.reload();
        
    };

    changingDirection = false;
    setTimeout(function onTick() {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        boundaryCondition(snake);
        // Call main again
        
        main();
    }, speed())
}

// draw a border around the canvas
function clearBoard() {
    //  Select the colour to fill the drawing
    snakeboard_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    snakeboard_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
// Draw each part
    snake.forEach(drawSnakePart)
}

// Draw one snake part
function drawSnakePart(snakePart) {

    // Set the colour of the snake part
    snakeboard_ctx.fillStyle = snake_col;
    // Set the border colour of the snake part
    snakeboard_ctx.strokestyle = snake_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    // Draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function moveSnake() {
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);

    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    // console.log(has_eaten_food);
    if (has_eaten_food) {
      // Increase score
      score += 10;
      // Display score on screen
      document.getElementById('score').innerHTML = score;
      // Generate new food location
      generateFood();
    } else {
      // Remove the last part of snake body
      snake.pop();
    }
}

function changeDirection(){
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy===-20;
    const goingDown = dy===20;
    const goingLeft = dx===-20;
    const goingRight = dx===20;

    if (keyPressed === LEFT_KEY && !goingRight){
        dx = -20;
        dy = 0;

    }
    if (keyPressed === UP_KEY && !goingDown){
        dx = 0;
        dy = -20;

    }
    if (keyPressed === RIGHT_KEY && !goingLeft){
        dx = 20;
        dy = 0;

    }
    if (keyPressed === DOWN_KEY && !goingUp){
        dx = 0;
        dy = 20;

    }

}
function hasEnded(){
    for (let i = 4; i < snake.length; i++)
    {    
        const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (has_collided){
            console.log("GAME OVER!!")
            alert("GAME OVER");
            return true
        }
            
  }
}

function boundaryCondition(snake){
    let maxHeight = snakeboard.height;
    let maxWidth = snakeboard.width;
    for(var i=0;i<snake.length;i++){
        if( ( snake[i].x>=maxWidth && dx===20 ) ){
            // console.log(snake);
            snake[i].x-=maxWidth;
        }
        if(( snake[i].x<=0 && dx===-20 )){
            // console.log(snake);
            snake[i].x+=maxWidth;
        }
        if( ( snake[i].y>=maxHeight && dy===20 ) ){
            console.log(snake);
            snake[i].y-=maxHeight;
        }
        if( ( snake[i].y<=0 && dy===-20 ) ){
            console.log(snake);
            snake[i].y+=maxHeight;
        }

    }
}

function randomFood(min,max){
    return Math.round((Math.random() * (max-min) + min) / 20) * 20;
}

function generateFood(){
    food_x = randomFood(0,snakeboard.width-10);
    food_y = randomFood(0,snakeboard.height-10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) generateFood();
      });

}
// This is a comment in the javascript file
function drawFood(){
    // snakeboard_ctx.fillStyle = 'lightgreen';
    // snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.drawImage(apple,food_x,food_y,20,20)
    // snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    // snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function speed(){
    const initial_length = 4;
    let frames = 5/1.01;
    frames_length = frames*1.01*snake.length/initial_length;
    var fps = 1000/frames_length;
    return fps;
}



