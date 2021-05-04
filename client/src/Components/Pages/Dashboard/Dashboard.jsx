import React from "react";
import useToken from "../../../Components/App/useToken";
import Login from "../LogIn/LogIn";

function Dashboard() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return <div>User's Dashboard</div>;
}

export default Dashboard;
