import { Box, Card, Skeleton, useMediaQuery } from "@mui/material";

function ProfileLoading() {
  const phone = useMediaQuery("(max-width:1200px)");
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: phone ? 300 : 350,
          height: "18rem",
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Skeleton variant="circular" height={80} width={80} sx={{ mb: 3 }} />
        <Box width="100%">
          <Skeleton variant="text" height={15} width="60%" sx={{ mb: 2 }} />
          <Skeleton variant="text" height={15} width="80%" sx={{ mb: 2 }} />
          <Skeleton variant="text" height={15} width="50%" sx={{ mb: 2 }} />
        </Box>
      </Card>
    </Box>
  );
}

export default ProfileLoading;
