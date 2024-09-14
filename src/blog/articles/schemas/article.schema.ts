import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { User } from '../../../core/users/schemas/user.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  content: string;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  })
  comments?: Comment[];

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  author?: User;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
