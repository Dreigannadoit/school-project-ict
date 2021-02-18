const canvas = document.getElementById('canvas1');
const intro = document.getElementById('intro1');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 700;
let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 6;
var bMusic = new Audio('MusicBg.mp3');

//score screen
const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

//repeting Background effect
const background = new Image();
background.src = 'Bg/BG2.jpg';
const BG = {
	x1: 0,
	x2: canvas.width,
	y: 0,
	width: canvas.width,
	height: canvas.height
}
function handleBackground(){
	if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
	else BG.x1 -= gamespeed;
	if(BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
	else (BG.x2 -= gamespeed);
	ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
	ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.fillRect(10, canvas.height - 90, 50, 50);
	handleBackground();
	handleObstacles();
	handleParticles();
	bird.update();
	bird.draw();
	if(score == 10 * 1 || score == 10 * 2 || score == 10 * 3 || score == 10 * 4 || score == 10 * 5 || score == 10 * 6 || score == 10 * 7 || score == 10 * 8 || score == 10 * 9 || score == 10 * 10 || score == 10 * 11 || score == 10 * 12 ||score == 10 * 13){
			gamespeed = gamespeed + 0.005;
	}
	ctx.fillStyle = gradient;
	ctx.font = '60px Roboto';
	let scoreshow = ctx.strokeText(score, 450, 70);
	ctx.fillText(score, 450, 70);
	handleCollisions();
	/*to stap game when player hits somthing*/
	if(handleCollisions()){
		return;
	}
	requestAnimationFrame(animate);
	angle += 0.12;
	hue++;	
	frame++;
}
animate();

window.addEventListener('keydown', function(e){
	if(e.code === 'Space') spacePressed = true;
	intro.style.opacity='0';
	intro.style.transition = "all 0.4s";
	bMusic.play();
});
window.addEventListener('keyup', function(e){
	if(e.code === 'Space') spacePressed = false;
	bird.frameX = 0;
	intro.style.opacity='0';
	intro.style.transition = "all 0.4s";
});

const bang = new Image();
bang.src = 'bang3.png';
function handleCollisions(){
	for(let i = 0; i < obstaclesArray.length; i++){
		if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width && 
			bird.x + bird.width > obstaclesArray[i].x &&
			((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) || 
			(bird.y > canvas.height - obstaclesArray[i].bottom &&
			bird.y + bird.height < canvas.height))){
				//collision detection
				ctx.drawImage(bang, bird.x - 23, bird.y - 35, 110, 110);
				ctx.font = '40px sans-serif';
				ctx.fillStyle = 'black';
				ctx.fillText('Game Over, your score is ' + score, 200, canvas.height/2 -10);
				intro.style.opacity='0';
				intro.style.transition = "all 0.4s";

				console.log('Youre Score was: ' + score);

				return true;

		}
	}
}
