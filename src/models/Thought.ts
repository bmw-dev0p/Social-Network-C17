import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    text: string,
    createdAt: Date,
    username: string,
    reactions: Schema.Types.ObjectId[]
};

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    text: string,
    username: string,
    createdAt: Date
};

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        text: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
            username: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: false,
        },
        timestamps: true,
        _id: false // since we are using our own reactionId
    
    }
);

const thoughtSchema = new Schema<IThought>({
    text: {
        type: String,
        required: true,
        max_length: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
     type: String,
     required: true,   
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            // getters: true, 
            virtuals: false,
            versionKey: false,
        },
        timestamps: true
    }
);

const Thought = model('Thought', thoughtSchema);

export default Thought;
