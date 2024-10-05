import { Schema, Types, model, type Document } from 'mongoose';

interface IUser extends Document {
    userId: Schema.Types.ObjectId,
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[]
};

const userSchema = new Schema<IUser>({
    userId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    username: {
        type: String,
        required: true,
        max_length: 50,
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
