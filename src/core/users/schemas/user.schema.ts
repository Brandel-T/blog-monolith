import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { UserProfile } from '../interfaces/user-profile.interface';
import { Article } from '../../../blog/articles/schemas/article.schema';
import { Role } from '../role.enum';

export type CatDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
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

  @Prop({ type: String, enum: [Role.USER, Role.ADMIN, Role.AUTHOR] })
  roles: string[] = [Role.USER];
}

export const UserSchema = SchemaFactory.createForClass(User);
