import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import {
  moveIngredient,
  removeIngredient,
} from '@services/burger-constructor/burger-constructor-slice';
import { CONSTRUCTOR_INGREDIENT_DRAG_TYPE } from '@utils/constants';

import styles from './burger-constructor-ingredient.module.css';

export const BurgerConstructorIngredient = ({ ingredient }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: CONSTRUCTOR_INGREDIENT_DRAG_TYPE,
      item: { id: ingredient.id },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [ingredient.id]
  );
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: CONSTRUCTOR_INGREDIENT_DRAG_TYPE,
      canDrop: (item) => item.id !== ingredient.id,
      drop: (item) => {
        dispatch(moveIngredient({ sourceId: item.id, targetId: ingredient.id }));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [dispatch, ingredient.id]
  );

  return (
    <li
      ref={(element) => {
        dragRef(dropRef(element));
      }}
      className={`${styles.ingredient} ingredient mb-4`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        outline: isOver && canDrop ? '2px dashed #8585ad' : undefined,
      }}
    >
      <DragIcon />
      <ConstructorElement
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredient(ingredient.id))}
      />
    </li>
  );
};
