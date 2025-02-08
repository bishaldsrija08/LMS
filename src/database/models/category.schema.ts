import mongoose, { Schema } from "mongoose";

interface Icategory extends Document {
    name: string,
    description?: string,
    createdAt: Date
}

const categorySchema = new Schema<Icategory>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)
export default Category