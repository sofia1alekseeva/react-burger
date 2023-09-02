import { useEffect, useState } from 'react';
import { AppHeader } from './components/app-header/app-header';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { getIngredients } from './utils/burger-api';

function App() {

  const [state, setState] = useState({
    success: false,
    data: []
  });

  useEffect(() => {
    getIngredients()
      .then((res) => setState({ data: res.data, success: true }))
      .catch((err) => alert(err))
  }, []);

  return (
    <div>
      <AppHeader/>
      <div style={{display: "flex", justifyContent: "center"}}>
      <BurgerIngredients ingredients={state.data}/>
      <BurgerConstructor ingredients={state.data}/>
      </div>
      </div>
  );
}

export default App;
