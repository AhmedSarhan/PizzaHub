import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context/AppContext';

const categories = [
  {
    name: 'All',
    active: true,
    id: uuidv4(),
  },
  {
    name: 'Beef',
    active: false,
    id: uuidv4(),
  },
  {
    name: 'Chicken',
    active: false,
    id: uuidv4(),
  },
  {
    name: 'Pepperoni',
    active: false,
    id: uuidv4(),
  },
  {
    name: 'Cheese',
    active: false,
    id: uuidv4(),
  },
  {
    name: 'Special',
    active: false,
    id: uuidv4(),
  },
];
export default function PizzaCategories(props) {
  const [categoriesState, setCategoriesState] = useState(categories);
  const { filterCategory } = useContext(AppContext);
  const catHandler = (category) => {
    props.setFilterCategory(category);
    let newCategories = categories.map((cat) => {
      if (cat.id === category.id) return { ...category, active: true };
      return { ...cat, active: false };
    });
    setCategoriesState(newCategories);
    filterCategory(category.name.toLowerCase());
  };
  useEffect(() => {
    filterCategory('all');
  }, []);
  return (
    <>
      <ul className="my-3">
        {categoriesState.map((category) => {
          return (
            <li
              onClick={() => catHandler(category)}
              key={category.id}
              className={
                'inline-block text-indigo-700 border-b-2 border-white capitalize cursor-pointer font-bold hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500 mx-3 my-3 ' +
                (category.active
                  ? 'text-indigo-500 border-b-2 border-indigo-500'
                  : '')
              }
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}
