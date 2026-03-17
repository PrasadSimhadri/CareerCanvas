import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
    user: mongoose.Types.ObjectId;
    username: string;
    rating: number;
    comment: string;
    isSuggestion: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        isSuggestion: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
