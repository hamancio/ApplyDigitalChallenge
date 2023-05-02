import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ArticleModel } from './models/article.model';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'my Challenger';
  }

  constructor(private readonly articleModel: ArticleModel) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      const response = await axios.get(' https://hn.algolia.com/api/v1/search_by_date?query=nodejs');

      const { hits: articles } = response.data;
       
      for (const article of articles) {
        await this.articleModel.findOneOrCreate(article);
      }
  
      console.log('Base de datos actualizada correctamente.');
    } catch (error) {
      console.error('Ocurrió un error al actualizar la base de datos:', error);
    }
  }
}
