import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import BedIcon from "@mui/icons-material/Bed";
import { Link } from "react-router-dom";

export const SideNavbar = () => {
  return (
    <Paper
      sx={{
        width: "15%",
        backgroundColor: "#61AFF7",
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List>
        <Button
          component={Link}
          to="/Dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Dashboard
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/Bed"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Bed Availability
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/AdmitPatient"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Admit Patient
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/TransferPatient"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Transfer Patient
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>

        <Button
          component={Link}
          to="/DischargePatient"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Discharge Patient
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>

        <Button
          component={Link}
          to="/PatientTable"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Edit Patient
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/EditTransfer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Edit Transfer
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>

        <Button
          component={Link}
          to="/EditDischarge"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Edit Discharge
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
      </List>
    </Paper>
  );
};

export default SideNavbar;
