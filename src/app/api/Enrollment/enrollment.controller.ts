import dbConnect from "@/database/connection";
import Course from "@/database/models/course.schema";
import Enrollment from "@/database/models/enrollment.schema";
import Lesson from "@/database/models/lesson.schema";

export async function enrollCourse(req: Request) {
    try {
        await dbConnect()
        const { course,whatsApp } = await req.json()
        const data = await Enrollment.create({
            course,
            whatsApp,
            Student: "1"
        })
        return Response.json({
            message: "you're enrolled in the course!",
            data
        }, { status: 201 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something went wrong!",
        }, { status: 500 })
    }
}

export async function fetchEnrollments() {
    try {
        await dbConnect()
        const data = await Enrollment.find().populate("course").populate("student") // returns array
        if (data.length === 0) {
            return Response.json({
                message: "No Enrollment found!"
            }, { status: 404 })
        }
        return Response.json({
            message: "Enrollment fetch successfully!",
            data
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}

export async function fetchEnrollment(id: string) {
    try {
        await dbConnect()
        const data = await Enrollment.findById(id).populate("course").populate("student") //objeet return {}
        if (!data) {
            return Response.json({
                message: "No Enrollment with that id found!"
            }, { status: 404 })
        }
        return Response.json({
            message: "Enrollment fetch successfully!",
            data
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}

export async function changeEnrollmentStatus(req:Request,id:string){
    try {
        await dbConnect()
        const {status} = await req.json()
        const data = await Enrollment.findByIdAndUpdate(id,{
            enrollmetntStatuss: status
        })
        return Response.json({
            message: "Enrollment status updated!",
            data
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}

export async function deleteEnrollment(id: string) {
    try {
        await dbConnect()
        await Enrollment.findByIdAndDelete(id) //objeet return {}
        return Response.json({
            message: "Enrollment deleted",
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}