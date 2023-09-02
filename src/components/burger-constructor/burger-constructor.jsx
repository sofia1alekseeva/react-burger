import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './burger-constructor.module.css';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerConstructorList } from '../burger-constructor-list/burger-constructor-list';
import ingredientTypes from "../../utils/propsType";
import PropTypes from 'prop-types';


export const BurgerConstructor = ({ ingredients }) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <section>
            <div className={`${styles.burgerConstructor} pt-25`}>
            <div className={`${styles.burgerComponent} mb-4 ml-8`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
                        /></div>
                <div className={`${styles.burgerComponents} custom-scroll mr-4 `}>
                    <BurgerConstructorList ingredients={ingredients}/>
                </div>
                <div className={`${styles.burgerComponent} mt-4 ml-8`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
                    /></div>
                <div className={`${styles.orderInfo} ml-4 mr-4 mt-10`}>
                    <span className={`${styles.totalPrice} text text_type_digits-medium mr-2`}>610</span>
                    <span className={styles.totalPriceSvg}><CurrencyIcon type="primary" /></span>
                    <Button htmlType="button" type="primary" size="large" extraClass='ml-10' onClick={() => setOpenModal(true)}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            <Modal active={openModal} setActive={setOpenModal}>
                <OrderDetails />
            </Modal>
        </section>)
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientTypes).isRequired
};