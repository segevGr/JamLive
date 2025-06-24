import { Controller, Get, Query, Param } from '@nestjs/common';
import { SongsService } from './songs.service';
import { UserRole } from 'src/users/user.schema';
import { Roles } from 'src/common/decorators/roles.decorator';

@Roles(UserRole.ADMIN)
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('search')
  search(
    @Query('query') query?: string,
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ) {
    const parsedLimit = parseInt(limit, 10);
    const parsedOffset = parseInt(offset, 10);
    return this.songsService.search(query, parsedLimit, parsedOffset);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.songsService.getById(id);
  }
}
