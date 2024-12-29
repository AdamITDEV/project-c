import { Schema, model, models } from 'mongoose'
import { ObjectId } from 'mongodb'

export interface TagsDocument {
  _id: ObjectId
  Id_Tags: number
  Tag_Name: string
}

const TagsSchema = new Schema<TagsDocument>(
  {
    Id_Tags: { type: Number, required: true },
    Tag_Name: { type: String, required: true },
  },
  { timestamps: true },
)

const tags = models.tags || model<TagsDocument>('tags', TagsSchema)

export default tags
