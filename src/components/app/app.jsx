import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../../utils/burger-api';
import styles from './app.module.css'


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
      <div className={styles.mainBlock}>
      <BurgerIngredients ingredients={state.data}/>
      <BurgerConstructor ingredients={state.data}/>
      </div>
      </div>
  );
}

export default App;