import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";


const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
 
const token = searchParams.get("token");


  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:4000/auth/register-via-invite", {
        token,
        name,
        password,
      });

      alert("Registration successful!");
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  if (!token) {
    return (
      <Container>
        <Typography variant="h5">
          Invalid or missing invite token
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Complete Registration
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        onClick={handleRegister}
      >
        Register
      </Button>
    </Container>
  );
};

export default Register;
