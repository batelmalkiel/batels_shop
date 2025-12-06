import { FC, useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "שגיאה בהתחברות");
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          התחברות
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Google Login Button */}
        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{
            mb: 2,
            borderColor: "#4285f4",
            color: "#4285f4",
            "&:hover": {
              borderColor: "#357ae8",
              backgroundColor: "rgba(66, 133, 244, 0.04)",
            },
          }}
        >
          התחבר עם Google
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            או
          </Typography>
        </Divider>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="אימייל"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="סיסמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            התחבר
          </Button>
        </form>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            אין לך חשבון? <Link to="/register">הירשם כאן</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};