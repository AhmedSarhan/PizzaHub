import { ACTION_TYPES } from './contextUtils';
import axios from 'axios';

export const AppReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_CART: {
      console.log(action.payload);
      console.log(state);
      let boughtPizza = action.payload;
      let oldCart = [...state.cartOrders];
      let boughtPizzaIndex = oldCart
        .map((pizza) => {
          return pizza.id;
        })
        .indexOf(boughtPizza.id);
      let newCart = [];
      if (boughtPizzaIndex === -1) {
        newCart = oldCart.concat(boughtPizza);
      } else {
        newCart = oldCart.map((pizza) => {
          if (pizza.id === boughtPizza.id && pizza.quantity < 10) {
            return {
              ...pizza,
              quantity: +pizza.quantity + +boughtPizza.quantity,
            };
          } else if (pizza.id === boughtPizza.id && pizza.quantity >= 10) {
            return pizza;
          } else {
            return pizza;
          }
        });
      }
      console.log(newCart);
      return {
        ...state,
        cartOrders: newCart,
      };
    }
    case ACTION_TYPES.REMOVE_CART: {
      console.log(action.payload);
      let oldCart = [...state.cartOrders];
      let newCart = oldCart.filter((pizza) => {
        return pizza.id !== action.payload.id;
      });
      return {
        ...state,
        cartOrders: newCart,
      };
    }
    case ACTION_TYPES.INCREMENT_PIZZA: {
      return {
        ...state,
        cartOrders: state.cartOrders.map((pizza) => {
          if (pizza.id === action.payload.id)
            return { ...pizza, quantity: pizza.quantity + 1 };
          return pizza;
        }),
      };
    }
    case ACTION_TYPES.DECREMENT_PIZZA: {
      console.log(state);
      return {
        ...state,
        cartOrders: state.cartOrders.map((pizza) => {
          if (pizza.id === action.payload.id)
            return { ...pizza, quantity: pizza.quantity - 1 };
          return pizza;
        }),
      };
    }
    case ACTION_TYPES.CONFIRM_ORDER: {
      let newConfirmedOrders = [...state.confirmedOrders];
      newConfirmedOrders.push(action.payload);
      return {
        ...state,
        confirmedOrders: newConfirmedOrders,
      };
    }
    case ACTION_TYPES.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case ACTION_TYPES.CLEAR_CART: {
      return {
        ...state,
        cartOrders: [],
      };
    }
    default:
      return state;
  }
};
