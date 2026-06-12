import { Controller, Get, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetSessionsByUserIdUseCase } from '../application/get-sessions-by-user-id/get-sessions-by-user-id.use-case';
import { GetSessionsByUserIdQuery } from '../application/get-sessions-by-user-id/get-sessions-by-user-id.query';
import { SessionResponseDto } from './dto/session-response.dto';
import { GetSessionsByUserIdDto } from './dto/get-sessions-by-user-id.dto';
import { ISession } from '@amt-assistant/contracts';

@ApiTags('sessions')
@ApiBearerAuth()
@Controller('sessions')
export class SessionsController {
  constructor(private readonly getSessionsByUserIdUseCase: GetSessionsByUserIdUseCase) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get sessions by user id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The sessions have been successfully retrieved.',
    type: [SessionResponseDto],
  })
  async getSessionsByUserId(@Param() dto: GetSessionsByUserIdDto): Promise<ISession[]> {
    const query = new GetSessionsByUserIdQuery(dto.userId);
    const sessions = await this.getSessionsByUserIdUseCase.execute(query);
    return sessions.map(session => SessionResponseDto.fromEntity(session));
  }
}
