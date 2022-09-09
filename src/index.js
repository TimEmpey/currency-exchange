import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyConverter from './converter';

function getCurrency(newCurrency, usdAmount) {
  CurrencyConverter.getCurrency(newCurrency)
    .then(function(response) {
      if(response.conversion_results) {
        printElements(response, newCurrency, usdAmount);
      }  else {
        printError(response, newCurrency, usdAmount);
      }
    });
}

function printElements (response, newCurrency, usdAmount) {
  let conversionAmount = response.conversion_results;
  document.getElementById("conversion-output").innerText = `Conversion: ${usdAmount} USD is worth ${conversionAmount} ${newCurrency}`;
}

function printError (error, newCurrency) {
  let outputs = document.getElementById("conversion-output");
  outputs.innerHTML = null;
  outputs.innerText = `There was an error accessing information for ${newCurrency}: ${error}`;
}

function handleForm (e) {
  e.preventDefault();
  let outputs = document.getElementById("conversion-output");
  outputs.innerHTML = null;
  let newCurrency = document.getElementById("target-currency").value;
  console.log(newCurrency);
  let usdAmount = parseInt(document.querySelector("input#usd-input").value);
  console.log(usdAmount);
  console.log(typeof usdAmount);
  document.getElementById("target-currency").value = null;
  document.querySelector("input#usd-input").value = null;
  getCurrency(newCurrency, usdAmount);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleForm);
});