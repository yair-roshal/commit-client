import * as React from "react"
import { Box, Tab, Tabs } from "@mui/material"
import NextLink from "next/link"

function LinkTab(props) {
  return (
    <NextLink {...props} passHref>
      <Tab {...props} />
    </NextLink>
  )
}

export function MenuBar() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%", marginBottom: 2 }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Form" href="/form" />
        <LinkTab label="User" href="/user" />
      </Tabs>
    </Box>
  )
}
