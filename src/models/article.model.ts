import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';

@Injectable()
export class ArticleModel {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) { }

  async findAll(
    skip = 0,
    limit = 5,
    search?: string,
    monthSearch?: string,
    author?: string,
    tags?: string[],
    title?: string,
  ) {
    const query: any = {};

    if (author) query.author = new RegExp(author, 'i');
    if (title) query.title = new RegExp(title, 'i');
    if (tags && tags.length > 0) query._tags = { $in: tags };
    if (monthSearch) {
      const validMonthRegex = /^(january|february|march|april|may|june|july|august|september|october|november|december)$/i;
      const match = validMonthRegex.exec(monthSearch);
      if (match) {
        const year = new Date().getFullYear();
        const monthNumber = new Date(Date.parse(monthSearch + ' 1, ' + year)).getMonth() + 1;
        query.created_at = { $gte: new Date(`${year}-${monthNumber}-01`), $lt: new Date(`${year}-${monthNumber + 1}-01`) };
      } else {
        console.error('Invalid month: ' + monthSearch);
      }
    }

    if (search) {
      query.$or = [
        { author: new RegExp(search, 'i') },
        { title: new RegExp(search, 'i') },
      ];
    }
    console.log(query);
    const articles = await this.articleModel
      .find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return articles;
  }


  async remove(id: string) {
    return this.articleModel.findByIdAndDelete(id).exec();
  }

  async findOne(query: Article) {
    return this.articleModel.findOne(query).exec();
  }

  async create(article: Article) {
    const createdArticle = new this.articleModel(article);
    return createdArticle.save();
  }

  async findOneOrCreate(article: Article) {
    try {
      let existingArticle = await this.findOne(article);
      if (!existingArticle) {
        existingArticle = await this.create(article);
      }
      return existingArticle;
    } catch (error) {
      // Manejar el error aquí, como lanzar una excepción personalizada
    }
  }
}
