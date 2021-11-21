class SearchForm {
    callback;
    constructor(element) {
        this.createForm(element);
    }
    createForm(element) {
        const form = document.createElement("form");
        const searchInput = document.createElement("input");
        form.classList.add("input-group", "pt-5", "d-flex", "justify-content-center", "flex-raw")
        searchInput.setAttribute("id", "searchInput2");
        searchInput.setAttribute("type", "search");
        searchInput.setAttribute("name", "theValue");
        searchInput.classList.add("form-control", "bg-warning", "bg-opacity-50", "w-50");
        searchInput.placeholder = "Search for symbols or companies";
        form.appendChild(searchInput);
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("value", "Search");
        button.classList.add("d-flex", "justify-content-center", "flex-raw", "btn", "btn-outline-secondary", "btn-warning", "btn-lg", "text-dark");
        button.innerHTML = "Search";
        button.addEventListener("click", this.search.bind(this));
        form.appendChild(button);
        element.appendChild(form);
    }

    spinner() {
        const loader = document.createElement("span");
        loader.setAttribute("id", "searchButtonLoading");
        loader.classList.add("d-flex", "justify-content-center", "flex-raw", "spinner-border", "spinner-border-sm");
        form.appendChild(loader);
    }

    showLoader() {
        this.loader.classList.remove("d-none");
    }

    removeLoader() {
        this.loader.classList.add("d-none");
    }

    search() {
        const input = document.getElementById("searchInput2").value;
        const NASDAQ_STOCK_URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ`;
        const callb = this.callback;
        fetch(NASDAQ_STOCK_URL)
            .then(function (response) {
                return response.json()
            }).then(function (dataS) {
                callb(dataS)
            })
    }

    onSearch(callback) {
        this.callback = callback;
    }






}