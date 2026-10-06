import doneImage from '../../assets/images/doneImage.jpg';

import styles from './order-details.module.css';

export const OrderDetails = () => {
  return (
    <div className={`${styles.order_details} pb-30`}>
      <div className={`${styles.order_id} mt-30`}>034536</div>
      <span className={`${styles.text} mt-8`}>идентификатор заказа</span>
      <img className={`${styles.image}  mt-15`} src={doneImage}></img>
      <span className={`${styles.bottom_text} mt-15`}>Ваш заказ начали готовить</span>
      <span className={`${styles.bottom_text} mt-2`} style={{ color: '#8585AD' }}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};
