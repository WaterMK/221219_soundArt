//wave 3개 만들기

let sb=[];
let sbCount=0;

var note=[60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
var noteIndex;
var touch1=false;

var playing=false;
function setup(){
  createCanvas(displayWidth, displayHeight);
  wave=new p5.Oscillator();
  wave.setType('sine'); //사인파 모양
  
  for(var j=0;j<5;j++){
    for (var k=0;k<3;k++){
      sb[sbCount]=new soundButton(width/3*k, (height/2)+j*(height/2)/6, width/3, (height/2)/6); //버튼 객체 만들기
      sbCount++;
    }
  }
}

function draw(){
  colorMode(HSB);
  background(255);
  
  for (var i=0;i<sb.length;i++){
    if (i==1 || i==3 || i==6 || i==8 || i==10) sb[i].show(false);
    else sb[i].show(true);
  }

  for(var n=0;n<touches.length;n++){
    ellipse(50, 50, 100, 100);
    test(touches[n].x, touches[n].y);
    print(n);
      // ellipse(touches[i].x, touches[i].y, 30, 30);
    }
}


function touchStarted(){
  // wave.freq(midiToFreq(note[noteIndex]))
  wave.start();
  wave.amp(0.5, 1);
}


function test(x, y){
  if(x>=0&& x<width/2 && y>=height/2, y<(height/2)+(height/2/3)) { //좌표 확인하기
    fill(255, 0, 0);
    rect(width/2, width/2, 50, 50);
    noteIndex=0;
    
    
  }
  else {
    fill(0, 255, 255);
    ellipse(width/2, width/2, 50, 50);
    noteIndex=1;
  }
  wave.freq(midiToFreq(note[noteIndex]))
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
  constructor(x, y, w, h){
    this.x1=x;
    this.y1=y;
    this.w=w;
    this.h=h;
    this.x2=this.x1+this.w;
    this.y2=this.y1+this.h;
    this.defaultColor=color(250);
  }
  
  show(wb){
    if(wb) this.defaultColor=color(250);
    else this.defaultColor=color(0);
    
    fill(this.defaultColor);
    rect(this.x1, this.y1, this.w, this.h);
    //print(this.x1, 300, 300);
  }
  
  pressed(){
    // defaultColor=0;
  }
}