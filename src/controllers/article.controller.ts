import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ArticleService } from '../services/article.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: 'Find articles' })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of articles per page',
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    description: 'Search term',
    required: false,
  })
  @ApiQuery({
    name: 'author',
    type: String,
    description: 'Author',
    required: false,
  })
  @ApiQuery({
    name: 'tags',
    type: [String],
    description: 'Tags',
    required: false,
  })
  @ApiQuery({
    name: 'title',
    type: String,
    description: 'Title',
    required: false,
  })
  @ApiQuery({
    name: 'month',
    type: String,
    description: 'Month',
    required: false,
  })
  @ApiQuery({
    name: 'deleted',
    type: String,
    description: 'Deleted articles',
    required: false,
  })
  @ApiResponse({ status: 200, description: 'List of articles' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findPaginated(
    @Query('page') page?: number,
    @Query('limit') limit = 5,
    @Query('search') search?: string,
    @Query('author') author?: string,
    @Query('tags') tags?: string[],
    @Query('title') title?: string,
    @Query('month') month?: string,
    @Query('deleted') deleted?: string,
  ) {
    const skip = (page - 1) * limit;
    const options = {
      skip,
      limit,
      search,
      monthSearch: month,
      author,
      tags,
      title,
      deleted,
    };
    console.log(options);
    const articles = await this.articleService.findAll(options);
    return { articles };
  }
}
