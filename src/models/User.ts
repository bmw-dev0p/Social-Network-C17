import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[]
};

// not required, but wanted username to be displayed in the friend list
const friendSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    username: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        virtuals: false,
    }
}
);

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
    friends: [friendSchema], // Embed the friend subdocument
},
{
    toJSON: {
        getters: true,
        virtuals: false,
        versionKey: false,
    },
    timestamps: true
});


const User = model('User', userSchema);

export default User;
