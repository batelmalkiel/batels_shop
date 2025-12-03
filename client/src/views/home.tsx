import { FC } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h2" gutterBottom>
        💎 ברוכים הבאים לחנות התכשיטים 💎
      </Typography>
      
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
        תכשיטים יוקרתיים ומיוחדים
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/products")}
        >
          לצפייה במוצרים
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/cart")}
        >
          עגלת קניות
        </Button>
      </Box>
    </Container>
  );
};