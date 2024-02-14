import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard  from "../pages/admin/dashboard/adminDashboard";
import { PageNotFound } from "../pages/404";
import Properties from "../pages/admin/properties/Properties";
import HostUsers from "../pages/admin/users/HostUsers";
import RenterUsers from "../pages/admin/users/RenterUsers";
import SetCost from "../pages/admin/features/setCost";
import Official from "../pages/admin/features/officialStuff";
import CRUDCategory from "../pages/admin/features/cRUDCategory";


export const AdminRoutes = () => {
  return (
    <>
      <Routes>
          {/* <Route path=""> */}
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/set-cost" element={<SetCost />} />
            <Route path="/crud-category" element={<CRUDCategory />} />
            <Route path="/official" element={<Official />} />
            <Route path="/renter/users" element={<RenterUsers />} />
            <Route path="/host/users" element={<HostUsers />} />
            <Route path="/properties" element={<Properties />} />
          {/* </Route> */}
          
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </>
  );
};
