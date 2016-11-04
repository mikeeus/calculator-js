// state
var calculation = "";
var current = "";

// functions
function handleClick(element){
  content = element.innerHTML;
  switch(content){
    case "CE":
      current = "0";
      calculation = "";
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
      if(current.length > 14){ current = current.slice(0,15); break;}    
      if(current == "0" || ["×", "÷", "+", "-"].includes(current)){
        calculation = calculation.concat(content);        
        current = content;
        break;
      }
      calculation = calculation.concat(content);
      current = current.concat(content);   
      break;
    case "0":
    case "00":
      if(current.length > 14){ current = current.slice(0,15); break;}        
      if(current == "0" || current == "00"){
        console.log('not adding to zero');
        break;
      }
      calculation = calculation.concat(content);
      current = current.concat(content);
      break;
    case ".":
      if(current.length > 14){ current = current.slice(0,15); break;}    
      if(!current.split("").includes(".")){
        current = current.concat(content);
        calculation = calculation.concat(content);        
        break;
      } else {
        console.log('multiple "."s');
        break;
      }    
    case "×":
    case "÷":
    case "+":
    case "-":
      if(calculation == "" && current == 0){
        console.log("empty");
        break;
      }
      if(["×", "÷", "+", "-"].includes(calculation.trim().slice(-1))){
        console.log("cannot double operations");
        break;
      }
      calculation = calculation.concat(" " + content + " ");
      current = content;     
      break;
    case "=":
      console.log('eval calculation, set current to 0, set calc to sum');
      calcString = calculation.replace(/×/g, "*").replace(/÷/g,"/");
      calculation = eval(calcString);
      if(calculation == 'Infinity'){
        current = "Invalid Operation"
        break;
      }
      // if(calculation > 9999999999999999){
      //   current = "Error: too large";
      //   break;
      // }
      calculation = calculation.toString().slice(0,16);
      current = calculation;
      break;
  }
  console.log('calc: ', calculation);
  console.log('current: ', current);  
  updateDisplay(current, calculation);
}

function updateDisplay(curr, calc){
  $("#current").html(curr)
  $("#calculation").html(calc)  
}
