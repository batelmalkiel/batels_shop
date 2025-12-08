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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import productsService from "../services/products.service";
import { useCart } from "../context/CartContext";
import { Product } from "../types/product.types";

const emptyProduct: Partial<Product> = {
  name: "",
  description: "",
  price: 0,
  category: "",
  metalType: undefined,
  metalWeight: 0,
  stoneType: undefined,
  stoneCarat: 0,
  stoneColor: "",
  stoneClarity: "",
  stock: 0,
  isActive: true, 
  isCustomMade: false,
  collection: "",
  tags: [],
  imageUrl: "",
};

export const Home: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { addItem } = useCart();

  const [isAdmin, setIsAdmin] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    checkAdmin();
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

  const checkAdmin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "admin") setIsAdmin(true);
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

  //Admin Handlers
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({...emptyProduct});
    setOpenDialog(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await productsService.delete(id);
      fetchProducts();
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

 const handleSubmit = async () => {
  console.log('🚀 Starting submit with formData:', formData);
  
  const dataToSend: any = {};

  Object.entries(formData).forEach(([key, value]) => {
    console.log(`Processing field ${key}:`, value, typeof value);
    
    // Skip imageUrl field - server will set it from uploaded file
    if (key === 'imageUrl') {
      console.log('⏭️ Skipping imageUrl field');
      return;
    }
    
    if (value !== undefined && value !== null) {
      // Convert number fields from string to number if needed
      if (['price', 'metalWeight', 'stoneCarat', 'stock'].includes(key)) {
        dataToSend[key] = Number(value);
        console.log(`✅ Added number field ${key}:`, dataToSend[key]);
      } else if (key === 'tags') {
        // Special handling for tags - ensure it's always an array
        if (Array.isArray(value)) {
          dataToSend[key] = value;
        } else if (typeof value === 'string' && value.trim() !== '') {
          // Convert single string to array
          dataToSend[key] = [value];
        } else {
          // Empty or invalid - send empty array
          dataToSend[key] = [];
        }
        console.log(`✅ Added tags as array:`, dataToSend[key]);
      } else if (key === 'image') {
        // Only include image if it's a File
        if (value instanceof File) {
          dataToSend[key] = value;
          console.log(`✅ Added image file:`, value.name, value.size, value.type);
        } else {
          console.log(`⚠️ Image is not a File:`, typeof value, value);
        }
      } else {
        dataToSend[key] = value;
        console.log(`✅ Added field ${key}:`, value);
      }
    } else {
      console.log(`⏭️ Skipping ${key} (undefined or null)`);
    }
  });

  console.log('📤 Final dataToSend object:', dataToSend);
  console.log('📤 Keys in dataToSend:', Object.keys(dataToSend));
  console.log('📤 Tags in dataToSend:', dataToSend.tags, 'isArray:', Array.isArray(dataToSend.tags));
  
  // Check if image exists
  if (dataToSend.image) {
    console.log('🖼️ Image details:', {
      name: dataToSend.image.name,
      size: dataToSend.image.size,
      type: dataToSend.image.type,
      lastModified: dataToSend.image.lastModified
    });
  } else {
    console.log('⚠️ No image in dataToSend');
  }

  try {
    if (editingProduct) {
      console.log('🔄 Updating product ID:', editingProduct.id);
      await productsService.update(editingProduct.id, dataToSend);
    } else {
      console.log('➕ Creating new product');
      await productsService.create(dataToSend);
    }
    console.log('✅ Success!');
    setOpenDialog(false);
    fetchProducts();
  } catch (err: any) {
    console.error('❌ Error details:', err);
    if (err.response) {
      console.error('Response data:', err.response.data);
      console.error('Response status:', err.response.status);
    }
    alert('שגיאה בשמירת המוצר');
  }
};

  useEffect(() => {
  if (editingProduct) {
    setFormData({ ...editingProduct });
  } else {
    setFormData({});
  }
}, [editingProduct]);

  //Field labels for nicer display
  const productFieldLabels: Record<keyof Product, string> = {
    id: "ID",
    name: "שם המוצר",
    description: "תיאור",
    price: "מחיר",
    category: "קטגוריה",
    metalType: "סוג מתכת",
    metalWeight: "משקל מתכת",
    stoneType: "סוג אבן",
    stoneCarat: "קראט אבן",
    stoneColor: "צבע אבן",
    stoneClarity: "בהירות אבן",
    imageUrl: "תמונה",
    stock: "מלאי",
    isActive: "פעיל",
    isCustomMade: "הזמנה אישית",
    collection: "קולקציה",
    tags: "תגים",
    createdAt: "נוצר ב",
    updatedAt: "עודכן ב",
  };

  const systemFields = ["id", "createdAt", "updatedAt"];

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
        {isAdmin && (
          <Button variant="contained" color="secondary" onClick={handleOpenCreate}>
            + מוצר חדש
          </Button>
        )}
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
              <CardActions sx={{ flexDirection: "column", gap: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  הוסף לעגלה
                </Button>
                {isAdmin && (
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => handleOpenEdit(product)}
                    >
                      ערוך
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      מחק
                    </Button>
                  </Box>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- Admin Dialog --- */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingProduct ? "ערוך מוצר" : "צור מוצר חדש"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

          {Object.keys(formData).map((field) => {
            if (systemFields.includes(field)) return null;

            // boolean field
            if (typeof formData[field] === "boolean") {
              return (
                <FormControl key={field}>
                  <InputLabel>{productFieldLabels[field as keyof Product]}</InputLabel>
                  <Select
                    value={formData[field] ? "true" : "false"}
                    onChange={(e) => handleFormChange(field, e.target.value === "true")}
                  >
                    <MenuItem value="true">כן</MenuItem>
                    <MenuItem value="false">לא</MenuItem>

                  </Select>
                </FormControl>
              );
            }

            // image upload
            if (field === "imageUrl") {
              return (
                <TextField
                  key={field}
                  type="file"
                  onChange={(e: any) => handleFormChange("image", e.target.files[0])}
                  label="תמונה"
                />
              );
            }

            // number or text
            return (
              <TextField
                key={field}
                label={productFieldLabels[field as keyof Product]}
                value={formData[field] || ""}
                type={typeof formData[field] === "number" ? "number" : "text"}
                onChange={(e) => handleFormChange(field, e.target.value)}
                multiline={field === "description"}
                rows={field === "description" ? 3 : undefined}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingProduct ? "שמירה" : "צור"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
