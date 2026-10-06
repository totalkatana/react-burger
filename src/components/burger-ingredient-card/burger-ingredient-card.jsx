import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-ingredient-card.module.css';

export const BurgerIngredientCard = ({ ingredient, onClick }) => {
  return (
    <article className={styles.ingredient_card} onClick={onClick}>
      <div style={{ position: 'relative' }}>
        <Counter count={1} size="default" />
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={`${styles.price} m-1`}>
          <span>{ingredient.price}</span>
          <CurrencyIcon />
        </div>
      </div>
      <span className={styles.name}>{ingredient.name}</span>
    </article>
  );
};
