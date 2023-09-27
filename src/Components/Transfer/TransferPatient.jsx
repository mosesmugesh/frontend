import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import PersonIcon from "@mui/icons-material/Person";
// import SideNavbar from "../Navbar/SideNavbar";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const initialFormData = {
  name: "",
  age: "",
  gender: "",
  contactno: "",
  patientId: "",
  currentWard: "",
  currentBedNumber: "",
  transferWard: "",
  transferBedNumber: "",
  medicalAcuity: "",
  transferReason: "",
  admissionDate: null,
};

const TransferPatient = () => {
  const location = useLocation();

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const [data, setData] = useState(initialFormData);

  useEffect(() => {
    if (queryParams.has("bedNumber")) {
      setData({
        name: queryParams.get("patientName") || "",
        age: queryParams.get("age") || "",
        gender: queryParams.get("gender") || "",
        contactno: queryParams.get("contactno") || "",
        patientId: queryParams.get("patientId") || "",
        currentWard: queryParams.get("currentWard") || "",
        currentBedNumber: queryParams.get("bedNumber") || "",
        transferWard: "",
        transferBedNumber: "",
        medicalAcuity: queryParams.get("medicalAcuity") || "",
        transferReason: "",
        admissionDate: queryParams.get("admissionDate") || "",
      });
    }
  }, [queryParams]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:9000/bedaction",
        data
      );

      if (response.data.error) {
        // Display the error message from the server
        toast.error(response.data.error);
      } else {
        // Reset the form and show a success message
        setData(initialFormData);
        toast.success("Patient Transferred Successfully");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleGenderChange = (event) => {
    setData({
      ...data,
      gender: event.target.value,
    });
  };
  const handleDatedChanged = (newDate) => {
    const formattedDated = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    setData({ ...data, admissionDate: formattedDated });
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
            width: "1200px",
            marginLeft: "-4%",
          }}
        >
          <PersonIcon
            style={{ fontSize: 50, marginLeft: "1010px", marginTop: "5px" }}
          />
          <h2 style={{ marginLeft: "50px", marginTop: "-50px" }}>
            To Transfer patient, please enter the details
          </h2>
        </div>
        <Typography
          variant="h3"
          gutterBottom
          style={{ color: "#61AFF7", fontWeight: "bold" }}
        >
          Good Care Hospital
        </Typography>
        <Container
          maxWidth="lr"
          style={{
            display: "flex",
            width: "80%",
            height: "400px",
            marginTop: "10px",
            justifyContent: "flex-start",
            background: "#ffff",
            borderRadius: "30px",
            marginLeft: "-15px",
            boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ width: "100%" }}>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={3.1}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <TextField
                      label="Name"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                </Grid>
                <Grid item xs={6} sm={1.3}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <TextField
                      label="Age"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      value={data.age}
                      onChange={(e) =>
                        setData({ ...data, age: e.target.value })
                      }
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={3.2}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <TextField
                      label="Contact No"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      value={data.contactno}
                      onChange={(e) =>
                        setData({ ...data, contactno: e.target.value })
                      }
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={3.8}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <RadioGroup
                      name="gender"
                      value={data.gender} // Use data.gender for the value
                      onChange={handleGenderChange}
                      row
                    >
                      <FormControlLabel
                        value="Male"
                        control={<Radio size="small" />}
                        label={<span style={{ color: "gray" }}>Male</span>}
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio size="small" />}
                        label={<span style={{ color: "gray" }}>Female</span>}
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio size="small" />}
                        label={<span style={{ color: "gray" }}>Other</span>}
                      />
                    </RadioGroup>
                  </div>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <FormControl size="small" fullWidth variant="outlined">
                      <InputLabel id="demo-select-small-label">
                        Medical Acuity
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.medicalAcuity}
                        onChange={(e) =>
                          setData({ ...data, medicalAcuity: e.target.value })
                        }
                        label="Medical Acuity"
                      >
                        <MenuItem value="Critical">Critical</MenuItem>
                        <MenuItem value="Moderate">Moderate</MenuItem>
                        <MenuItem value="Stable">Stable</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <FormControl size="small" fullWidth variant="outlined">
                      <InputLabel>Current Ward</InputLabel>
                      <Select
                        value={data.currentWard}
                        onChange={(e) =>
                          setData({ ...data, currentWard: e.target.value })
                        }
                        label="Current Ward"
                      >
                        <MenuItem value="">Select Ward</MenuItem>
                        <MenuItem value="Ward A">Ward A</MenuItem>
                        <MenuItem value="Ward B">Ward B</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <FormControl size="small" fullWidth variant="outlined">
                      <InputLabel>Transfer Ward</InputLabel>
                      <Select
                        value={data.transferWard}
                        onChange={(e) =>
                          setData({ ...data, transferWard: e.target.value })
                        }
                        label="Transfer Ward"
                      >
                        <MenuItem value="">Select Ward</MenuItem>
                        <MenuItem value="Ward A">Ward A</MenuItem>
                        <MenuItem value="Ward B">Ward B</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Admission Date"
                        slotProps={{ textField: { size: "small" } }}
                        value={
                          data.admissionDate ? dayjs(data.admissionDate) : null
                        }
                        onChange={(newDate) => handleDatedChanged(newDate)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <TextField
                      label="Patient ID"
                      id="outlined-size-small"
                      size="small"
                      value={data.patientId}
                      onChange={(e) =>
                        setData({ ...data, patientId: e.target.value })
                      }
                      required
                    />
                  </div>
                </Grid>

                <Grid item xs={6} sm={2.7}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <TextField
                      label="Current Bed No"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      value={data.currentBedNumber}
                      onChange={(e) =>
                        setData({ ...data, currentBedNumber: e.target.value })
                      }
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={6} sm={2.7}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <TextField
                      label="Transfer Bed No"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      value={data.transferBedNumber}
                      onChange={(e) =>
                        setData({ ...data, transferBedNumber: e.target.value })
                      }
                      required
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <FormControl size="small" fullWidth variant="outlined">
                      <InputLabel id="demo-select-small-label">
                        Transfer Reasons
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.transferReason}
                        onChange={(e) =>
                          setData({ ...data, transferReason: e.target.value })
                        }
                        label="Transfer Reasons"
                      >
                        <MenuItem value="Blood Cell Count">
                          Blood Cell Count
                        </MenuItem>
                        <MenuItem value="Respiratory Ratee">
                          Respiratory Rate
                        </MenuItem>
                        <MenuItem value="Heart Rate">Heart Rate</MenuItem>
                        <MenuItem value="Planned Surgeries">
                          Planned Surgeries
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      marginLeft: "650px",
                      marginTop: "-10%",
                      borderRadius: "30px",
                      padding: "15px 30px",
                      fontSize: "18px",
                      lineHeight: "1.5",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Transfer Patient
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TransferPatient;
