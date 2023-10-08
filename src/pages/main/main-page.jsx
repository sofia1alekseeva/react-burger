import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './main-page.module.css';

const MainPage = () => {

    return (
    <DndProvider backend={HTML5Backend}>
          <main className={styles.mainBlock}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
)}

export default MainPage