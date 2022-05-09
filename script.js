class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement){ // this will set the current and prevoius values in the calculator
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }
  
     // Now we wil add various functions that the calculator will perform

     clear() {
         this.currentOpreand = ''
         this.previousOperand = ''
         this.operation = undefined
     }

     delete() {
         this.currentOpreand = this.currentOpreand.toString().slice(0,-1)  // Will chop off the last letter of the string

     }

     appendNumber(number) {
         if (number === '.' && this.currentOpreand.includes('.')) return  // checks if there is a '.' operator or not
         this.currentOpreand = this.currentOpreand.toString() + number.toString()   // It is converted to string so that the string concationation is possible

     }

     chooseOperation(operation) {
       
        if(this.currentOpreand === '') return   // So that we cannot use two operands simultaneously

        if(this.previousOperand !== ''){    // suppose we type, 22+10 * 50, so first it will compute 22+10 and store it in the previous operand, and the perform 32*50
            this.compute()
        }

        this.operation = operation   // So our calc knows what operation our to select (the current operation, that is why 'this' is used)
        this.previousOperand = this.currentOpreand    // current is shifted to previous, so that we can get the next user value
        this.currentOpreand = ''  // current is set to blank so that the next operand can be added

     }

     compute() {

        let computation
        const prev = parseFloat(this.previousOperand)  // Is converted to floating point number (cause it was converted to string in 'appendNumber' method)
        const current = parseFloat(this.currentOpreand)

        if(isNaN(prev) || isNaN(current)) return   // If there is no value returned by the user, then do not perform any operation

        switch (this.operation) {
            case '+':
                computation = prev + current
                break


            case '-':
                computation = prev - current
                break


            case '*':
                computation = prev * current
                break


            case '/':
                computation = prev / current
                break

            default:
                return
        }

        this.currentOpreand = computation
        this.operation = undefined               // WHY????????
        this.previousOperand = ''


     }

     updateDisplay() {
         this.currentOperandTextElement.innerText = this.currentOpreand // The current element inside the currentOperandTextElement will be stored in currentOperand
         this.previousOperandTextElement.innerText = this.previousOperand 
             
     }
           

}




const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) // An object created of the 'Calculator' class



numberButtons.forEach( button => {                  // For each button
  button.addEventListener('click', () => {          // Whenever we click on the button, 
      calculator.appendNumber(button.innerText)     // innerHtml part of the button will be passed on to the appendNumber method created above
      calculator.updateDisplay()  // Will upadte the values

  })    
})



operationButtons.forEach(button => {                      // For each bbutton
    button.addEventListener('click', () => {              // Whenever we click on the button
        calculator.chooseOperation(button.innerText)      // innerHtml part of the button will be passed to the chooseoperation method created above
        calculator.updateDisplay()                        // Will update the values

    })
})


equalsButton.addEventListener('click', button => {        // Whenever equal to is clicked
    calculator.compute()                                  // compute function is called 
    calculator.updateDisplay()                            // will update the values
})



allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})


deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})
