const countries = ['United States of America', 'Spain', 'China', 'Brazil', 'Australia'];

fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(data => {
        for (i in data.Countries) {
            if (countries.includes(data.Countries[i].Country)) {
                console.log(data.Countries[i]);
                console.log(data.Countries[i].Country);
                let chart = document.querySelector(".BarChart");
                let height = Math.floor((data.Countries[i].TotalConfirmed) / 1000);
                let bar = document.createElement("div");
                let barText = document.createTextNode(data.Countries[i].CountryCode);
                let barRemove = document.createElement('a');
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
