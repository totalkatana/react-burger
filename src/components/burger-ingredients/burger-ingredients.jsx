import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerIngredientsListSection } from '@components/burger-ingredients-list-section/burger-ingredients-list-section';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { selectIngredients } from '@services/ingredients/ingredients-slice';
import {
  selectIngredient,
  clearSelectedIngredient,
  selectViewedIngredient,
} from '@services/selected-ingredient/selected-ingredient-slice';
import { INGREDIENT_TYPES } from '@utils/constants';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const selectedIngredient = useSelector(selectViewedIngredient);
  const [activeType, setActiveType] = useState(INGREDIENT_TYPES[0].type);
  const ingredientsListRef = useRef(null);
  const headingRefs = useRef({});
  const handleClose = useCallback(() => dispatch(clearSelectedIngredient()), [dispatch]);
  const handleIngredientClick = useCallback(
    (ingredient) => dispatch(selectIngredient(ingredient)),
    [dispatch]
  );

  const handleScroll = () => {
    const containerTop = ingredientsListRef.current.getBoundingClientRect().top;
    let closestType = INGREDIENT_TYPES[0].type;
    let closestDistance = Infinity;

    INGREDIENT_TYPES.forEach(({ type }) => {
      const heading = headingRefs.current[type];

      if (heading) {
        const distance = Math.abs(heading.getBoundingClientRect().top - containerTop);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestType = type;
        }
      }
    });

    setActiveType(closestType);
  };

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
            active={activeType === 'bun'}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={activeType === 'sauce'}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={activeType === 'main'}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
        </ul>
      </nav>
      <div
        ref={ingredientsListRef}
        onScroll={handleScroll}
        className={`${styles.ingredients_list} mt-10 pb-10 custom-scroll`}
      >
        {filteredIngredientGroups.map(({ type, title, filteredIngredients }) => {
          return (
            <BurgerIngredientsListSection
              title={title}
              key={type}
              headingRef={(element) => {
                headingRefs.current[type] = element;
              }}
              ingredients={filteredIngredients}
              onIngredientClick={handleIngredientClick}
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
