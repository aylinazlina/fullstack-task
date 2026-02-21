import { useEffect, useState } from "react";
import {Pagination} from "@mui/material";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import {type  RootState } from "../app/store";


interface UsersProps {
  toggleTheme:()=>void;
  mode:"light" | "dark";
}

const UsersPage = ({toggleTheme,mode}:UsersProps) => {
  const { token, user: currentUser } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<any[]>([]);
  const [page,setPage]= useState(1);
  const [totalPages,setTotalPages]= useState(1);

  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:4000/users", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setUsers(res.data.users);
  //   } catch (error) {
  //     console.error("Failed to fetch users");
  //   }
  // };

  const fetchUsers = async (pageNumber = 1) => {
  const res = await axios.get(
    `http://localhost:4000/users?page=${pageNumber}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setUsers(res.data.users);
  setTotalPages(Math.ceil(res.data.total / 5));
};

  // useEffect(() => {
  //   fetchUsers();
  // }, []);


  useEffect(()=>{
    fetchUsers(page);
  },[page]);

  const updateRole = async (id: string, role: string) => {
    await axios.patch(
      `http://localhost:4000/users/${id}/role`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchUsers(page);
  };

  const updateStatus = async (id: string, status: string) => {
    await axios.patch(
      `http://localhost:4000/users/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchUsers(page);
  };

  return (
    <Container>
      <Button variant="outlined" onClick={toggleTheme} sx={{mb:2,mt:4} }>
        Switch to {mode === "light" ? "Dark" : "Light" } Mode
      </Button>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

       <TableBody>
  {users.map((user) => {
    // Check if the user in this row is the logged-in user
    const isSelf = user._id === currentUser?.id || user._id === (currentUser as any)?.id;

    return (
      <TableRow key={user._id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>

        <TableCell>
          <Select
            value={user.role}
            // FIX: Disable role selection for self
            disabled={isSelf}
            onChange={(e) => updateRole(user._id, e.target.value)}
            size="small"
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="MANAGER">MANAGER</MenuItem>
            <MenuItem value="STAFF">STAFF</MenuItem>
          </Select>
          {isSelf && (
            <Typography variant="caption" display="block" color="textSecondary">
              (You)
            </Typography>
          )}
        </TableCell>

        <TableCell>{user.status}</TableCell>

        {/* FIX: Combined the two separate TableCells into one clean Actions cell */}
        <TableCell>
          <Button
            variant="contained"
            size="small"
            color={user.status === "ACTIVE" ? "error" : "success"}
            // Disable status toggle for self
            disabled={isSelf}
            onClick={() =>
              updateStatus(user._id, user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE")
            }
          >
            {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
          </Button>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>
      </Table>

      <Pagination
  count={totalPages}
  page={page}
  onChange={(event, value) => setPage(value)}
  sx={{ mt: 3 }}
/>
    </Container>
  );
};

export default UsersPage;
