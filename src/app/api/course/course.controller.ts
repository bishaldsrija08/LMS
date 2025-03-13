import dbConnect from "@/database/connection";
import Course from "@/database/models/course.schema";

export async function createCourse(req: Request) {
    try {
        await dbConnect()
        const { title, description, price, duration, category } = await req.json()
        const data = await Course.create({
            title: title,
            description: description,
            price: price,
            duration: duration,
            category: category
        })
        return Response.json({
            message: "Course  created!",
            data
        }, { status: 201 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something went wrong!",
        }, { status: 500 })
    }
}

export async function fetchCourses() {
    try {
        await dbConnect()
        const data = await Course.find().populate("Category") // returns array
        if (data.length === 0) {
            return Response.json({
                message: "No course found!"
            }, { status: 404 })
        }
        return Response.json({
            message: "Course fetch successfully!",
            data
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}

export async function fetchCourse(id: string) {
    try {
        await dbConnect()
        const data = await Course.findById(id) //objeet return {}
        if (!data) {
            return Response.json({
                message: "No course with that id found!"
            }, { status: 404 })
        }
        return Response.json({
            message: "Course fetch successfully!",
            data
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}

export async function deleteCourse(id: string) {
    try {
        await dbConnect()
        await Course.findByIdAndDelete(id) //objeet return {}
        return Response.json({
            message: "Course deleted",
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something  went Wrong!"
        }, { status: 500 })
    }
}