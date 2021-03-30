export default getCurrencies = () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => console.log(response));
