export default class CurrencyConverter {
  static getCurrency(newCurrency, usdAmount) {
    return fetch(`https://v6.exchangerate-api.com/v6/bb4ee8704dc0b83ec038e1f4/pair/USD/${newCurrency}/${usdAmount}}`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function(error) {
        return error;
      });
  }
}