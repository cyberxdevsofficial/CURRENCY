const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

// Fetch currency list and populate select options
fetch('https://api.exchangerate.host/symbols')
    .then(res => res.json())
    .then(data => {
        const symbols = data.symbols;
        for (let code in symbols) {
            let optionFrom = document.createElement('option');
            optionFrom.value = code;
            optionFrom.textContent = `${code} - ${symbols[code].description}`;
            fromCurrency.appendChild(optionFrom);

            let optionTo = document.createElement('option');
            optionTo.value = code;
            optionTo.textContent = `${code} - ${symbols[code].description}`;
            toCurrency.appendChild(optionTo);
        }

        fromCurrency.value = 'USD';
        toCurrency.value = 'EUR';
    });

// Convert currency
convertBtn.addEventListener('click', () => {
    const amountVal = amount.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amountVal === '' || isNaN(amountVal)) {
        alert('Please enter a valid amount');
        return;
    }

    fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amountVal}`)
        .then(res => res.json())
        .then(data => {
            result.textContent = `${data.result.toFixed(2)} ${to}`;
        })
        .catch(err => {
            result.textContent = 'Error fetching conversion';
            console.error(err);
        });
});
