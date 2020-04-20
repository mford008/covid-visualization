const countries = ['United States of America', 'Spain', 'China', 'Brazil', 'Australia'];

fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(data => {
        for (i in data.Countries) {
            // let countrySelector = document.querySelector("#countries");
            // countryChoice = document.createElement("option");
            // countryValue = document.createTextNode(data.Countries[i].Country);
            // countryChoice.value=data.Countries[i].Country;
            // countryChoice.id=i;
            // countryChoice.appendChild(countryValue);
            // countrySelector.appendChild(countryChoice);
            if (countries.includes(data.Countries[i].Country)) {
                console.log(data.Countries[i]);
                console.log(data.Countries[i].Country);
                let chart = document.querySelector(".BarChart");
                let height = Math.floor((data.Countries[i].TotalConfirmed) / 1000);
                let bar = document.createElement("div");
                let barText = document.createTextNode(data.Countries[i].CountryCode);
                let barRemove = document.createElement('button');
                barRemove.innerHTML = 'X';
                barRemove.onclick=removeCountry;
                barRemove.classList.add('BarChart-bar-remove');
                bar.appendChild(barText);
                bar.appendChild(barRemove);
                bar.id=i;
                bar.classList.add("BarChart-bar");
                bar.style.height = height + "%";
                chart.appendChild(bar);
            }
        }
});

removeCountry = (event) => {
    let country = document.getElementById(event.target.parentElement.id );
    country.remove();
}

addCountry = () => {
    let newCountry = event.target.value;
    fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
        for (country in data.Countries) {
            if (newCountry === data.Countries[country].Country && !countries.includes(newCountry)) {
                let chart = document.querySelector(".BarChart");
                let height = Math.floor((data.Countries[country].TotalConfirmed) / 1000);
                let bar = document.createElement("div");
                let barText = document.createTextNode(data.Countries[country].CountryCode);
                let barRemove = document.createElement('button');
                barRemove.innerHTML = 'X';
                barRemove.onclick=removeCountry;
                barRemove.classList.add('BarChart-bar-remove');
                bar.appendChild(barText);
                bar.appendChild(barRemove);
                bar.id=country;
                bar.classList.add("BarChart-bar");
                bar.style.height = height + "%";
                chart.appendChild(bar);
            } 
        }
    });
}