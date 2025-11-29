import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Diamond,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: '#1a1a1a',
        boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)'
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ 
            mr: 2,
            '&:hover': {
              transform: 'rotate(20deg)',
              transition: 'transform 0.3s'
            }
          }}
        >
          <Diamond sx={{ color: '#FFD700', fontSize: 35 }} />
        </IconButton>

        <Typography
          variant="h5"
          component="div"
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FFD700, #FFF)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          onClick={() => navigate('/')}
        >
          ✨ Luxury Jewelry ✨
        </Typography>

        <Button 
          color="inherit" 
          onClick={() => navigate('/')}
          sx={{ 
            '&:hover': { 
              color: '#FFD700',
              transform: 'scale(1.05)'
            }
          }}
        >
          תכשיטים
        </Button>

        {isAuthenticated && (
          <Button 
            color="inherit" 
            onClick={() => navigate('/orders')}
            sx={{ 
              '&:hover': { 
                color: '#FFD700',
                transform: 'scale(1.05)'
              }
            }}
          >
            ההזמנות שלי
          </Button>
        )}

        <IconButton 
          color="inherit" 
          onClick={() => navigate('/cart')}
          sx={{ 
            '&:hover': { 
              color: '#FFD700',
              transform: 'scale(1.1)'
            }
          }}
        >
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>

        {isAuthenticated ? (
          <Box>
            <IconButton 
              color="inherit" 
              onClick={handleMenu}
              sx={{ 
                '&:hover': { 
                  color: '#FFD700'
                }
              }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                {user?.firstName} {user?.lastName}
              </MenuItem>
              <MenuItem onClick={() => { navigate('/orders'); handleClose(); }}>
                ההזמנות שלי
              </MenuItem>
              <MenuItem onClick={handleLogout}>התנתק</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')}
              sx={{ 
                '&:hover': { 
                  color: '#FFD700'
                }
              }}
            >
              התחבר
            </Button>
            <Button 
              variant="outlined"
              onClick={() => navigate('/register')}
              sx={{ 
                ml: 1,
                borderColor: '#FFD700',
                color: '#FFD700',
                '&:hover': { 
                  borderColor: '#FFF',
                  bgcolor: '#FFD700',
                  color: '#000'
                }
              }}
            >
              הירשם
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};