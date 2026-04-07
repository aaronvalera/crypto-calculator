// Selectors 
const form = document.querySelector("#crypto-quoter-form");
const currencies = document.querySelector("#currency");
const cryptos = document.querySelector("#cryptocurrency");
const amount = document.querySelector("#amount");

form.addEventListener("submit", event => {
    event.preventDefault();
    const currencySelected = [...currencies.children].find(currency => currency.selected);
    const cryptoSelected = [...cryptos.children].find(crypto => crypto.selected);
    const typedAmount = amount.value;
});
