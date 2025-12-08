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
import { OrdersList } from "../components/OrdersList";

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

export const AdminAllOrders: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await ordersService.getAllAdmin();
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
            חזור לדף הבית
        </Button>
      </Container>
    );
  }

  return (
    <OrdersList
      title="כלל ההזמנות באתר"
      orders={orders}
    />
  );
};