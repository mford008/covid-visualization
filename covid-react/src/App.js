import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    data: [],
  });

  const countries = ['United States of America', 'Spain', 'China', 'Brazil', 'Australia'];

  useEffect(() => {
    fetch("https://api.covid19api.com/summary")
      .then(response => response.json())
      .then(data =>  {
        console.log((data.Countries));
        setState({ data: data.Countries })
      })
  }, []);

  // addCountry(() => {
  //   console.log('test');
  // });

  return (
    <div className="App">
      <div className="Container">
        <div className="Header">
          <h1 className="Header-content">Data Visualization for COVID-19</h1>
        </div>
        <div class="Selector">
            <label for="countries">Select Country:</label>
            {/* <select id="countries" onchange="addCountry()"> */}
            <select id="countries" onchange="addCountry">
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
