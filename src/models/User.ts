import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[]
};

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        max_length: 50,
    },
    email: {
        type: String,
        required: true,
        max_length: 50,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'], // regex for email validation
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
            virtuals: false,
            versionKey: false,
        },
        timestamps: true
    }
);

const User = model('User', userSchema);

export default User;
