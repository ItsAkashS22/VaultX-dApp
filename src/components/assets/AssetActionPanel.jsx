import React from "react";
import { useWeb3React } from "@web3-react/core";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function AssetActionPanel({ asset = {} }) {
  const { account, library } = useWeb3React();
  const connected = Boolean(account && library);

  const handle = (action) => () => {
    console.log("Asset action:", action, "asset:", asset.id);
  };

  return connected ? (
    <Stack spacing={2}>
      <Stack direction={"row"} spacing={2}>
        <Button
          fullWidth
          variant="contained"
          onClick={handle("view-details")}
          disabled={!connected}
          sx={{ borderRadius: "999px", textTransform: "none" }}
        >
          View Details
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handle("request-access")}
          disabled={!connected}
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            color: "var(--text)",
            borderColor: "rgba(255,255,255,.12)",
            "&:hover": {
              borderColor: "rgba(215,181,109,.34)",
              background: "rgba(255,255,255,.04)",
            },
          }}
        >
          Request Access
        </Button>
      </Stack>
      <Button
        fullWidth
        variant="contained"
        onClick={handle("go-presale")}
        disabled={!connected}
        sx={{ borderRadius: "999px", textTransform: "none"}}
      >
        Go To Presale
      </Button>
    </Stack>
  ) : (
    <Box
      sx={{
        p: 2,
        borderRadius: "18px",
        background: "rgba(215,181,109,.08)",
        border: "1px solid rgba(215,181,109,.18)",
      }}
    >
      <Typography
        className="mono"
        sx={{
          fontSize: 10,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--gold-2)",
          mb: 1,
        }}
      >
        Connect wallet required
      </Typography>
      <Typography sx={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>
        Connect your wallet to enable investor actions for this asset.
      </Typography>
    </Box>
  );
}
