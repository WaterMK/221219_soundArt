//왜 하나 누르면 안 나고 세개 눌렀을 때 두개나는지 갯수 차이 확인
//버튼 누르고 있는지 아닌지 플래그 만들기

let sb=[];
let sbCount=0;
let vb;

let tvs=[];

var note=[60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 0];

var noteIndex1;
var noteIndex2;
var noteIndex3;

var freqHz1;
var freqHz2;
var freqHz3;

var ampValue=0.5;

var touch1=false;
var touch2=false;
var touch3=false;

var playing=false;
function setup(){
  createCanvas(displayWidth, displayHeight);
  wave1=new p5.Oscillator();
  wave1.setType('sine'); //사인파 모양
  
  wave2=new p5.Oscillator();
  wave2.setType('sine'); //사인파 모양
  
  wave3=new p5.Oscillator();
  wave3.setType('sine'); //사인파 모양
  
  for(var j=0;j<5;j++){
    for (var k=0;k<3;k++){
      sb[sbCount]=new soundButton(width/3*k, (height/2)+j*(height/2)/6, width/3, (height/2)/6); //버튼 객체 만들기
      sbCount++;    
    }
  }
  
  for(var i=0;i<3;i++){
    tvs[i]=new touchVector();
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
    makeSound(n, touches[n].x, touches[n].y);
  }
}


function touchStarted(){  
//   vb=map(rotationZ, -30, 30, -0.9, 0.9);
  if(touch1) wave1.start();
  if(touch2) wave2.start();
  if(touch3) wave3.start();
}

function touchEnded(){
  touch1=false;
  switch(touches.length){
    case 0:
      touch1=false;
      touch2=false;
      touch3=false;
      
      wave1.stop();
      wave2.stop();
      wave3.stop();
      break;
      
    case 1:
      touch2=false;
      touch3=false;
      
      wave2.stop();
      wave3.stop();
      break;
      
    case 2:
      touch3=false;
      
      wave3.stop();
      break;      

    default:
      break;
  } 
}

function makeSound(n, x, y){
  for(var m=0;m<sb.length;m++){
    if(x>sb[m].x1 && x<sb[m].x2 && y>=sb[m].y1 && y<sb[m].y2){
      if(m<13){
        switch(n){
          case 0:
            noteIndex1=m;
            freqHz1=note[noteIndex1];
            touch1=true;
            wave1.freq(midiToFreq(freqHz1));
            break;
            
          case 1:
            noteIndex2=m;
            freqHz2=note[noteIndex2];
            touch2=true;
            wave2.freq(midiToFreq(freqHz2));
            break;
            
          case 2:
            noteIndex3=m;
            freqHz3=note[noteIndex3];
            touch3=true;
            wave3.freq(midiToFreq(freqHz3));
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


// function startSound(n, x, y){
//   for (var m=0;m<sb.length;m++){
//     if(x>=sb[m].x1 && x<sb[m].x2 && y>=sb[m].y1 && y<sb[m].y2){
//       if(m<13) {
//         switch(n){
//           case 0:
//             noteIndex1=m;
//             break;
          
//           case 1:
//             noteIndex2=m;
//             break;
            
//           case 2:
//             noteIndex3=m;
//             break;
          
//           default:
//             break;
//         }
//       }
      
//       else if (m==13) { //볼륨 키우기
//         if(ampValue<=1){
//           ampValue+=0.1;
//         }
//       }
//       else if (m==14){ //볼륨 줄이기
//         if(ampValue>=0){
//           ampValue-=0.1;
//         }
//       }
//     }
//   }
  
//   vb=map(rotationZ, -30, 30, -0.9, 0.9);  
  
// //   if(touch1 && !touch2 && !touch3){
// //     ellipse(50, 50, 100, 100);
    
// //   }
// //   else if(touch1 && touch2 && !touch3){
       
// //   }
// //   else if(touch1 && touch2 && touch3){
    
// //   }
// }

// function endSound(){
//   if(!touch1 && !touch2 && !touch3){
//     wave1.stop();
//     wave2.stop();
//     wave3.stop();
//   }
//   else if(touch1 && !touch2 && !touch3){
//     wave2.stop();
//     wave3.stop();
//   }
//   else if(touch1 && touch2 && !touch3){
//     wave3.stop();
//   }
// }



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

class touchVector{
  constructor(){
    this.x;
    this.y;
  }
  
  update(x, y){
    this.x=x;
    this.y=y;   
  }
}