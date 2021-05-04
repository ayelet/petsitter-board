import "./App.css";
// import Signup from "./Components/Pages/SignUp/SignUp";
// import welcome from "./assets/img/welcome.jpg";
// import NavigationMenu from "./Components/NavigationMenu/NavigationMenu";
import { BrowserRouter } from "react-router-dom";
import IndexPage from "./Components/Pages/IndexPage/IndexPage";
import Layout from "./Components/Layout/Layout";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  return (
    <BrowserRouter>
      <Layout>
        <IndexPage />{" "}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
