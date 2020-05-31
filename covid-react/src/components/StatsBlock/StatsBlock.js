import React, { Component } from 'react';

class StatsBlock extends Component {
    render() {
        return (
            <div>
                <h2 className="CountryStats-header">{this.props.header}</h2>
                {this.props.type === 'country' ? <p className="CountryStats-content">Country: <span className="CountryStats-content-data">{this.props.data.selectedCountry}</span></p> : ''}
                <p className="CountryStats-content">Confirmed Cases: <span className="CountryStats-content-data">{this.props.confirmed}</span></p>
                <p className="CountryStats-content">Deaths: <span className="CountryStats-content-data">{this.props.deaths}</span></p>
                <p className="CountryStats-content">Recoveries: <span className="CountryStats-content-data">{this.props.recovered}</span></p>
            </div>
        )
    }
}
export default StatsBlock;