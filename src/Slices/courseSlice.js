import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../services/api'

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const res = await API.get('/courses')
  return res.data
})

export const createCourse = createAsyncThunk('courses/createCourse', async (data) => {
  const res = await API.post('/courses', data)
  return res.data
})

const courseSlice = createSlice({
  name: 'courses',
  initialState: { courses: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload)
      })
  }
})

export default courseSlice.reducer
