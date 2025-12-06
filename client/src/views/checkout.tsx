import { FC, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ordersService from "../services/orders.service";
import { useNavigate } from "react-router-dom";

export const Checkout: FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState(user?.address || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!shippingAddress) {
      setError("נא למלא כתובת");
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress,
      };

      const response = await ordersService.create(orderData);
      clearCart();
      navigate(`/orders/${response.order.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "שגיאה ביצירת הזמנה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          השלמת הזמנה
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="כתובת למשלוח"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            multiline
            rows={3}
            required
            sx={{ mb: 2 }}
          />

          <Typography variant="h6" sx={{ mb: 2 }}>
            סה"כ לתשלום: ₪{totalPrice.toFixed(2)}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? "מבצע הזמנה..." : "אשר הזמנה"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};