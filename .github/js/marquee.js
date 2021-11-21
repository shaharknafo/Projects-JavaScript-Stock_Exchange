class Marquee {
    url = "https://financialmodelingprep.com/api/v3/actives?apikey=3a9b7a76dc43a97a15ff159e11a01254";

    constructor(element) {
        const ul = document.createElement("ul");
        ul.className = "marquee-content";
        ul.id = "marqueeContent";
        element.appendChild(ul);
    }
    load() {
        this.getListMostActive();
    }
    async getListMostActive() {
        const listUrl = this.url;
        const response = await fetch(listUrl);
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            const marqueeList = document.createElement("m");
            const price = data[i].changesPercentage;
            marqueeList.innerText = `${data[i].ticker} ${price.slice(0, 4)}%`;
            marqueeList.classList.add("ms-3");
            marqueeContent.appendChild(marqueeList);

            if (price > 0) {
                marqueeList.classList.add("bg-success");
                marqueeList.classList.add("fw-bold");
            } else {
                marqueeList.classList.add("bg-danger");
                marqueeList.classList.add("fw-bold");
            }
        }
    }
}