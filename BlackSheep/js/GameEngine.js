"use strict";
class GameEngine{
	constructor(){
		this.unlockedLevels=1;
		this.stage = "load";
		this.score = 0;
		this.totalScore = 0;
		this.wolfSheepDistance = 20;
		this.totalSheeps = 0;
		this.safeSheeps = 0;
		this.level = 1;
		this.dog = null;
		this.listSheep = [];
		this.listWolf = [];
		this.menu = false;
		this.framecounter=0;
		//
		this.images = [];
		this.menuImages = [];
		//
		this.mx = 400;
		this.my = 400;
		this.width = 800;
		this.heigth = 800;
		this.musicVol = 441;
		this.soundVol = 441;
		this.listMusics=[];
		this.timeBonus=1000;
		this.musicOn = true;
		this.soundOn = true;
		this.mouseDown=false;
	}

	setCtx(){
		this.ctx = document.getElementById("ctx").getContext("2d"); 
		this.ctx.font = '30px Arial';
	}
	start(level){
		//MUSIC
		this.framecounter=60;
		this.score=0;
		this.safeSheeps=0;
		this.listSheep = [];
		this.listWolf = [];
		this.soundOn = true;
		this.musicOn = true;
		this.listMusics[0].pause();
		this.listMusics[1].loop=true;
		this.listMusics[5].loop=true;
		this.listMusics[1].play();
		this.listMusics[5].play();
		this.level=level;
		this.mx=400;
		this.my=400;
		
		this.dog = null;
		this.dog = new Dog(this.images[1],this.images[2],this.images[3],this.images[4],this.images[5],this.images[6]);
		this.generateSheep(level);
		this.generateWolf(level);
				
		this.timeBonus=2000;
		this.stage="game";
		this.level=this.unlockedLevels;
	}

	click(x,y){
		//SOM
		if(this.soundOn)
			this.listMusics[4].play();
		//mute sounds
		this.muteSounds(x,y);

		if(this.doublecounter<=10&&this.framecounter>=160){
			this.bark();
		}
		if(x>800-this.dog.width/2){
			this.mx = 800-this.dog.width/2;
		}else if(x<0+this.dog.width/2){
			this.mx = 0+this.dog.width/2;
		}else{
			this.mx=x;
		}

		if(y>800-this.dog.height/2){
			this.my = 800-this.dog.height/2;
		}else if(y<0+this.dog.height/2){
			this.my = 0+this.dog.width/2;
		}else{
			this.my=y;
		}
		this.doublecounter=0;
	}

	muteSounds(x,y){
		if(x<735 && x>707 && y<82 && y>57){
			this.soundOn = !this.soundOn;
		}
		if(x<684 && x>657 && y<82 && y>57){
			if(this.musicOn){
				this.listMusics[1].pause();
				this.listMusics[5].pause();
				this.musicOn = false;
			}
			else{
				this.listMusics[1].play();
				this.listMusics[5].play();
				this.musicOn = true;
			}
		}
	}

	endGame(){
		if(this.safeSheeps>=(this.totalSheeps/2)){
			if(this.unlockedLevels<this.level+1){
				this.unlockedLevels = this.level+1;
			}
			this.score+=this.timeBonus;
			this.totalScore+=this.score;
			//SOM WIN
			this.listMusics[1].pause();
			this.listMusics[5].pause();
			if(this.soundOn){
				this.listMusics[0].play();
			}
			this.stage="gameOver1";
		}else{
			//SOM LOOSE
			this.listMusics[1].pause();
			this.listMusics[5].pause();
			if(this.soundOn){
				this.listMusics[0].play();
			}
			this.stage="gameOver2";
		}
		//SOM
		//guardar level score e time num ficheiro
	}

	bark(){
		//animação
		//SOM
		this.listMusics[7].play();
		this.framecounter=0;
		//ver ovelhas perto
		for(let i = 0 ;i < this.listSheep.length; i++){
			if(this.calcDist(this.dog.x,this.dog.y,this.listSheep[i].x,this.listSheep[i].y)<200){
				this.listSheep[i].reset();
				this.listSheep[i].run(this.dog.x,this.dog.y);
			}
		}
		//ver lobos perto
		for(let i = 0 ;i < this.listWolf.length; i++){
			if(this.calcDist(this.dog.x,this.dog.y,this.listWolf[i].x,this.listWolf[i].y)<200){
				this.listWolf[i].run(this.dog.x,this.dog.y);
			}
		}

	}

	update(){
		this.doublecounter++;
		if(this.listSheep.length==0)
			this.endGame();
		if(this.timeBonus>0){
			this.timeBonus--;
		}
		if(this.framecounter<160){
			this.framecounter++;
		}
		//dog
		this.dog.update(this.mx,this.my);
		//sheep
		for(let i = 0 ;i < this.listSheep.length; i++){
	        let dist = this.calcDist(this.dog.x,this.dog.y,this.listSheep[i].x,this.listSheep[i].y);
	        let flagIdle = true;
        	if(this.isSafe(this.listSheep[i].x,this.listSheep[i].y)){
        		//delete ovelha
        		this.listSheep.splice(i,1);
	        	this.score+=100;
	        	this.safeSheeps++;
	        	continue;
        	}else if(this.isOut(this.listSheep[i].x,this.listSheep[i].y)){
	        	this.listSheep.splice(i,1);
	        	continue;
        	}
	        this.wall(this.listSheep[i]);
	        let eatFlag=false;
	        //interacao com lobos
	        for(let j = 0 ;j < this.listWolf.length; j++){
	        	let wolfDist = this.calcDist(this.listWolf[j].x,this.listWolf[j].y,this.listSheep[i].x,this.listSheep[i].y);
		        if(wolfDist<=this.wolfSheepDistance){
		        	flagIdle=false;
		        	this.listSheep[i].reset();
		        	this.listSheep[i].hp--;
		        	if(this.listSheep[i].hp<0){
		        		if(this.soundOn){
							this.listMusics[10].play();
						}
		        		this.listSheep.splice(i,1);
		        		eatFlag=true;
		        		break;
		        	}
		       	}
	        }
	        if(eatFlag)
	        	continue;
	        //COLISÃO ENTRE OVELHAS
        	for(let j=0;j<this.listSheep.length;j++){
        		if(j==i)
        			continue;
        		if(this.calcDist(this.listSheep[j].x,this.listSheep[j].y,this.listSheep[i].x,this.listSheep[i].y)<50){
        			this.listSheep[i].flee(this.listSheep[j].x,this.listSheep[j].y);
        		}

        	}

        	if(flagIdle && dist<100){
        		flagIdle=false;
        		this.listSheep[i].reset();
        		this.listSheep[i].flee(this.dog.x,this.dog.y);
        	}

        	this.listSheep[i].update();
    	}
		//wolf
		for(let i = 0 ;i < this.listWolf.length; i++){
			this.wall(this.listWolf[i]);
			if(this.calcDist(this.dog.x,this.dog.y,this.listWolf[i].x,this.listWolf[i].y)<75){
				this.listWolf[i].flee(this.dog.x,this.dog.y);
			}else{
				this.nextSheep(this.listWolf[i]);
			}
        	//ignora distancia ao cao para ja, criar um metodo que continue a ir para a ovelha mas desviado???
    	}
	}

	draw(){

		//draw background
		this.ctx.clearRect(0,0,this.width,this.heigth);
		this.ctx.drawImage(this.images[0],0,0,this.images[0].width,this.images[0].height,0,0,800,800);
		this.ctx.drawImage(this.images[19],0,0,10,300);
		this.ctx.drawImage(this.images[19],0,500,10,300);
		this.ctx.save();
		this.ctx.beginPath();
		if(this.framecounter<5){
			this.ctx.fillStyle = 'red';
			this.ctx.arc(this.dog.x, this.dog.y, 200, 0, 2 * Math.PI, false);
			this.ctx.lineWidth = 2;
			this.ctx.stroke();
			this.ctx.restore();
		}

		//draw sheep
		for(let i = 0 ;i < this.listSheep.length; i++){

	        this.listSheep[i].draw(this.ctx);
    	}
		//draw wolf
		for(let i = 0 ;i < this.listWolf.length; i++){
	        this.listWolf[i].draw(this.ctx);
    	}

		//draw dog
		this.dog.draw(this.ctx);
		//draw buttons
		if(this.musicOn)
			this.ctx.drawImage(this.menuImages[13],650,50,40,40);
		else
			this.ctx.drawImage(this.menuImages[12],650,50,40,40);
		if(this.soundOn)
			this.ctx.drawImage(this.menuImages[15],700,50,40,40);
		else
			this.ctx.drawImage(this.menuImages[14],700,50,40,40);
		//draw User Interface
		this.ctx.rect(10,0,5,300);
		this.ctx.rect(10,500,5,300);
		this.ctx.fillText('Score: ' + this.score,10,30);
		this.ctx.fillText('Caught ' +this.safeSheeps + ' / Missing ' +this.listSheep.length+' / Total '+ this.totalSheeps,400,30);
		this.ctx.fillText('Time Bonus: ' +this.timeBonus,10,60);
		this.ctx.fillText('Total Score: ' +this.totalScore,10,90);
		this.ctx.fillText('Level ' +this.level,10,120);
		this.ctx.drawImage(this.images[20],0,780,this.framecounter*800/160,50);
	}

	isOut(x,y){
		if(x>800+25){
			if(this.soundOn){
				this.listMusics[9].play();
			}
			return true;
		}
		else if(y<0-25 || y>800+25){
			if(this.soundOn){
				this.listMusics[9].play();
			}
			return true;
		}else {
			return false;
		}
	}

	isSafe(x,y){
		if(x<0-25 && y<=500 && y>=300){
			if(this.soundOn){
				this.listMusics[8].play();
			}
			return true;
			
		}
		else{
			return false;
		}
	}

	wall(sheep){
		if(sheep.x<10+sheep.width/2 && (sheep.y>=500 || sheep.y<=300)){
			sheep.x+=sheep.maxSpeed;
			sheep.reset();
			sheep.runCounter=0;
		}
	}

	calcDist(x1,y1,x2,y2){
		var difx = x1 - x2;
		var dify = y1 - y2;
		return Math.sqrt(Math.pow(difx,2)+Math.pow(dify,2));
	}

	nextSheep(wolf){
		if(this.listSheep.length==0)
			return false;
		var first = this.calcDist(this.listSheep[0].x,this.listSheep[0].y,wolf.x,wolf.y);
		var nsheep = 0;
		
		for(let i=1; i<this.listSheep.length; i++){
			var dist = this.calcDist(this.listSheep[i].x,this.listSheep[i].y,wolf.x,wolf.y);
			if(dist<first){
				first=dist;
				nsheep = i;
			}
		}
		if(first>this.wolfSheepDistance){
			wolf.update(this.listSheep[nsheep].x,this.listSheep[nsheep].y);
		}
	}

	generateSheep(level){
		switch(level){
			case(1):
				this.listSheep.push(new Sheep(this.images[7],this.images[8],this.images[9],this.images[10],this.images[11],this.images[12],400,300));
				this.listSheep.push(new Sheep(this.images[7],this.images[8],this.images[9],this.images[10],this.images[11],this.images[12],200,200));
				this.listSheep.push(new Sheep(this.images[7],this.images[8],this.images[9],this.images[10],this.images[11],this.images[12],300,300));
				this.totalSheeps = 3;
				break;
			case(2):
				for(let i=0; i<3; i++){
					var x = Math.random()*600;
					var y = Math.random()*600;
					this.listSheep.push(new Sheep(this.images[7],this.images[8],this.images[9],this.images[10],this.images[11],this.images[12],x,y));
				}
				this.totalSheeps = 3;
				break;
			case(3):
				for(let i=0; i<4; i++){
					var x = Math.random()*800;
					var y = Math.random()*800;
					this.listSheep.push(new Sheep(this.images[7],this.images[8],this.images[9],this.images[10],this.images[11],this.images[12],x,y));
				}
				this.totalSheeps = 4;
				break;
			case(4):
				for(let i=0; i<4; i++){
					var x = 200+Math.random()*500;
					var y = Math.random()*500;
					this.listSheep.push(new Sheep(this.images[7],this.images[8],this.images[9],this.images[10],this.images[11],this.images[12],x,y));
				}
				this.totalSheeps = 4;
				break;
			case(5):
				for(let i=0; i<5; i++){
					var x = 200+Math.random()*600;
					var y = Math.random()*600;
					this.listSheep.push(new Sheep(this.images[7],this.images[8],this.images[9],this.images[10],this.images[11],this.images[12],x,y));
				}
				this.totalSheeps = 5;
				break;
			case(6):
				for(let i=0; i<5; i++){
					var x = 300+Math.random()*500;
					var y = Math.random()*500;
					this.listSheep.push(new Sheep(this.images[7],this.images[8],this.images[9],this.images[10],this.images[11],this.images[12],x,y));
				}
				this.totalSheeps = 5;
				break;
		}
		for(let i =0 ; i<this.listSheep.length;i++){
			this.listSheep[i].reset();
		}
	}

	generateWolf(level){
		switch(level){
			case(2):
				this.spwanField(2);
				this.spwanField(4);
				break;
			case(3):
				this.spwanField(3);
				this.spwanField(5);
				break;
			case(4):
				this.spwanField(2);
				this.spwanField(3);
				this.spwanField(4);
				break;
			case(5):
				this.spwanField(1);
				this.spwanField(3);
				this.spwanField(5);
				break;
			case(6):
				this.spwanField(1);
				this.spwanField(5);
				this.listWolf.push(new Wolf(this.images[13],this.images[14],this.images[15],this.images[16],this.images[17],this.images[18],400,750));
				break;
		}
	}

	spwanField(n){
		var x;
		var y;
		switch(n){
			case(1):
				//y 0 a -800   x 0  a 800
				x = Math.random()*800;
				y = Math.random()*800 * (-1);
				break;
			case(2):
				//y 0 a -800   x 800  a 1600
				x = Math.random()*800 + 800;
				y = Math.random()*800 * (-1);
				break; 
			case(3):
				//y 0 a 800   x 800  a 1600
				x = Math.random()*800 + 800;
				y = Math.random()*800
				break; 
			case(4):
				//y 800 a 1600   x 800  a 1600
				x = Math.random()*800 + 800;
				y = Math.random()*800 + 800;
				break; 
			case(5):
				//y 800 a 1600   x 0  a 800
				x = Math.random()*800;
				y = Math.random()*800 + 800;
				break; 
		}
		this.listWolf.push(new Wolf(this.images[13],this.images[14],this.images[15],this.images[16],this.images[17],this.images[18],x,y));
	}

	drawMenu(){
		this.ctx.clearRect(0,0,this.width,this.heigth);
		switch(this.stage){
			case("intro"):
				this.listMusics[0].loop=true;
				this.listMusics[0].play();
				this.ctx.drawImage(this.menuImages[0],0,0,this.menuImages[0].width,this.menuImages[0].height,0,0,800,800);
				break;
			case("menuMain"):
				this.ctx.drawImage(this.menuImages[1],0,0,this.menuImages[1].width,this.menuImages[1].height,0,0,800,800);
				break;
			case("menuOptions"):
				this.ctx.drawImage(this.menuImages[2],0,0,this.menuImages[2].width,this.menuImages[2].height,0,0,800,800);
				this.ctx.drawImage(this.images[7],0,0,this.images[7].width,this.images[7].height,this.musicVol-20,349-20,40,40);
				this.ctx.drawImage(this.images[7],0,0,this.images[7].width,this.images[7].height,this.soundVol-20,463-20,40,40);
				break;
			case("menuCredits"):
				this.ctx.drawImage(this.menuImages[3],0,0,this.menuImages[3].width,this.menuImages[3].height,0,0,800,800);
				break;
			case("menuLevel"):
				if(this.level==1)
					this.ctx.drawImage(this.menuImages[5],0,0,this.menuImages[5].width,this.menuImages[5].height,0,0,800,800);
				else if(this.level==2)
					this.ctx.drawImage(this.menuImages[16],0,0,this.menuImages[16].width,this.menuImages[16].height,0,0,800,800);
				else if(this.level==3)
					this.ctx.drawImage(this.menuImages[17],0,0,this.menuImages[17].width,this.menuImages[17].height,0,0,800,800);
				else if(this.level==4)
					this.ctx.drawImage(this.menuImages[18],0,0,this.menuImages[18].width,this.menuImages[18].height,0,0,800,800);
				else if(this.level==5)
					this.ctx.drawImage(this.menuImages[19],0,0,this.menuImages[19].width,this.menuImages[19].height,0,0,800,800);
				else if(this.level==6)
					this.ctx.drawImage(this.menuImages[20],0,0,this.menuImages[20].width,this.menuImages[20].height,0,0,800,800);
				break;
			case("help1"):
				this.ctx.drawImage(this.menuImages[6],0,0,this.menuImages[6].width,this.menuImages[6].height,0,0,800,800);
				break;
			case("help2"):
				this.ctx.drawImage(this.menuImages[7],0,0,this.menuImages[7].width,this.menuImages[7].height,0,0,800,800);
				break;
			case("help3"):
				this.ctx.drawImage(this.menuImages[8],0,0,this.menuImages[8].width,this.menuImages[8].height,0,0,800,800);
				break;
			case("gameOver1"):
				this.draw();
				this.ctx.drawImage(this.menuImages[9],0,0,this.menuImages[9].width,this.menuImages[9].height,0,0,800,800);
				break;
			case("gameOver2"):
				this.draw();
				this.ctx.drawImage(this.menuImages[10],0,0,this.menuImages[10].width,this.menuImages[10].height,0,0,800,800);
				break;
			case("pause"):
				this.draw();
				this.ctx.drawImage(this.menuImages[11],0,0,this.menuImages[11].width,this.menuImages[11].height,0,0,800,800);
				break;
					
		}	
	}

	clickMenu(x,y){
		console.log(x+' '+y);
		switch(this.stage){
			case("menuMain"):
				this.listMusics[0].play();
				this.listMusics[0].loop=true;
				
				if(x>=344 && x<=456 && y>=288 && y<=348){
					this.stage = "menuLevel";
					this.listMusics[3].play();
				}
				if(x>=302 && x<=493 && y>=380 && y<=437){
					this.stage = "menuOptions";
					this.listMusics[3].play();
				}
				if(x>=304 && x<=456 && y>=470 && y<=527){
					this.listMusics[0].pause();		
					this.listMusics[3].play();
					this.stage = "menuCredits";
					this.listMusics[2].play();	
				}
				if(x>=343 && x<=457 && y>=530 && y<=578){
					this.stage = "help1";
				}
				if(x>=0 && x<=0 && y>=0 && y<=0){ 
					this.stage = "quit";
				}
				
				break;
			case("menuOptions"):
				if(x>=273 && x<=640 && y>=331 && y<=362){
					this.changeMusic(x);
					this.musicVol = x;
				}
				
				if(x>=273 && x<=640 && y>=450 && y<=475){
					this.changeSound(x);
					this.soundVol = x;
				}
				
				if(x>293 && x<504 && y>592 && y<630){
					this.listMusics[3].play();
					this.stage="menuMain";
				}
				break;
			case("menuLevel"):
				if(x>=266 && x<=295 && y>=331 && y<=394){
					this.listMusics[3].play();
					this.start(1);
				}
				else if(x>=382 && x<=416 && y>=331 && y<=394){
					if(this.unlockedLevels>1){
						this.listMusics[3].play();
						this.start(2);
					}
				}
				else if(x>=499 && x<=531 && y>=331 && y<=394){
					if(this.unlockedLevels>2){
						this.listMusics[3].play();
						this.start(3);
					}
				}
				else if(x>=266 && x<=295 && y>=447 && y<=516){
					if(this.unlockedLevels>3){
						this.listMusics[3].play();
						this.start(4);
					}
				}
				else if(x>=382 && x<=416 && y>=447 && y<=516){
					if(this.unlockedLevels>4){
						this.listMusics[3].play();
						this.start(5);
					}
				}
				else if(x>=499 && x<=531 && y>=447 && y<=516){
					if(this.unlockedLevels>5){
						this.listMusics[3].play();
						this.start(6);
					}
				}
				else if(x>293 && x<504 && y>592 && y<630){
					this.listMusics[3].play();
					this.stage="menuMain";
				}
				break;
			case("menuCredits"):
				if(x>293 && x<504 && y>592 && y<630){
					this.listMusics[3].play();
					this.listMusics[2].pause();
					this.listMusics[0].play();
					this.stage="menuMain";
					
				}
				
				break;
			case("gameOver1"):
				if(x>209&&x<589&&y>340&&y<404){
					if(this.level==6){
						this.level=0;
						this.totalScore=0;
					}
					this.listMusics[0].pause();
					this.listMusics[3].play();
					this.start(this.level+1);
					
				}
				if(x>208&&x<593&&y>512&&y<578){
					this.listMusics[3].play();
					this.stage="menuMain";
				}
				break;
			case("gameOver2"):
				if(x>209&&x<589&&y>340&&y<404){
					this.listMusics[0].pause();
					this.listMusics[3].play();
					this.start(this.level);
					
				}
				if(x>208&&x<593&&y>512&&y<578){
					this.listMusics[3].play();
					this.stage="menuMain";
				}
				break;
			case("pause"):
				if(x>209&&x<589&&y>340&&y<404){
					this.listMusics[3].play();
					this.stage="game";
				}
				if(x>208&&x<593&&y>512&&y<578){
					this.listMusics[1].pause();
					this.listMusics[5].pause();
					this.listMusics[3].play();
					this.listMusics[0].play();
					this.stage="menuMain";
				}
				break;
		}
	}
	changeSound(x){
		var sound = (x-273)/(640-273);
		for(let i=3; i<this.listMusics.length; i++){
			this.listMusics[i].volume = sound;
		}
	}

	changeMusic(x){
		var music = (x-273)/(640-273);
		for(let i=0; i<3; i++){
			this.listMusics[i].volume = music;
		}
	}
}