const amountInput = document.getElementById('amount');
const currenciesDiv = document.getElementById('currencies');

let ratesData = {};

// Fetch all currency rates relative to USD
async function fetchRates() {
    try {
        const response = await fetch('https://api.exchangerate.host/latest?base=USD');
        const data = await response.json();
        ratesData = data.rates;
        displayCurrencies();
    } catch (err) {
        currenciesDiv.innerHTML = 'Error fetching currency data';
        console.error(err);
    }
}

// Display all currencies
function displayCurrencies() {
    const amount = parseFloat(amountInput.value) || 1;
    currenciesDiv.innerHTML = '';
    for (let code in ratesData) {
        const rate = (ratesData[code] * amount).toFixed(2);
        const div = document.createElement('div');
        div.classList.add('currency');
        div.innerHTML = `<strong>${code}</strong> ${rate}`;
        currenciesDiv.appendChild(div);
    }
}

// Update on amount change
amountInput.addEventListener('input', displayCurrencies);

// Initial fetch
fetchRates();
