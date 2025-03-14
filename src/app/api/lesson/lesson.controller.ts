import dbConnect from "@/database/connection";
import Course from "@/database/models/course.schema";
import Lesson from "@/database/models/lesson.schema";

export async function createLesson(req: Request) {
    try {
        await dbConnect()
        const { title, description, videoUrl, course } = await req.json()
        const data = await Course.create({
            title,
            description,
            videoUrl,
            course
        })
        return Response.json({
            message: "Lesson  created!",
            data
        }, { status: 201 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something went wrong!",
        }, { status: 500 })
    }
}

export async function fetchLessons() {
    try {
        await dbConnect()
        const data = await Lesson.find().populate("course") // returns array
        if (data.length === 0) {
            return Response.json({
                message: "No Lesson found!"
            }, { status: 404 })
        }
        return Response.json({
            message: "Lesson fetch successfully!",
            data
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}

export async function fetchLesson(id: string) {
    try {
        await dbConnect()
        const data = await Lesson.findById(id) //objeet return {}
        if (!data) {
            return Response.json({
                message: "No Lesson with that id found!"
            }, { status: 404 })
        }
        return Response.json({
            message: "Lesson fetch successfully!",
            data
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}

export async function deleteLesson(id: string) {
    try {
        await dbConnect()
        await Course.findByIdAndDelete(id) //objeet return {}
        return Response.json({
            message: "Lessonde deleted",
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}