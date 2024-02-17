import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { baseURL } from "config/constants"
import { fetchData } from "helpers/api"

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  console.log("baseURL :>> ", baseURL)
  const usersData = await fetchData(baseURL)
  console.log("usersData", usersData)
  return usersData
})

const initialState = {
  users: [],
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loadingUsers = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("action.payload", action.payload)

        state.loadingUsers = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loadingUsers = false
      })
  },
})

export const useUsers = () => {
  const { users, loadingUsers } = useSelector((state) => state.users)

  return {
    users,
    loadingUsers,
  }
}

export const { addUser } = userSlice.actions

export default userSlice.reducer
