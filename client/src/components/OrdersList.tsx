import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Box,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes, Page } from "../router/paths";
import { useAuth } from '../context/AuthContext';
import { Order } from 'src/types/order.types';

interface OrdersListProps {
    title: string;
    orders: Order[]
}

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

export const OrdersList: React.FC<OrdersListProps> = ({
    title,
    orders
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {title}
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