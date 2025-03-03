const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=10;
let checkCount=0;
setIndicator("#ccc");


handleSlider();

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)) + "% 100%";
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function generateRndNumber(){
    return getRndInteger(0,9);
}

function getLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function getUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

 function genrateSymbol(){
    const randNum=getRndInteger(0,String.length);
    return symbols.charAt[randNum];
 }

 function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;
    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0")
    }
    else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
 }

 function shufflePassword(array){
    for(let i=array.length-1;i>0;i--){
       const j=Math.floor(Math.random() * (i+1));
       const temp=array[i];
       array[i]=array[j];
       array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
 }
 

 function handleCheckboxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
 }
 allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckboxChange);
 })
 async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
   catch(e){
    copyMsg.innerText="Failed";
   }
   copyMsg.classList.add("active");

   setTimeout(()=>{
    copyMsg.classList.remove("active");
   },2000);
    
 }

 inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
 })

 copyBtn.addEventListener('click',()=>{
    if(passwordDisplay){
        copyContent();
    }
 })

 generateBtn.addEventListener('click',()=>{
    if(checkCount==0) return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    password="";
    // if(uppercaseCheck.checked){
    //     password+=getUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=getLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRndNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=genrateSymbol();
    // }

    let funcArr=[];
    if(uppercaseCheck.checked){
        funcArr.push(getUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(getLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRndNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(genrateSymbol);
    }
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let rndIndex=getRndInteger(0,funcArr.length);
        password+=funcArr[rndIndex]();
    }
    password=shufflePassword(Array.from(password));
    passwordDisplay.value=password;
    calStrength();
 });