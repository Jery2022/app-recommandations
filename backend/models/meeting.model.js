import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const MeetingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    }, 
    duration: {
        type: Number,
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Meeting = model('Meeting', MeetingSchema);

export async function findAll() {
    return await Meeting.find();
}

export async function create(meetingData) {
    const meeting = new Meeting(meetingData);
    return await meeting.save();
}

export async function findById(id) {
    return await Meeting.findById(id);
}

export async function deleteOne(id) {
    return await Meeting.deleteOne(id);
}


export async function update(id, meetingData) {
    return await Meeting.findByIdAndUpdate(id, meetingData, { new: true });
}

export async function remove(id) {
    return await Meeting.deleteOne({ _id: id });
}

export default Meeting;