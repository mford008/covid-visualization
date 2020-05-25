import React, { Component } from 'react';
import './App.css';

let countries = ['United States of America', 'Spain', 'China', 'Brazil', 'Australia'];

class App extends Component {
  state = {
    globalData: [],
    data: [],
    displayCountries: [],
    selectedCountry: '',
    selectedCountryTotal: '',
    selectedCountryDeaths: '',
    selectedCountryRecovered: '',
  }
  componentDidMount() {
    fetch("https://api.covid19api.com/summary")
      .then(response => response.json())
      .then(data =>  {
        this.setState({ globalData: data.Global })
        this.setState({ data: data.Countries })
        this.setState({ displayCountries: (this.state.data).filter(datum => (countries.includes(datum.Country)))})
      })
  }

  addCountry(selected) {
    const selectedInDisplayCountries = this.state.displayCountries.map(test => (Object.values(test))[0]).includes(selected);
    this.state.data.map(country => {
      if (selected === country.Country && !selectedInDisplayCountries) {
        this.setState({
          displayCountries: this.state.displayCountries.concat(country),
          selectedCountry: country.Country,
          selectedCountryTotal: country.TotalConfirmed,
          selectedCountryDeaths: country.TotalDeaths,
          selectedCountryRecovered: country.TotalRecovered,
        });
      }
    }) 
  }

  removeCountry(country) {
    console.log(country);
    // this.state.data.map(each => {
    //   if (country === each.Country) {
    //     this.setState({
    //       displayCountries: this.state.displayCountries.splice(each)
    //     });
    //     console.log(this.state.displayCountries);
    //   }
    // }) 
  }

  displayStats(abbreviation) {
    console.log(this.state.displayCountries);
    const selected = this.state.displayCountries.filter(country => country.CountryCode === abbreviation);
    this.setState({
      selectedCountry: selected[0].Country,
      selectedCountryTotal: selected[0].TotalConfirmed,
      selectedCountryDeaths: selected[0].TotalDeaths,
      selectedCountryRecovered: selected[0].TotalRecovered,
    })
  }

  render() {
    return (
      <div className="App">
      <div className="Container">
        <div className="Header">
          <h1 className="Header-content">Data Visualization for COVID-19</h1>
        </div>
        <div className="Subheader">
          <div className="Selector">
              <label className="Selector-label" htmlFor="countries">Select Country: </label>
              <select id="countries" onChange={(event) => this.addCountry(event.target.value)}>
              {(this.state.data).map(datum => (
                <option>
                  {datum.Country}
                </option>
              ))
            }
              </select>
          </div>
          <div className="CountryStats">
            <h2 className="CountryStats-header">Selected Country Data:</h2>
            <p className="CountryStats-content">Country: <span className="CountryStats-content-data">{this.state.selectedCountry}</span></p>
            <p className="CountryStats-content">Confirmed Cases: <span className="CountryStats-content-data">{this.state.selectedCountryTotal}</span></p>
            <p className="CountryStats-content">Deaths: <span className="CountryStats-content-data">{this.state.selectedCountryDeaths}</span></p>
            <p className="CountryStats-content">Recoveries: <span className="CountryStats-content-data">{this.state.selectedCountryRecovered}</span></p>
          </div>
          <div className="GlobalStats">
            <h2 className="GlobalStats-header">Global Data: </h2>
            <p className="GlobalStats-content">Confirmed Cases: <span className="GlobalStats-content-data">{this.state.globalData.TotalConfirmed}</span></p>
            <p className="GlobalStats-content">Deaths: <span className="GlobalStats-content-data">{this.state.globalData.TotalDeaths}</span></p>
            <p className="GlobalStats-content">Recoveries: <span className="GlobalStats-content-data">{this.state.globalData.TotalRecovered}</span></p>
          </div>
        </div>
        <div className="BarChart">
          {(this.state.displayCountries).map(datum => (
            <div className="BarChart-bar" onClick={(event) => this.displayStats(event.target.innerText)} style={{height: (datum.TotalConfirmed / 10000) + "%"}}>
            {datum.CountryCode} 
            {/* <button onClick={(event) => this.removeCountry(event)}>X</button> */}
            </div>
            ))
          }
        </div>
      </div>
    </div>
    )
  }
}

export default App;
