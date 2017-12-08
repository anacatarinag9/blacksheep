"use strict";
(function () {
    window.addEventListener("load", main);
}());

function anim(componente) {
    window.requestAnimationFrame(function () {
        anim(componente);
    });
    update(componente);
}

function main(){

	var componente = {
		
	}

	anim(componente);
}
