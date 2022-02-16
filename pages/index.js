import Head from "next/head";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useState } from "react";
import ProductCard from "../Components/ProductCard";

const initialValues = [
  {
    id: 1,
    productName: "Playera",
    productDesc: "Playera de algodon",
    productPrice: 150,
  },
  {
    id: 2,
    productName: "Playera",
    productDesc: "Playera de algodon",
    productPrice: 150,
  },
  {
    id: 3,
    productName: "Playera",
    productDesc: "Playera de algodon",
    productPrice: 150,
  },
  {
    id: 4,
    productName: "Playera",
    productDesc: "Playera de algodon",
    productPrice: 150,
  },
  {
    id: 5,
    productName: "Playera",
    productDesc: "Playera de algodon",
    productPrice: 150,
  },
];

export default function Home() {
  const [products, setProducts] = useState(initialValues);
  return (
    <Container>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} md={6}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
