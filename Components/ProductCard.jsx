import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ID: {product.id}
        </Typography>
        <Typography variant="h5" component="div">
          {product.productName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {product.productDesc}
        </Typography>
        <Typography variant="body2">${product.productPrice}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Agregar al carrito</Button>
        <Button size="small" color="error">
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
