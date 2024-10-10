// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player = { x: 400, y: 300, radius: 20, speed: 5 };
let food = [];
for (let i = 0; i < 10; i++) {
    food.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 5 + Math.random() * 10,
        color: 'red'
    });
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

    // Move player
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;

    // Draw food
    for (let i = 0; i < food.length; i++) {
        ctx.beginPath();
        ctx.arc(food[i].x, food[i].y, food[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = food[i].color;
        ctx.fill();
        ctx.closePath();

        // Check collision
        let dist = Math.hypot(player.x - food[i].x, player.y - food[i].y);
        if (dist < player.radius + food[i].radius) {
            player.radius += food[i].radius / 2;  // Player grows
            food.splice(i, 1);  // Remove eaten food
        }
    }

    requestAnimationFrame(gameLoop);
}

// Keyboard input
let keys = {};
window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

// Start game loop
gameLoop();
