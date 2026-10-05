import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState, useCallback } from 'react';

import { BurgerIngredientsListSection } from '@components/burger-ingredients-list-section/burger-ingredients-list-section';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { INGREDIENT_TYPES } from '@utils/constants';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const handleClose = useCallback(() => setSelectedIngredient(null), []);

  const filteredIngredientGroups = useMemo(() => {
    return INGREDIENT_TYPES.map(({ type, title }) => ({
      type,
      title,
      filteredIngredients: ingredients.filter((ingredient) => ingredient.type === type),
    }));
  }, [ingredients]);

  return (
    <section className={`${styles.burger_ingredients} mb-10`}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
        </ul>
      </nav>
      <div className={`${styles.ingredients_list} mt-10 pb-10 custom-scroll`}>
        {filteredIngredientGroups.map(({ type, title, filteredIngredients }) => {
          return (
            <BurgerIngredientsListSection
              title={title}
              key={type}
              ingredients={filteredIngredients}
              onIngredientClick={setSelectedIngredient}
            />
          );
        })}
      </div>
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleClose}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
