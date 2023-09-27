import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AdmitPatient from "./Components/Admit/AdmitPatient";
import Bed from "./Components/Grid/Bed";
import TransferPatient from "./Components/Transfer/TransferPatient";
import DischargePatient from "./Components/Discharge/DischargePatient";
import HospitalGrid from "./Components/Grid/HospitalGrid";
import PatientTable from "./Components/Admit/PatientTable";
// import SideNavbar from "./Components/Navbar/SideNavbar";

import { Toaster } from "react-hot-toast";
import axios from "axios";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import BedOccupancyChart from "./Components/Dashboard/BedOccupancyChart";
import EditTransfer from "./Components/Transfer/EditTransfer";
import EditDischarge from "./Components/Discharge/EditDischarge";

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation(); // Get the current location
  

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      {/* <div style={{ display: "flex" }}>
        {/* Include your SideNavbar component here */}
        {/* <SideNavbar />  */}
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <TransitionGroup>
              <CSSTransition
                key={location.key} // Use the current location's key for dynamic transitions
                timeout={900}
                classNames="fade"
                unmountOnExit
              >
                <div>
                  <Routes>
                    <Route path="/" element={<Dashboard />}>
                      <Route index element={<Dashboard />} />
                      <Route path="/Dashboard" element={<Dashboard />} />
                    </Route>

                    <Route path="/Bed" element={<Bed />} />
                    <Route
                      path="/TransferPatient"
                      element={<TransferPatient />}
                    />
                    <Route path="/AdmitPatient" element={<AdmitPatient />} />
                    <Route
                      path="/DischargePatient"
                      element={<DischargePatient />}
                    />
                    <Route path="/HospitalGrid" element={<HospitalGrid />} />
                    <Route
                      path="/BedOccupancychart"
                      element={<BedOccupancyChart />}
                    />
                    <Route path="/PatientTable" element={<PatientTable />} />
                    <Route path="/EditTransfer" element={<EditTransfer />} />
                    <Route path="/EditDischarge" element={<EditDischarge />} />
                  </Routes>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default App;
