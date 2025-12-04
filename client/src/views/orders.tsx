import { FC, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ordersService from "../services/orders.service";
import { Order } from "../types/order.types";

const statusLabels: any = {
  pending: "ממתין",
  processing: "בטיפול",
  shipped: "נשלח",
  delivered: "נמסר",
  cancelled: "בוטל",
};

const statusColors: any = {
  pending: "warning",
  processing: "info",
  shipped: "primary",
  delivered: "success",
  cancelled: "error",
};

export const Orders: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await ordersService.getAll();
      setOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (orders.length === 0) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          אין הזמנות
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          התחל לקנות
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ההזמנות שלי
      </Typography>

      {orders.map((order) => (
        <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h6">הזמנה #{order.id}</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(order.createdAt).toLocaleDateString("he-IL")}
              </Typography>
              <Typography variant="h6" color="primary">
                ₪{Number(order.totalAmount).toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Chip
                label={statusLabels[order.status]}
                color={statusColors[order.status]}
              />
              <Button
                variant="outlined"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                צפה בפרטים
              </Button>
            </Box>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};