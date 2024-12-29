import { ObjectId } from 'mongodb'
import mongoose, { Schema, model } from 'mongoose'

export interface UserDocument {
  _id: ObjectId
  email: string
  name: string
  password: string
  phone: string
  image: string
  publicId: string
  description: string
  follower: number
  viewerprofile: number
  experienttags: string
  message: string
  status: boolean
  id_rating: number
  id_stogare: number
  createdAt: Date
  updatedAt: Date
  user_tags1: string
  user_tags2: string
  user_tags3: string
}
const UserSchema = new Schema<UserDocument>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new ObjectId(),
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    phone: {
      type: String,
      required: false,
    },
    image: { type: String, default: '' }, // Stores the Cloudinary image URL
    publicId: { type: String, default: '' }, // Stores the Cloudinary public ID
    description: {
      type: String,
      required: false,
    },
    follower: {
      type: Number,
      default: 0,
    },
    viewerprofile: {
      type: Number,
      default: 0,
    },
    experienttags: {
      type: String,
      required: false,
    },
    user_tags1: {
      type: String,
      required: false,
    },
    user_tags2: {
      type: String,
      required: false,
    },
    user_tags3: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    id_rating: {
      type: Number,
      required: false,
    },
    id_stogare: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema)

export default User
