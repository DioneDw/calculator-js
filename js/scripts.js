const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons= document.querySelectorAll('#buttons-container');

class Calculator {
  constructor(previousOperationText,currentOperationText){
    this.previousOperationText = previousOperationText;
    this.currentOperationText= currentOperationText;
    this.currentOperation = ""
  }

  // add digit to calculator screen
  addDigit(digit){
    //check if current operation already has a dot
    if(digit === '.'&& this.currentOperationText.innerText.includes(".")){
      return;
    }
    this.currentOperation= digit;
    this.updateScreen();
  }
  // process all calculator operations
  processOperation(operation){
    //Check is currentValue is empty
    if(this.currentOperationText.innerText ==="" && operation !== "C"){
      // Change operation
      if(this.previousOperationText.innerText !== ""){
        this.changeOperation(operation)
      }
      return;
    }

    // get current and previous value
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;
    switch (operation){
      case '+': 
          operationValue= previous + current;
          this.updateScreen(operationValue, operation,current,previous)
        break;
      case '-': 
          operationValue= previous - current;
          this.updateScreen(operationValue, operation,current,previous)
        break;
      case '/': 
          operationValue= previous / current;
          this.updateScreen(operationValue, operation,current,previous)
        break;
      case '*': 
          operationValue= previous * current;
          this.updateScreen(operationValue, operation,current,previous)
        break;
      case 'DEL': 
          this.processDelOperator();
        break;
      case 'CE': 
          this.processClearCurrentOperation();
        break;
      case 'C': 
          this.processClearOperation();
      break;
      case '=': 
          this.processEqualOperator();
          this.currentOperationText.innerHTML = this.previousOperationText.innerHTML.split(' ')[0];
          this.previousOperationText.innerHTML = '';
      break;
      default:
        return;
    }
  }


  //change values os screen
  updateScreen(operationValue = null, operation = null, current =null, previous=null){
    if(operationValue === null){
    this.currentOperationText.innerText += this.currentOperation;
   }else{
    //Check if value is zero, if it is just add current value
    if(previous===0){
      operationValue=current;
    }
    //add current value to previous
   this.previousOperationText.innerText = `${operationValue} ${operation}`;
   this.currentOperationText.innerText = '';
   }
  }

// Change math Operation 
  changeOperation(operation){
    const mathOperation = ["*","/","+","-"]
    if(!mathOperation.includes(operation)){
      return;
    }
    this.previousOperationText.innerText= this.previousOperationText.innerText.slice(0, -1) + operation;
  }

// Delete the last digit
  processDelOperator(){
    this.currentOperationText.innerText= this.currentOperationText.innerText.slice(0, -1);
  }
// Erase current operation
  processClearCurrentOperation(){
  this.currentOperationText.innerText = "";
}

// Clear all operation
  processClearOperation(){
    this.currentOperationText.innerText="";
    this.previousOperationText.innerText="";
  }

// Equal Operator
  processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
    this.previousOperationText.innerText=this.previousOperationText.innerText.slice(0,-1);
  }

}

const calc = new Calculator(previousOperationText,currentOperationText)

buttons.forEach( (btn)=>{
  btn.addEventListener('click', (e)=>{
    const value = e.target.innerText;
    if(+value >=0 || value ==="."){
      calc.addDigit(value)
    }
    else{
     calc.processOperation(value)
    }
  })
});