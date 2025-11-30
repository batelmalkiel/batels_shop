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

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

        {(
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


        {(
            //Add later logout, account options...
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
          </Box>
        ) }
      </Toolbar>
    </AppBar>
  );
};