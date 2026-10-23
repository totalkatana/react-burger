import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import { selectIngredientCounts } from '@services/burger-constructor/burger-constructor-slice';
import { INGREDIENT_DRAG_TYPE } from '@utils/constants';

import styles from './burger-ingredient-card.module.css';

export const BurgerIngredientCard = ({ ingredient, onClick }) => {
  const count = useSelector(
    (state) => selectIngredientCounts(state)[ingredient._id] ?? 0
  );
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: INGREDIENT_DRAG_TYPE,
      item: ingredient,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [ingredient]
  );

  return (
    <article
      ref={dragRef}
      className={styles.ingredient_card}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={onClick}
    >
      <div style={{ position: 'relative' }}>
        {count > 0 && <Counter count={count} size="default" />}
        <img src={ingredient.image} alt={ingredient.name} draggable={false} />
        <div className={`${styles.price} m-1`}>
          <span>{ingredient.price}</span>
          <CurrencyIcon />
        </div>
      </div>
      <span className={styles.name}>{ingredient.name}</span>
    </article>
  );
};
