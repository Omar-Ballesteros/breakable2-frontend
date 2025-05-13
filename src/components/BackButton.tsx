import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      aria-label="back"
      onClick={() => navigate(-1)}
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bgcolor: "grey.200",
        "&:hover": {
          bgcolor: "grey.300",
        },
        width: 48,
        height: 48,
      }}
    >
      <ArrowBack />
    </IconButton>
  );
};

export default BackButton;
