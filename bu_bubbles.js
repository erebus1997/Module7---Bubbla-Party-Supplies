"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 1

   Author: Derrick Brown
   Date:   18Apr2024
   
   Filename: bu_bubbles.js

*/

// bu_bubbles.js
// Created by [Your Name] on [Date]

/* 4 Define size the Bubblebox */
var box = {
    width: 1024,
    height: 500
};

/* 5 Define bubble constructor   */
function bubble(size, img) {
    this.radius = size;
    this.imageURL = img;
    this.xVelocity = null;
    this.yVelocity = null;
    this.xPos = null;
    this.yPos = null;
    this.opacity = 1;
    this.hue = 0;
    this.rotate = 0;
    this.rotateDirection = 1;
}

/* 6 Define bubble prototype  */
bubble.prototype.fadeBubble = function() {
    this.opacity -= 0.0005;
};

bubble.prototype.changeColor = function() {
    this.hue = (this.hue + 3) % 360;
};

bubble.prototype.rotateBubble = function() {
    this.rotate = (this.rotate + this.rotateDirection) % 360;
};

/*   7   Define bubble motion   */
bubble.prototype.moveBubble = function(height, width) {
    var bubbleTop = this.yPos;
    var bubbleBottom = this.yPos + this.radius;
    var bubbleLeft = this.xPos;
    var bubbleRight = this.xPos + this.radius;

    if (bubbleTop < 0 || bubbleBottom > height) {
        this.yVelocity = -this.yVelocity;
    }
    if (bubbleLeft < 0 || bubbleRight > width) {
        this.xVelocity = -this.xVelocity;
    }

    this.yPos += this.yVelocity;
    this.xPos += this.xVelocity;
};


window.addEventListener("load", function() {
    // Reference to the bubble box
    var bubbleBox = document.getElementById("bubbleBox");

    // Create a new bubble every half-second
    setInterval(function() {
        // Do not create more than 20 bubbles at any one time
        if (bubbleBox.childElementCount <= 20) {
						
 /* 9 Generate new bubble with random size and image  */
            var size = randInt(50, 120);
            var img = "bu_bubble" + randInt(1, 10) + ".png";

            var newBubble = new bubble(size, img);

/* 10  Set initial properties   */
            newBubble.xPos = box.width / 2;
            newBubble.yPos = box.height / 2;
            newBubble.xVelocity = randInt(-5, 5);
            newBubble.yVelocity = randInt(-5, 5);
            newBubble.rotate = randInt(0, 360);
            newBubble.hue = randInt(0, 360);

/*  11 Create image element for the bubble  */
            var bubbleImg = document.createElement("img");
            bubbleImg.style.position = "absolute";
            bubbleImg.src = newBubble.imageURL;
            bubbleImg.style.width = newBubble.radius + "px";
            bubbleImg.style.left = newBubble.xPos + "px";
            bubbleImg.style.top = newBubble.yPos + "px";
            bubbleBox.appendChild(bubbleImg);

/* 12  Set interval  */
            var bubbleInterval = setInterval(function() {
/* 13  Apply fade  */
                newBubble.fadeBubble();
/* 14 Remove  <0 opacity   */
                if (newBubble.opacity < 0) {
                    clearInterval(bubbleInterval);
                    bubbleBox.removeChild(bubbleImg);
                } else {
/* 15  Apply animation effects  */
                    bubbleImg.style.opacity = newBubble.opacity;
                    bubbleImg.style.filter = "hue-rotate(" + newBubble.hue + "deg)";
                    bubbleImg.style.transform = "rotate(" + newBubble.rotate + "deg)";
                    newBubble.moveBubble(box.height, box.width);
                    bubbleImg.style.left = newBubble.xPos + "px";
                    bubbleImg.style.top = newBubble.yPos + "px";
                    newBubble.rotateBubble();
                    newBubble.changeColor();
                }
            }, 25);
        }
    }, 500);

    /* Function to return a random integer between minVal and maxValue inclusive */
    function randInt(minVal, maxVal) {
        var size = maxVal - minVal + 1;
        return Math.floor(minVal + size*Math.random());
    }  
});
