import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
} from "@mui/material";

function HomeLoading() {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: 350, height: 440, mb: 4 }}>
        <Skeleton variant="rectangular" animation="wave" height={197} />
        <CardHeader
          title={<Skeleton variant="text" animation="wave" width="50%" />}
          subheader={
            <Skeleton variant="text" animation="wave" height={15} width="20%" />
          }
        />
        <CardContent>
          <Skeleton
            variant="text"
            animation="wave"
            height={15}
            style={{ marginBottom: 6 }}
          />
          <Skeleton variant="text" animation="wave" height={15} width="80%" />
        </CardContent>
        {/* <CardActions>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={30}
            width="40%"
          />
        </CardActions> */}
      </Card>
    </Box>
  );
}

export default HomeLoading;
