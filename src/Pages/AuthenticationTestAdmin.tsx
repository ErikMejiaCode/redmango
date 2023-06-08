import React from "react";
import { withAdminAuth } from "../HOC";

function AuthenticationTestAdmin() {
  return <div>This page can only be accessed by ADMIN level users.</div>;
}

export default withAdminAuth(AuthenticationTestAdmin);
