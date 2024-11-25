import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }
  try {
    await mongoose.connect(
      MONGODB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions,
    )
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}
