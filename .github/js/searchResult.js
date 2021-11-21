class SearchResult {
    constructor(element) {
        this.createDiv(element);
    }
    createDiv(element) {
        const results = document.createElement("div");
        results.setAttribute("id", "res");
        element.appendChild(results);
    }

    renderResults(results) {
        const r = document.getElementById("res");
        const data = JSON.stringify(results);
        for (let i = 0; i < results.length; i++) {
            const symbol = results[i].symbol;
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

                companyLinks.innerText = `${results[i].name} (${symbol})(${numberToString.slice(0, 4)}%)`;
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
        }
    }
}