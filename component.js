function primary(x){
    for(let i=2;i<Math.floor(x/2);i++){
        if(x%i==0){
            return false
        }
    }
    return true;
}