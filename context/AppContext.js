import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { ACTION_TYPES } from './contextUtils';
import { AppReducer } from './AppReducer';

export const AppContext = createContext();

const initialState = {
  cartOrders: [],
  confirmedOrders: [],
  user: {},
};
const AppContextProvider = (props) => {
  const [menuState, setMenuState] = useState([]);
  const [initialMenuState, setInitialMenuState] = useState([]);
  const [state, dispatch] = useReducer(AppReducer, [], () => {
    let localCartOrders = undefined;
    let localConfirmedOrders = undefined;
    let localUser = undefined;
    if (process.browser) {
      localCartOrders = localStorage.getItem('clientOrders');
      localConfirmedOrders = localStorage.getItem('confirmedOrders');
      localUser = localStorage.getItem('userData');
    }
    let newCartOrders = localCartOrders ? JSON.parse(localCartOrders) : [];
    let newConfirmedOrders = localConfirmedOrders
      ? JSON.parse(localConfirmedOrders)
      : [];
    let newUser = localUser ? JSON.parse(localUser) : {};

    return {
      ...initialState,
      cartOrders: newCartOrders,
      confirmedOrders: newConfirmedOrders,
      user: newUser,
    };
  });

  useEffect(() => {
    axios
      .get('https://sarhan-food-menu.firebaseio.com/pizza-menu.json')
      .then((res) => {
        console.log(Object.values(res.data));
        let menuProducts = [...Object.values(res.data)];
        setMenuState(menuProducts);
        setInitialMenuState(menuProducts);
      });
  }, []);
  useEffect(() => {
    localStorage.setItem('clientOrders', JSON.stringify(state.cartOrders));
    localStorage.setItem(
      'confirmedOrders',
      JSON.stringify(state.confirmedOrders)
    );
    localStorage.setItem('userData', JSON.stringify(state.user));
  }, [state]);
  const filterCategory = (categoryName) => {
    console.log(categoryName);
    const initState = [...initialMenuState];
    if (categoryName === 'all') {
      setMenuState(initState);
    } else {
      setMenuState(
        [...initState].filter((pizza) => {
          return pizza.pizzaType.includes(categoryName);
        })
      );
    }
  };
  const addCart = (pizza) => {
    dispatch({
      type: ACTION_TYPES.ADD_CART,
      payload: pizza,
    });
  };
  const removePizza = (pizza) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_CART,
      payload: pizza,
    });
  };
  const morePizza = (pizza) => {
    dispatch({
      type: ACTION_TYPES.INCREMENT_PIZZA,
      payload: pizza,
    });
  };
  const lessPizza = (pizza) => {
    dispatch({
      type: ACTION_TYPES.DECREMENT_PIZZA,
      payload: pizza,
    });
  };
  const confirmOrder = (order) => {
    dispatch({
      type: ACTION_TYPES.CONFIRM_ORDER,
      payload: order,
    });
  };
  const setUser = (user) => {
    dispatch({
      type: ACTION_TYPES.SET_USER,
      payload: user,
    });
  };
  const clearCart = () => {
    dispatch({
      type: ACTION_TYPES.CLEAR_CART,
    });
  };
  const contextValues = {
    ...state,
    menuState,
    filterCategory,
    addCart,
    removePizza,
    lessPizza,
    morePizza,
    confirmOrder,
    setUser,
    clearCart,
  };
  return (
    <AppContext.Provider value={contextValues}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
