let sb=[];
let sbCount=0;
let vb;

var note=[60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 0];
var hueC=[0, 15, 30, 45, 60, 120, 170, 225, 250, 270, 295, 300, 345];

var waves=[];
var noteIndexes=[0, 0, 0];
var freqHzes=[0, 0, 0];

var ampValue=0.5;

var playing=false;
function setup(){
  createCanvas(windowWidth, windowHeight);
  
  for (var i=0;i<3;i++){
    waves[i]=new p5.Oscillator();
    waves[i].setType('sine');
  }
  
  for(var j=0;j<5;j++){
    for (var k=0;k<3;k++){
      sb[sbCount]=new soundButton(width/3*k, (height/2)+j*(height/2/5), width/3, height/2/5); //버튼 객체 만들기
      sbCount++;    
    }
  }  
}

function draw(){
  colorMode(HSB);
  stroke(0);
  background(255);
  
  for (var i=0;i<sb.length;i++){
    if (i==1 || i==3 || i==6 || i==8 || i==10) sb[i].show(false);
    else sb[i].show(true);
  }

  for(var n=0;n<touches.length;n++){
    makeSound(n, touches[n].x, touches[n].y);
  }
}


function touchStarted(){  
  switch(touches.length){
      case 3:
        waves[0].start();
        waves[1].start();
        waves[2].start();
        break;

      case 2:
        waves[0].start();
        waves[1].start();
        break;

      case 1:
        waves[0].start();
        break;
    
      case 0:
        break;
      
      default:        
        break;
    }
}

function touchEnded(){  
  switch(touches.length){
    case 3:
      break;

    case 2:
      waves[2].stop();
      break;

    case 1:
      waves[1].stop();
      waves[2].stop();
      break;

    case 0:
      waves[0].stop();
      waves[1].stop();
      waves[2].stop();
      break;

    default:        
      break;
  } 
}

function makeSound(n, x, y){
  vb=map(rotationX, -30, 30, -0.5, 0.5);
  for(var m=0;m<sb.length;m++){
    if(x>sb[m].x1 && x<sb[m].x2 && y>=sb[m].y1 && y<sb[m].y2){
      if(m<13){
        switch(n){
          case 0:
            noteIndexes[0]=m;
            freqHzes[0]=note[noteIndexes[0]]+vb;
            waves[0].freq(midiToFreq(freqHzes[0]));
            waves[0].amp(ampValue, 1);
            
            makeGraphic(n, m, sb[m].wb);
            break;
            
          case 1:
            noteIndexes[1]=m;
            freqHzes[1]=note[noteIndexes[1]]+vb;
            waves[1].freq(midiToFreq(freqHzes[1]));
            waves[1].amp(ampValue, 1);
            
            makeGraphic(n, m, sb[m].wb);
            break;
            
          case 2:
            noteIndexes[2]=m;
            freqHzes[2]=note[noteIndexes[2]]+vb;
            waves[2].freq(midiToFreq(freqHzes[2]));
            waves[2].amp(ampValue, 1);
            
            makeGraphic(n, m, sb[m].wb);
            break;
        }
      }
      else if (m==13) { //볼륨 키우기
        if(ampValue<=1){
          ampValue+=0.1;
        }
      }
      else if (m==14){ //볼륨 줄이기
        if(ampValue>=0){
          ampValue-=0.1;
        }
      }      
    }
  }
}

function makeGraphic(n, m, wb){
  switch(n){
    case 0:
      noStroke();
      fill(hueC[m], 100, 100);
      rectMode(CENTER);
      rect(width/2, width/2, width*0.8, width*0.8);
      break;
    
    case 1:
      noStroke();
      if(wb) fill(0, 0, 0);
      else if(!wb) fill(0, 0, 100);
      star(width/2, width/2, width*0.4, width*0.25, 8);
      
      fill(hueC[m], 100, 100);
      push();
      translate(width/2, width/2);
      for(var i=0;i<8;i++){
        rotate(radians(45));
        rectMode(CENTER);
        rect(0, 0, width*0.2, width*0.8);
      }
      pop();
      break;
      
    case 2:
      noStroke();
      if(wb) fill(0, 0, 0);
      else if (!wb) fill(0, 0, 100);
      push();
      translate(width/2, width/2);
      for(var j=0;j<8;j++){
        rotate(radians(45));
        ellipse(0, 0, width/8, width/3);
      }
      pop();
      
      fill(hueC[m], 100, 100);      
      star(width/2, width/2, width*0.2, width*0.1, 8);
      break;      
  }  
}

function star(x, y, radius1, radius2, npoints){
  let angle=TWO_PI/npoints;
  let halfAngle=angle/2.0;
  beginShape();
  for (let a=0;a<TWO_PI;a+=angle){
    let sx=x+cos(a)*radius2;
    let sy=y+sin(a)*radius2;
    vertex(sx, sy);
    sx=x+cos(a+halfAngle)*radius1;
    sy=y+sin(a+halfAngle)*radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

class soundButton {
  constructor(x, y, w, h){
    this.x1=x;
    this.y1=y;
    this.w=w;
    this.h=h;
    this.x2=this.x1+this.w;
    this.y2=this.y1+this.h;
    this.defaultColor=color(250);
    this.isPressed=false;
    this.wb;
  }
  
  show(wb){
    this.wb=wb;
    if(!wb) this.defaultColor=color(0);
    fill(this.defaultColor);
    rect(this.x1, this.y1, this.w, this.h);
  }
}

