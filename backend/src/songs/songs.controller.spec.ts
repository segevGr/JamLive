import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

describe('SongsController (unit)', () => {
  let controller: SongsController;
  let mockSongsService: Partial<SongsService>;

  beforeEach(async () => {
    mockSongsService = {
      search: jest.fn().mockReturnValue(['mockSong1', 'mockSong2']),
      getById: jest.fn().mockReturnValue({ id: '123', title: 'Mock Song' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [{ provide: SongsService, useValue: mockSongsService }],
    }).compile();

    controller = module.get<SongsController>(SongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call SongsService.search with default limit & offset', () => {
    controller.search('test');
    expect(mockSongsService.search).toHaveBeenCalledWith('test', 10, 0);
  });

  it('should call SongsService.getById with provided id', () => {
    controller.getById('123');
    expect(mockSongsService.getById).toHaveBeenCalledWith('123');
  });
});
