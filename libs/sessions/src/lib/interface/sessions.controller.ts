import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('sessions')
@ApiTags('sessions')
export class SessionsController {}
