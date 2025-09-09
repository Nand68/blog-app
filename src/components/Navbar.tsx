import React from "react";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../index.css";
import { useNavigate } from "react-router-dom";


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#121212",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.7)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
          py: 1, 
          minHeight: 56, 
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 35 }}>
          <div className="nine cursor-pointer">
            <h1>
              Blogs
            </h1>
          </div>

          <button className="nav-button" role="button" onClick={() => { navigate('/')}}>
            Home
          </button>

          <button className="nav-button" role="button" onClick={() => { navigate('add-blog')}}>
            Add Blogs
          </button>
        </div>

        <div>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{
              color: "#E0E0E0",
              "&:hover": { backgroundColor: "rgba(187, 134, 252, 0.15)" },
              transition: "background-color 0.3s ease",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 160,
                boxShadow: "0 8px 24px rgba(0,0,0,0.9)",
                borderRadius: 2,
                bgcolor: "#1E1E1E",
                color: "#E0E0E0",
              },
            }}
          >
            {["My Blog", "Logout"].map((item) => (
              <MenuItem
                key={item}
                onClick={handleMenuClose}
                sx={{
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#BB86FC", color: "#121212" },
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
