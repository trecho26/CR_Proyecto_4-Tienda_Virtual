import Head from "next/head";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useState, useEffect, useContext } from "react";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ProductsContext from "../Context/ProductsContext";

export default function Home() {
  const initialProduct = {
    productName: "",
    productDesc: "",
    productPrice: 0,
  };
  const initialError = {
    open: false,
    text: "",
  };

  const { products, addProduct } = useContext(ProductsContext);

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(initialError);
  const [product, setProduct] = useState(initialProduct);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const handleChange = (event) => {
    let eventName = event.target.name;
    let eventValue = event.target.value;

    setProduct({
      ...product,
      [eventName]: eventValue,
    });
  };

  const handleSubmit = async (event) => {
    // Evitar comportamiento por defecto
    event.preventDefault();

    // Validar que todos los campos no vengan vacios
    if (
      product.productName.trim() === "" ||
      product.productDesc.trim() === "" ||
      product.productPrice.trim() === ""
    ) {
      setError({
        open: true,
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    // Agregar producto a la BD
    let response = await addProduct(product);

    // Cerrar modal
    if (response) {
      closeForm();
    }

    // Reiniciar el estado product y reiniciar error
    setProduct(initialProduct);
    setError(initialError);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Descripcion"
              name="productDesc"
              value={product.productDesc}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
            <TextField
              label="Precio"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            {error.open && <h3>{error.text}</h3>}
            <Button variant="contained" sx={{ margin: "1rem 0" }} type="submit">
              Agregar
            </Button>
          </form>
        </Box>
      </Modal>
      <Container>
        {products.length === 0 && <h1>No hay productos</h1>}
        <Button
          variant="contained"
          sx={{ margin: "1rem 0" }}
          onClick={openForm}
        >
          Agregar producto
        </Button>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} md={6} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
