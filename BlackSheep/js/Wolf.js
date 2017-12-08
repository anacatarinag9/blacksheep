"use strict";
class Wolf extends Animal{
	constructor(image1,image2,image3,image4,image5,image6,x,y){
		super('wolf',0,75,200,200,50,50,1,image1,image2,image3,image4,image5,image6);
		this.x=x;
		this.y=y;
	}

}