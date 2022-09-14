import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyConverter from './converter.js';

function getCurrency(baseCurrency, newCurrency, usdAmount) {
  CurrencyConverter.getCurrency(baseCurrency, newCurrency, usdAmount)
    .then(function(response) {
      if(response.conversion_result) {
        printElements(response, baseCurrency, newCurrency, usdAmount);
      }  else {
        printError(response, baseCurrency,  newCurrency, usdAmount);
      }
    });
}

function printElements (response, baseCurrency, newCurrency, usdAmount) {
  let conversionAmount = response.conversion_result;
  document.getElementById("conversion-output").innerText = `Conversion: ${usdAmount} ${baseCurrency} is worth ${conversionAmount} ${newCurrency}`;
}

function printError (error, baseCurrency, newCurrency) {
  let outputs = document.getElementById("conversion-output");
  outputs.innerHTML = null;
  if (error.toString().includes('404')){
    outputs.innerText = `${error} \n Either ${baseCurrency} or ${newCurrency} do not exist \n Double check your currencies and try again`;
  } else {
    outputs.innerText = `There was an error accessing information for ${baseCurrency} or ${newCurrency} \n ${error}`;
  }
}

function handleForm (e) {
  e.preventDefault();
  let outputs = document.getElementById("conversion-output");
  outputs.innerHTML = null;
  let baseCurrency = document.getElementById("base-currency").value;
  let newCurrency = document.getElementById("target-currency").value;
  let usdAmount = parseInt(document.querySelector("input#usd-input").value);
  getCurrency(baseCurrency, newCurrency, usdAmount);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleForm);
});
