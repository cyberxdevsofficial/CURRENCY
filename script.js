const amountInput = document.getElementById('amount');
const tableBody = document.querySelector('#currencyTable tbody');
let ratesData = {};

// Fetch currency rates relative to USD
async function fetchRates() {
  try {
    const response = await fetch('https://api.exchangerate.host/latest?base=USD');
    const data = await response.json();
    ratesData = data.rates;
    displayCurrencies();
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="2">Error fetching currency data</td></tr>`;
    console.error(err);
  }
}

// Display currencies in the table
function displayCurrencies() {
  const amount = parseFloat(amountInput.value) || 1;
  tableBody.innerHTML = '';

  for (let code in ratesData) {
    const rate = (ratesData[code] * amount).toFixed(4);
    const row = document.createElement('tr');
    row.innerHTML = `<td>${code}</td><td>${rate}</td>`;
    tableBody.appendChild(row);
  }
}

// Update table when amount changes
amountInput.addEventListener('input', displayCurrencies);

// Initial fetch
fetchRates();
