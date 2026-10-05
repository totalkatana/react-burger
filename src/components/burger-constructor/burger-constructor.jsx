import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const [orderInfo, setOrderInfo] = useState(null);
  const handleClose = useCallback(() => setOrderInfo(null), []);

  const ingredientsForRender = ingredients
    .filter((ingredient) => ingredient.type !== 'bun')
    .slice(0, 7);

  return (
    <section className={`${styles.burger_constructor} pl-4 pr-4 ml-10 mb-10`}>
      <div className={`${styles.ingredient} ingredient mb-4 ml-8`}>
        <ConstructorElement
          isLocked
          price={200}
          text="Краторная булка N-200i (верх)"
          thumbnail="https://react-burger-ui-components.education-services.ru/assets/img-CFqVEZmj.png"
          type="top"
        />
      </div>
      <ul className={`${styles.ingredients_list} custom-scroll`}>
        {ingredientsForRender.map((ingredient) => (
          <li className={`${styles.ingredient} ingredient mb-4`} key={ingredient._id}>
            <DragIcon />
            <ConstructorElement
              price={ingredient.price}
              text={ingredient.name}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      <div className={`${styles.ingredient} ingredient ml-8`}>
        <ConstructorElement
          isLocked
          price={200}
          text="Краторная булка N-200i (низ)"
          thumbnail="https://react-burger-ui-components.education-services.ru/assets/img-CFqVEZmj.png"
          type="bottom"
        />
      </div>
      <div className={`${styles.total} pt-10`}>
        <div className={`${styles.price}`}>
          <span>610</span>
          <CurrencyIcon className={styles.price_icon} type="primary" />
        </div>
        <Button
          onClick={() => setOrderInfo({ info: true })}
          extraClass="ml-10"
          size="large"
          type="primary"
        >
          Оформить заказ
        </Button>
      </div>
      {orderInfo && (
        <Modal title="Заказ" onClose={handleClose}>
          <OrderDetails orderInfo={orderInfo} />
        </Modal>
      )}
    </section>
  );
};
