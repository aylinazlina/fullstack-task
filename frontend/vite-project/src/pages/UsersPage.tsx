import { useEffect, useState } from "react";
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

const UsersPage = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
    } catch (error) {
      console.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

    fetchUsers();
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

    fetchUsers();
  };

  return (
    <Container>
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
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>

              <TableCell>
                <Select
                  value={user.role}
                  onChange={(e) =>
                    updateRole(user._id, e.target.value)
                  }
                >
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="MANAGER">MANAGER</MenuItem>
                  <MenuItem value="STAFF">STAFF</MenuItem>
                </Select>
              </TableCell>

              <TableCell>{user.status}</TableCell>

              <TableCell>
                {user.status === "ACTIVE" ? (
                  <Button
                    color="error"
                    onClick={() =>
                      updateStatus(user._id, "INACTIVE")
                    }
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onClick={() =>
                      updateStatus(user._id, "ACTIVE")
                    }
                  >
                    Activate
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UsersPage;
