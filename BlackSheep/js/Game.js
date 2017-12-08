"use strict";
(function () {
    window.addEventListener("load", main);
}());

var gameEngine = new GameEngine();

function main(){
	//carregar imagens
	var backgroundImage = new Image();
	var dog1Image = new Image();
	var dog2Image = new Image();
	var dog3Image = new Image();
	var dog4Image = new Image();
	var dog5Image = new Image();
	var dog6Image = new Image();
	var sheep1Image = new Image();
	var sheep2Image = new Image();
	var sheep3Image = new Image();
	var sheep4Image = new Image();
	var sheep5Image = new Image();
	var sheep6Image = new Image();
	var wolf1Image = new Image();
	var wolf2Image = new Image();
	var wolf3Image = new Image();
	var wolf4Image = new Image();
	var wolf5Image = new Image();
	var wolf6Image = new Image();
	//var powerImage = new Image();
	var mainImage = new Image();
	var menu = new Image();
	var options = new Image();
	var credits = new Image();
	var scores = new Image();
	var levels = new Image();
	var level2 = new Image();
	var level3 = new Image();
	var level4 = new Image();
	var level5 = new Image();
	var level6 = new Image();
	var cercaImage = new Image();
	var powerImage=new Image();
	var tut1=new Image();
	var tut2=new Image();
	var tut3=new Image();

	var overImage=new Image();
	var againImage=new Image();
	var pauseImage=new Image();
	
	var musicMute=new Image();
	var musicOn=new Image();
	var soundMute=new Image();
	var soundOn=new Image();

	//MUSICAS

	var audioIntro=new Audio();
	var audioChoose=new Audio();
	var audioGame=new Audio();
	var audioWalk=new Audio();
	var creditsMusic=new Audio();
	var soundSheep=new Audio();
	var gameOver=new Audio();
	var audioDog=new Audio();
	var audioSheepIn=new Audio();
	var audioSheepOut=new Audio();
	var audioSheepD=new Audio();
	var audioPause=new Audio();

	gameEngine.listMusics.push(audioIntro);
	gameEngine.listMusics.push(audioGame);
	gameEngine.listMusics.push(creditsMusic);
	gameEngine.listMusics.push(audioChoose);
	gameEngine.listMusics.push(audioWalk);
	gameEngine.listMusics.push(soundSheep);
	gameEngine.listMusics.push(gameOver);
	gameEngine.listMusics.push(audioDog);
	gameEngine.listMusics.push(audioSheepIn);
	gameEngine.listMusics.push(audioSheepOut);
	gameEngine.listMusics.push(audioSheepD);
	gameEngine.listMusics.push(audioPause);


	var nMusics=gameEngine.listMusics.length;
	var loadMusic=0;
	for(let j = 0 ;j< nMusics ; j++){
		gameEngine.listMusics[j].volume=0.5;
		gameEngine.listMusics[j].addEventListener("load", function () {
			loadMusic++;
			if(loadMusic == nMusics){
				//continues to game
				gameEngine.setCtx();
				//gameEngine.start(1);	
				gameEngine.stage="intro";
				window.requestAnimationFrame(function () {
				    update(gameEngine);
				});
			}
		});
	}

	audioIntro.src="musics/intro_song.mp3";//    0    music
	audioGame.src="musics/gameMusic.mp3";   //   1    music
	creditsMusic.src="musics/credits.mp3";    // 2    music
	audioChoose.src="musics/choose.wav"; //      3    sound
	audioWalk.src="musics/walk.wav";//  4             sound
	soundSheep.src="musics/meee.mp3";       //   5    sound
	gameOver.src="musics/gameOver1.wav";//       6    sound
	audioDog.src="musics/dogSound1.mp3"; //       7    sound
	audioSheepIn.src="musics/sheepIn.wav";   //  8    sound
	audioSheepOut.src="musics/sheepOut2.wav"; //9    sound
	audioSheepD.src="musics/sheepD.wav";   //10   		sound
	audioPause.src="musics/pause.mp3";			//11
	

	gameEngine.images.push(backgroundImage);
	gameEngine.images.push(dog1Image);
	gameEngine.images.push(dog2Image);
	gameEngine.images.push(dog3Image);
	gameEngine.images.push(dog4Image);
	gameEngine.images.push(dog5Image);
	gameEngine.images.push(dog6Image);
	gameEngine.images.push(sheep1Image);
	gameEngine.images.push(sheep2Image);
	gameEngine.images.push(sheep3Image);
	gameEngine.images.push(sheep4Image);
	gameEngine.images.push(sheep5Image);
	gameEngine.images.push(sheep6Image);
	
	gameEngine.images.push(wolf1Image);
	gameEngine.images.push(wolf2Image);
	gameEngine.images.push(wolf3Image);
	gameEngine.images.push(wolf4Image);
	gameEngine.images.push(wolf5Image);
	gameEngine.images.push(wolf6Image);
	gameEngine.images.push(cercaImage);
	gameEngine.images.push(powerImage);
	//gameEngine.images.push(powerImage);
	gameEngine.menuImages.push(mainImage);
	gameEngine.menuImages.push(menu);
	gameEngine.menuImages.push(options);
	gameEngine.menuImages.push(credits);
	gameEngine.menuImages.push(scores);
	gameEngine.menuImages.push(levels);

	gameEngine.menuImages.push(tut1);
	gameEngine.menuImages.push(tut2);
	gameEngine.menuImages.push(tut3);

	gameEngine.menuImages.push(overImage);
	gameEngine.menuImages.push(againImage);
	gameEngine.menuImages.push(pauseImage);

	gameEngine.menuImages.push(musicMute);//12
	gameEngine.menuImages.push(musicOn);
	gameEngine.menuImages.push(soundMute);
	gameEngine.menuImages.push(soundOn);

	gameEngine.menuImages.push(level2);
	gameEngine.menuImages.push(level3);
	gameEngine.menuImages.push(level4);
	gameEngine.menuImages.push(level5);
	gameEngine.menuImages.push(level6);

	var nImages = gameEngine.images.length;
	var loadedImages = 0;
	for(let i = 0 ;i< nImages ; i++){
		gameEngine.images[i].addEventListener("load", function () {
			loadedImages++;
			if(loadedImages == nImages){
				//continues to game
				gameEngine.setCtx();
				//gameEngine.start(1);	
				gameEngine.stage="intro";
				window.requestAnimationFrame(function () {
				    update(gameEngine);
				});
			}
		});
	}

	backgroundImage.src = "Images/background.png";
	dog1Image.src = "Images/dog1.png";
	dog2Image.src = "Images/dog2.png";
	dog3Image.src = "Images/dog3.png";
	dog4Image.src = "Images/dog4.png";
	dog5Image.src = "Images/dog5.png";
	dog6Image.src = "Images/dog6.png";
	sheep1Image.src = "Images/sheep1.png";
	sheep2Image.src = "Images/sheep2.png";
	sheep3Image.src = "Images/sheep3.png";
	sheep4Image.src = "Images/sheep4.png";
	sheep5Image.src = "Images/sheep5.png";
	sheep6Image.src = "Images/sheep6.png";
	wolf1Image.src =  "Images/wolf1.png";
	wolf2Image.src =  "Images/wolf2.png";
	wolf3Image.src =  "Images/wolf3.png";
	wolf4Image.src =  "Images/wolf4.png";
	wolf5Image.src =  "Images/wolf5.png";
	wolf6Image.src =  "Images/wolf6.png";
	//powerImage.src = "Image/power.png";
	mainImage.src = "Images/main.png";
	menu.src = "Images/menu.png";
	options.src = "Images/options.png";
	credits.src = "Images/credits.png";
	scores.src = "Images/scores.png";
	levels.src = "Images/levels-01.png";
	level2.src = "Images/levels-02.png";
	level3.src = "Images/levels-03.png";
	level4.src = "Images/levels-04.png";
	level5.src = "Images/levels-05.png";
	level6.src = "Images/levels-06.png";
	tut1.src = "Images/tutorial1.png";
	tut2.src = "Images/tutorial2.png";
	tut3.src = "Images/tutorial3.png";

	overImage.src="Images/over.png";
	againImage.src="Images/again.png";
	pauseImage.src="Images/pause.png";
	cercaImage.src="Images/cerca.png";
	powerImage.src="Images/power.png";

	musicMute.src="Images/musicMute.png";
	musicOn.src="Images/musicOn.png";
	soundMute.src="Images/soundMute.png";
	soundOn.src="Images/soundOn.png";


}

function update(gameEngine){
	switch(gameEngine.stage){
		case("load"):
			gameEngine.ctx.fillText("LOADING",400,400);
			break;
		case("game"):
			gameEngine.update();
			gameEngine.draw();
			break;
			
		case("pause"):
			gameEngine.draw();
			gameEngine.drawMenu();
			break;
		default:
			gameEngine.drawMenu();
			break;
	}
	window.requestAnimationFrame(function () {

        update(gameEngine);
    });
}

document.onmousedown = function(mouse){
	var x = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
	var y = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
	switch(gameEngine.stage){
		case("load"):
			break;
		case("intro"):
			gameEngine.stage = "menuMain";
			break;
		case("help1"):
			gameEngine.stage = "help2";
			break;
		case("help2"):
			gameEngine.stage = "help3";
			break;
		case("help3"):
			gameEngine.stage = "menuMain";
			break;
		case("game"):
			if(mouse.which == 1){
				gameEngine.click(x,y);
			}else{
				gameEngine.stage="pause";
			}	
			break;
		case("pause"):
			if(mouse.which == 3){
				gameEngine.stage="game";
			}else{
				gameEngine.clickMenu(x,y);
			}
			break;
		default:
			gameEngine.clickMenu(x,y);
			break;
	}
	gameEngine.mouseDown=true;
}
document.onmouseup = function(mouse){
	gameEngine.mouseDown=false;
}

document.onmousemove = function(mouse){
	if(gameEngine.mouseDown){
		gameEngine.mx = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
		gameEngine.my = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
	}
}

document.onkeydown = function(mouse){
	if (gameEngine.stage=="game"){
		gameEngine.mx = gameEngine.dog.x;
		gameEngine.my = gameEngine.dog.y;
		
		switch(mouse.keyCode){
			case(27):
				if(gameEngine.stage=="pause"){
					gameEngine.stage = "game";
				}else if(gameEngine.stage=="game"){
					gameEngine.stage = "pause";
				}
	    }
	}
}

document.oncontextmenu = function(mouse){
	mouse.preventDefault();
}
