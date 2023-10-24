import { Box, Card, Skeleton, useMediaQuery } from "@mui/material";

function OrderLoading() {
  const tab = useMediaQuery("(max-width:1200px)");
  const phone = useMediaQuery("(max-width:600px)");
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Card
        sx={{
          width: tab ? (phone ? 280 : "22rem") : "30rem",
          p: 4,
        }}
      >
        <Skeleton
          variant="text"
          animation="wave"
          width="80%"
          height={23}
          sx={{ mb: 3 }}
        />
        <Skeleton variant="text" animation="wave" width="75%" height={23} />
        <Skeleton variant="text" animation="wave" width="50%" height={23} />
        <Skeleton variant="text" animation="wave" width="75%" height={23} />
        <Skeleton variant="text" animation="wave" width="25%" height={23} />
        <Skeleton variant="text" animation="wave" width="35%" height={23} />
      </Card>
    </Box>
  );
}

export default OrderLoading;
