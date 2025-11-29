import React, { useState, useEffect } from 'react';
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
  Chip,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { Diamond, ShoppingCart } from '@mui/icons-material';
import { Product, MetalType } from '../types/product.types';

const metalLabels: Record<MetalType, string> = {
  [MetalType.GOLD]: 'זהב צהוב',
  [MetalType.WHITE_GOLD]: 'זהב לבן',
  [MetalType.ROSE_GOLD]: 'זהב ורוד',
  [MetalType.SILVER]: 'כסף',
  [MetalType.PLATINUM]: 'פלטינה',
  [MetalType.TITANIUM]: 'טיטניום'
};

const stoneLabels: any = {
  diamond: '💎 יהלום',
  ruby: '❤️ רובי',
  sapphire: '💙 ספיר',
  emerald: '💚 אמרלד',
  pearl: '🤍 פנינה',
  topaz: '🟡 טופז',
  amethyst: '💜 אמטיסט',
  aquamarine: '🩵 אקוומרין',
  none: 'ללא'
};

export const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [metalType, setMetalType] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'createdAt'>('createdAt');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Diamond sx={{ fontSize: 60, color: '#FFD700', mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          💎 תכשיטים יוקרתיים 💎
        </Typography>
        <Typography variant="h6" color="text.secondary">
          קולקציית תכשיטים מעוצבים במיוחד עבורך
        </Typography>
      </Box>

      {/* פילטרים */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="חיפוש תכשיט"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>קטגוריה</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="קטגוריה"
          >
            <MenuItem value="">הכל</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>סוג מתכת</InputLabel>
          <Select
            value={metalType}
            onChange={(e) => setMetalType(e.target.value)}
            label="סוג מתכת"
          >
            <MenuItem value="">הכל</MenuItem>
            {Object.entries(metalLabels).map(([key, label]) => (
              <MenuItem key={key} value={key}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>מיון</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            label="מיון"
          >
            <MenuItem value="createdAt">חדשים ביותר</MenuItem>
            <MenuItem value="price">מחיר</MenuItem>
            <MenuItem value="name">שם</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* רשימת תכשיטים */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    
                    <Box sx={{ mb: 1 }}>
                      <Chip 
                        label={metalLabels[product.metalType]} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                      {product.stoneType !== 'none' && (
                        <Chip 
                          label={stoneLabels[product.stoneType]} 
                          size="small"
                          color="primary"
                          sx={{ mb: 0.5 }}
                        />
                      )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {product.description.substring(0, 80)}...
                    </Typography>

                    <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                      ₪{product.price.toLocaleString()}
                    </Typography>
                    
                    <Typography variant="caption" color="text.secondary">
                      {product.stock > 0 ? `במלאי: ${product.stock}` : 'אזל מהמלאי'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      //onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      sx={{
                        bgcolor: '#FFD700',
                        color: '#000',
                        '&:hover': {
                          bgcolor: '#FFC700'
                        }
                      }}
                    >
                      הוסף לעגלה
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};