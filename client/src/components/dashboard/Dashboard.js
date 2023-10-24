import { useEffect, useState } from "react";
import axios from "axios";
import ResponsiveAppBar from "../partials/Navbar";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import DashboardForm from "./DashboardForm";
import DashboardLoading from "../Loading/DashboardLoading";

function Dashboard() {
  const [pageType, setPageType] = useState("view");
  const [dashboard, setDashboard] = useState([]);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const fetchDashboard = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/pizza/${user._id}/dashboard`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setDashboard(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const formik = useFormik({
    initialValues: {
      pizzaBase: 0,
      sauce: 0,
      cheese: 0,
      veggies: 0,
      meat: 0,
    },
    onSubmit: (values) => update(values),
  });

  async function update(values) {
    try {
      const formdata = new FormData();
      for (let value in values) {
        formdata.append(value, values[value]);
      }
      await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_BASE_URL}/pizza/dashboard/update`,
        data: formdata,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPageType("view");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ResponsiveAppBar />
      {dashboard.length === 0 ? (
        <DashboardLoading />
      ) : (
        <DashboardForm
          formik={formik}
          dashboard={dashboard}
          fetchDashboard={fetchDashboard}
          pageType={pageType}
          setPageType={setPageType}
        />
      )}
    </>
  );
}

export default Dashboard;
