//Variable
const canvas = document.querySelector('.canvas');
const context=canvas.getContext('2d');
var scale=28;
var rows
var column
var snake;
var snack;
var lastKey,direct;
var musicBG=new Audio('music/music.mp3');
var musicMV=new Audio('music/move.mp3');
var musicOV=new Audio('music/gameover.mp3');
var musicEat=new Audio('music/food.mp3');
var a,Speed=0,j=0,m=0;
var score=new Array;
var speedLabel=document.getElementById("speed");
var HisBoard=document.querySelector("#Scorehistory");
var str=new String;
function label(){
    if(!primary(document.querySelector("#scale").valueAsNumber)){
        scale=document.querySelector("#scale").valueAsNumber;
        document.querySelector(".scaleLabel").innerText=scale;

    }else{
        document.querySelector(".scaleLabel").value=scale;
    }
    if(speedLabel.valueAsNumber%5!=0){
        Speed=speedLabel.valueAsNumber;
        while(true){
            if(Speed%5==0){
                break
            }
            Speed++;
        }
        document.querySelector(".speedlabel").innerText=Speed;
        speedLabel.value=Speed;
        speedLabel.valueAsNumber=Speed;
    }

    
    

};
function Mvalue(){
    m=0;
}
function side(){
    m=0;
    for(let i=Math.floor(document.documentElement.clientWidth/1.5);i>600;i--){
        if(i%scale===0){
            canvas.width=i;
            break;
        }
    };
    for(let i=Math.floor(document.documentElement.clientHeight*0.8);i>=600;i--){
        if(i%scale===0){
            canvas.height=i;
            break;
        }
    };
    window.addEventListener("resize",()=>{
        
        if(window.innerWidth>=500){
            for(let i=Math.floor(document.documentElement.clientWidth/1.5);i>100;i--){
                if(i%scale==0){
                    canvas.width=i;
                    break;
                }
            }
            for(let i=Math.floor(document.documentElement.clientHeight*0.8);i>100;i--){
                if(i%scale==0){
                    canvas.height=i;
                    break;
                }
            }
        }else {
            Swal.fire({
                title: "Your Screen too small to play !",
                text:"This Game Just creat for Computer online",
                icon: "error",
                imageUrl:"https://cdn.dribbble.com/users/375867/screenshots/3136248/media/6e3aff4123c55b4df6c1c711292482fc.gif",
                imageWidth: 250,
                imageHeight: 200,
                
            }).then(()=>{
                window.history.go(-1);
            })
        }
        
        
        
    });
}
setInterval(label,150);

if(window.innerWidth>=600){
    side();
    rows=canvas.width/scale;
    column=canvas.height/scale;
    function Snack(){
        this.x;
        this.y;
        
        this.foodPath=function(){
            this.x=(Math.floor(Math.random()*rows-1)+1)*scale;
            this.y=(Math.floor(Math.random()*column-1)+1)*scale;
            while(this.x>=canvas.width || this.y>=canvas.height){
                this.x=(Math.floor(Math.random()*rows-1)+1)*scale;
                this.y=(Math.floor(Math.random()*column-1)+1)*scale;
            }
            
    
        }
        this.paint=function(){
            context.fillStyle="#7CF19C";
            context.fillRect(this.x,this.y,scale,scale);   
        }
    };
    function Snake(){
        this.x=0;
        this.y=0;
        this.vSpeed=0;
        this.hSpeed=0;
        this.total=0;
        this.tail=[];
        this.paint=function(){
            context.fillStyle="#7DF447";
            context.strokeStyle="#0000";
            for(let i=0;i<this.tail.length;i++){
                context.fillRect(this.tail[i].x,this.tail[i].y,scale,scale);
            }
            context.fillStyle="#0b4e00";
            context.fillRect(this.x,this.y,scale,scale);
        }
        this.move=function(){
            for(let i=0;i<this.tail.length-1;i++){
                this.tail[i]=this.tail[i+1]
                this.outBoard(this.tail[i].x,this.tail[i].y);
            }
            this.tail[this.total-1]={x: this.x, y: this.y};
            this.x+=this.vSpeed;
            this.y+=this.hSpeed;
            this.outBoard(this.x,this.y);
            
            
            
        }
        this.outBoard=function(x,y){
            if(document.querySelector("#modeBorder").checked){
                if(x>canvas.width || x<0||y>canvas.height ||y<0 ){
                    score[j]=this.total;
                    if(this.total<10){
                        str+="<h3>"+"0"+score[j]+"</h3><br>";
                    }else{str+="<h3>"+score[j]+"</h3><br>";}
                    this.bol=false;
                    Swal.fire({
                        title: `${this.check(this.total)}`,
                        width:600,
                        padding:"1rem",
                        text:`Your score ${this.total}`,
                        icon: "error" ,
                        imageUrl:"https://cdn.dribbble.com/users/375867/screenshots/3136248/media/6e3aff4123c55b4df6c1c711292482fc.gif",
                        imageWidth: 250,
                        imageHeight: 200,
                    })
                    if(this.total<10){
                        document.querySelector(".reloadp").style.display="block"
                        document.querySelector(".reloadp").innerText="Opp ! Your Score TOO low you Should Change Speed for First try";
                    }else if(this.total>20){
                        document.querySelector(".reloadp").style.display="block"
                        document.querySelector(".reloadp").innerText="Wow ! Your try more hard speed";
                    }
                    else{
                        document.querySelector(".reloadp").style.display="block"
                        document.querySelector(".reloadp").innerText="Not Bad! on first try";
                    }
                    this.total=0;
                    this.tail=[];
                    this.x=0;
                    this.y=0;
                    this.vSpeed=0;
                    this.hSpeed=0;
                    direct="";
                    lastKey="";
                    musicOV.play();
                    document.querySelector(".speedsetting").style.display="block";
                    document.querySelector("button").innerText="Try again"
                    j++;
                    
                }
            }else if(document.querySelector("#modeNBorder").checked){
                if(x>canvas.width ){
                    this.x=0;
                    
                }else if(x<0){
                    this.x=canvas.width;
                }else if(y>canvas.height){
                    this.y=0;
                }else if(y<0){
                    this.y=canvas.height;
                }
            }
            
        }
        this.check=function(total){
            if(total<10){
                var alerText="Opp too bad!"
                return alerText;
            }
            return "Ohh! Not bad!"
        };
        this.moveDirect=function(direct,lastKey){
            switch(direct){
                case "Up":
                if(lastKey=="Down" || lastKey=="Up")break
                this.vSpeed=0;
                this.hSpeed=-scale*1;
                break;
                case "Down":
                if(lastKey=="Up" || lastKey=="Down")break
                this.vSpeed=0;
                this.hSpeed=scale*1;
                break;   
                case "Right":
                if(lastKey=="Left" ||lastKey=="Right")break
                this.vSpeed=scale*1;
                this.hSpeed=0;
                break;
                case "Left":
                if(lastKey=="Right" || lastKey=="Left")break
                this.vSpeed=-scale*1;
                this.hSpeed=0;
                break;  
            }
            musicMV.play();
            
        }
        this.ate=function(snack){
            if(this.x===snack.x && this.y===snack.y){
                this.total++;
                return true;
            }
            return false;
        }
        this.dead=function(){
            for(let i=0;i<this.tail.length-1;i++){
                this.outBoard(this.tail[i].x,this.tail[i].y);
                if(this.x===this.tail[i].x && this.y==this.tail[i].y){
                    return true;
                }
                
            }
            
        }
        this.bol=true;
        
    };
    function start(){
        m++;
        HisBoard.firstElementChild.style.right="-105%";
        HisBoard.lastElementChild.style.right="-9%";
        HisBoard.lastElementChild.style.transform = "rotate(0)";
        clearInterval(a);
        musicBG.play();
        snake=new Snake;
        snack=new Snack;
        snack.foodPath();
        
        document.querySelector(".reloadp").style.display="none";
        document.querySelector(".speedsetting").style.display="none";
        
        
        a=setInterval(()=>{
            context.clearRect(0, 0, canvas.width, canvas.height);
            snack.paint();
            snake.move();
            snake.paint();
            if(snake.dead()){
                score[j]=snack.total;
                if(snack.total<10){
                    str+="<h3>"+"0"+score[j]+"</h3><br>";
                }else{str+="<h3>"+score[j]+"</h3><br>";}
                Swal.fire({
                    title: "Opp! You eat your tail!",
                    width:500,
                    padding:"1rem",
                    text:`Your score ${snake.total}`,
                    icon: "error",
                    imageUrl:"https://cdn.dribbble.com/users/375867/screenshots/3136248/media/6e3aff4123c55b4df6c1c711292482fc.gif",
                    imageWidth: 250,
                    imageHeight: 200,
                });
                snake.total=0;
                snake.tail=[];
                snake.x=0;
                snake.y=0;
                direct="";
                lastKey="";
                snake.vSpeed=0;
                snake.hSpeed=0;
                snake.bol=false;
                musicMV.play();
                document.querySelector(".speedsetting").style.display="block";
                document.querySelector("button").innerText="Try again";
                j++; 
                 
            };
            if(snake.ate(snack)){
                musicEat.play();
                snack.foodPath();
            };
            
            document.querySelector(".Score").innerText=snake.total;
        },document.querySelector("#speed").valueAsNumber);
        document.body.addEventListener("keydown",(e)=>{
            lastKey=direct? direct:"";
            direct=e.key.replace("Arrow","");
            snake.moveDirect(direct,lastKey);
            if(direct=="Up" || direct=="Down" || direct=="Right" ||direct=="Left"){
                HisBoard.firstElementChild.style.right="-105%";
                HisBoard.lastElementChild.style.right="-9%";
                HisBoard.lastElementChild.style.transform = "rotate(0)";
                document.querySelector(".reloadp").style.display="none";
                document.querySelector(".speedsetting").style.display="none";
                if(m==0){
                    start();
                }
                m++;
                

            }
            
        })
    };
}else {
    Swal.fire({
        title: "Your Screen too small to play !",
        text:"This Game Just creat for Computer online",
        icon: "error",
        imageUrl:"https://cdn.dribbble.com/users/375867/screenshots/3136248/media/6e3aff4123c55b4df6c1c711292482fc.gif",
        imageWidth: 250,
        imageHeight: 200,
        
    }).then(()=>{
        window.history.go(-1);
    })
}
function slideHis(){
    HisBoard.firstElementChild.style.right="-105%"
    HisBoard.lastElementChild.style.right="-9%"
    HisBoard.lastElementChild.addEventListener("click",()=>{
        
        if(HisBoard.firstElementChild.style.right=="-105%" && HisBoard.lastElementChild.style.right=="-9%"){
            HisBoard.firstElementChild.style.right="-5%";
            HisBoard.lastElementChild.style.right="95%";
            HisBoard.lastElementChild.style.transform = "rotate(180deg)";
            
        }else{
            HisBoard.firstElementChild.style.right="-105%";
            HisBoard.lastElementChild.style.right="-9%";
            HisBoard.lastElementChild.style.transform = "rotate(0)";
        }
        HisBoard.firstElementChild.innerHTML="<h2>Your score history</h2><br>"+str;
        
    });

}
slideHis();



