import React from "react";
import { withAuth } from "../HOC";

function AuthenticationTest() {
  return <div>This page can be accessed by ay logged in user</div>;
}

export default withAuth(AuthenticationTest);
