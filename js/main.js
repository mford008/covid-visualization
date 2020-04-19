const countries = ['United States of America', 'Spain', 'China', 'Brazil', 'Australia'];
fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(data => {
    // console.log(data);
    // data.countries = object
    console.log(data.Countries['1']);
    for (i in data.Countries) {
        if (countries.includes(data.Countries[i].Country)) {
            console.log(data.Countries[i].Country);
                let chart = document.querySelector(".BarChart");
                let height = Math.floor((data.Countries[i].TotalConfirmed) / 1000);
                let bar = document.createElement("div");
                let barText = document.createTextNode(data.Countries[i].CountryCode);
                bar.classList.add("BarChart-bar");
                bar.appendChild(barText);
                bar.style.height = height + "%";
                chart.appendChild(bar);
        }
    }
    
    // for (i in data.Countries) {
    //     // console.log(data.Countries[i]);
    //     if (countries.includes(data.Countries[i].Country)) {
    //         console.log(data.Countries[i].CountryCode, data.Countries[i].TotalConfirmed, data.Countries[i].TotalDeaths, data.Countries[i].TotalRecovered);
    //         let chart = document.querySelector(".BarChart");
    //         let height = Math.floor((data.Countries[i].TotalConfirmed) / 1000);
    //         let bar = document.createElement("div");
    //         // let barText = bar.createTextNode(data.Countries[i].CountryCode);
    //         // bar.appendChild(barText);
    //         // bar.classList.add("BarChart-bar");
    //         // bar.style.height = height + "%";
    //         chart.appendChild(bar);
    //     }
    // }
    // console.log(typeof data.Countries[i].Country);
    // for (country in data.Countries) {
    //     console.log(typeof country);
    // }
    // let chart = document.querySelector(".BarChart");
    // let height = Math.floor((data.Countries[i].TotalConfirmed) / 1000);
    // let bar = document.createElement("div");
    // let barText = bar.createTextNode(data.Countries[i].CountryCode);
    // bar.appendChild(barText);
    // bar.classList.add("BarChart-bar");
    // bar.style.height = height + "%";
    // chart.appendChild(bar);
});