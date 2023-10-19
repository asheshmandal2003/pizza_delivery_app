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
  useMediaQuery,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";

function DashboardForm({
  formik,
  dashboard,
  fetchDashboard,
  pageType,
  setPageType,
}) {
  const phone = useMediaQuery("(max-width:600px)");
  return (
    <Box
      display="flex"
      justifyContent="center"
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <TableContainer
        component={Paper}
        sx={{ width: phone ? 350 : 500, mt: 5, mb: 5 }}
      >
        <Table>
          <TableHead>
            {pageType === "view" && (
              <TableRow>
                <Tooltip title="Refresh" placement="top">
                  <IconButton onClick={fetchDashboard} sx={{ ml: 1, mt: 1 }}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Update" placement="top" sx={{ ml: 1, mt: 1 }}>
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
  );
}

export default DashboardForm;
