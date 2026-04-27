// Selectors 
const form = document.querySelector("#crypto-quoter-form");
const currencies = document.querySelector("#currency");
const cryptos = document.querySelector("#cryptocurrency");
const amount = document.querySelector("#amount");
const cryptoInfo = document.querySelector("#crypto-info");
const submitFormBtn = document.querySelector("#form-btn");
console.log(Boolean(cryptos.selected))

const enableFormBtn = () => { 
    const isFormValid = currencies.value !== "" &&
                        cryptos.value !== "" &&
                        amount.value !== ""

    submitFormBtn.disabled = !isFormValid;
    if(isFormValid) {
        submitFormBtn.classList.add("valid-form");
    } else {
        submitFormBtn.classList.remove("valid-form");
    };
}

currencies.addEventListener("change", enableFormBtn);
cryptos.addEventListener("change", enableFormBtn);
amount.addEventListener("input", enableFormBtn);

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
        const trendClass = trend24H >= 0 ? "up-trend" : "down-trend";
        const trendIcon = trend24H >= 0 ? "▲" : "▼";
        const currencySymbol = response.DISPLAY[cryptoSelected][currencySelected].TOSYMBOL;
        const quoteResult = amountValue / currentPrice;
        cryptoInfo.innerHTML = `
            <p class="info price">Price is: <span class="price">${currencySymbol} ${currentPrice}</span></p>
            <p class="info">Highest price is: <span class="price">${highest24HPrice}</span></p>
            <p class="info">Lowest price is: <span class="price">${lowest24HPrice}</span></p>
            <p class="info">Trend 24H: <span class="${trendClass}">${trend24H}%${trendIcon}</span></p>
            <p class="info">You can buy: <span class="price">${quoteResult.toFixed(2)} ${cryptoSelected}</span></p>
        `;
    } catch (error) {
    console.log(error);
    };
});
enableFormBtn();
console.log(Boolean(cryptos.value))