// Selectors 
const form = document.querySelector("#crypto-quoter-form");
const currencies = document.querySelector("#currency");
const cryptos = document.querySelector("#cryptocurrency");
const amount = document.querySelector("#amount");
const cryptoInfo = document.querySelector("#crypto-info");

form.addEventListener("submit", async event => {
    event.preventDefault();
    const currencySelected = [...currencies.children].find(currency => currency.selected).value;
    const cryptoSelected = [...cryptos.children].find(crypto => crypto.selected).value;
    const amountValue = Number(amount.value);
    try {
        cryptoInfo.innerHTML = `<span class="loader"></span>`;
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${currencySelected}`)).json();
        const currentPrice = response.RAW[cryptoSelected][currencySelected].PRICE.toFixed(2);
        const highest24HPrice = response.DISPLAY[cryptoSelected][currencySelected].HIGH24HOUR;
        const lowest24HPrice = response.DISPLAY[cryptoSelected][currencySelected].LOW24HOUR;
        const trend24H = response.DISPLAY[cryptoSelected][currencySelected].CHANGEPCT24HOUR;
        const quoteResult = amountValue / currentPrice;
        cryptoInfo.innerHTML = `
            <p class="info">Price is: <span class="price">$${currentPrice}</span></p>
            <p class="info">Highest price is: <span class="price">${highest24HPrice}</span></p>
            <p class="info">Lowest price is: <span class="price">${lowest24HPrice}</span></p>
            <p class="info">Trend 24H: <span class="price">${trend24H}%</span></p>
            <p class="info">You can buy: <span class="price">${quoteResult.toFixed(2)}</span></p>
        `;
        console.log(currentPrice);
    } catch (error) {
    console.log(error);
    }
});
