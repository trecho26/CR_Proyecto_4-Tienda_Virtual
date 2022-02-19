import "../styles/globals.css";
import Layout from "../Components/Layout";
import ProductsContext from "../Context/ProductsContext";
import { ProductsReducer } from "../Reducer/ProductsReducer";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { AGREGAR_CARRITO, OBTENER_PRODUCTOS } from "../Reducer/types";

function MyApp({ Component, pageProps }) {
  const initialValues = {
    products: [],
    carrito: [],
  };
  const [state, dispatch] = useReducer(ProductsReducer, initialValues);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      // setProducts(response.data);
      dispatch({
        type: OBTENER_PRODUCTOS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        product
      );
      // Cerrar modal cuando tenga exito
      if (response.status === 201) {
        fetchData();
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${id}`
      );
      if (response.status === 200 || response.status === 201) {
        // const newProducts = products.filter((product) => product.id !== id);
        // setProducts(newProducts);
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = (product) => {
    console.log(product);
    dispatch({
      type: AGREGAR_CARRITO,
      payload: product,
    });
  };

  return (
    <>
      <ProductsContext.Provider
        value={{
          products: state.products,
          carrito: state.carrito,
          addProduct: addProduct,
          deleteProduct: deleteProduct,
          addToCart: addToCart,
        }}
      >
        <Layout />
        <Component {...pageProps} />
      </ProductsContext.Provider>
    </>
  );
}

export default MyApp;
