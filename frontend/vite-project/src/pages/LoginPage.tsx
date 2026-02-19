import {useState} from "react";
import {TextField ,Button,Container,Typography} from "@mui/material";
import axios from "axios";
import {useDispatch } from "react-redux";
import {loginSuccess} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";




const LoginPage= ()=>{
   const [email,setEmail]= useState("");
   const [password,setPassword] = useState("");
   const dispatch = useDispatch();

const navigate =useNavigate() ;



  const handleLogin=async()=>{
    try{
       const response = await axios.post(

        "http://localhost:4000/auth/login",{
            email,password,

        }
       );
       console.log("RESPONSE DATA:", response.data);

      dispatch(loginSuccess(response.data));

    alert("Login successful");

    navigate("/dashboard");

    }catch (error: any) {
  console.log(error.response);
  alert(error.response?.data?.message || "Login failed");
}

   }
    return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

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

      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}

export default LoginPage;