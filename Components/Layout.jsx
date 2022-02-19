import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductsContext from "../Context/ProductsContext";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Layout = () => {
  const { carrito } = useContext(ProductsContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box className="modal">
          {carrito.length === 0 ? (
            <h1>Carrito vacio</h1>
          ) : (
            <List>
              {carrito.map((product) => (
                <ListItem key={product.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.productName}
                    secondary={`${product.productDesc} - $${product.productPrice}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Modal>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Productos
            </Typography>
            <IconButton aria-label="cart" onClick={() => setIsOpen(true)}>
              <StyledBadge badgeContent={carrito.length} color="error">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Layout;
