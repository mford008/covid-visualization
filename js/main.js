const countries = ['United States of America', 'Spain', 'China', 'Brazil', 'Australia'];

doFetch = () => {
    fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(data => {
        for (country in data.Countries) {
            if (countries.includes(data.Countries[country].Country)) {
                let chart = document.querySelector(".BarChart");
                let height = Math.floor((data.Countries[country].TotalConfirmed) / 1000);
                chart.innerHTML += `
                    <div id="bar-${country}" class="BarChart-bar" style="height: ${height}%">
                        ${data.Countries[country].CountryCode}
                        <button class="BarChart-bar-remove" onclick=removeCountry(event) >X</button>
                    </div>
                `;
            }
        }
        generateOptions(data);
    });
}


removeCountry = (event) => {
    let country = document.getElementById(event.target.parentElement.id);
    let chart = document.querySelector(".BarChart");
    chart.removeChild(country);
}

addCountry = () => {
    let newCountry = event.target.value;
    console.log(countries.length);
    fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
        for (country in data.Countries) {
            if (newCountry === data.Countries[country].Country &&
                !countries.includes(newCountry) &&
                countries.length < 10) {
                    let chart = document.querySelector(".BarChart");
                    let height = Math.floor((data.Countries[country].TotalConfirmed) / 1000);
                    chart.innerHTML += `
                        <div id="bar-${country}" class="BarChart-bar" style="height: ${height}%">
                            ${data.Countries[country].CountryCode}
                            <button class="BarChart-bar-remove" onclick=removeCountry(event) >X</button>
                        </div>
                    `;
                countries.push(data.Countries[country].Country);
            } 
        }
    });
}

generateOptions = (data) => {
    for (country in data.Countries) {
        let countrySelector = document.querySelector("#countries");
        let countryChoice = document.createElement("option");
        let countryValue = document.createTextNode(data.Countries[country].Country);
        countryChoice.value=data.Countries[country].Country;
        countryChoice.id="option=" + country;
        countryChoice.appendChild(countryValue);
        countrySelector.appendChild(countryChoice);
    }
}

doFetch();