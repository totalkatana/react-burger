import { BurgerIngredientCard } from '@components/burger-ingredient-card/burger-ingredient-card';

import styles from './burger-ingredients-list-section.module.css';

export const BurgerIngredientsListSection = ({
  title,
  ingredients,
  onIngredientClick,
}) => {
  return (
    <section>
      <h2 className={styles.title}>{title}</h2>
      <div className={`${styles.ingredients_section} pt-6 pb-10 pl-4 pr-4`}>
        {ingredients.map((ingredient) => (
          <BurgerIngredientCard
            key={ingredient._id}
            ingredient={ingredient}
            onClick={() => onIngredientClick(ingredient)}
          />
        ))}
      </div>
    </section>
  );
};
