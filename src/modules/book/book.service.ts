import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { ReadBookDTO, UpdateBookDTO, CreateBookDTO } from './dtos';
import { plainToClass } from 'class-transformer';
import { Book } from './book.entity';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { Status } from 'src/shared/entity-status.enum';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly _bookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) { }

  async get(bookId: number): Promise<ReadBookDTO> {
    if (!bookId) {
      throw new BadRequestException('bookId must be sent');
    }

    const book: Book = await this._bookRepository.findOne(bookId, {
      where: { status: Status.ACTIVE },
    });

    if (!book) {
      throw new NotFoundException();
    }

    return plainToClass(ReadBookDTO, book);
  }

  async getAll(): Promise<ReadBookDTO[]> {
    const roles: Book[] = await this._bookRepository.find({
      where: { status: Status.ACTIVE },
    });

    return roles.map(role => plainToClass(ReadBookDTO, role));
  }

  async create(book: Partial<CreateBookDTO>): Promise<ReadBookDTO> {
    const authors: User[] = [];

    for (const authorId of book.authors) {
      const authorExists = await this._userRepository.findOne(authorId, {
        where: { status: Status.ACTIVE },
      });

      if (!authorExists) {
        throw new NotFoundException(
          `There's not an author with this Id: ${authorId}`,
        );
      }

      const isAuthor = authorExists.roles.some(
        (role: Role) => role.name === RoleType.AUTHOR,
      );

      if (!isAuthor) {
        throw new ConflictException(`This user ${authorId} is not an author`);
      }

      authors.push(authorExists);
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      authors,
    });

    return plainToClass(ReadBookDTO, savedBook);
  }

  async createByAuthor(book: Partial<CreateBookDTO>, authorId: number) {
    const author = await this._userRepository.findOne(authorId, {
      where: { status: Status.INACTIVE },
    });

    const isAuthor = author.roles.some(
      (role: Role) => role.name === RoleType.ADMIN,
    );

    if (!isAuthor) {
      throw new ConflictException(`This user ${authorId} is not an author`);
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      author,
    });

    return plainToClass(ReadBookDTO, savedBook);
  }

  async update(
    bookId: number,
    role: Partial<UpdateBookDTO>,
  ): Promise<ReadBookDTO> {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: Status.ACTIVE },
    });

    if (!bookExists) {
      throw new NotFoundException('This book does not exists');
    }

    const updatedBook = await this._bookRepository.update(bookId, role);
    return plainToClass(ReadBookDTO, updatedBook);
  }

  async delete(bookId: number): Promise<void> {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: Status.ACTIVE },
    });

    if (!bookExists) {
      throw new NotFoundException('This book does not exists');
    }

    await this._bookRepository.update(bookId, { status: Status.INACTIVE });
  }
}
