import { Schema, model, models } from 'mongoose'
import { ObjectId } from 'mongodb'
export interface UserReposDocument {
  _id: ObjectId
  Id_stores: number
  Id_User: ObjectId
  Content: string
  Date_time: string
  Image_content: string
  Label: string
  Title: string
  Total_viewer: string
  status: boolean
  Tags_Article1: string
  Tags_Article2: string
  Tags_Article3: string
}
const UserReposSchema = new Schema<UserReposDocument>(
  {
    Id_stores: { type: Number, required: true },
    Id_User: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    Content: { type: String, required: false },
    Date_time: { type: String, required: false },
    Image_content: { type: String, required: false },
    Label: { type: String, required: false },
    Title: { type: String, required: false },
    Total_viewer: { type: String, required: false },
    status: { type: Boolean, default: true },
    Tags_Article1: { type: String, required: false },
    Tags_Article2: { type: String, required: false },
    Tags_Article3: { type: String, required: false },
  },
  { timestamps: true },
)
const user_repos = models.user_repos || model<UserReposDocument>('user_repos', UserReposSchema)

export default user_repos
