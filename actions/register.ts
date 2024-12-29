'use server'
import { connectDB } from '../config/mongodb'
import User from '../models/User'
import bcrypt from 'bcryptjs'
interface UploadAvatar {
  email: string
  password: string
  name: string
}

export const register = async (values: UploadAvatar) => {
  const { email, password, name } = values

  try {
    await connectDB()
    const userFound = await User.findOne({ email })
    if (userFound) {
      return {
        error: 'Email already exists!',
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone: '',
      image: '',
      publicId: '',
      description: 'Enter featured description',
      follower: 0,
      viewerprofile: 0,
      experienttags: '',
      message: '',
      status: false,
      id_rating: 0,
      id_stogare: 0,
    })
    const savedUser = await user.save()

    // Convert to plain object before returning
    return savedUser.toObject()
  } catch (e) {
    console.log(e)
  }
}
