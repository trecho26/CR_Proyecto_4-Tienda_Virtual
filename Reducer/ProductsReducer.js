import { AGREGAR_CARRITO, OBTENER_PRODUCTOS } from "./types";

export const ProductsReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_PRODUCTOS:
      return {
        ...state,
        products: action.payload,
      };
    case AGREGAR_CARRITO:
      return {
        ...state,
        carrito: [...state.carrito, action.payload],
      };
    case 2:
      break;
    default:
      break;
  }
};
