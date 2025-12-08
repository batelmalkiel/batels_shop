import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes, Page } from "../router/paths";
import { useAuth } from '../context/AuthContext';
import { useAtomValue } from "jotai";
import { isAdminAtom } from '../atoms/isAdminAtom';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import DiamondIcon from '@mui/icons-material/Diamond';



export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const isAdmin = useAtomValue(isAdminAtom)
  
 

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
          onClick={() => navigate("/")}
          sx={{ 
            color: '#FFD700',
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FFD700, #FFF)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Luxury Jewelry
          <DiamondIcon sx={{color: '#FFD700'}} />
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

          {isAdmin==true &&
          <Button 
          color="inherit" 
          onClick={() => navigate("/orders/admin")}
          sx={{ 
            '&:hover': { 
              color: '#FFD700',
              transform: 'scale(1.05)'
            }
          }}
        >
             {"כלל ההזמנות במערכת"}
            </Button>
        }


          {isAuthenticated ? 
          <>
          <Button 
          color="inherit" 
          onClick={() =>{ logout(); navigate("/");}}
          sx={{ 
            '&:hover': { 
              color: '#FFD700',
              transform: 'scale(1.05)'
            }
          }}
        >
             {"התנתקות"}
             <LogoutIcon/>
            </Button>
            </>
             :
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
             <LoginIcon/>
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
             <AddToQueueIcon/>
            </Button>
            </>}

        
      </Toolbar>
    </AppBar>
  );
};