import axios from "axios"

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url)

    return response.data
  } catch (error) {
    console.error("Error fetching data:", error.message)
    throw error
  }
}

export const sendData = async (url, data) => {
  try {
    const response = await axios.post(url, data)

    return response.data
  } catch (error) {
    console.error("Error sending data:", error.message)
    throw error
  }
}
