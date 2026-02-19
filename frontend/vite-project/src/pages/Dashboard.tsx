import { Typography, Button, Container, Box } from "@mui/material"; // Added Box here
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out successfully");
    navigate("/");
  };

  // Loading state
  if (token && !user) {
    return (
      <Container>
        <Typography sx={{ mt: 4 }}>Loading user profile...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Welcome {user?.name} ({user?.role})
      </Typography>

      {/* Box provides a wrapper for spacing and layout */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {user?.role === "ADMIN" && (
          <Button
            component={Link}
            to="/users"
            variant="contained"
            color="primary"
          >
            Manage Users
          </Button>
        )}

        <Button
          component={Link}
          to="/projects"
          variant="contained"
          color="primary"
        >
          Manage Projects
        </Button>

        <Button 
          variant="contained" 
          color="error" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;