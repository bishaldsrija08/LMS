import mongoose, { Schema } from "mongoose";

enum status {
    Completed = "completed",
    Pending = "pending",
    Failed = "Failed"
}

interface Ipayment extends Document {
    student: mongoose.Types.ObjectId,
    course: mongoose.Types.ObjectId,
    ammout: number,
    status: status
}

const paymentSchema = new Schema<Ipayment>({
    student: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    ammout: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [status.Completed, status.Failed, status.Pending],
        default: status.Pending
    }
})

const Payment = mongoose.model("Payment", paymentSchema)
export default Payment
