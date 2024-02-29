import axios from 'axios'
import { createError, createUrl } from '../../config/utils'


export async function signupUser(firstName, lastName, email, password, phone) {
  try {
    const url = createUrl('user/signup')
    const body = {
      firstName,
      lastName,
      email,
      password,
      phone,
    }
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return createError
  }
}

export async function signinUser(email, password) {
  try {
    const url = 'http://localhost:4001/user/signin'
    const body = {
      email,
      password,
    }
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return createError(ex)
  }
}
