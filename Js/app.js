const screen = document.getElementById('calculadora-screen');
const keys = document.getElementById('calculator-keys');

let operacionStatus = false;
let number1;
let typeOperation;

screen.textContent = '0';

const calculator = () => {
    if(!keys) return
    keys.addEventListener('click', (e) => {
        const t = e.target;
        const d = t.dataset;
        // Detectar si se pulso un numero
        if(d.number) writeScreen(d.number)
        // Detectar si se pulso una operacon matematica
        if(d.math) getOperation(t, d.math)
        // Detectar si se pulso otra operacion
        if(d.operation) runOperation(d.operation)
    })
}

calculator();

const writeScreen = (number) => {
    screen.textContent === '0' || operacionStatus === true
        ? screen.textContent = number
        : number === '.' && !screen.textContent.includes('.') // Validar que se escriba un solo .
            ? screen.textContent += number
            : number !== '.'
                ? screen.textContent += number
                : null
    operacionStatus = false;
}

const getOperation = (element, operation) => {
    operacionStatus = true;
    number1 = Number(screen.textContent); 
    typeOperation = operation;
    screen.textContent = element.textContent;
}

const runOperation = (operation) => {
    const getResult = (number1, typeOperation) => {
        const number2 = Number(screen.textContent);
        switch (typeOperation) {
            case 'plus':
                screen.textContent = number1 + number2;
                break;
            case 'minus':
                screen.textContent = number1 - number2;
                break;
            case 'times':
                screen.textContent = number1 * number2;
                break;
            case 'divide':
                number2 === 0
                    ? screen.textContent = 'Error'
                    : screen.textContent = number1 / number2;
                break;     
            case 'porcentage':
                screen.textContent = number1 * (number2 / 100);
                break;
            case 'square-root':
                screen.textContent = Math.sqrt(number1);
                break;   
            default:
                break;            
        }
        console.info(screen.textContent)
    }
    
    operation === 'clear'
    ? screen.textContent = '0'
    : getResult(number1, typeOperation);

    operacionStatus = true;

}