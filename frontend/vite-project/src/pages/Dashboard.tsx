import { Typography, Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user , token } = useSelector((state: RootState) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  // If there is a token but no user yet, show a loading state
  if (token && !user) {
    return <Typography>Loading user profile...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="h4">Dashboard</Typography>
      <Typography>Welcome {user?.name} ({user?.role})</Typography>

      <Typography>
        {user?.role === "ADMIN" && (
          <Button
            component={Link}
            to="/users"
            variant="contained"
            sx={{ mt: 2, mr: 2 }}
          >
            Manage Users
          </Button>
        )}
      </Typography>

      <Button
        component={Link}
        to="/projects"
        variant="contained"
        sx={{ mt: 2, mr: 2 }}
      >
        Manage Projects
      </Button>

      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
