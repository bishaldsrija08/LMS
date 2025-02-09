
import dbConnect from "@/database/connection"
import Category from "@/database/models/category.schema"

export async function createCategory(req: Request) {
    try {
        await dbConnect()
        const { name, description } = await req.json()

        //already exists or not
        const existingCategory = await Category.findOne({ name: name })
        if (existingCategory) {
            return Response.json({
                message: "Category is already existing"
            }, { status: 400 })
        }
        await Category.create({
            name: name,
            description: description
        })
        return Response.json({
            message: "Category created successfully!"
        }, { status: 201 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something went wrong!"
        }, { status: 500 })
    }
}

export async function getCategories() {
    try {
        await dbConnect()
        const categories = await Category.find()
        if (categories.length === 0) {
            return Response.json({
                message: "No categories found!"
            }, { status: 404 })
        }
        return Response.json({
            message: "Category fetch successfully!",
            data: categories
        }, { status: 201 }) 
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Something went wrong!"
        }, { status: 500 })
    }
}