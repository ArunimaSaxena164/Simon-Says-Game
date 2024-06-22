//step-1 game started
//step-2 random button flash + level up
//step-3 matching user and generated color
let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];
let started=false;
let level=0;
let highest=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function()
{
    if(started==false)
    {
        console.log("game started");
        started=true;//taki game ek hi baar start ho
        levelUp();
    }
});
function gameFlash(btn)
{
  btn.classList.add("flash");

  setTimeout(function()
{
    btn.classList.remove("flash");
},200)
}
function levelUp()
{
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
        let randidx=Math.floor(Math.random()*4);
            let randColor=btns[randidx];
            let randBtn=document.querySelector(`.${randColor}`);
            // console.log(randidx);
            // console.log(randColor);
            // console.log(randBtn);
            gameSeq.push(randColor);
            console.log(gameSeq);
            gameFlash(randBtn);
    
}
function userFlash(btn)
{
    btn.classList.add("userflash");

    setTimeout(function()
  {
      btn.classList.remove("userflash");
  },200)   
}
function checkAns(index)
{
  if(userSeq[index]===gameSeq[index])
    {
      //yaha bhi do cases hai
      //agar 1)user sequence ke kisi middle element pe hai toh vo fir se agla color daalega
      //2)agar user last color daal raha hai toh level up ho jayega
      if(userSeq.length==gameSeq.length)
        {
            setTimeout(levelUp,1000);
        }
    }
    else 
    {
        if(level>highest)
            {
              highest=level;
            }
       h2.innerHTML=`Game over! your score was <b>${level}</b></br>Highest score:${highest}</br> Press any key to start`;
       document.querySelector("body").style.backgroundColor="red";
       setTimeout( ()=>{document.querySelector("body").style.backgroundColor="white";},150);
       reset();
    }
}
function btnPress()
{
    let btn=this;
    userFlash(btn);
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);//ab hame check bhi karna hai ki dono sequence match kar rahe hai
    //ya nhi and uske liye hume khali last color check karna hoga
    checkAns(userSeq.length-1);
    //jo hamare current level li value hota hai utni hi length gameseq aur userseq ki hoti hai
}
let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns)
    {
        btn.addEventListener("click",btnPress);
    }
    function reset()
    {
        started=false;
        gameSeq=[];
        userSeq=[];
        level=0;
    }