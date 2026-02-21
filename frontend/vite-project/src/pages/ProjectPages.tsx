import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";

interface ProjectsProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const ProjectsPage = ({ toggleTheme, mode }: ProjectsProps) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "http://localhost:4000/projects/get-projects",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Check if the array is nested inside an object
      const data = Array.isArray(res.data) ? res.data : res.data.projects || [];
      setProjects(data);
    } catch (error) {
      console.error("Fetch projects failed", error);
      setProjects([]); // Set to empty array on error to prevent .map crashes
    }
  };

  // ONLY ONE useEffect, and it watches the token
  useEffect(() => {
    fetchProjects();
  }, [token]);

  const createProject = async () => {
    await axios.post(
      "http://localhost:4000/projects/create-project", // Updated
      { name, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setName("");
    setDescription("");
    fetchProjects();
  };

  const updateProject = async (id: string) => {
    const newName = prompt("Enter new project name");
    if (!newName) return;

    await axios.patch(
      `http://localhost:4000/projects/update-project/${id}`, // Updated
      { name: newName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    fetchProjects();
  };

  const deleteProject = async (id: string) => {
    await axios.delete(
      `http://localhost:4000/projects/delete-project/${id}`, // Updated
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    fetchProjects();
  };

  return (
    <Container>
      <Button variant="outlined" onClick={toggleTheme} sx={{ mb: 2, mt: 4 }}>
        Switch to {mode === "light" ? "Dark" : "Light"} Mode
      </Button>
      <Typography variant="h4" gutterBottom>
        Project Management
      </Typography>

      {/* Create Project Form */}
      <TextField
        label="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mr: 2 }}
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mr: 2 }}
      />

      <Button variant="contained" onClick={createProject}>
        Create
      </Button>

      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <TableRow key={project._id || Math.random()}>
                {/* 1. Name */}
                <TableCell>{project.name}</TableCell>

                {/* 2. Description */}
                <TableCell>{project.description}</TableCell>

                {/* 3. Created By - Fixed to use the populated object */}
                <TableCell>{project.createdBy?.name || "Unknown"}</TableCell>

                {/* 4. Actions - Merged Admin and Manager logic into one cell */}
                <TableCell>
                  {/* Both Admin and Manager can Edit */}
                  {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => updateProject(project._id)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                  )}

                  {/* Only Admin can Delete */}
                  {user?.role === "ADMIN" && (
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => deleteProject(project._id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No projects found or loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ProjectsPage;
