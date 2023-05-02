import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Document & {
  _id: string;
  title: string;
  content: string;
  author: string;
  created_at: Date;
  _tags: string[];
};

@Schema()
export class Article {
  @Prop()
  created_at: Date;

  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  author: string;

  @Prop()
  points: number;

  @Prop()
  story_text: string;

  @Prop()
  comment_text: string;

  @Prop()
  num_comments: number;

  @Prop()
  story_id: number;

  @Prop()
  story_title: string;

  @Prop()
  story_url: string;

  @Prop()
  parent_id: number;

  @Prop()
  created_at_i: number;

  @Prop({ type: [String] })
  _tags: string[];

  @Prop()
  objectID: string;
}

export const ARTICLE_DOCUMENT_KEYS = [
  '_id',
  'title',
  'content',
  'author',
  'created_at',
  '_tags',
] as const;

export const ArticleSchema = SchemaFactory.createForClass(Article);
