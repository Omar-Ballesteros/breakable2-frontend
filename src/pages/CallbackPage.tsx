import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";
import axios from "axios";
import { CircularProgress, Container, Typography } from "@mui/material";

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const calledRef = useRef(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (!code) {
      navigate("/");
      return;
    }

    if (calledRef.current) return;
    calledRef.current = true;

    const authenticate = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/spotify`,
          null,
          {
            params: { code },
          }
        );

        const { userId, accessToken, expiresIn } = response.data;

        if (userId && accessToken && expiresIn) {
          login(userId, accessToken, expiresIn);
          navigate("/dashboard", { replace: true });
        } else {
          console.error("Missing required auth fields");
          navigate("/");
        }
      } catch (error) {
        console.error("Authentication failed", error);
        navigate("/");
      }
    };

    authenticate();
  }, [location, navigate, login]);

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
