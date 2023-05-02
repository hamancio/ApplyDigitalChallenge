import { Injectable } from '@nestjs/common';
import { ArticleModel } from '../models/article.model';

@Injectable()
export class ArticleService {
  constructor(private readonly articleModel: ArticleModel) {}

  async findAll(options: {
    skip?: number;
    limit?: number;
    search?: string;
    monthSearch?: string;
    author?: string;
    tags?: string[];
    title?: string;
  }) {
    const { skip, limit, search, monthSearch, author, tags, title } = options;

    const articles = await this.articleModel.findAll(
      skip,
      limit,
      search,
      monthSearch,
      author,
      tags,
      title,
    );

    return articles;
  }

  async remove(id: string) {
    return this.articleModel.remove(id);
  }
}
