import { FC, useState, useEffect } from "react";
import { Container, Typography, Paper, Button, Chip, Box, Menu, MenuItem } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ordersService from "../services/orders.service";
import { Order, OrderStatus } from "../types/order.types";
import { isAdminAtom } from "../atoms/isAdminAtom";
import { useAtomValue } from "jotai";

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

export const OrderDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();
  const isAdmin = useAtomValue(isAdminAtom)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchOrder();
  }, [id]);


  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = async (status: OrderStatus) => {
    await ordersService.updateStatus(Number(id), status);
    fetchOrder();
    handleClose();
  };

  const fetchOrder = async () => {
    try {
      const data = await ordersService.getOne(Number(id));
      setOrder(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = async () => {
    try {
      await ordersService.cancel(Number(id));
      fetchOrder();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!order) {
    return <Typography>טוען...</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">הזמנה #{order.id}</Typography>
          {isAdmin ?
          <>
          <Chip
            label={statusLabels[order.status]}
            color={statusColors[order.status]}
            size="medium"
            onClick={handleOpen}
            sx={{ cursor: "pointer" }}
          />

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {Object.keys(statusLabels).map((key) => {
              const statusKey = key as keyof typeof statusLabels; // Type-safe key
              const orderStatus = statusKey as OrderStatus; // TypeScript cast

              return (
                <MenuItem
                  key={statusKey.toString()}
                  onClick={() => handleSelect(orderStatus)}
                >
                  {statusLabels[statusKey]}
                </MenuItem>
              );
            })}
          </Menu>

        </> :
            <Chip
              label={statusLabels[order.status]}
              color={statusColors[order.status]}
              size="medium"
            />
        }
          
        </Box>

        <Typography variant="h6" gutterBottom>
          פריטים:
        </Typography>
        {order.items.map((item) => (
          <Paper key={item.id} sx={{ p: 2, mb: 2, bgcolor: "grey.100" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="subtitle1">{item.product.name}</Typography>
                <Typography variant="body2">כמות: {item.quantity}</Typography>
              </Box>
              <Typography variant="h6">
                ₪{(Number(item.priceAtPurchase) * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        ))}

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>כתובת משלוח:</strong> {order.shippingAddress}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
            סה"כ: ₪{Number(order.totalAmount).toFixed(2)}
          </Typography>
        </Box>

        {order.status === "pending" && (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleCancel}
            sx={{ mt: 2 }}
          >
            בטל הזמנה
          </Button>
        )}
      </Paper>
    </Container>
  );
};