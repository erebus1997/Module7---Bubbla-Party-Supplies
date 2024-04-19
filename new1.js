// bu_bubbles.js

// Author: [Your Name]
// Date: 2024-04-07

// Object literal for the box object
const box = {
    width: 1024,
    height: 500
};

// Bubble class constructor function
function Bubble(size, img) {
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

// Methods for the Bubble prototype
Bubble.prototype.fadeBubble = function() {
    this.opacity -= 0.0005;
};

Bubble.prototype.changeColor = function() {
    this.hue = (this.hue + 3) % 360;
};

Bubble.prototype.rotateBubble = function() {
    this.rotate = (this.rotate + this.rotateDirection) % 360;
};

Bubble.prototype.moveBubble = function(height, width) {
    let bubbleTop = this.yPos;
    let bubbleBottom = this.yPos + this.radius;
    let bubbleLeft = this.xPos;
    let bubbleRight = this.xPos + this.radius;

    if (bubbleTop < 0 || bubbleBottom > height) {
        this.yVelocity *= -1;
    }
    if (bubbleLeft < 0 || bubbleRight > width) {
        this.xVelocity *= -1;
    }

    this.yPos += this.yVelocity;
    this.xPos += this.xVelocity;
};

// Event listener for the load event
window.addEventListener('load', function() {
    // setInterval method to create new bubbles
    setInterval(function() {
        // Limit the number of bubbles to 20
        if (document.querySelectorAll('#bubbleBox img').length < 20) {
            // Generate random size and img
            let size = randInt(50, 120);
            let img = `bu_bubble${randInt(1, 10)}.png`;

            // Create a new bubble object
            let newBubble = new Bubble(size, img);

            // Set initial properties for the new bubble
            newBubble.xPos = box.width / 2;
            newBubble.yPos = box.height / 2;
            newBubble.xVelocity = randInt(-5, 5);
            newBubble.yVelocity = randInt(-5, 5);
            newBubble.rotate = randInt(0, 360);
            newBubble.hue = randInt(0, 360);

            // Create inline image for the bubble
            let bubbleImg = document.createElement('img');
            bubbleImg.style.position = 'absolute';
            bubbleImg.src = newBubble.imageURL;
            bubbleImg.style.width = `${newBubble.radius}px`;
            bubbleImg.style.left = `${newBubble.xPos}px`;
            bubbleImg.style.top = `${newBubble.yPos}px`;

            // Append bubble image to bubble box
            document.getElementById('bubbleBox').appendChild(bubbleImg);

            // Animate the bubble appearance
            let bubbleInterval = setInterval(function() {
                newBubble.fadeBubble();

                if (newBubble.opacity < 0) {
                    // Remove bubble if opacity is less than 0
                    clearInterval(bubbleInterval);
                    bubbleImg.remove();
                } else {
                    // Animate the bubble
                    bubbleImg.style.opacity = newBubble.opacity;
                    newBubble.changeColor();
                    bubbleImg.style.filter = `hue-rotate(${newBubble.hue}deg)`;
                    newBubble.rotateBubble();
                    bubbleImg.style.transform = `rotate(${newBubble.rotate}deg)`;
                    newBubble.moveBubble(box.height, box.width);
                    bubbleImg.style.left = `${newBubble.xPos}px`;
                    bubbleImg.style.top = `${newBubble.yPos}px`;
                }
            }, 25);
        }
    }, 500); // Interval to create new bubble every half-second
});

// Function to generate random integer between min and max (inclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
