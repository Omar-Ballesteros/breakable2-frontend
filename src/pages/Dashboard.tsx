import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const { login, logout, userId: storedUserId } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      login(userId);
    }
    setLoading(false);
  }, [userId, login, storedUserId]);

  if (loading) {
    return (
      <Container
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading your Dashboard...
        </Typography>
      </Container>
    );
  }

  if (!storedUserId) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          No se encontró un ID de usuario en la URL.
        </Typography>
      </Container>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h3" gutterBottom>
        Welcome to your Main Dashboard
      </Typography>
      <Typography>Your user Id: {storedUserId}</Typography>
      <Button
        onClick={logout}
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
