import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { NoRolesRequired, Public, Roles } from '../../common/decorators';
import { Role } from '../../core/users/role.enum';

@Controller('comments')
@ApiTags('Comments')
@Roles(Role.AUTHOR, Role.ADMIN)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @Public()
  // @Roles(Role.USER)
  @NoRolesRequired()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
