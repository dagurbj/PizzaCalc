import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const App = () => {
  const [numberOfPizzas, setNumberOfPizzas] = useState(4);

  const [ballSize, setBallSize] = useState(250);

  const [saltPct, setSaltPct] = useState(2.0);

  const [hydration, setHydration] = useState(67);

  const [levain, setLevain] = useState(10);

  const gramsFlour = numberOfPizzas * (ballSize - ballSize * levain / 100) / (saltPct / 100 + hydration / 100 + 1);
  const gramsLevain = -(2 * gramsFlour * levain / 100) / (levain / 100 - 1);
  const gramsWater = gramsFlour * hydration / 100 + 0.5 * (-(2 * gramsFlour * levain / 100) / (levain / 100 - 1)) * (hydration / 100 - 1);
  const gramsSalt = saltPct / 100 * (gramsFlour + (- (2 * gramsFlour * levain / 100) / (levain / 100 - 1)) / 2);
    
  return (
    <div className="App">
      <div class="container">
        {getSlider("Number of pizzas", numberOfPizzas, setNumberOfPizzas, 'primary', [1, 10], undefined, '')}
        {getSlider("Dough pr. pizza", ballSize, setBallSize, 'success', [200, 300], undefined, 'g')}
        {getSlider("Salt", saltPct, setSaltPct, 'danger', [0, 3], 0.1)}
        {getSlider("Hydration", hydration, setHydration, 'warning', [55, 100])}
        {getSlider("Levain", levain, setLevain, 'info', [0, 20])}
      </div>
      <div class="container">
        {getIngredientRow("Flour", gramsFlour)}
        {getIngredientRow("Levain", gramsLevain)}
        {getIngredientRow("Water", gramsWater)}
        {getIngredientRow("Salt", gramsSalt)}
      </div>
    </div>


  );

  function getSlider(ingredientName, value, setValueFunc, variant, limits, step = 1, unit = '%') {
    return <div class="row">
      <div class="col-12">
        <h2>{ingredientName}: {value}{unit}</h2>
        <RangeSlider
          min={limits[0]}
          max={limits[1]}
          step={step}
          variant={variant}
          value={value}
          onChange={changeEvent => setValueFunc(changeEvent.target.value)} />
      </div>
    </div>;
  }

  function getIngredientRow(ingredientName, grams) {
    return <div class="row">
      <div class="col-4">
        <h1>{ingredientName}:</h1>
      </div>
      <div class="col-8">
        <h2>{grams.toFixed(0)}g</h2>
      </div>
    </div>;
  }
}

export default App;
