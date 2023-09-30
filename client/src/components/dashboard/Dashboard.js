import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ResponsiveAppBar from "../partials/Navbar";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";

function Dashboard({ user, setUser }) {
  const [dashboard, setDashboard] = useState([]);
  const [pageType, setPageType] = useState("view");

  const fetchDashboard = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8000/pizza/${user._id}/dashboard`,
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
        url: "http://localhost:8000/pizza/dashboard/update",
        data: formdata,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPageType("view");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ResponsiveAppBar user={user} setUser={setUser} />
      {dashboard.length !== 0 && (
        <Box
          display="flex"
          justifyContent="center"
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <TableContainer component={Paper} sx={{ width: 450, mt: 5, mb: 5 }}>
            <Table>
              <TableHead>
                {pageType === "view" && (
                  <TableRow>
                    <Tooltip title="Refresh" placement="top">
                      <IconButton
                        onClick={fetchDashboard}
                        sx={{ ml: 1, mt: 1 }}
                      >
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Update"
                      placement="top"
                      sx={{ ml: 1, mt: 1 }}
                    >
                      <IconButton onClick={() => setPageType("update")}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>Ingredients</TableCell>
                  <TableCell align="right">Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Pizza Base
                  </TableCell>
                  {pageType === "view" ? (
                    <TableCell align="right" name="pizzaBase">
                      {dashboard[0].pizzaBase}
                    </TableCell>
                  ) : (
                    <TableCell align="right" name="pizzaBase">
                      <FormControl>
                        <InputLabel>Pizza Base</InputLabel>
                        <OutlinedInput
                          autoFocus
                          name="pizzaBase"
                          value={formik.values.pizzaBase}
                          onChange={formik.handleChange}
                          label="Pizza Base"
                        />
                      </FormControl>
                    </TableCell>
                  )}
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Sauce
                  </TableCell>
                  {pageType === "view" ? (
                    <TableCell align="right">{dashboard[0].sauce}</TableCell>
                  ) : (
                    <TableCell align="right">
                      <FormControl>
                        <InputLabel>Sauce</InputLabel>
                        <OutlinedInput
                          name="sauce"
                          value={formik.values.sauce}
                          onChange={formik.handleChange}
                          label="Sauce"
                        />
                      </FormControl>
                    </TableCell>
                  )}
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Cheese
                  </TableCell>
                  {pageType === "view" ? (
                    <TableCell align="right">{dashboard[0].cheese}</TableCell>
                  ) : (
                    <TableCell align="right">
                      <FormControl>
                        <InputLabel>Cheese</InputLabel>
                        <OutlinedInput
                          name="cheese"
                          value={formik.values.cheese}
                          onChange={formik.handleChange}
                          label="Cheese"
                        />
                      </FormControl>
                    </TableCell>
                  )}
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Veggies
                  </TableCell>
                  {pageType === "view" ? (
                    <TableCell align="right">{dashboard[0].veggies}</TableCell>
                  ) : (
                    <TableCell align="right">
                      <FormControl>
                        <InputLabel>Veggies</InputLabel>
                        <OutlinedInput
                          name="veggies"
                          value={formik.values.veggies}
                          onChange={formik.handleChange}
                          label="Veggies"
                        />
                      </FormControl>
                    </TableCell>
                  )}
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Meat
                  </TableCell>
                  {pageType === "view" ? (
                    <TableCell align="right">{dashboard[0].meat}</TableCell>
                  ) : (
                    <TableCell align="right">
                      <FormControl>
                        <InputLabel>Meat</InputLabel>
                        <OutlinedInput
                          name="meat"
                          value={formik.values.meat}
                          onChange={formik.handleChange}
                          label="Meat"
                        />
                      </FormControl>
                    </TableCell>
                  )}
                </TableRow>

                {pageType === "update" && (
                  <TableRow>
                    <TableCell width="50%">
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => setPageType("view")}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                    <TableCell width="50%">
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        type="submit"
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}

export default Dashboard;
