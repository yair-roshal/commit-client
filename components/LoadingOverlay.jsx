import { Box, CircularProgress } from "@mui/material"
import { styled } from "@mui/system"

const FullscreenOverlayBox = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
})

export const LoadingOverlay = () => {
  return (
    <FullscreenOverlayBox>
      <CircularProgress size={64} color="primary" />
    </FullscreenOverlayBox>
  )
}
