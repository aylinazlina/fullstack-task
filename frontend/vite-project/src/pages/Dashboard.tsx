import { Typography, Button, Container, Box } from "@mui/material"; // Added Box here
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

interface DashboardProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const Dashboard = ({ toggleTheme, mode }: DashboardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out successfully");
    navigate("/");
  };

  // Loading state
  if (!user) {
    return (
      <Container>
        <Typography sx={{ mt: 4 }}>
          User session not found. Please log in again.
        </Typography>
        <Button onClick={() => navigate("/")}>Go to Login</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={toggleTheme} sx={{ mb: 2 }}>
        Switch to {mode === "light" ? "Dark" : "Light"} Mode
      </Button>
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

        {user?.role === "ADMIN" && (
  <Button
    component={Link}
    to="/invite"
    variant="contained"
    color="secondary"
    sx={{ mt: 2, mr: 2 }}
  >
    Send Invite
  </Button>
)}

        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
