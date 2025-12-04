import { FC, useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import productsService from "../services/products.service";
import { useCart } from "../context/CartContext";
import { Product } from "../types/product.types";

export const Home: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      const response = await productsService.getAll({
        search: search || undefined,
        category: category || undefined,
      });
      setProducts(response.products);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const cats = await productsService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <Container sx={{ mt: 4 }}>

      <Typography variant="h2" gutterBottom>
        💎 ברוכים הבאים לחנות התכשיטים 💎
      </Typography>
      
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
        תכשיטים יוקרתיים ומיוחדים
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          label="חיפוש"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>קטגוריה</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="קטגוריה"
          >
            <MenuItem value="">הכל</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description.substring(0, 60)}...
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₪{product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  הוסף לעגלה
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};