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
        console.log(data);
        this.setState({ globalData: data.Global })
        this.setState({ data: data.Countries })
        this.setState({ displayCountries: (this.state.data).filter(datum => (countries.includes(datum.Country)))})
      })
  }

  addCountry(country) {
    this.state.data.map(each => {
      if (country === each.Country) {
        this.setState({
          displayCountries: this.state.displayCountries.concat(each),
          selectedCountry: each.Country,
          selectedCountryTotal: each.TotalConfirmed,
          selectedCountryDeaths: each.TotalDeaths,
          selectedCountryRecovered: each.TotalRecovered,
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
          <div className="DisplayStats">
          <p className="DisplayStats-content">Country: <span className="DisplayStats-content-data">{this.state.selectedCountry}</span></p>
          <p className="DisplayStats-content">Confirmed Cases: <span className="DisplayStats-content-data">{this.state.selectedCountryTotal}</span></p>
          <p className="DisplayStats-content">Deaths: <span className="DisplayStats-content-data">{this.state.selectedCountryDeaths}</span></p>
          <p className="DisplayStats-content">Recoveries: <span className="DisplayStats-content-data">{this.state.selectedCountryRecovered}</span></p>
          </div>
        </div>
        <div className="BarChart">
          {(this.state.displayCountries).map(datum => (
            <div className="BarChart-bar" onClick={(event) => this.displayStats(event.target.innerText)} style={{height: (datum.TotalConfirmed / 1000) + "%"}}>
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
