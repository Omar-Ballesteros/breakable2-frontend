import { Box, CircularProgress } from "@mui/material";

const Loading = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight={200}
  >
    <CircularProgress />
  </Box>
);

export default Loading;
