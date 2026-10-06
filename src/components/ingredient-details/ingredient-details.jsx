import styles from './ingredient-details.module.css';

const InfoBlock = ({ title, value }) => {
  return (
    <div className={`${styles.info_block} mr-5`}>
      <span className={styles.info_title}>{title}</span>
      <span className={styles.info_value}>{value}</span>
    </div>
  );
};

export const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={`${styles.ingredient_details} pt-10 pb-15 pl-10 pr-10`}>
      <span className={styles.details_title}>Детали ингредиента</span>
      <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
      <span className={`${styles.name} mt-4`}>{ingredient.name}</span>
      <div className={`${styles.info} mt-8`}>
        <InfoBlock title={'Калории,ккал'} value={ingredient.calories} />
        <InfoBlock title={'Белки, г'} value={ingredient.proteins} />
        <InfoBlock title={'Жиры, г'} value={ingredient.fat} />
        <InfoBlock title={'Углеводы, г'} value={ingredient.carbohydrates} />
      </div>
    </div>
  );
};
