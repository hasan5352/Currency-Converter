import { countryList } from './countryCodes.js';
let currencyRates;
const URL_ENDPOINT = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

async function getCurrencyRates() {           // currency rates are wrt euro
    try{
        let response = await fetch(URL_ENDPOINT);
        let parsedData = await response.json();
        let data = parsedData.eur;
        currencyRates = data;
    } catch (err){
        console.error(`Error in api call: ${err}`);
    }
}
async function generateOptions() {
    await getCurrencyRates();
    let selectElems = document.querySelectorAll("select");
    for (let selectElem of selectElems){
        for (let [key, value] of Object.entries(currencyRates)){
            let newOption = document.createElement("option");
            newOption.value = key;
            newOption.textContent = key.toUpperCase();
            selectElem.insertAdjacentElement("beforeend", newOption);
        }
        
        selectElem.addEventListener("change", (evnt)=>{     // Change country flag
            let imgElem = selectElem.previousElementSibling;
            let countryCode = countryList[selectElem.value.toUpperCase()];
            if (countryCode){
                imgElem.src = "";
                imgElem.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
            }
        });
    }
}
generateOptions();

function calculateRate(from, to){
    return currencyRates[to] / currencyRates[from];
}

let submitBtn = document.querySelector("#submitBtn");
let resetBtn = document.querySelector("#resetBtn");

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
        let calculatedRate = inputElem.valueAsNumber * calculateRate(currFrom.value, currTo.value);

        displayText = `${inputElem.value} ${currFrom.value.toUpperCase()} = ${calculatedRate.toFixed(2)} ${currTo.value.toUpperCase()}`;
    }
    setTimeout(() => {
        displayAmount.innerText = displayText;
    }, 70);


})

resetBtn.addEventListener("click", ()=>{
    let displayAmountElem = document.querySelector("#displayAmount");
    displayAmountElem.innerText = "";
})
