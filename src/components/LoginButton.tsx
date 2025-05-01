import { Button } from "@mui/material";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "https://localhost:8080/api/login";
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleLogin}
      sx={{ fontWeight: "bold", fontSize: "1rem" }}
    >
      Login with Spotify
    </Button>
  );
};

export default LoginButton;
