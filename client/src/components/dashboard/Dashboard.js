import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

function Dashboard() {
  const [pizzaBase, setPizzaBase] = useState(0);
  const [sauce, setSauce] = useState(0);
  const [cheese, setCheese] = useState(0);
  const [veggies, setVeggies] = useState(0);
  const [meat, setMeat] = useState(0);

  useEffect(() => {
    const response = async () => {
      await axios({
        method: "GET",
        url: "http://localhost:8000/dashboard",
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    response();
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <TableContainer component={Paper} sx={{ width: 450, mt: 5, mb: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ingredients</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Add</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Pizza Base
              </TableCell>
              <TableCell align="right" name="pizzaBase">
                {pizzaBase}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setPizzaBase(pizzaBase + 1)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Sauce
              </TableCell>
              <TableCell align="right" name="sauce">
                {sauce}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setSauce(sauce + 1)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Cheese
              </TableCell>
              <TableCell align="right">{cheese}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setCheese(pizzaBase + 1)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Veggies
              </TableCell>
              <TableCell align="right">{veggies}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setVeggies(veggies + 1)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Meat
              </TableCell>
              <TableCell align="right">{meat}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setMeat(meat + 1)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Dashboard;
