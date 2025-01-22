import { Schema, model } from 'mongoose';

const RecommendationSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    meeting: {
        type: Schema.Types.ObjectId,
        ref: 'Meeting',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['en attente', 'en cours', 'terminée'],
        default: 'en attente'
    },
    finishTo: {
        type: Date,
        required: true
    },
});

const Recommendation =  model('Recommendation', RecommendationSchema);


export async function findAll() {
    return await Recommendation.find().populate("meeting assignedTo");
}

export async function create(recommendationData) {
    const recommendation = new Recommendation(recommendationData);
    return await recommendation.save();
}

export async function findById(id) {
    return await Recommendation.findById(id).populate("meeting assignedTo");
}

export async function deleteOne(id) {
    return await Recommendation.deleteOne(id);
}


export async function update(id, recommendationData) {
    return await Recommendation.findByIdAndUpdate(id, recommendationData, { new: true });
}

export async function remove(id) {
    return await Recommendation.deleteOne({ _id: id });
}

export default Recommendation;
