let submitBtn = document.querySelector("#submitBtn")
let resetBtn = document.querySelector("#resetBtn")

async function getCurrencyRates(params) {           // currency rates are wrt euro
    
}


document.addEventListener("keypress", (event)=>{
    if(event.key == "Enter"){
        event.preventDefault();
        submitBtn.classList.add("btnClick");
        submitBtn.click();
        setTimeout(()=>{
            submitBtn.classList.remove("btnClick");
        }, 70)
        
    }
})

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    let inputElem = document.querySelector("#inputAmount");
    let displayAmount = document.querySelector("#displayAmount");
    displayAmount.innerText = "";
    
    let selectElems = document.querySelectorAll("select");
    let currFrom = selectElems[0];
    let currTo = selectElems[1];
    
    let displayText;
    if (currFrom.value == "" && currTo.value == ""){
        displayText = `Select a currency from both sections to proceed`;
    } else if (currFrom.value == ""){
        displayText = `Select a currency from the '${currFrom.parentElement.previousElementSibling.innerText}' section to proceed`;
    } else if (currTo.value == ""){
        displayText = `Select a currency from the '${currTo.parentElement.previousElementSibling.innerText}' section to proceed`;
    } else{
        displayText = `${inputElem.value} ${currFrom.value} = ${90} ${currTo.value}`;
    }
    setTimeout(() => {
        displayAmount.innerText = displayText;
    }, 70);


})

resetBtn.addEventListener("click", ()=>{
    let displayAmountElem = document.querySelector("#displayAmount");
    displayAmountElem.innerText = "";
})