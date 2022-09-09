import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyConverter from './converter.js';

function getCurrency(newCurrency, usdAmount) {
  CurrencyConverter.getCurrency(newCurrency, usdAmount)
    .then(function(response) {
      if(response.conversion_result) {
        printElements(response, newCurrency, usdAmount);
      }  else {
        printError(response, newCurrency, usdAmount);
      }
    });
}

function printElements (response, newCurrency, usdAmount) {
  let conversionAmount = response.conversion_result;
  document.getElementById("conversion-output").innerText = `Conversion: ${usdAmount} USD is worth ${conversionAmount} ${newCurrency}`;
}

function printError (error, newCurrency) {
  let outputs = document.getElementById("conversion-output");
  outputs.innerHTML = null;
  outputs.innerText = `There was an error accessing information for ${newCurrency}\n ${error}`;
}

function handleForm (e) {
  e.preventDefault();
  let outputs = document.getElementById("conversion-output");
  outputs.innerHTML = null;
  let newCurrency = document.getElementById("target-currency").value;
  let usdAmount = parseInt(document.querySelector("input#usd-input").value);
  document.getElementById("target-currency").value = null;
  document.querySelector("input#usd-input").value = null;
  getCurrency(newCurrency, usdAmount);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleForm);
});