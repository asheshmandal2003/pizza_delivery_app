import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";

function HomeLoading() {
  return (
    <Card sx={{ height: 460 }}>
      <Skeleton variant="rectangular" animation="wave" height={200} />
      <CardHeader
        title={
          <Skeleton variant="text" animation="wave" height={50} width="50%" />
        }
        subheader={
          <Skeleton variant="text" animation="wave" height={25} width="20%" />
        }
      />
      <CardContent>
        <Skeleton
          variant="text"
          animation="wave"
          height={25}
          style={{ marginBottom: 5 }}
        />
        <Skeleton variant="text" animation="wave" height={25} width="80%" />
      </CardContent>
    </Card>
  );
}

export default HomeLoading;
