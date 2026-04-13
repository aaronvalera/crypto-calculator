// Selectors 
const form = document.querySelector("#crypto-quoter-form");
const currencies = document.querySelector("#currency");
const cryptos = document.querySelector("#cryptocurrency");
const amount = document.querySelector("#amount");

form.addEventListener("submit", async event => {
    event.preventDefault();
    const currencySelected = [...currencies.children].find(currency => currency.selected).value;
    const cryptoSelected = [...cryptos.children].find(crypto => crypto.selected).value;
    const typedAmount = amount.value;
try {
    const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${currencySelected}`)).json();
    console.log(response.DISPLAY[cryptoSelected][currencySelected].PRICE);
    console.log(response.DISPLAY[cryptoSelected][currencySelected].HIGH24HOUR);
    console.log(response.DISPLAY[cryptoSelected][currencySelected].LOW24HOUR);
    console.log(response.DISPLAY[cryptoSelected][currencySelected].CHANGEPCT24HOUR);
} catch (error) {
    console.log(error);
}
console.log(cryptoSelected);
});
