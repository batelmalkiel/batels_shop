import { FC } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Cart: FC = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          העגלה ריקה
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          חזור לקניות
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        עגלת קניות ({totalItems} פריטים)
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Paper key={item.productId} sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="h6" color="primary">
                    ₪{item.price}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  >
                    <Remove />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    <Add />
                  </IconButton>
                </Box>

                <Typography variant="h6">
                  ₪{(item.price * item.quantity).toFixed(2)}
                </Typography>

                <IconButton color="error" onClick={() => removeItem(item.productId)}>
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              סיכום
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography>סה"כ:</Typography>
              <Typography variant="h6">₪{totalPrice.toFixed(2)}</Typography>
            </Box>
            <Button fullWidth variant="contained" onClick={handleCheckout}>
              המשך לתשלום
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};