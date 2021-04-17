import React, { Component } from 'react';

class Selector extends Component {
    render() {
        return (
            <div>
                <label className="Selector-label" htmlFor={this.props.id}>{this.props.children}</label>
                <select id={this.props.id}
                    onChange={(event) => this.props.addCountry(event.target.value)}
                >
                    {(this.props.data).map(datum => (
                    <option>
                        {datum.Country}
                    </option>
                    ))
                    }
                </select>
            </div>
        )
    }
}

export default Selector;
