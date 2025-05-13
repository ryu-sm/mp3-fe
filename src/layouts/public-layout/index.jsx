import { Container, Stack } from "@mui/material";

import { background_bl, background_tr } from "src/assets";

export function PublicLayout({ children }) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100dvh",
        minHeight: "100dvh",
        width: 1,
        backgroundColor: (theme) => theme.palette.background.neutral,
        backgroundImage: `url(${background_tr}), url(${background_bl})`,
        backgroundSize: "cover",
        backgroundPosition: "auto, auto",
      }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "100dvh", minHeight: "100dvh" }}
      >
        {children}
      </Stack>
    </Container>
  );
}
