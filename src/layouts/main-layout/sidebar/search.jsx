import { Container, InputBase, Stack } from "@mui/material";

import { Search02 } from "src/assets";

export function Search() {
  return (
    <Stack
      direction="column"
      sx={{
        height: 46,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          width: 204,
          height: 40,
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.sidebar.search_border}`,
          background: (theme) => theme.palette.sidebar.search_background,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: 1,
            height: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            px: 3,
          }}
        >
          <Search02 sx={{ height: 16, width: 16 }} />
          <InputBase
            placeholder="移動先"
            sx={{
              height: 40,
              input: {
                height: 40,
                padding: 0,
                display: "flex",
                alignItems: "center",
                fontFamily: (theme) => theme.typography.fontFamily,
                fontWeight: (theme) => theme.typography.fontWeightRegular,
                lineHeight: 40,
                fontSize: 12,
                color: (theme) => theme.palette.sidebar.sub_text,
                opacity: 1,

                "::placeholder": {
                  fontFamily: (theme) => theme.typography.fontFamily,
                  fontWeight: (theme) => theme.typography.fontWeightRegular,
                  lineHeight: 40,
                  fontSize: 12,
                  color: (theme) => theme.palette.sidebar.sub_text,
                  opacity: 1,
                },
              },
            }}
          />
        </Stack>
      </Container>
    </Stack>
  );
}
