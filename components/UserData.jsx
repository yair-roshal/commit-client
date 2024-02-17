import { useDispatch } from "react-redux"
import { Paper, Typography } from "@mui/material"

import { useEffect, useState } from "react"
import { useUsers, fetchUsers } from "redux/userSlice"
import { LoadingOverlay } from "components/LoadingOverlay"

const UserData = () => {
  const { users, loadingUsers } = useUsers()
  const [latestUser, setLatestUser] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    setLatestUser(users[users.length - 1])
  }, [users])

  if (!users || users.length === 0) {
    return <Typography variant="body1">No user data available</Typography>
  }

  return (
    <>
      {loadingUsers && <LoadingOverlay />}
      {!loadingUsers && latestUser && (
        <Paper elevation={3} style={{ padding: "10px", marginBottom: "10px" }}>
          <Typography variant="body1">
            <strong>User Name:</strong> {latestUser.name}
          </Typography>
          <Typography variant="body1">
            <strong>Phone Number:</strong> {latestUser.phone}
          </Typography>
        </Paper>
      )}
    </>
  )
}

export default UserData
