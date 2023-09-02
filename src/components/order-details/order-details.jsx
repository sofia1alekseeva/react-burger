import { useState } from "react"
import styles from './order-details.module.css'
import done from '../../images/done.svg';

export const OrderDetails = () => {

    return (
        <section className={styles.mainBlock}>
            <h1 className={`${styles.orderId} text text_type_digits-large`}>034536</h1>
            <h2 className={`${styles.orderIdText} text text_type_main-medium mt-8 mb-15`}>идентификатор заказа</h2>
            <img className={`${styles.done} mb-15`} src={done} />
        <h3 className={`${styles.orderStatus} text text_type_main-small mb-2`}>Ваш заказ начали готовить</h3>
        <h4 className={`${styles.orderText} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</h4>
    </section>
    )

}