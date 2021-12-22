//Variable
const canvas = document.querySelector('.canvas');
const context=canvas.getContext('2d');
var scale=28;
var snake,snack,lastKey,direct,column,rows,struggle;
var musicBG=new Audio('music/music.mp3');
var musicMV=new Audio('music/move.mp3');
var musicOV=new Audio('music/gameover.mp3');
var musicEat=new Audio('music/food.mp3');
var a,j=0,m=0,ran;
var score=new Array;
var normalMode=document.querySelector("#NormalMode");
var mediumMode=document.querySelector("#MediumMode");
var hardMode=document.querySelector("#hardMode");
var extremMode=document.querySelector("#extremMode");
var border=document.querySelector("#modeBorder");
var Noborder=document.querySelectorAll("#modeNBorder");
var speedLabel=document.getElementById("speed");
var HisBoard=document.querySelector("#Scorehistory");
var detailChoice;
var str=new String;
function label(){
    document.querySelector(".scaleLabel").innerText=document.querySelector("#scale").value
    scale=document.querySelector("#scale").valueAsNumber;
    document.querySelector(".speedlabel").innerText=speedLabel.value;
        if(extremMode.checked){
            border.checked=true;
        }if(hardMode.checked){
            Noborder[0].checked=true;
        }if(normalMode.checked){
            Noborder[0].checked=true;
        }if(mediumMode.checked){
            border.checked=true
        }

    }
function Detail(){
    extremMode.addEventListener("change",()=>{
        detailChoice="Hit the black one and out of board death";
        AlertDetail(detailChoice)
    })
    hardMode.addEventListener("change",()=>{
        detailChoice="Hit the black one death and out of board freely";
        AlertDetail(detailChoice)
    })
    normalMode.addEventListener("change",()=>{
        detailChoice="Move freely";
        AlertDetail(detailChoice)})
    mediumMode.addEventListener("change",()=>{
        detailChoice="out of board death";
        AlertDetail(detailChoice)
    })
}
Detail();
function AlertDetail(detail){
    Swal.fire({
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
        icon: 'info',
        title: `${detail}`,
        showConfirmButton: false,
        timer: 3000
    })
    Mvalue();
}
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
    function Struggle (){
        this.x;
        this.y;
        this.len;
        if(scale>10 && scale<=20){
            this.ran=Math.floor(Math.random()*10+20)
        }else if(scale>20 && scale<=30){
            this.ran=Math.floor(Math.random()*5+10)
        }else{
            this.ran=Math.floor(Math.random()*5+5)
        }
        this.locatedX=[];
        this.locatedY=[];
        this.capacity=[];
        this.RandomStruggle=function (x,y){
            for(let i=0;i<=this.ran;i++){
                this.x=(Math.floor(Math.random()*rows-1)+1)*scale;
                this.y=(Math.floor(Math.random()*column-1)+1)*scale;
                 if(scale>10 && scale<25){
                    this.len=Math.floor(Math.random()*5+10);
                }else{
                    this.len=Math.floor(Math.random()*5+2);
                }
                
                while(this.x>=canvas.width || this.y>=canvas.height || this.x==0 || this.y==0 || (this.x==x && this.y==y)){
                    this.x=(Math.floor(Math.random()*rows-1)+1)*scale;
                    this.y=(Math.floor(Math.random()*column-1)+1)*scale;
                }
                this.locatedX.push(this.x);
                this.locatedY.push(this.y);
                this.capacity.push(this.len);
            }
        }
        this.showStruggle=function (){
            context.fillStyle="#000000";
            for(let i=0;i<this.locatedX.length;i++){
                context.fillRect(this.locatedX[i],this.locatedY[i],this.capacity[i]*scale,scale);

            }
        }
        this.hit=function (x,y){
            for(let i=0;i<=this.locatedX.length-1;i++){
                for(let k=0;k<this.capacity[i];k++){
                    if(x==(this.locatedX[i]+(k*scale)) && y==(this.locatedY[i])){
                        return true;
                    }
                    
                }
                
            }
            return false;
        }
    }
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
            if(document.querySelector("#modeBorder").checked){
                if(x>=canvas.width || x<0||y>=canvas.height ||y<0 ){
                    HisBoard.style.display="";
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
                if(x>=canvas.width ){
                    this.x=0;
                    
                }else if(x<0){
                    this.x=canvas.width;
                }else if(y>=canvas.height){
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
            for(let i=0;i<(this.tail.length)-1;i++){
                if(this.x==this.tail[i].x && this.y==this.tail[i].y){
                    return true;
                }
                
            }
            
        }
        this.bol=true;
        
    };

    function start(){
        HisBoard.style.display="none";
        m++;
        HisBoard.firstElementChild.style.right="-105%";
        HisBoard.lastElementChild.style.right="-9%";
        HisBoard.lastElementChild.style.transform = "rotate(0)";
        clearInterval(a);
        musicBG.play();
        snake=new Snake;
        snack=new Snack;
        struggle=new Struggle;
        snack.foodPath();
        struggle.RandomStruggle(snack.x,snack.y);
        document.querySelector(".reloadp").style.display="none";
        document.querySelector(".speedsetting").style.display="none";
        
        
        a=setInterval(()=>{
            context.clearRect(0, 0, canvas.width, canvas.height);
            if(hardMode.checked || extremMode.checked){
                struggle.showStruggle();
                for(let i=0;i<=struggle.locatedX.length-1;i++){
                    for(let k=0;k<struggle.capacity[i];k++){
                        if(snack.x==(struggle.locatedX[i]+(k*scale)) && snack.y==(struggle.locatedY[i])){
                            snack.foodPath();
                        }
                        
                    }
                }
                if(struggle.hit(snake.x,snake.y)){
                    HisBoard.style.display="";
                    score[j]=snake.total;
                    if(snack.total<10){
                        str+="<h3>"+"0"+score[j]+"</h3><br>";
                    }else{str+="<h3>"+score[j]+"</h3><br>";}
                    Swal.fire({
                        title: "Opp! Hit the wall!",
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
                    musicOV.play();
                    document.querySelector(".speedsetting").style.display="block";
                    document.querySelector("button").innerText="Try again";
                    j++; 
                }
                
            }

            snack.paint();
            snake.move();
            snake.paint();
            
            if(snake.dead()){
                HisBoard.style.display="";
                score[j]=snake.total;
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
                musicOV.play();
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
                    direct="";
                    lastKey="";
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



