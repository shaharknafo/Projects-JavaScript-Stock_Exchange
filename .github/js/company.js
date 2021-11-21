const QUERYSTRING = new URLSearchParams(window.location.search);
const SYMBOL = QUERYSTRING.get('symbol');
document.getElementById("title").innerHTML = SYMBOL;

const STOCK_API = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/${SYMBOL}`;
const STOCK_API_HISTORY = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${SYMBOL}?serietype=line`;

const historyLoading = document.getElementById("spinnerHistory");

takeStockData();

function takeStockData() {
    fetch(STOCK_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderData(data);
        })

    function renderData(data) {

        const piceChanges = data[0].changes;
        let changesPercent = (piceChanges / data[0].price) * 100;

        document.getElementById("companyName").innerText = data[0].companyName;
        document.getElementById("companyName").href = data[0].website;
        document.getElementById("companySymbol").innerText = data[0].symbol;
        document.getElementById("price").innerText = data[0].price;
        document.getElementById("changes").innerText = piceChanges;
        document.getElementById("changesPercent").innerText = `(${parseInt(changesPercent)}%)`;
        document.getElementById("companyImg").src = data[0].image;
        document.getElementById("exchangeShortName").innerText = data[0].exchangeShortName;
        document.getElementById("industry").innerText = data[0].industry;
        document.getElementById("sector").innerText = data[0].sector;
        document.getElementById("description").innerText = data[0].description;

        if (piceChanges > 0) {
            document.getElementById("changes").classList.add("text-success");
            document.getElementById("changesSymbol").classList.add("text-success");
            document.getElementById("changesPercent").classList.add("text-success");
            document.getElementById("changesSymbolPercent").classList.add("text-success");

        } else if (piceChanges < 0) {
            document.getElementById("changes").classList.add("text-danger");
            document.getElementById("changesSymbol").classList.add("text-danger");
            document.getElementById("changesPercent").classList.add("text-danger");
            document.getElementById("changesSymbolPercent").classList.add("text-danger");
        }
    }
    stockPriceHistory();
}

function stockPriceHistory() {
    historyLoading.classList.remove("d-none");

    fetch(STOCK_API_HISTORY)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataHistory) {
            renderData(dataHistory);
        })

    function renderData(dataHistory) {
        const dateH = dataHistory.historical;
        let historicalDate = [];
        let historicalClose = [];

        for (let i = 0; i < dateH.length; i += 30) {
            historicalDate.push(dateH[i].date);
            historicalClose.push(dateH[i].close);
        }

        historyLoading.classList.add("d-none");

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: historicalDate,
                datasets: [{
                    label: 'Stock Price History',
                    data: historicalClose,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,

                scales: {
                    x: {
                        reverse: true,
                    },

                    y: {
                        position: 'right'
                    }


                }

            }
        });
    }
}
