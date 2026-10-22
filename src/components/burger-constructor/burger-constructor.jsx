import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructorIngredient } from '@components/burger-constructor-ingredient/burger-constructor-ingredient';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import {
  addIngredient,
  selectTotalPrice,
  selectBurgerConstructor,
} from '@services/burger-constructor/burger-constructor-slice';
import { submitOrder } from '@services/order/order-actions';
import { clearOrder, selectOrder } from '@services/order/order-slice';
import { INGREDIENT_DRAG_TYPE } from '@utils/constants';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [{ isDraggingBun, isDraggingFilling }, dropRef] = useDrop(
    () => ({
      accept: INGREDIENT_DRAG_TYPE,
      drop: (ingredient) => {
        dispatch(addIngredient(ingredient));
      },
      collect: (monitor) => {
        const canDrop = monitor.canDrop();
        const ingredient = monitor.getItem();

        return {
          isDraggingBun: canDrop && ingredient?.type === 'bun',
          isDraggingFilling: canDrop && ingredient?.type !== 'bun',
        };
      },
    }),
    [dispatch]
  );
  const { bun, ingredients: ingredientsForRender } = useSelector(
    selectBurgerConstructor
  );
  const { number: orderNumber, status, error } = useSelector(selectOrder);
  const handleClose = useCallback(() => dispatch(clearOrder()), [dispatch]);
  const isSubmitting = status === 'loading';

  const totalPrice = useSelector(selectTotalPrice);

  const handleSubmit = () => {
    if (!bun || isSubmitting) return;

    dispatch(
      submitOrder([
        bun._id,
        ...ingredientsForRender.map((ingredient) => ingredient._id),
        bun._id,
      ])
    );
  };

  return (
    <section
      ref={dropRef}
      className={`${styles.burger_constructor} pl-4 pr-4 ml-10 mb-10`}
    >
      <div className={`${styles.ingredient} ingredient mb-4 ml-8`}>
        {bun ? (
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            type="top"
          />
        ) : (
          <div
            className={`${styles.placeholder} ${styles.placeholder_top} ${isDraggingBun ? styles.placeholder_active : ''}`}
          >
            Выберите булки
          </div>
        )}
      </div>
      <ul className={`${styles.ingredients_list} custom-scroll`}>
        {ingredientsForRender.length === 0 && (
          <li
            className={`${styles.placeholder} ${styles.placeholder_filling} ${isDraggingFilling ? styles.placeholder_active : ''} ml-8 mb-4`}
          >
            Выберите начинку
          </li>
        )}
        {ingredientsForRender.map((ingredient) => (
          <BurgerConstructorIngredient key={ingredient.id} ingredient={ingredient} />
        ))}
      </ul>
      <div className={`${styles.ingredient} ingredient ml-8`}>
        {bun ? (
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            type="bottom"
          />
        ) : (
          <div
            className={`${styles.placeholder} ${styles.placeholder_bottom} ${isDraggingBun ? styles.placeholder_active : ''}`}
          >
            Выберите булки
          </div>
        )}
      </div>
      <div className={`${styles.total} pt-10`}>
        <div className={`${styles.price}`}>
          <span>{totalPrice}</span>
          <CurrencyIcon className={styles.price_icon} type="primary" />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!bun || isSubmitting}
          extraClass="ml-10"
          size="large"
          type="primary"
        >
          {isSubmitting ? 'Оформляем заказ…' : 'Оформить заказ'}
        </Button>
      </div>
      {error && <p role="alert">Не удалось оформить заказ. Попробуйте ещё раз.</p>}
      {orderNumber !== null && (
        <Modal title="Заказ" onClose={handleClose}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};
