import { Controller, Get, Query, Param } from '@nestjs/common';
import { SongsService } from './songs.service';
import { UserRole } from 'src/users/user.schema';
import { Roles } from 'src/common/decorators/roles.decorator';

@Roles(UserRole.ADMIN)
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('search')
  search(@Query('q') query: string) {
    return this.songsService.search(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.songsService.getById(id);
  }
}
