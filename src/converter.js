export default class CurrencyConverter {
  static getCurrency(newCurrency, usdAmount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${newCurrency}/${usdAmount}`)
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

export class CurrencyData {
  static getData(newCurrency) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/enriched/USD/${newCurrency}`)
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