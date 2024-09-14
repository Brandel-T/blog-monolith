import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserProfile } from '../interfaces/user-profile.interface';
import { Article } from '../../../blog/articles/schemas/article.schema';

export type CatDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ type: UserProfile })
  profile: UserProfile;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    required: false,
  })
  comments: Comment[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    required: false,
  })
  articles: Article[];
}

export const UserSchema = SchemaFactory.createForClass(User);
