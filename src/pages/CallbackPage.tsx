import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { CircularProgress, Container, Typography } from "@mui/material";

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (!code) {
      navigate("/login");
      return;
    }

    const authenticate = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/spotify",
          null,
          {
            params: { code },
          }
        );

        const { userId } = response.data;

        setUser({ id: userId });
        setIsAuthenticated(true);
        navigate("/dashboard");
      } catch (error) {
        console.error("Authentication failed", error);
        navigate("/login");
      }
    };

    authenticate();
  }, [location, navigate, setUser, setIsAuthenticated]);

  return (
    <Container sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Logging in with Spotify...
      </Typography>
      <CircularProgress />
    </Container>
  );
};

export default CallbackPage;
