import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
// import SideNavbar from "../Navbar/SideNavbar";
import BedIcon from "@mui/icons-material/Bed";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import axios from "axios";
import TransferPatient from "../Transfer/TransferPatient";
import { useNavigate } from "react-router-dom";
import DischargePatient from "../Discharge/DischargePatient";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SketchPicker } from "react-color";

const Bed = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedWard, setSelectedWard] = useState("Ward A");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [openTransferForm, setOpenTransferForm] = useState(false);
  const [openDischargeForm, setOpenDischargeForm] = useState(false);

  const [openColorPickerDialog, setOpenColorPickerDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9000/bee")
      .then((response) => {
        setHospitals(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleWardChange = (ward) => {
    setSelectedWard(ward);
  };

  const handleOpenDialog = (bed) => {
    if (bed.status === "occupied") {
      setOpenDialog(true);
      setSelectedBed(bed);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBed(null);
  };

  const handleOpenColorPickerDialog = () => {
    console.log("Open color picker dialog");
    setOpenColorPickerDialog(true);
  };

  const handleCloseColorPickerDialog = () => {
    setOpenColorPickerDialog(false);
  };

  const handleTransferClick = () => {
    // Check if a bed is selected
    if (selectedBed) {
      // Construct the URL with selectedBed data as query parameters
      const url = `/TransferPatient?bedNumber=${selectedBed.number}&patientId=${selectedBed.patientId}&patientName=${selectedBed.patientName}&age=${selectedBed.age}&gender=${selectedBed.gender}&medicalAcuity=${selectedBed.medicalAcuity}&contactno=${selectedBed.contactno}&currentWard=${selectedWard}&admissionDate=${selectedBed.admissionDate}`;

      // Navigate to the TransferPatient route with auto-fill data
      navigate(url); // Use navigate for navigation
    }
  };
  const handleDischargeClick = () => {
    // Check if a bed is selected
    if (selectedBed) {
      // Construct the URL with selectedBed data as query parameters
      const url = `/DischargePatient?bedNumber=${selectedBed.number}&patientId=${selectedBed.patientId}&patientName=${selectedBed.patientName}&age=${selectedBed.age}&gender=${selectedBed.gender}&medicalAcuity=${selectedBed.medicalAcuity}&currentWard=${selectedWard}&admissionDate=${selectedBed.admissionDate}`;

      // Navigate to the TransferPatient route with auto-fill data
      navigate(url); // Use navigate for navigation
    }
  };
  const handleAdmitClick = (bed) => {
    // Check if a bed is available
    if (bed.status === "available") {
      // Construct the URL with the selectedBed data as query parameters
      const url = `/AdmitPatient?bedNumber=${bed.number}&ward=${selectedWard}`;

      // Navigate to the AdmitForm route with auto-fill data
      navigate(url);
    }
  };

  const classes = {
    centeredGrid: {
      padding: "10px",
      position: "absolute",
      left: "20%",
    },
    gridItem: {
      padding: "40px",
      borderRadius: "30px",
      height: "300px",
      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
    },
    available: {
      width: "70px",
      height: "70px",
      margin: "10px",
      boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.1)",
    },
    // occupied: {

    //   width: "10px",
    //   height: "10px",
    //   margin: "10px",
    //   boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.1)",
    // },
  };

  const [availableBedColor, setAvailableBedColor] = useState(
    localStorage.getItem("availableBedColor") || "#04f489"
  );
  const [occupiedBedColor, setOccupiedBedColor] = useState(
    localStorage.getItem("occupiedBedColor") || "#b4cecf"
  );
  const [criticalBedColor, setCriticalBedColor] = useState(
    localStorage.getItem("criticalBedColor") || "#ff6689"
  );

  // ... (other code)

  // Function to handle color changes for available, occupied, and critical beds
  const handleColorChange = (color, bedType) => {
    console.log("Color changed:", color);
    switch (bedType) {
      case "available":
        setAvailableBedColor(color.hex);
        localStorage.setItem("availableBedColor", color.hex);
        console.log("Saved availableBedColor to local storage:", color.hex);
        break;
      case "occupied":
        setOccupiedBedColor(color.hex);
        localStorage.setItem("occupiedBedColor", color.hex);
        console.log("Saved occupiedBedColor to local storage:", color.hex);
        break;
      case "critical":
        setCriticalBedColor(color.hex);
        localStorage.setItem("criticalBedColor", color.hex);
        console.log("Saved criticalBedColor to local storage:", color.hex);
        break;
      default:
        break;
    }
  };

  const handleSaveColorChanges = () => {
    // Read color values from state
    const availableColor = availableBedColor;
    const occupiedColor = occupiedBedColor;
    const criticalColor = criticalBedColor;

    console.log("Saving colors to local storage:");
    console.log("Available Bed Color:", availableColor);
    console.log("Occupied Bed Color:", occupiedColor);
    console.log("Critical Bed Color:", criticalColor);

    // Save color values to local storage
    localStorage.setItem("availableBedColor", availableColor);
    localStorage.setItem("occupiedBedColor", occupiedColor);
    localStorage.setItem("criticalBedColor", criticalColor);

    // Close the color picker dialog
    handleCloseColorPickerDialog();
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}>
        <div
          style={{
            background: "#ffff",
            padding: "10px",
            height: "50px",
            marginBottom: "10px",
            width: "105%", // Make it 100% width to fill the container
            display: "flex", // Use flexbox
            alignItems: "center", // Center vertically
            justifyContent: "space-between",
            marginLeft: "-5%", // Space between items, aligning the icon to the right
          }}
        >
          <h2 style={{ marginLeft: "50px" }}>Bed Availability</h2>
          <PersonIcon style={{ fontSize: 50, marginRight: "10px" }} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            style={{ color: "#61AFF7", fontWeight: "bold" }}
          >
            Good Care Hospital
          </Typography>
        </div>
        <Container
          container
          spacing={2}
          style={{ marginLeft: "-50px", width: "105%" }}
        >
          <Grid>
            {hospitals.map((hospital) => (
              <Grid item xs={12} key={hospital.id}>
                {hospital.wards
                  .filter((ward) => ward.name === selectedWard)
                  .map((ward) => (
                    <div key={ward.id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Typography
                            gutterBottom
                            variant="h5"
                            style={{
                              fontWeight: "bold",
                              marginTop: "10px",
                              marginLeft: "35px",
                            }}
                          >
                            {ward.name}
                          </Typography>
                        </div>
                        <Button
                          style={{
                            textTransform: "none",
                            borderRadius: "30px",
                            background: "#61AFF7",
                            color: "white",
                            marginRight: "-100px",
                          }}
                          onClick={handleOpenColorPickerDialog}
                        >
                          Customize Bed Colors
                        </Button>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FormControl
                            size="small"
                            variant="outlined"
                            style={{
                              marginTop: "-10px",
                              background: "white",
                              left: "-450px",
                            }}
                          >
                            <InputLabel>Ward</InputLabel>
                            <Select
                              value={selectedWard}
                              onChange={(e) => handleWardChange(e.target.value)}
                              label="Ward"
                            >
                              <MenuItem value="Ward A">Ward A</MenuItem>
                              <MenuItem value="Ward B">Ward B</MenuItem>
                            </Select>
                          </FormControl>

                          <div
                            style={{ marginLeft: "10px", marginTop: "-10px" }}
                          >
                            <Button
                              style={{
                                borderRadius: "30px",
                                background: availableBedColor,
                                color: "black",
                                padding: "4px 10px",
                                width: "100px", // Set the width to 50px for all buttons
                                textTransform: "none",
                              }}
                            >
                              Available
                            </Button>

                            <Button
                              style={{
                                borderRadius: "30px",
                                marginLeft: "10px",
                                background: occupiedBedColor,
                                color: "black",
                                padding: "4px 10px",
                                width: "100px", // Set the width to 50px for all buttons
                                textTransform: "none",
                              }}
                            >
                              Occupied
                            </Button>

                            <Button
                              style={{
                                borderRadius: "30px",
                                background: criticalBedColor,
                                color: "black",
                                padding: "4px 10px",
                                width: "100px", // Set the width to 50px for all buttons
                                textTransform: "none",
                                marginLeft: "10px",
                              }}
                            >
                              Critical
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Paper elevation={3} sx={classes.gridItem}>
                        {/* Rest of your Paper content */}
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {ward.beds.map((bed) => (
                            <div
                              key={bed.number}
                              style={{
                                position: "relative",
                                marginRight: "5px",
                                marginTop: "10px",
                              }}
                            >
                              <Typography
                                variant="h1"
                                style={{
                                  position: "absolute",
                                  top: "-10px",
                                  left: "10px",
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                  zIndex: 1,
                                }}
                              >
                                {bed.number}
                              </Typography>
                              <Paper
                                key={bed.number}
                                className={`bes ${
                                  bed.status === "available"
                                    ? "available"
                                    : bed.medicalAcuity === "Critical"
                                    ? "critical"
                                    : "occupied"
                                }`}
                                sx={{
                                  ...classes.available,
                                  border: "none",
                                  borderRadius: "10px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  transition: "transform 0.2s ease",
                                  backgroundColor:
                                    bed.status === "available"
                                      ? availableBedColor
                                      : bed.medicalAcuity === "Critical"
                                      ? criticalBedColor
                                      : occupiedBedColor,
                                }}
                                onClick={() => handleOpenDialog(bed)}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform =
                                    "scale(1.1)";
                                  e.currentTarget.style.zIndex = "2";
                                  e.currentTarget.style.cursor = "pointer";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                  e.currentTarget.style.zIndex = "1";
                                  e.currentTarget.style.cursor = "default";
                                }}
                              >
                                {bed.status === "available" ? (
                                  <BedIcon
                                    style={{ fontSize: 50, opacity: 0.5 }}
                                    onClick={() => handleAdmitClick(bed)}
                                  />
                                ) : (
                                  <LocalHotelIcon
                                    style={{ fontSize: 50, opacity: 0.5 }}
                                  />
                                )}
                              </Paper>
                            </div>
                          ))}
                        </div>
                      </Paper>
                    </div>
                  ))}
              </Grid>
            ))}
          </Grid>
        </Container>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm">
          <DialogTitle>Bed Details</DialogTitle>
          <DialogContent>
            {selectedBed && (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Bed Number:
                    </TableCell>
                    <TableCell>{selectedBed.number}</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Patient ID:
                    </TableCell>
                    <TableCell>{selectedBed.patientId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Patient Name:
                    </TableCell>
                    <TableCell>{selectedBed.patientName}</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Age:</TableCell>
                    <TableCell>{selectedBed.age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Gender:
                    </TableCell>
                    <TableCell>{selectedBed.gender}</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Medical Acuity:
                    </TableCell>
                    <TableCell>{selectedBed.medicalAcuity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Contact No:
                    </TableCell>
                    <TableCell>{selectedBed.contactno}</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Current Ward:
                    </TableCell>
                    <TableCell>{selectedWard}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Admission Date
                    </TableCell>
                    <TableCell>{selectedBed.admissionDate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </DialogContent>
          <DialogActions>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                style={{
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "5px 20px",
                  background: "#61AFF7",
                  bottom: "10px",
                  color: "white",
                  left: "40px",
                }}
                onClick={handleTransferClick} // Call the new click handler
                color="primary"
              >
                Transfer
              </Button>
              <Button
                style={{
                  textTransform: "none",
                  left: "50px",
                  padding: "5px 20px",
                  bottom: "10px",
                  borderRadius: "30px",
                  background: "#61AFF7",
                  color: "white",
                }}
                onClick={handleDischargeClick} // Call the new click handler
                color="primary"
              >
                Discharge
              </Button>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseDialog}
                aria-label="close"
                style={{ position: "absolute", top: 0, right: 10 }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogActions>
        </Dialog>
        {/* Conditionally render the TransferPatientForm */}
        {openTransferForm && (
          <TransferPatient
            selectedBed={selectedBed}
            onClose={() => setOpenTransferForm(false)} // Close the form
          />
        )}
        {/* Conditionally render the DishargePatientForm */}
        {openDischargeForm && (
          <DischargePatient
            selectedBed={selectedBed}
            onClose={() => setOpenDischargeForm(false)} // Close the form
          />
        )}

        {/* Color picker dialog */}
        <Dialog
          open={openColorPickerDialog}
          onClose={handleCloseColorPickerDialog}
        >
          <DialogTitle>Customize Bed Colors</DialogTitle>
          <DialogContent>
            <div>
              <h4>Available Bed Color</h4>
              <SketchPicker
                color={availableBedColor}
                onChange={(color) => handleColorChange(color, "available")}
              />
            </div>
            <div>
              <h4>Occupied Bed Color</h4>
              <SketchPicker
                color={occupiedBedColor}
                onChange={(color) => handleColorChange(color, "occupied")}
              />
            </div>
            <div>
              <h4>Critical Bed Color</h4>
              <SketchPicker
                color={criticalBedColor}
                onChange={(color) => handleColorChange(color, "critical")}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSaveColorChanges}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Bed;
