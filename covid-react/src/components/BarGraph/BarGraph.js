import React, { Component } from 'react';

class BarGraph extends Component {
    render() {
        return (
            <div className="BarChart">
            {(this.props.data).map(datum => (
                <div className="BarChart-bar" style={{height: (datum[(this.props.dataType).replace(/ +/g, "")] / 10000) + "%"}}>
                    <div className="BarChart-title" onClick={(event) => this.props.displayStats(event)}>{datum.Country}</div>
                    <button className="BarChart-button" onClick={(event) => this.props.removeCountry(event)}>X</button>
                </div>
                ))
            }
            </div>
        )
    }
}
export default BarGraph;