import {
  Controller,
  Delete,
  Param,
  Patch,
  Body,
  ParseIntPipe,
  Get,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ReadBookDTO, CreateBookDTO, UpdateBookDTO } from './dtos';
import { GetUser } from '../auth/user.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) { }

  @Get(':bookId')
  getBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<ReadBookDTO> {
    return this._bookService.get(bookId);
  }

  @Get()
  getBooks(): Promise<ReadBookDTO[]> {
    return this._bookService.getAll();
  }

  @Post()
  createRole(@Body() book: Partial<CreateBookDTO>): Promise<ReadBookDTO> {
    return this._bookService.create(book);
  }

  @Post()
  createRoleByAuthor(
    @Body() book: Partial<CreateBookDTO>,
    @GetUser('id') authorId: number,
  ): Promise<ReadBookDTO> {
    return this._bookService.createByAuthor(book, authorId);
  }

  @Patch(':bookId')
  updateRole(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() book: Partial<UpdateBookDTO>,
  ) {
    return this._bookService.update(bookId, book);
  }

  @Delete(':bookId')
  deleteRole(@Param('bookId', ParseIntPipe) bookId: number): Promise<void> {
    return this._bookService.delete(bookId);
  }
}
