import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtId: Schema.Types.ObjectId,
    text: string,
    createdAt: Date,
    username: string,
    reactions: Schema.Types.ObjectId[]
};

// const assignmentSchema = new Schema<IAssignment>(
//     {
//         assignmentId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId(),
//         },
//         name: {
//             type: String,
//             required: true,
//             maxlength: 50,
//             minlength: 4,
//             default: 'Unnamed assignment',
//         },
//         score: {
//             type: Number,
//             required: true,
//             default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
//         },
//     },
//     {
//         timestamps: true,
//         _id: false
//     }
// );

const userSchema = new Schema<IUser>({
    userId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    username: {
        type: String,
        required: true,
        max_length: 50,
        minlength: 4,
    },
    email: {
        type: String,
        required: true,
        max_length: 50,
    },
    thoughts: [{
     type: Schema.Types.ObjectId,
        ref: 'thought',   
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
},
    {
        toJSON: {
            getters: true,
        },
        timestamps: true
    }
);

const User = model('User', userSchema);

export default User;
