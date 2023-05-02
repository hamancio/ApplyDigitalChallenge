import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { ArticleModel } from './models/article.model';

describe('ArticleModel', () => {
  let articleService: ArticleModel;
  let mockArticleModel: jest.Mocked<Model<ArticleDocument & Document>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleModel,
        {
          provide: getModelToken(Article.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    articleService = module.get<ArticleModel>(ArticleModel);
    mockArticleModel = module.get(getModelToken(Article.name));
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const article: Article = {
        created_at: new Date(),
        title: 'Some Title',
        url: 'http://example.com',
        author: 'John Doe',
        points: 10,
        story_text: 'Some story text',
        comment_text: 'Some comment text',
        num_comments: 5,
        story_id: 123,
        story_title: 'Some Story Title',
        story_url: 'http://example.com/story',
        parent_id: 456,
        created_at_i: 1234567890,
        _tags: ['tag1', 'tag2'],
        objectID: 'someObjectId',
      };
      const createdArticle: Article = {
        created_at: new Date(),
        title: 'Some Title',
        url: 'http://example.com',
        author: 'John Doe',
        points: 10,
        story_text: 'Some story text',
        comment_text: 'Some comment text',
        num_comments: 5,
        story_id: 123,
        story_title: 'Some Story Title',
        story_url: 'http://example.com/story',
        parent_id: 456,
        created_at_i: 1234567890,
        _tags: ['tag1', 'tag2'],
        objectID: 'someObjectId',
      };
      const result = await articleService.create(article);
      expect(result).toEqual(createdArticle);
    });
  });
});
