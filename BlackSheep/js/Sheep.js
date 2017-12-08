"use strict";
class Sheep extends Animal{
	constructor(image1,image2,image3,image4,image5,image6,x,y){
		super('sheep',0,75,400,400,50,50,1.5,image1,image2,image3,image4,image5,image6);
		this.x=x;
		this.y=y;
		this.frameRandom=0;
	}

	reset(){
		this.goX = this.x;
		this.goY = this.y;
		this.frameRandom=0;
	}

	update(){
		this.frameCounter++;
		if(this.runCounter>0){
			this.reset();
			this.runCounter--;
			this.x += this.vx;
			this.y += this.vy;
		}else{
			this.goto();
			if((this.frameRandom>100)&&(this.vx==0 && this.vy==0)){
				let temp = Math.random()*200+100;
				if(temp<this.frameRandom){
					this.goX = this.x+Math.random()*200-100;
					this.goY = this.y+Math.random()*200-100;
					this.frameRandom=0;
				}
			}
			this.frameRandom++;
		}
	}
}