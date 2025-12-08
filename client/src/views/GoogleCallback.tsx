import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import authService from "../services/auth.service";

export const GoogleCallback: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      // קבלת ה-token מה-URL
      const token = searchParams.get("token");
      
      if (!token) {
        setError("לא נמצא token בהחזרה מ-Google");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        // שמירת ה-token וטעינת פרופיל המשתמש
        const response = await authService.handleGoogleCallback(token);
        setUser(response.user);
        // ניווט לעמוד הבית
        navigate("/");
      } catch (err: any) {
        console.error("Google callback error:", err);
        setError(err.response?.data?.message || "שגיאה בהתחברות עם Google");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        {error ? (
          <>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
            <Typography variant="body2" color="text.secondary">
              מועבר בחזרה לדף ההתחברות...
            </Typography>
          </>
        ) : (
          <>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              מתחבר עם Google...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              אנא המתן
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};