"use strict";
class Animal{
	constructor(type,id,hp,x,y,w,h,speed,image1,image2,image3,image4,image5,image6){
		this.type = type;
		this.id = id;
		this.hp=hp;
		this.x=x;		this.y=y;
		this.goX=x;		this.goY=y;
		this.vx=0;		this.vy=0;
		this.width = w;
		this.height = h;
		this.maxSpeed=speed;
		this.image1 = image1;
		this.image2 = image2;
		this.image3 = image3;
		this.image4 = image4;
		this.image5 = image5;
		this.image6 = image6;
		this.running = false;
		this.frameCounter=0;
		this.runCounter=0;
	}

	draw(ctx){
		
		ctx.save();
			let posX = this.x - this.width/2;
			let posY = this.y - this.height/2;
			if(this.vx==0 && this.vy==0){
				ctx.drawImage(this.image1,0,0,this.image1.width,this.image1.height,posX,posY,this.width,this.height);
			}else if(this.vx>=0){
				if(this.frameCounter>30 && (this.vx!=0 || this.vy!=0)){
					ctx.drawImage(this.image3,0,0,this.image1.width,this.image1.height,posX,posY,this.width,this.height);
				}else{
					ctx.drawImage(this.image2,0,0,this.image1.width,this.image1.height,posX,posY,this.width,this.height);
				}
			}
			else{
				if(this.frameCounter>30 && (this.vx!=0 || this.vy!=0)){
					ctx.drawImage(this.image6,0,0,this.image1.width,this.image1.height,posX,posY,this.width,this.height);
				}else{
					ctx.drawImage(this.image5,0,0,this.image1.width,this.image1.height,posX,posY,this.width,this.height);
				}
			}
			if(this.frameCounter>60){
				this.frameCounter=0;
			}
		ctx.restore();
	}

	flee(x,y){	//quando ela foge do cão por estar demasiado perto
		var difx = x - this.x;
		var dify = y - this.y;
		var mod = Math.sqrt(Math.pow(difx,2)+Math.pow(dify,2));
		this.vx = - difx / mod * this.maxSpeed;
		this.vy = - dify / mod * this.maxSpeed;
		this.goX = this.x + this.vx ;
		this.goY = this.y + this.vy ;
		if(isNaN(this.goX)){
			this.goX=x;
		}
		if(isNaN(this.goY)){
			this.goY=y;
		}
	}
	reset(){}
	goto(){
		var difx = this.goX - this.x;
		var dify = this.goY - this.y;
		var mod = Math.sqrt(Math.pow(difx,2)+Math.pow(dify,2));
		this.vx = difx / mod * this.maxSpeed;
		this.vy = dify / mod * this.maxSpeed;
		if(isNaN(this.vx)){
			this.vx=0;
		}
		if(isNaN(this.vy)){
			this.vy=0;
		}
		if(mod>this.maxSpeed){
			this.x += this.vx;
			this.y += this.vy;
		}else{
			this.x += difx;
			this.y += dify;
		}
	}
	run(x,y){
		this.runCounter=120;
		var difx = x - this.x;
		var dify = y - this.y;
		var mod = Math.sqrt(Math.pow(difx,2)+Math.pow(dify,2));
		this.vx = -difx / mod * this.maxSpeed;
		this.vy = -dify / mod * this.maxSpeed;
		if(isNaN(this.vx)){
			this.vx=0;
		}
		if(isNaN(this.vy)){
			this.vy=0;
		}
	}

	update(x,y){
		this.frameCounter++;
		if(this.runCounter>0){
			this.reset();
			this.runCounter--;
			this.x += this.vx;
			this.y += this.vy;
		}else{
			var difx = x - this.x;
			var dify = y - this.y;
			var mod = Math.sqrt(Math.pow(difx,2)+Math.pow(dify,2));
			this.vx = difx / mod * this.maxSpeed;
			this.vy = dify / mod * this.maxSpeed;
			if(isNaN(this.vx)){
				this.vx=0;
			}
			if(isNaN(this.vy)){
				this.vy=0;
			}
			if(mod>this.maxSpeed){
				this.x += this.vx;
				this.y += this.vy;
			}else{
				this.x += difx;
				this.y += dify;
			}
		}
	}
}