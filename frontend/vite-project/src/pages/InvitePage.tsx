import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import {type RootState } from "../app/store";

const InvitePage = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STAFF");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

 const handleInvite = async () => {
  try {
    const res = await axios.post(
      // Added /auth to match your backend route
      "http://localhost:4000/auth/invite/invite-create", 
      { email, role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSuccess(res.data.message || "Invite sent successfully!");
    setError("");
    setEmail("");
  } catch (err: any) {
    // Better error logging to see what's happening
    console.error(err);
    setError(err.response?.data?.message || "Failed to send invite");
    setSuccess("");
  }
};

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Send Invite
      </Typography>

      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email"
        fullWidth
        sx={{ mt: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        select
        label="Role"
        fullWidth
        sx={{ mt: 2 }}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <MenuItem value="ADMIN">ADMIN</MenuItem>
        <MenuItem value="MANAGER">MANAGER</MenuItem>
        <MenuItem value="STAFF">STAFF</MenuItem>
      </TextField>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleInvite}
      >
        Send Invite
      </Button>
    </Container>
  );
};

export default InvitePage;