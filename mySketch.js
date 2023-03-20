let moon
let building
let stars
let background
let counter = 0
let freq


var sound, amp, freq1, freq2, freq3;

function preload() {
    moon = loadImage('moon.png')
    building = loadImage('building.jpg')
    stars = loadImage('stars.png')
    const musicUrl = callAndroid()
    sound = loadSound(musicUrl)
    // sound = loadSound(musicUrl)
    background = loadImage('background.jpg')
}



function setup() {
    createCanvas(1600, 800);

    //colorMode(HSB);
    sound.play();
    amp = new p5.Amplitude();
    amp.setInput(sound);
    rectMode(CORNER);
    angleMode(DEGREES)

    freq = new p5.FFT(0.9, 256);
    freq.setInput(sound);

}

function draw() {

    image(background, 0, 0, width, height);
    var vol = amp.getLevel();
	let size = sin(millis()/10)*60+vol*50;
    let size2 = sin(millis()/5)*30+vol*50;
	drawImage(moon,width/5*3,height/6+size,200+vol*200);
	drawImage(stars,width/6+size2*2,height/9,size2+300+vol*500) ;

  //  drawImage(stars,width/10,height/9-size2*2,400-size2) ;
	push();
    translate(counter, width / 4);
    rotate(sin(millis() / 1000) * TWO_PI);
    pop();
    counter++;
    var spectrum = freq.analyze();
    for (var i = 0; i < spectrum.length; i++) {
        var x = width / spectrum.length * i;
        var y = 260;
        var w = width / spectrum.length;
        var h = spectrum[i];
        push();
        fill(10, 153, 255);
        noStroke();
        translate(width, height + 525);
        rotate(180);
        image(building, x * 5 + width / 2, y, w + 16, h * 2)
        pop();
        push();
        fill(10, 153, 255);
        noStroke();
        translate(width, height + 525);
        rotate(180);
        image(building, -x * 5 + width / 2, y, w + 16, h * 2)
        pop();

    }

}


function drawImage(imageFile,x,y,size){
	
	image(imageFile,x,y,size,size) 
	
	
}
