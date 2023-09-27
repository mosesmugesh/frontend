import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import LinearProgress from "@mui/material/LinearProgress";
// import SideNavbar from "../Navbar/SideNavbar";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";

const Dashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [totalDischarges, setTotalDischarges] = useState(0);
  const [totalAdmissions, setTotalAdmissions] = useState(0);
  const [totalTransfer, setTotalTransfer] = useState(0);
  const [chartDatab, setChartData] = useState([]);
  const [data, setData] = useState({
    bedStatusPerWard: {},
    admissionStatistics: {
      thisWeek: 0,
      thisMonth: 0,
    },
  });

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("http://localhost:9000/bed1d")
      .then((response) => response.json())
      .then((responseData) => {
        // Set the fetched data in the state
        setData(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9000/bee")
      .then((response) => {
        setHospitals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://localhost:9000/Disget")
      .then((response) => {
        const total = response.data.length;
        setTotalDischarges(total);
      })
      .catch((error) => {
        console.error("Error fetching discharges:", error);
      });

    axios
      .get("http://localhost:9000/tee")
      .then((response) => {
        const total = response.data.length;
        setTotalTransfer(total);
      })
      .catch((error) => {
        console.error("Error fetching discharges:", error);
      });

    axios
      .get("http://localhost:9000/aff")
      .then((response) => {
        const total = response.data.length;
        console.log(response.data); // Calculate the total number of admissions
        setTotalAdmissions(total);
      })
      .catch((error) => {
        console.error("Error fetching admissions:", error);
      });
  }, []);

  const maximumDischargeCapacity = 100;
  const maximumAdmissionCapacity = 100;
  const maximumTransferCapacity = 100;

  // Nivo Component
  const bedStatusData = data.bedStatusPerWard;
  const chartData = Object.keys(bedStatusData).map((wardName) => ({
    ward: wardName,
    ...bedStatusData[wardName],
  }));

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:9000/bn")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const admissionDates = data.map((item) => item.admissionDate);
        const admissionCounts = {};
        admissionDates.forEach((date) => {
          if (admissionCounts[date]) {
            admissionCounts[date]++;
          } else {
            admissionCounts[date] = 1;
          }
        });

        const uniqueDates = Array.from(new Set(admissionDates)).sort();
        const admissionData = uniqueDates.map((date) => ({
          date,
          admissions: admissionCounts[date] || 0,
        }));

        // Set the chart data with the processed data
        setChartData(admissionData);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, []);

  return (
    <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}>
        <div
          style={{
            background: "#ffff",
            padding: "10px",
            height: "50px",
            marginBottom: "10px",
            width: "105%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "-5%",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            style={{ color: "#61AFF7", fontWeight: "bold", marginTop: "15px" }}
          >
            Good Care Hospital
          </Typography>
          <PersonIcon style={{ fontSize: 50, marginRight: "10px" }} />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <div
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                Total Discharges
              </div>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                {totalDischarges}
              </div>
              <LinearProgress
                variant="determinate"
                value={(totalDischarges / maximumDischargeCapacity) * 100}
                style={{ height: "10px", marginTop: "5px" }}
              />
            </div>
          </Grid>

          <Grid item xs={2} style={{ textAlign: "center" }}>
            <div
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                Total Admission
              </div>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                {totalAdmissions}
              </div>
              <LinearProgress
                variant="determinate"
                value={(totalAdmissions / maximumAdmissionCapacity) * 100}
                style={{ height: "10px", marginTop: "5px" }}
              />
            </div>
          </Grid>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <div
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                Total Transfer
              </div>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                {totalTransfer}
              </div>
              <LinearProgress
                variant="determinate"
                value={(totalTransfer / maximumTransferCapacity) * 100}
                style={{ height: "10px", marginTop: "5px" }}
              />
            </div>
          </Grid>

          {/* Create a container for "Ward A" */}
          <Grid item xs={3} style={{ textAlign: "center" }}>
            {hospitals.map((hospital) => (
              <div key={hospital.id}>
                {hospital.wards.map((ward) => {
                  if (ward.name === "Ward A") {
                    return (
                      <div key={ward.id} style={{ marginBottom: "20px" }}>
                        <div
                          style={{
                            background: "white",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                            {ward.name} Available Beds
                          </div>
                          <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                            {" "}
                            {
                              ward.beds.filter(
                                (bed) => bed.status === "available"
                              ).length
                            }{" "}
                            / {ward.beds.length}
                          </div>
                          <LinearProgress
                            variant="determinate"
                            value={
                              (ward.beds.filter(
                                (bed) => bed.status === "available"
                              ).length /
                                ward.beds.length) *
                              100
                            }
                            style={{ height: "10px", marginTop: "5px" }}
                          />
                        </div>
                      </div>
                    );
                  }
                  return null; // Return null for other wards
                })}
              </div>
            ))}
          </Grid>

          {/* Create a container for "Ward B" */}

          <Grid item xs={3} style={{ textAlign: "center" }}>
            {hospitals.map((hospital) => (
              <div key={hospital.id}>
                {hospital.wards.map((ward) => {
                  if (ward.name === "Ward B") {
                    return (
                      <div key={ward.id} style={{ marginBottom: "20px" }}>
                        <div
                          style={{
                            background: "white",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                            {ward.name} Available Beds
                          </div>
                          <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                            {" "}
                            {
                              ward.beds.filter(
                                (bed) => bed.status === "available"
                              ).length
                            }{" "}
                            / {ward.beds.length}
                          </div>
                          <LinearProgress
                            variant="determinate"
                            value={
                              (ward.beds.filter(
                                (bed) => bed.status === "available"
                              ).length /
                                ward.beds.length) *
                              100
                            }
                            style={{ height: "10px", marginTop: "5px" }}
                          />
                        </div>
                      </div>
                    );
                  }
                  return null; // Return null for other wards
                })}
              </div>
            ))}
          </Grid>
          <Grid item xs={6}>
            {" "}
            {/* This grid item will contain the first bar chart */}
            <div
              style={{
                height: "400px",
                background: "#ffff",
                borderRadius: "30px",
                boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ResponsiveBar
                data={chartData}
                keys={[
                  "occupiedThisWeekBeds",
                  "occupiedThisMonthBeds",
                  "availableBeds",
                ]}
                indexBy="ward"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.5}
                colors={{ scheme: "nivo" }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Ward",
                  legendPosition: "middle",
                  legendOffset: 32,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Beds",
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                legends={[
                  {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 150,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            {" "}
            {/* This grid item will contain the second bar chart */}
            <div
              className="chart-container"
              style={{
                height: "400px",
                background: "#ffff",
                borderRadius: "30px",
                boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ResponsiveBar
                data={chartDatab}
                keys={["admissions"]}
                indexBy="date"
                margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
                padding={0.1}
                colors={{ scheme: "category10" }}
                axisBottom={{
                  tickRotation: -45,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Total Admission",
                  legendPosition: "middle",
                  legendOffset: -40,
                  tickValues: [0, 1, 2, 3, 4, 5],
                }}
                enableGridX={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
