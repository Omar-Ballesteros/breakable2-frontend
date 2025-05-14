import { Box, Button, Typography } from "@mui/material";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:9090/api/login";
  };

  return (
    <Button
      variant="contained"
      onClick={handleLogin}
      sx={{
        m: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "1rem",
        backgroundColor: "grey.800",
        borderRadius: "32px",
        padding: "16px 24px",
        width: "100%",
        maxWidth: "600px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        "&:hover": {
          backgroundColor: "#444",
        },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", letterSpacing: "1px", padding: "0px 12px" }}
      >
        Login with Spotify
      </Typography>
      <Box
        component="img"
        src="/Spotify_Primary_Logo_RGB_Green.png"
        alt="Spotify"
        sx={{ minWidth: 32, height: 32, padding: "0px 12px" }}
      />
    </Button>
  );
};

export default LoginButton;
