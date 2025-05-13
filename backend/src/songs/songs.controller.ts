import { Controller, Get, Query, Param } from '@nestjs/common';
import { SongsService } from './songs.service';
import { UserRole } from 'src/users/user.schema';
import { Roles } from 'src/common/decorators/roles.decorator';

@Roles(UserRole.ADMIN)
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('search')
  search(@Query('query') query?: string, @Query('limit') limit: string = '15') {
    const parsedLimit = parseInt(limit, 10);
    return this.songsService.search(query, parsedLimit);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.songsService.getById(id);
  }
}
