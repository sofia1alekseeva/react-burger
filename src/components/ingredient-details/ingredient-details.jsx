import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux';
import * as ingredientDetailsSelector from '../../services/reducers/ingredient-details/selectors';

export const IngredientDetails = () => {
    const ingredientDetails = useSelector(ingredientDetailsSelector.ingredientDetails);
    console.log("ingredientDetails", ingredientDetails)

    return (<section className={styles.mainBlock}>
        <img className={`${styles.image} ml-5 mr-5 mb-4`} src={ingredientDetails.image} />
        <h3 className={`${styles.name} text text_type_main-medium mb-8`}>{ingredientDetails.name}</h3>
        <div className={styles.caloricContent}>
            <div className={`${styles.caloricItem} text text_type_main-default text_color_inactive`}>
                <p className={styles.text}>Калории,ккал</p>
                <p className={`${styles.text} ${styles.number} text text_type_digits-default`}>{ingredientDetails.calories}</p>
            </div>
            <div className={`${styles.caloricItem} text text_type_main-default text_color_inactive`}>
                <p className={styles.text}>Белки, г</p>
                <p className={`${styles.text} ${styles.number} text text_type_digits-default`}>{ingredientDetails.proteins}</p>
            </div>
            <div className={`${styles.caloricItem} text text_type_main-default text_color_inactive`}>
                <p className={styles.text}>Жиры, г</p>
                <p className={`${styles.text} ${styles.number} text text_type_digits-default`}>{ingredientDetails.fat}</p>
            </div>
            <div className={`${styles.caloricItem} text text_type_main-default text_color_inactive`}>
                <p className={styles.text}>Углеводы, г</p>
                <p className={`${styles.text} ${styles.number} text text_type_digits-default`}>{ingredientDetails.carbohydrates}</p>
            </div>
        </div>
    </section>
    )
}