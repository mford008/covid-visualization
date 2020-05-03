import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    data: [],
  });
  useEffect(() => {
    fetch("https://api.covid19api.com/summary")
      .then(response => response.json())
      .then(data =>  {
        console.log((data.Countries));
        setState({ data: data.Countries })
      })
  }, []);

  const countries = ['United States of America', 'Spain', 'China', 'Brazil', 'Australia'];
  
  return (
    <div className="App">
      <div>
      {(state.data).map(datum => (
        <div>
            {datum.Country}
        </div>
        ))
      }
      </div>
    </div>
  );
}

export default App;
