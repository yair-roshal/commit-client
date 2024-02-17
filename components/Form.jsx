import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "redux/userSlice"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import { baseURL } from "config/constants"
import { sendData } from "helpers/api"

const FormContainer = styled(Box)({
  "display": "flex",
  "flexDirection": "column",
  "& > *": {
    margin: "1rem",
  },
})

export const StyledTextField = styled(TextField)`
  margin-bottom: 11px;
`

const Form = () => {
  const dispatch = useDispatch()

  // Initial values for the form
  const initialFormData = {
    userName: "Yair",
    phoneNumber: "1234567890",
    password: "qweQWE!!!",
    confirmPassword: "qweQWE!!!",
  }
  // const initialFormData = {
  //   userName: "",
  //   phoneNumber: "",
  //   password: "",
  //   confirmPassword: "",
  // }

  const [formData, setFormData] = useState(initialFormData)

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const validationErrors = {}

    if (formData.userName.length > 32) {
      validationErrors.userName = "User name must be up to 32 characters"
    }

    if (
      formData.phoneNumber.length !== 10 ||
      !/^\d+$/.test(formData.phoneNumber)
    ) {
      validationErrors.phoneNumber = "Phone number must be 10 digits"
    }

    if (
      formData.password.length < 6 ||
      formData.password.length > 12 ||
      !/[A-Z]/.test(formData.password) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(formData.password)
    ) {
      validationErrors.password =
        "Password must be 6-12 characters with at least one uppercase letter and one special character"
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Add a user to the Redux Store
    dispatch(addUser(formData))

    // Send data to the server
    const { userName, phoneNumber } = formData

    try {
      console.log("baseURL :>> ", baseURL)
      await sendData(`${baseURL}`, { name: userName, phone: phoneNumber })
      setSubmitted(true)

      setFormData({
        userName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      })

      setErrors({})

      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error("Error submitting data:", error)
    }
  }

  return (
    <FormContainer>
      <StyledTextField
        id="userName"
        name="userName"
        label="User Name"
        value={formData.userName}
        onChange={handleChange}
        error={!!errors.userName}
        helperText={errors.userName}
      />
      <StyledTextField
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
      />
      <StyledTextField
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />
      <StyledTextField
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      {submitted && (
        <p className="success-message">Data submitted successfully!</p>
      )}
    </FormContainer>
  )
}

export default Form
