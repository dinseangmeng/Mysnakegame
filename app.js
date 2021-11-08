

const canvas = document.querySelector('.canvas');
const context=canvas.getContext('2d');
const scale=30;
const rows=canvas.width/scale;
const column=canvas.height/scale;
var snake;
var snack;
var lastKey,direct;
var musicBG=new Audio('music/music.mp3');
var musicMV=new Audio('music/move.mp3');
var musicOV=new Audio('music/gameover.mp3');
var musicEat=new Audio('music/food.mp3');
if(window.innerWidth>1250 && window.innerHeight>630){
    function label(){
        document.querySelector(".speedlabel").innerText=document.querySelector("#speed").value;
    }
    setInterval(label,50);
    
    function Snack(){
        this.x;
        this.y;
        
        this.foodPath=function(){
            this.x=(Math.floor(Math.random()*rows-4)+4)*scale;
            this.y=(Math.floor(Math.random()*column-4)+4)*scale;
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
                
            }
            this.tail[this.total-1]={x: this.x, y: this.y};
            this.x+=this.vSpeed;
            this.y+=this.hSpeed;
            this.outBoard(this.x,this.y);
            
            
        }
        this.outBoard=function(x,y){
            if(x>canvas.width || x<0||y>canvas.height ||y<0){
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
                });
                this.total=0;
                this.tail=[];
                this.x=0;
                this.y=0;
                this.vSpeed=0;
                this.hSpeed=0;
                musicOV.play();
                
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
        musicBG.play();
        snake=new Snake;
        snack=new Snack;
        snack.foodPath();
        
        document.querySelector(".reloadp").style.display="block";
        document.querySelector(".speedsetting").style.display="none";
        
        window.setInterval(()=>{
            context.clearRect(0, 0, canvas.width, canvas.height);
            snack.paint();
            snake.move();
            snake.paint();
            if(snake.dead()){
                Swal.fire({
                    title: "Opp! You eat your tail!",
                    width:500,
                    padding:"1rem",
                    text:`Your score ${snake.total}`,
                    icon: "error",
                    imageUrl:"https://cdn.dribbble.com/users/375867/screenshots/3136248/media/6e3aff4123c55b4df6c1c711292482fc.gif",
                    imageWidth: 250,
                    imageHeight: 200,
                })
                snake.total=0;
                snake.tail=[];
                snake.x=0;
                snake.y=0;
                snake.vSpeed=0;
                snake.hSpeed=0;
                snake.bol=false;
                musicMV.play();
                
                
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
            
        })
    };
 
}else {
        Swal.fire({
            title: "Your Screen too small to play !",
            width:500,
            padding:"1rem",
            text:"This Game Just creat for Computer online",
            icon: "error",
            imageUrl:"https://cdn.dribbble.com/users/375867/screenshots/3136248/media/6e3aff4123c55b4df6c1c711292482fc.gif",
            imageWidth: 250,
            imageHeight: 200,
            
        }).then(()=>{
            window.history.go(-1);
        })
}

