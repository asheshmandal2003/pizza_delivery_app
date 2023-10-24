import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";

function DashboardLoading() {
  const phone = useMediaQuery("(max-width:600px)");
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <TableContainer
        component={Paper}
        sx={{
          width: phone ? 350 : 500,
          mt: 5,
          mb: 5,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton variant="text" width="25%" height={15} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width="25%" height={15} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={"23%"} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DashboardLoading;
