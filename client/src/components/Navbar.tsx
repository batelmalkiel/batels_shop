import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes, Page } from "../router/paths";
import { useAuth } from '../context/AuthContext';


export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: '#1a1a1a',
        boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)'
      }}
    >
      <Toolbar>

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
        >
          Luxury Jewelry!
        </Typography>

          {routes
          .filter((route: Page) => route.isShown)
          .map((route: Page) => (
            <Button 
          color="inherit" 
          onClick={() => navigate(route.path)}
          sx={{ 
            '&:hover': { 
              color: '#FFD700',
              transform: 'scale(1.05)'
            }
          }}
        >
             {route.name}
            </Button>
          ))}


          {isAuthenticated ? 
          <Button 
          color="inherit" 
          onClick={() => logout()}
          sx={{ 
            '&:hover': { 
              color: '#FFD700',
              transform: 'scale(1.05)'
            }
          }}
        >
             {"התנתקות"}
            </Button> :
            <>

            <Button 
          color="inherit" 
          onClick={() => navigate("/login")}
          sx={{ 
            '&:hover': { 
              color: '#FFD700',
              transform: 'scale(1.05)'
            }
          }}
        >
             {"התחברות"}
            </Button>
             <Button 
          color="inherit" 
          onClick={() => navigate("/register")}
          sx={{ 
            '&:hover': { 
              color: '#FFD700',
              transform: 'scale(1.05)'
            }
          }}
        >
             {"הרשמה"}
            </Button>
            </>}
      </Toolbar>
    </AppBar>
  );
};