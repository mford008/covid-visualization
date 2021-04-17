import React, { Component } from 'react';

class BarGraph extends Component {
    displayStats(event) {
        const abbreviation = event.target.innerText;
        const selected = this.props.displayCountries.filter(country => country.Country === abbreviation);
        // this.props.onBarSelected(selected)
        this.setState({
          selectedCountry: selected[0].Country,
          selectedCountryTotal: selected[0].TotalConfirmed,
          selectedCountryDeaths: selected[0].TotalDeaths,
          selectedCountryRecovered: selected[0].TotalRecovered,
        }) 
    }
    render() {
        return (
            <div className="BarChart">
            {(this.props.data).map(datum => (
                <div className="BarChart-bar" style={{height: (datum[(this.props.dataType).replace(/ +/g, "")] / 10000) + "%"}}>
                    <div className="BarChart-title" onClick={(event) => this.displayStats(event)}>{datum.Country}</div>
                    {/* <div className="BarChart-title" this.props.onBarSelected={} onClick={(event) => this.displayStats(event)}>{datum.Country}</div> */}
                    <button className="BarChart-button" onClick={(event) => this.props.removeCountry(event)}>X</button>
                </div>
                ))
            }
            </div>
        )
    }
}
export default BarGraph;

// TODO: onBarSelected prop = sets state in app to show what was selected