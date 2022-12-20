//wave 3개 만들기
//버튼 누르고 있는지 아닌지 플래그 만들기

let sb=[];
let sbCount=0;

var note=[60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 0];
var noteIndex;
var touch1=false;

var playing=false;
function setup(){
  createCanvas(displayWidth, displayHeight);
  wave=new p5.Oscillator();
  wave.setType('sine'); //사인파 모양
  
  for(var j=0;j<5;j++){
    for (var k=0;k<3;k++){
      if(sbCount<13){
        sb[sbCount]=new soundButton(width/3*k, (height/2)+j*(height/2)/6, width/3, (height/2)/6); //버튼 객체 만들기
      sbCount++;
      }
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
  }
}


function touchStarted(){
  // wave.freq(midiToFreq(note[noteIndex]))
  wave.start();
  wave.amp(0.5, 1);
}


function test(x, y){
  for (var m=0;m<sb.length;m++){
    if(x>=sb[m].x1 && x<sb[m].x2 && y>=sb[m].y1 && y<sb[m].y2){
      noteIndex=m;
    }
  }
  wave.freq(midiToFreq(note[noteIndex]))
}

function touchEnded(){
  // wave.amp(0, 0.1);
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
    this.isPressed=false;
  }
  
  show(wb){
    if(!wb) this.defaultColor=color(0);
    fill(this.defaultColor);
    rect(this.x1, this.y1, this.w, this.h);
    //print(this.x1, 300, 300);
  }
}