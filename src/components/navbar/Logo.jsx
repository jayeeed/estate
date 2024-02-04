import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import assets from "../../assets";

const Logo = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Link to="/">
        <Box
          sx={{
            display: {
              xs: isHomePage ? "none" : "block",
              md: "block",
            },
          }}
        >
          <img
            src={assets.images.logo}
            alt="Logo"
            style={{
              height: "90px",
              cursor: "pointer",
              border: "1px solid #f3f3f3",
              objectFit: "cover",
            }}
          />
        </Box>
      </Link>
    </>
  );
};

export default Logo;
