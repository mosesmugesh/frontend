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
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import PersonIcon from "@mui/icons-material/Person";
// import SideNavbar from "../Navbar/SideNavbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const initialFormData = {
  patientName: "",
  age: "",
  gender: "",
  patientId: "",
  ward: "",
  bedNumber: "",
  medicalAcuity: "",
  dischargeReasons: "",
  admissionDate: null,
  dischargeDate: null,
};
const DischargePatient = () => {
  const location = useLocation();
  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const [data, setData] = useState(initialFormData);

  useEffect(() => {
    if (queryParams.has("bedNumber")) {
      const admissionDateQueryParam = queryParams.get("admissionDate") || "";
      const formattedAdmissionDate = admissionDateQueryParam
        ? dayjs(admissionDateQueryParam).format("YYYY-MM-DD")
        : null;

      setData({
        patientName: queryParams.get("patientName") || "",
        age: queryParams.get("age") || "",
        gender: queryParams.get("gender") || "",
        patientId: queryParams.get("patientId") || "",
        ward: queryParams.get("currentWard") || "",
        bedNumber: queryParams.get("bedNumber") || "",
        medicalAcuity: queryParams.get("medicalAcuity") || "",
        dischargeDate: "",
        dischargeReasons: "",
        admissionDate: formattedAdmissionDate,
      });
    } else {
      // If no query parameters provided, set both dates to null
      setData({
        ...initialFormData,
      });
    }
  }, [queryParams]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {
      patientName,
      age,
      gender,
      patientId,
      ward,
      bedNumber,
      medicalAcuity,
      dischargeReasons,
      admissionDate,
      dischargeDate,
    } = data;

    try {
      const { data: response } = await axios.post(
        "http://localhost:9000/discharge-and-delete",
        {
          patientName,
          age,
          gender,
          patientId,
          ward,
          bedNumber,
          medicalAcuity,
          dischargeReasons,
          admissionDate,
          dischargeDate,
        }
      );

      if (response.error) {
        toast.error(response.error);
      } else {
        setData(initialFormData);
        toast.success("Patient Discharged Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGenderChange = (event) => {
    setData({
      ...data,
      gender: event.target.value, // Update the gender property in the form data
    });
  };

  const handleDatedChange = (newDate) => {
    // Use dayjs to create a Day.js date object and format it as YYYY-MM-DD
    const formattedDates = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    setData({ ...data, admissionDate: formattedDates });
  };
  const Dated = (newDate) => {
    // Use dayjs to create a Day.js date object
    const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    setData({ ...data, dischargeDate: formattedDate });
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
            To Discharge patient, please enter the details
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
            height: "300px",
            width: "75%",
            marginTop: "30px",
            justifyContent: "flex-start",
            background: "#ffff",
            borderRadius: "30px",
            marginLeft: "10px",
            boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ width: "100%" }}>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={4}>
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
                      size="small"
                      value={data.patientName}
                      onChange={(e) =>
                        setData({ ...data, patientName: e.target.value })
                      }
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                </Grid>
                <Grid item xs={6} sm={1.5}>
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

                <Grid item xs={12} sm={4.5}>
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
                        onChange={(newDate) => handleDatedChange(newDate)}
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
                      <DatePicker
                        label="Discharge Date"
                        slotProps={{ textField: { size: "small" } }}
                        value={
                          data.dischargeDate ? dayjs(data.dischargeDate) : null
                        }
                        onChange={(newDate) => Dated(newDate)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
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

                <Grid item xs={12} sm={3}>
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
                        Discharge Reason
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.dischargeReasons}
                        onChange={(e) =>
                          setData({ ...data, dischargeReasons: e.target.value })
                        }
                        label="Discharge Reason"
                      >
                        <MenuItem value="">Select Reason</MenuItem>
                        <MenuItem value="Patient is ok">Patient is ok</MenuItem>
                        <MenuItem value="Patient is not ok">
                          Patient is not ok
                        </MenuItem>
                        <MenuItem value="Patient is fine">
                          Patient is fine{" "}
                        </MenuItem>
                        <MenuItem value="Patient is critical">
                          Patient is critical
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>

                <Grid item xs={12} sm={3}>
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
                      id="outlined-size-small"
                      size="small"
                      label=" BedNumber"
                      value={data.bedNumber}
                      onChange={(e) =>
                        setData({ ...data, bedNumber: e.target.value })
                      }
                      required
                    />
                  </div>
                </Grid>

                <Grid item xs={10}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      marginLeft: "690px",
                      marginTop: "-100px",
                      borderRadius: "30px",
                      padding: "15px 30px",
                      fontSize: "18px",
                      lineHeight: "1.5",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Discharge
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

export default DischargePatient;
