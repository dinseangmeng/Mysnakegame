

const canvas = document.querySelector('.canvas');
const context=canvas.getContext('2d');
var scale=30;
var rows
var column
var snake;
var snack;
var lastKey,direct;
var musicBG=new Audio('music/music.mp3');
var musicMV=new Audio('music/move.mp3');
var musicOV=new Audio('music/gameover.mp3');
var musicEat=new Audio('music/food.mp3');
var a
var speedLabel=document.getElementById("speed");
function label(){
    document.querySelector(".speedlabel").innerText=speedLabel.value;

};
setInterval(label,50);
if(window.innerWidth>=600){
    for(let i=Math.floor(document.documentElement.clientWidth/1.5);i>600;i--){
        if(i%scale===0){
            canvas.width=i;
            break;
        }
    };
    for(let i=Math.floor(document.documentElement.clientHeight*0.8);i>600;i--){
        if(i%scale===0){
            canvas.height=i;
            break;
        }
    };
    window.addEventListener("resize",()=>{
        
        if(window.innerWidth>=600){
            for(let i=Math.floor(document.documentElement.clientWidth/1.5);i>600;i--){
                if(i%scale==0){
                    canvas.width=i;
                    break;
                }
            }
            for(let i=Math.floor(document.documentElement.clientHeight*0.8);i>600;i--){
                if(i%scale==0){
                    canvas.height=i;
                    break;
                }
            }

            start();
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
    rows=canvas.width/scale;
    column=canvas.height/scale;
    
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


