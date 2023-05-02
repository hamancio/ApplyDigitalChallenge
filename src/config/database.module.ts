import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../schemas/article.schema';
import { ArticleModel } from '../models/article.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/news'),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [ArticleModel],
  exports: [ArticleModel],
})
export class DatabaseModule {}
