import { Box, Container, Typography } from "@mui/material";
import LoginButton from "../components/LoginButton";

const LoginPage = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      textAlign="center"
      paddingTop={4}
      overflow="hidden"
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 8,
        }}
      >
        <Typography variant="h1" gutterBottom sx={{ whiteSpace: "nowrap" }}>
          MY MUSIC APP
        </Typography>
        <LoginButton></LoginButton>
      </Container>

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          height: "1024px",
          m: 0,
        }}
      >
        <Box
          component="img"
          src="/Disco.png"
          alt="Disco de vinilo"
          sx={{
            width: "1012px",
            objectFit: "cover",
            transform: "translateY(50%)",
            marginBottom: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
