import express, { urlencoded } from "express"
import connectDB from "./database/index.js"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"

import studentRoute from './routes/AdminRoutes/studentRoute.js'
import teacherRoute from './routes/AdminRoutes/teacherRoute.js'
import noticeRoute from './routes/AdminRoutes/noticeRoute.js'

import studentNoticeRoute from './routes/TeacherRoutes/noticeRoute.js'
import assignmentRoute from './routes/TeacherRoutes/assignmentRoute.js'
import presentationRoute from './routes/TeacherRoutes/presentationRoute.js'
import resultRoute from './routes/TeacherRoutes/resultRoute.js'
import attendanceRoute from './routes/TeacherRoutes/attendanceRoute.js'

import loginRoute from './routes/loginRoute.js'
import adminLoginRoute from './routes/adminLoginRoute.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.static('public'))
app.use(cookieParser())

app.use('/api/v1/admin/students', studentRoute)
app.use('/api/v1/admin/teachers', teacherRoute)
app.use('/api/v1/admin/notices', noticeRoute)

app.use('/api/v1/teacher/notices', studentNoticeRoute)
app.use('/api/v1/teacher/assignments', assignmentRoute)
app.use('/api/v1/teacher/presentations', presentationRoute)
app.use('/api/v1/teacher/results', resultRoute)
app.use('/api/v1/teacher/attendances', attendanceRoute)

app.use('/api/v1/login', loginRoute)
app.use('/api/v1/adminLogin', adminLoginRoute)

app.use(express.urlencoded({extended: false}))   

const startServer = async () => {
    try {
        await connectDB(process.env.VITE_MONGO_URL)
        app.listen(4000, () => console.log('Server has started on port http://localhost:4000'))
    }

    catch (error) {
        console.log(error)
    }
}

app.get("/", (req, res) => {
    res.send("Sending data to '/'")
})

startServer()

