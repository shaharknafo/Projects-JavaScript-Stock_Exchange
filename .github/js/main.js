const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
const searchResultsImag = document.getElementById("searchResultsImag");

searchButton.addEventListener("click", goSearch);

function goSearch() {
    // const searchInput = document.getElementById("searchInput").value;
    searchResults.innerText = "";
    searchResultsImag.innerText = "";
    const searchButton = document.getElementById("searchButton");
    const searchButtonLoading = document.getElementById("searchButtonLoading");
    const searchButtonIcon = document.getElementById("searchButtonIcon");

    searchButtonLoading.classList.remove("d-none");
    searchButtonIcon.classList.add("d-none");

    const NASDAQ_STOCK_URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`;

    fetch(NASDAQ_STOCK_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderData(data);

        })
    function renderData(data) {

        for (let i = 0; i < data.length; i++) {

            const symbol = data[i].symbol;
            const STOCK_API = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/${symbol}`;

            fetch(STOCK_API)
                .then(function (responseS) {
                    return responseS.json();
                })
                .then(function (dataS) {
                    renderData(dataS);

                })
            function renderData(dataS) {

                const companyLinks = document.createElement("a");
                const newImg = document.createElement("IMG");
                newImg.setAttribute("src", "#");

                const piceChanges = dataS[0].changes;
                let changesPercent = (piceChanges / dataS[0].price) * 100;
                let numberToString = changesPercent.toString();

                companyLinks.innerText = `${data[i].name} (${symbol})(${numberToString.slice(0, 4)}%)`;
                companyLinks.href = `./company.html?symbol=${symbol}`;
                newImg.src = dataS[0].image;

                companyLinks.style.display = "block";

                companyLinks.classList.add("list-group-item");
                companyLinks.classList.add("bg-opacity-25");

                newImg.classList.add("w-25");
                newImg.classList.add("h-25");
                newImg.classList.add("rounded-circle");

                searchResults.appendChild(companyLinks);
                searchResultsImag.appendChild(newImg);

                if (changesPercent > 0) {
                    companyLinks.classList.add("bg-success");
                } else {
                    companyLinks.classList.add("bg-danger");
                }
            }
            searchButtonLoading.classList.add("d-none");
            searchButtonIcon.classList.remove("d-none");
        }
    }
}
