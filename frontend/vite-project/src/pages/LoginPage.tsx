import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      return toast.warn("Please enter both email and password");
    }

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      console.log("RESPONSE DATA:", response.data);

      dispatch(loginSuccess(response.data));

      // SUCCESS TOAST
      toast.success(`Welcome back, ${response.data.user.name}!`);

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error.response);
      
      // ERROR TOAST
      const message = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          variant="contained" 
          fullWidth 
          size="large" 
          sx={{ mt: 3 }} 
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;