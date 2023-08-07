import initialCustomers from "./users.js";

let customers = JSON.parse(localStorage.getItem('customers')) || initialCustomers;


let pinInput;
let nameInput;
let state = '';
let user = null;


let oldOption1 = document.getElementById("option1");
let oldOption2 = document.getElementById("option2");
let oldOption3 = document.getElementById("option3");
let oldOption4 = document.getElementById("option4");
let oldOption5 = document.getElementById("option5");
let oldOption6 = document.getElementById("option6");



const changeState = (newState) => {
  // Remove any previous event listeners by replacing the number buttons with clones of themselves
  for (let i = 1; i <= 5; i++) {
    let numButton = document.getElementById("num" + i);
    let newNumButton = numButton.cloneNode(true);
    numButton.parentNode.replaceChild(newNumButton, numButton);
  }
  return newState;
};



function welcome() {
  state = changeState('welcome');

  card.style.animationName = "example";
  content.innerHTML = `
    <h2>WELCOME ,<br> PLEASE ENTER YOUR NAME <br>
    AND YOUR PIN CODE.</h2>
   <dive class= "input"> 
    <input id="name" type="text" placeholder="Please Enter Your Full Name">
   </dive> 
   <dive class= "input"> 
    <input id="pin" type="number" max="4" placeholder="Please Enter Your PinCode"><br><br>
   </dive> 

  `;
  if (state === 'welcome') {
    let btnNum = document.querySelectorAll(".num");
    btnNum.forEach(btn => btn.addEventListener('click', function() {
      pinInput = document.getElementById("pin");
      pinInput.value += btn.textContent;
    }));
  nameInput = document.getElementById("name");
  pinInput = document.getElementById("pin");


  document.addEventListener("keydown", handleEnterKeyPress);
}}

document.getElementById("card").addEventListener("click", welcome);



function showMenu(){
  content.innerHTML ='<h2>MENU</h2>'
  option1.innerText = 'Deposite'
  option2.innerText = 'Withdraw'
  option3.innerText = 'Check Balance'
  option4.innerText = 'Change PINCODE'
  option5.innerText = 'Receipt'
  option6.innerText = 'Quit'

}

function findUser() {
  const lowercaseNameInput = nameInput.value.toLowerCase();
  user = customers.find(
    (item) =>
      item.Name.toLowerCase() === lowercaseNameInput &&
      item.pin == pinInput.value
  );
  console.log(user);
  if (user) {
    showMenu()
    content.innerHTML = `
      <h2>WELCOME ${user.Name}<br> 
    `;
  } else {
    content.innerHTML = `
      <h2>INVALID NAME OR PIN</h2>
      
      <button id ="back">Try Agin</button>`

    document.getElementById("back").addEventListener("click", welcome);
  
  }
}

document.getElementById("enter").addEventListener("click", findUser);

const Deposit = () => {
  if(user !== null) {

    state = changeState('Deposit');


// Hide the original menu elements

oldOption1.style.display = 'none';
oldOption2.style.display = 'none';
oldOption3.style.display = 'none';
oldOption4.style.display = 'none';
oldOption5.style.display = 'none';
oldOption6.style.display = 'none';



    content.innerHTML = `
      <h2>How much would you like to Deposit?</h2><br><br>
      <input id="Deposit" type="number" max="4" placeholder="Please Insert Amount"><br><br>
      <button id="confirm">Confirm</button>
    `;
    document.getElementById("confirm").addEventListener("click", () => {
      let DepositInput = document.getElementById('Deposit');
      let DepositInputVal = parseFloat(DepositInput.value);
      if((DepositInputVal % 20 === 0 && DepositInputVal >= 0)|| (DepositInputVal % 50 === 0 && DepositInputVal >= 0 )){
        user.amount += DepositInputVal;
        localStorage.setItem('customers', JSON.stringify(customers));

        content.innerHTML = `   
         <h2> The deposit was successful and has been deposited ${DepositInputVal} NIS into your account</h2>
         `
      } else {
        content.innerHTML = `
          <h2>You can deposit only multiples of 20/50/100/200.</h2><br><br>
          <button id = "back">Go back</button>
        `;
        document.getElementById("back").addEventListener("click", Deposit);
      }
    });

    let btnNum = document.querySelectorAll(".num");
    btnNum.forEach(btn => btn.addEventListener('click', function() {
      let depInput = document.getElementById('Deposit');
      depInput.value += btn.textContent;
    }));
  } else {
    content.innerHTML = `<h2>Please identify yourself first</h2>
      <button id = "back">Go back</button>
    `;
    document.getElementById("back").addEventListener("click", welcome);
  }
}

document.getElementById("opbut1").addEventListener("click", Deposit);


    const Withdraw = () => {
      if(user !== null) {
        state = changeState('Withdraw');


        oldOption1.style.display = 'block';
        oldOption2.style.display = 'block';
        oldOption3.style.display = 'block';
        oldOption4.style.display = 'block';
        oldOption5.style.display = 'block';
        oldOption6.style.display = 'block';
        

        content.innerHTML = `
          <h2>How much would you like to Withdraw?</h2><br><br>`
          option1.innerText = '1 - 50';
          option2.innerText = '2 - 100';
          option3.innerText = '3 - 150';
          option4.innerText = '4 - 300';
          option5.innerText = '5 - Other';
          option6.innerText = 'Quit';
        
        
            document.getElementById("num1").addEventListener("click", () => withdrawMoney(50));
            document.getElementById("num2").addEventListener("click", () => withdrawMoney(100));
            document.getElementById("num3").addEventListener("click", () => withdrawMoney(150));
            document.getElementById("num4").addEventListener("click", () => withdrawMoney(300));
            document.getElementById("num5").addEventListener("click", handleOtherButtonClick);
            // document.getElementById("num6").addEventListener("click", quit);

          
      }else {
        content.innerHTML = `<h2>Please identify yourself first</h2>
          <button id = "back">Go back</button>
        `;
        document.getElementById("back").addEventListener("click", welcome);
      }
    }
    
    document.getElementById("opbut2").addEventListener("click", Withdraw);
    
    const handleOtherButtonClick = () => {
      state = changeState('OtherWithdraw');

      content.innerHTML = `
        <h2>How much would you like to withdraw?</h2>
        <input id="Withdraw" type="number" placeholder="Please insert amount">
        <button id="confirm">Confirm</button>
      `;


      let btnNum = document.querySelectorAll(".num");
      btnNum.forEach(btn => btn.addEventListener('click', function() {
        let WithdrawInput = document.getElementById('Withdraw');
        WithdrawInput.value += btn.textContent;
      }));
      document.getElementById("confirm").addEventListener("click", () => {
        let withdrawInput = document.getElementById('Withdraw');
        let withdrawAmount = parseFloat(withdrawInput.value);
        if(user.amount - withdrawAmount >= 0&& withdrawAmount>0) {
          user.amount -= withdrawAmount;
          localStorage.setItem('customers', JSON.stringify(customers));
          content.innerHTML = `<h2> The withdrawal was successful!, waiting for your money <br>YOUR BALANCE: ${user.amount}</h2>`;
          setTimeout(function() {
            showMenu();
          }, 2400);

        } else {
          content.innerHTML = `<h2>Sorry, operation could not happen, you don't have enough balance for this operation.</h2>
          <button id = "back">Go back</button>

          `
          document.getElementById("back").addEventListener("click", Withdraw);

          ;
        }
      });
    }

document.getElementById("opbut2").addEventListener("click", Withdraw);

const withdrawMoney = (amount) => {
  if(user.amount - amount >= 0) {5
    user.amount -= amount;
    localStorage.setItem('customers', JSON.stringify(customers));
    content.innerHTML = `<h2> The withdrawal was successful!, waiting for your money <br>YOUR BALANCE: ${user.amount}</h2>`;
    setTimeout(function() {
      showMenu();
    }, 2400);
  }
}


const Balance = ()=>{

  oldOption1.style.display = 'none';
oldOption2.style.display = 'none';
oldOption3.style.display = 'none';
oldOption4.style.display = 'none';
oldOption5.style.display = 'none';
oldOption6.style.display = 'none';

const formattedAmount = user.amount.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

  if(user !== null) {
    state = changeState('Balance');

  content.innerHTML = `<h2>Your current Balance is ${formattedAmount} NIS </h2>`;
  }else {
    content.innerHTML = `<h2>Please identify yourself first</h2>
      <button id = "back">Go back</button>
    `;
    document.getElementById("back").addEventListener("click", welcome);
  }
  }

document.getElementById("opbut3").addEventListener('click',Balance)





// clear button:
document.getElementById("clear").addEventListener("click", function() {
  if(state === "welcome"){
    pinInput.value = pinInput.value.slice(0, -1);
  } else if (state === "Deposit"){
    let depInput = document.getElementById('Deposit');
    depInput.value = depInput.value.slice(0, -1);
  }
});





// CANCEL button:
document.getElementById("cancel").addEventListener("click",showMenu)



// quit button:
document.getElementById("opbut6").addEventListener("click", function() {
  let card = document.querySelector(".image img");
  card.style.animationName = "removeCard";
  content.innerHTML = `<h2>Please wait for the card to be ejected... GOODBYE, HAVE A NICE DAY</h2>`;

  setTimeout(function() {
    location.reload();
  }, 2000);
});

function handleEnterKeyPress(event) {
  if (state === 'ejectingCard') {
    // Don't do anything if the card is being ejected
    return;
  }

  if (event.key === "Enter") {
    if(state === "welcome"){
      findUser();
    } else if (state === "Deposit" ||state === "Withdraw"||state === "OtherWithdraw"){
      document.getElementById("confirm").click();
    }else if (state === "changePin"){
      document.querySelector(".confirmChange").click()
    }
  }
}



// פונקציה לשינוי הפין ושמירת הפין החדש
function changePin() {

  if(user !== null) {
    content.innerHTML= ''
  state = changeState('changePin');

  const oldPinInput = document.createElement("input");
  oldPinInput.className = 'oldPinInput'
  oldPinInput.type = "password";
  oldPinInput.placeholder = "Enter your old PIN code";

  const newPinInput = document.createElement("input");
  newPinInput.className = 'newPinInput'

  newPinInput.type = "password";
  newPinInput.placeholder = "Enter your new PIN code";

  const confirmChangeButton = document.createElement("button");
  confirmChangeButton.className = 'confirmChange'

  confirmChangeButton.textContent = "Confirm Change";

  // הוספת האלמנטים לתוך האלמנט content
  content.appendChild(oldPinInput);
  content.appendChild(newPinInput);
  content.appendChild(confirmChangeButton);

  // מאזינים ללחיצה על כפתור האישור
  confirmChangeButton.addEventListener("click", () => {
    const oldPin = oldPinInput.value;
    const newPin = newPinInput.value;
    
    // בדיקה אם הפין הישן נכון
    const user = customers.find(item => item.pin === parseInt(oldPin));
    if (!user) {
      alert("Invalid old PIN code. Please try again.");
      return;
    }

    // בדיקה ואימות שהפין החדש תקין  4 ספרות)
    if (newPin.length !== 4 || isNaN(parseInt(newPin))) {
      alert("Invalid new PIN code. Please enter a 4-digit number.");
      return;
    }

    // וודאות השינוי
    const confirmChange = confirm("Are you sure you want to change your PIN code?");
    if (!confirmChange) {
      return;
    }

    // שמירת הפין החדש ברשימת הלקוחות
    user.pin = parseInt(newPin);
    alert("Your PIN code has been changed successfully.");
    localStorage.setItem('customers', JSON.stringify(customers));


    // מנקים את תיבות הקלט ומסיר את הכפתור
    content.removeChild(oldPinInput);
    content.removeChild(newPinInput);
    content.removeChild(confirmChangeButton);
    showMenu()
  });
}else {
  content.innerHTML = `<h2>Please identify yourself first</h2>
    <button id = "back">Go back</button>
  `;
  document.getElementById("back").addEventListener("click", welcome);
}
}

document.querySelector('#opbut4').addEventListener('click',changePin)   

function printCustomerData() {
    // Get the customer's name entered in the input field


    if (user) {
        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        const formattedAmount = user.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });  
              // Create the message to be printed
        const message = `Hello ${user.name},\nAt this moment DATE: ${formattedDate} you got ${formattedAmount} NIS in your account\nThank you for using your ATM`;

        // Use the browser's built-in print function to print the message
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<pre>' + message + '</pre>');
        printWindow.document.close();
        printWindow.print();
    } else {
        alert("Customer not found. Please enter a valid name.");
    }
}
document.querySelector('#opbut5').addEventListener('click',printCustomerData)   
