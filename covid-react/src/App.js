import React, { useEffect, useState } from 'react';
import './App.css';

let countries = ['United States of America', 'Spain', 'China', 'Brazil', 'Australia'];

function App() {
  const [state, setState] = useState({
    data: [],
  });

  useEffect(() => {
    fetch("https://api.covid19api.com/summary")
      .then(response => response.json())
      .then(data =>  {
        setState({ data: data.Countries })
      })
  }, []);

  function addCountry(country) {
    console.log(country);
  }

  return (
    <div className="App">
      <div className="Container">
        <div className="Header">
          <h1 className="Header-content">Data Visualization for COVID-19</h1>
        </div>
        <div className="Selector">
            <label htmlFor="countries">Select Country:</label>
            <select id="countries" onChange={e => addCountry(e.currentTarget.value)}>
            {(state.data).map(datum => (
              <option>
                {datum.Country}
              </option>
            ))
          }
            </select>
        </div>
        <div className="BarChart">
          {(state.data)
          .filter(datum => countries.includes(datum.Country))
          .map(datum => (
              <div className="BarChart-bar" style={{height: (datum.TotalConfirmed / 1000) + "%"}}>
                {datum.CountryCode}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
