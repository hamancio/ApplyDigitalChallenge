import { Test } from '@nestjs/testing';
import { ArticleModel } from '../modules/article.module';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let articleService: ArticleService;
  let articleModel: ArticleModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: ArticleModel,
          useValue: {
            findAll: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    articleService = moduleRef.get<ArticleService>(ArticleService);
    articleModel = moduleRef.get<ArticleModel>(ArticleModel);
  });

  describe('findAll method', () => {
    it('should return an array of articles when given search parameters', async () => {
      // Arrange
      const mockSearchParams = {
        skip: 0,
        limit: 10,
        search: 'test',
        monthSearch: '05/2023',
        author: 'test_author',
        tags: ['test_tag'],
        title: 'test_title',
      };
      const mockArticles = [
        {
          id: '1',
          title: 'Test Article 1',
          content: 'This is a test article 1',
          author: 'Test Author 1',
          tags: ['test_tag1', 'test_tag2'],
          createdAt: new Date('2023-05-01T00:00:00Z'),
          updatedAt: new Date('2023-05-01T00:00:00Z'),
        },
        {
          id: '2',
          title: 'Test Article 2',
          content: 'This is a test article 2',
          author: 'Test Author 2',
          tags: ['test_tag2', 'test_tag3'],
          createdAt: new Date('2023-05-02T00:00:00Z'),
          updatedAt: new Date('2023-05-02T00:00:00Z'),
        },
      ];
      jest.spyOn(articleModel, 'findAll').mockResolvedValue(mockArticles);

      // Act
      const result = await articleService.findAll(mockSearchParams);

      // Assert
      expect(result).toEqual(mockArticles);
      expect(articleModel.findAll).toHaveBeenCalledWith(
        mockSearchParams.skip,
        mockSearchParams.limit,
        mockSearchParams.search,
        mockSearchParams.monthSearch,
        mockSearchParams.author,
        mockSearchParams.tags,
        mockSearchParams.title,
      );
    });

    it('should return an error when an invalid search parameter is provided', async () => {
      // Arrange
      const mockSearchParams = {
        skip: 0,
        limit: 10,
        invalidParam: 'invalid',
      };

      // Act
      try {
        await articleService.findAll(mockSearchParams);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid search parameter');
      }
    });
  });
});
