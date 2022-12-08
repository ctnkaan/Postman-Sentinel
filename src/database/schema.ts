import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

export default mongoose.model("scam_msgs", schema, "scam_msgs");
