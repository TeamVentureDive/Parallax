let element = '#login'; // <-- id of the button we're transitioning

// DEFINE YOUR GRADIENT COLORS HERE
// Pct refers to the percentage position of the gradient stop point.
const gradientStopOne = [
    { pct: 0,  color: { r: 77, g: 25, b: 77 } }, // The first color in your gradient
    { pct: 100, color: { r: 100, g: 9, b: 50 } }   // The color you want your first color to transition to
];
const gradientStopTwo = [
    { pct: 0,  color: { r: 33, g: 47, b: 69 } }, // The second color in your gradient
    { pct: 100, color: { r: 42, g: 6, b: 70 } }  // The color you want your second color to transition to
]

// Apply our gradient programmatically so we can completely manipulate the gradient from JS rather than CSS
let c1 = gradientStopOne[0].color;
let c2 = gradientStopTwo[0].color;



let transitionTime = 300           // <-- 100 ms - time our animation will last
let previousTime, start = 0;        // <-- stores data on animation
let angle = 45;                    // <-- angle of gradient
let animationDirection = 'forwards' // <-- stores the animation direction
let intervalFrame;                  // <-- stores the interval frame
let currentPct = 0;                 // <-- current percentage through the animation
let elapsed = 0;                    // <-- number of frames which have ellapsed 
    
// This is our animation which we run on hover
const animateGradient = function() {
    if(intervalFrame === undefined) {
        intervalFrame = setInterval(() => {
            console.log(document.querySelector('#login').style.background)
            let time = transitionTime / 1000; // time in seconds
            let numberOfFrames = time * 60; // 60 frames per second -> 1 second = 60 frames
            
            // If the animation is going forward
            if(animationDirection === 'forwards') {
                // Add 1 to elapsed
                elapsed += 1;
                // The elapsed frames out of max frames
                currentPct = Math.min(elapsed / numberOfFrames, 1) * 100;
            }
            else {
                // Otherwise we're going back - subtract 1 from ellapsed
                elapsed -= 1;
                // The elapsed frames out of max frames
                currentPct = Math.max(elapsed / numberOfFrames, 0) * 100;
            }
            
            // Calculate current color in this time for each gradient color
            let colorOne = getColor(currentPct, gradientStopOne);
            let colorTwo = getColor(currentPct, gradientStopTwo);

            // Generate CSS string
            let generateGradient = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;

            // Add it to our background.
            document.querySelector(element).style.backgroundImage = generateGradient;

            // End the interval when we're done
            if(currentPct === 100 || currentPct === 0) {
                clearInterval(intervalFrame);
                intervalFrame = undefined;
            }
        }, 16.667); // 60 frames per second
    }
};

document.querySelector('#login').style.background = `linear-gradient(${angle}deg, rgb(${c1.r}, ${c1.g}, ${c1.b}), rgb(${c2.r}, ${c2.g}, ${c2.b}))`;
   
// This function transitions between two rgb colors
const getColor = function(pct, colorSet) {
    for (var i = 1; i < colorSet.length - 1; i++) {
        if (pct < colorSet[i].pct) {
            break;
        }
    }
    // This conversion figures out the transition between two rgb values
    var lower = colorSet[i - 1];
    var upper = colorSet[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    // And returns the rgb code
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

// On hover, run our animation
document.getElementById('login').addEventListener('mouseenter', function() {
    animationDirection = 'forwards';
    animateGradient();
    
});
// On hover out, run our animation again, but backwards
document.getElementById('login').addEventListener('mouseleave', function() {
    animationDirection = 'backwards';
    animateGradient();
});
