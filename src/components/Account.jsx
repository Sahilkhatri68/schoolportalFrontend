import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import axios from "axios";
import { API } from "./API/API";
import Header from "./Header";

function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0); // Optional: hardcoded or fetched

  useEffect(() => {
    // Fetch total students
    axios
      .get(`${API}/getallstudent`)
      .then((res) => setTotalStudents(res.data.length))
      .catch((err) => console.error("Error fetching students:", err));

    // Fetch total classes
    axios
      .get(`${API}/getclass`)
      .then((res) => setTotalClasses(res.data.length))
      .catch((err) => console.error("Error fetching classes:", err));

    // Optional: Fetch total teachers if API available
    axios
      .get(`${API}/getallteachers`)
      .then((res) => setTotalTeachers(res.data.length))
      .catch(() => setTotalTeachers(10)); // fallback if not implemented
  }, []);

  return (
    <Header
      Children={
        <Box
          sx={{
            padding: 4,
            // minHeight: "100vh",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 3, color: "#0F1131" }}
          >
            Welcome, Admin 👋
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#0F1131", color: "white" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Students
                  </Typography>
                  <Typography variant="h4">{totalStudents}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#007BFF", color: "white" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Teachers
                  </Typography>
                  <Typography variant="h4">{totalTeachers}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#28A745", color: "white" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Classes
                  </Typography>
                  <Typography variant="h4">{totalClasses}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box mt={5}>
            <Typography variant="body2" color="black">
              <b>
                This is a demo School Portal dashboard. You can manage teachers,
                students, and class records from the side menu.
              </b>
            </Typography>
          </Box>
        </Box>
      }
    />
  );
}

export default AdminDashboard;
