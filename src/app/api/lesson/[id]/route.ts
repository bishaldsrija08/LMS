import dbConnect from "@/database/connection";
import { deleteLesson, fetchLesson } from "../lesson.controller";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    await dbConnect()
    const { id } = await params
    return fetchLesson(id)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await dbConnect()
    const { id } = await params
    return deleteLesson(id)
}