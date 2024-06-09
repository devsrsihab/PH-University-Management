import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'student', 'faculty'],
        message: "{VALUE} is not valid. Allowed values are 'admin', 'student', or 'teacher'",
      },
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
        message: "{VALUE} is not valid. Allowed values are 'in-progress' or 'blocked'",
      },
      default: 'in-progress',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// pre middleware / hook: we will work ot it create() save()
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hasing password
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  // next step
  next();
});
// post middleware / hook: we will work ot it create() save()
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// user exist cusotm static method
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id });
};
// user exist cusotm static method
userSchema.statics.isPasswordMatch = async function (plainTextPassword: string, hashedPassword:string) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// make model
export const User = model<TUser, UserModel>('User', userSchema);
