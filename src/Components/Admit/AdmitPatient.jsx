import React, { useState, useMemo, useEffect } from "react";
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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const initialFormData = {
  name: "",
  age: "",
  gender: "",
  contactno: "",
  patientId: "",
  ward: "",
  bedNumber: "",
  medicalAcuity: "",
  admittingDoctors: "",
  admissionDate: null,
  admissionTime: null,
  address: {
    doorno: "",
    streetname: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
  },
};
const AdmitPatient = () => {
  const location = useLocation();

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const [data, setData] = useState(initialFormData);

  useEffect(() => {
    if (queryParams.has("bedNumber")) {
      setData({
        name: "",
        age: "",
        gender: "",
        contactno: "",
        patientId: "",
        ward: queryParams.get("ward") || "",
        bedNumber: queryParams.get("bedNumber") || "",
        medicalAcuity: "",
        admittingDoctors: "",
        admissionDate: null,
        admissionTime: null,
        address: {
          doorno: "",
          streetname: "",
          district: "",
          state: "",
          country: "",
          pincode: "",
        },
      });
    }
  }, [queryParams]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      age,
      gender,
      contactno,
      patientId,
      ward,
      bedNumber,
      medicalAcuity,
      admittingDoctors,
      admissionDate,
      admissionTime,
      address,
    } = data;

    const patientAddresses = [address].map((addr) => ({
      doorno: addr.doorno,
      streetname: addr.streetname,
      district: addr.district,
      state: addr.state,
      country: addr.country,
      pincode: addr.pincode,
    }));

    console.log(data);

    try {
      const { data: response } = await axios.post(
        "http://localhost:9000/admit",
        {
          name,
          age,
          gender,
          contactno,
          patientId,
          ward,
          bedNumber,
          medicalAcuity,
          admittingDoctors,
          admissionDate,
          admissionTime,
          address: patientAddresses,
        }
      );

      if (response.error) {
        // Display the error message from the server
        toast.error(response.error);
      } else {
        // Reset the form and show a success message
        setData(initialFormData);
        toast.success("Patient Admitted Successfully");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleDatedChangeUs = (newDate) => {
    // Use dayjs to ensure consistent date formatting and parsing
    const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : "";
    setData({ ...data, admissionDate: formattedDate });
  };

  const handleTime = (newTime) => {
    // Use dayjs to ensure consistent time formatting and parsing
    const formattedTime = newTime ? dayjs(newTime).format("hh:mm A") : "";
    setData({ ...data, admissionTime: formattedTime });
  };

  const handleGenderChange = (event) => {
    setData({
      ...data,
      gender: event.target.value, // Update the gender property in the form data
    });
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
            To Admit patient, please enter the details
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
            width: "85%",
            height: "430px",
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
                <Grid item xs={12} sm={3.5}>
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
                <Grid item xs={6} sm={1.2}>
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
                <Grid item xs={12} sm={3.7}>
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
                      <InputLabel>Admitting Doctors</InputLabel>
                      <Select
                        value={data.admittingDoctors}
                        onChange={(e) =>
                          setData({ ...data, admittingDoctors: e.target.value })
                        }
                        label="Admitting Doctors"
                      >
                        <MenuItem value="">Select Doctor</MenuItem>
                        <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                        <MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>
                        <MenuItem value="Dr. Williams">Dr. Williams</MenuItem>
                        <MenuItem value="Dr. Anderson">Dr. Anderson</MenuItem>
                      </Select>
                    </FormControl>
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
                      <InputLabel>Ward</InputLabel>
                      <Select
                        value={data.ward}
                        onChange={(e) =>
                          setData({ ...data, ward: e.target.value })
                        }
                        label="Ward"
                      >
                        <MenuItem value="">Select Ward</MenuItem>
                        <MenuItem value="Ward A">Ward A</MenuItem>
                        <MenuItem value="Ward B">Ward B</MenuItem>
                      </Select>
                    </FormControl>
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
                      defaultValue="Small"
                      size="small"
                      value={data.patientId}
                      onChange={(e) =>
                        setData({ ...data, patientId: e.target.value })
                      }
                      required
                    />
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
                      label="Bed No"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      value={data.bedNumber}
                      onChange={(e) =>
                        setData({ ...data, bedNumber: e.target.value })
                      }
                      required
                    />
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
                        value={data.admissionDate}
                        onChange={(newDate) => handleDatedChangeUs(newDate)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
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
                      <TimePicker
                        label="Admission Time"
                        slotProps={{ textField: { size: "small" } }}
                        value={data.admissionTime}
                        onChange={(newTime) => handleTime(newTime)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
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
                    <TextField
                      label="Door No"
                      id="outlined-size-small"
                      size="small"
                      value={data.address.doorno}
                      onChange={(e) =>
                        setData({
                          ...data,
                          address: { ...data.address, doorno: e.target.value },
                        })
                      }
                      required
                    />
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
                    <TextField
                      label="Street Name"
                      id="outlined-size-small"
                      size="small"
                      value={data.address.streetname}
                      onChange={(e) =>
                        setData({
                          ...data,
                          address: {
                            ...data.address,
                            streetname: e.target.value,
                          },
                        })
                      }
                      required
                    />
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
                    <TextField
                      label="District"
                      id="outlined-size-small"
                      size="small"
                      value={data.address.district}
                      onChange={(e) =>
                        setData({
                          ...data,
                          address: {
                            ...data.address,
                            district: e.target.value,
                          },
                        })
                      }
                      required
                    />
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
                    <TextField
                      label="State"
                      id="outlined-size-small"
                      size="small"
                      value={data.address.state}
                      onChange={(e) =>
                        setData({
                          ...data,
                          address: { ...data.address, state: e.target.value },
                        })
                      }
                      required
                    />
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
                    <TextField
                      label="Country"
                      id="outlined-size-small"
                      size="small"
                      value={data.address.country}
                      onChange={(e) =>
                        setData({
                          ...data,
                          address: { ...data.address, country: e.target.value },
                        })
                      }
                      required
                    />
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
                    <TextField
                      label="Pincode"
                      id="outlined-size-small"
                      size="small"
                      value={data.address.pincode}
                      onChange={(e) =>
                        setData({
                          ...data,
                          address: { ...data.address, pincode: e.target.value },
                        })
                      }
                      required
                    />
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
                      marginTop: "-110px",
                      borderRadius: "30px",
                      padding: "15px 30px",
                      fontSize: "18px",
                      lineHeight: "1.5",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Admit Patient
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

export default AdmitPatient;
