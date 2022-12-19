//wave 3개 만들기

let sb=[];

var note=[60, 61, 62];
var noteIndex;

var playing=false;
function setup(){
  createCanvas(displayWidth, displayHeight);
  wave=new p5.Oscillator();
  wave.setType('sine'); //사인파 모양
  
  for(var j=0;j<5;j++){
    for (var k=0;k<3;k++){
      sb=new soundButton(width/3*k, (height/2)+j*(height/2)/6); //버튼 객체 만들기     
    }
  }
}

function draw(){
  colorMode(HSB);
  background(255);
  
  for (var i=0; i<sb.length;i++){
    sb[i].show();
  }

  for(var i=0;i<touches.length;i++){
      test(touches[i].x, touches[i].y);
      // ellipse(touches[i].x, touches[i].y, 30, 30);
    }
}


function touchStarted(){
  wave.freq(midiToFreq(note[noteIndex]))
  wave.start();
  wave.amp(0.5, 1);
  
}

function test(x, y){
  if(x>=width/3&& x<width/3*2 && y>=height/2, y<(height/2)+(height/2/3)) { //좌표 확인하기
    fill(255, 0, 0);
  ellipse(width/2, width/2, 50, 50);
    noteIndex=0;
  }
  else {
    fill(0, 255, 255);
    ellipse(width/2, width/2, 50, 50);
    noteIndex=1;
  } 
}

function touchEnded(){
  wave.stop();
}

function toggle(){
  if(!playing){        
    playing=true;
  }
  else{
    playing=false;
  }
}

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

class soundButton {
  constructor(x, y){
    this.x1=x;
    this.y1=y;
    this.x2=this.x1+width/3;
    this.y2=this.y1+(height/2)/6;
  }
  
  show(){
    // if(wb==0) this.defaultColor=200;
    fill(defaultColor);
    rect(this.x1, this.y1, width/3, (height/2)/6);
    print(this.x1, 300, 300);
  }
  
  pressed(){
    // defaultColor=0;
  }
}