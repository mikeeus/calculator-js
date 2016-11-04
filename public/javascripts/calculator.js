// state
var calculation = "";
var current = "";
var totaled = false;

// functions
function handleClick(element){
  content = element.innerHTML;
  switch(content){
    case "CE":
      clearDisplay();
      break;    
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      handleNumber();
      break;
    case "0":
    case "00":
      handleZero();
      break;
    case ".":
      handleDecimal();
      break;
    case "×":
    case "÷":
    case "+":
    case "-":
      handleOperator();
      break;
    case "=":
      handleEquals();
      break;
  }
  updateDisplay(current, calculation);
}

function updateDisplay(curr, calc){
  $("#current").html(curr)
  $("#calculation").html(calc)  
}

function handleNumber(){
  if(totaled == true){
    calculation = "";
    calculation = content;
    current = content;
    totaled = false;
    return;
  }
  if(current.length > 14){ current = current.slice(0,15); return;}    
  if(current == "0" || ["×", "÷", "+", "-"].includes(current)){
    calculation = calculation.concat(content);        
    current = content;
    return;
  }
  calculation = calculation.concat(content);
  current = current.concat(content);   
  return;
}

function handleOperator(){
  if(totaled == true){
    totaled = false;
  }
  if(calculation == "" && current == 0){
    console.log("Cannot add operation to empty calculation.");
    return;
  }
  if(["×", "÷", "+", "-"].includes(calculation.trim().slice(-1))){
    console.log("Cannot chain operations");
    return;
  }
  calculation = calculation.concat(" " + content + " ");
  current = content;
  if(calculation.length > 60){
    console.log('too long');
    current = "Too many digits."
    setTimeout(function(){ clearDisplay(); }, 1000);
    return;
  }
}

function handleZero(){
  if(totaled == true){
    calculation = "";
    current = content;
    totaled = false;
    return;
  }
  if(current.length > 14){ current = current.slice(0,15); return;}        
  if(current == "0" || current == "00"){
    console.log('Cannot add to zero.');
    return;
  }
  calculation = calculation.concat(content);
  current = current.concat(content);
  return;
}

function handleDecimal(){
  if(totaled == true){
    calculation = "";
    calculation = "0" + content;        
    current = "0" + content;
    totaled = false;
    return;
  }
  if(current == "0"){
    current = "0.";
    calculation = calculation.concat(current);
    return;
  }
  if(current.length > 14){ current = current.slice(0,15); return;}    
  if(!current.split("").includes(".")){
    current = current.concat(content);
    calculation = calculation.concat(content);        
    return;
  } else {
    console.log('Cannot contain multiple decimal points.');
    return;
  }
}

function handleEquals(){
  calcString = calculation.replace(/×/g, "*").replace(/÷/g,"/");
  calculation = eval(calcString);
  if(calculation == 'Infinity'){
    current = "Invalid Operation"
    return;
  }
  if(calculation > 999999999999999){
    current = "Error: too large";
    return;
  }
  totaled = true;
  calculation = parseFloat(calculation).toString().slice(0,16);
  current = calculation;
  return;
}
function clearDisplay(){
  current = "0";
  calculation = "";
  updateDisplay(current, calculation);
}