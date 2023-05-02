import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const mockUsername = 'user123';
      const mockPassword = 'password123';

      const mockUserDocument = {
        id: '1',
        username: mockUsername,
        password: mockPassword,
      } as UserDocument;

      jest
        .spyOn(userModel.prototype, 'save')
        .mockResolvedValueOnce(mockUserDocument);

      const result = await userService.create(mockUsername, mockPassword);

      expect(result).toEqual(mockUserDocument);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
      expect(userModel.prototype.save).toHaveBeenCalledWith();
      expect(userModel).toHaveBeenCalledWith({
        username: mockUsername,
        password: expect.any(String),
      });
    });
  });

  describe('findByUsername', () => {
    it('should find a user by username', async () => {
      const mockUsername = 'user123';

      const mockUserDocument = {
        id: '1',
        username: mockUsername,
        password: 'password123',
      } as UserDocument;

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(mockUserDocument);

      const result = await userService.findByUsername(mockUsername);

      expect(result).toEqual(mockUserDocument);
      expect(userModel.findOne).toHaveBeenCalledWith({
        username: mockUsername,
      });
    });

    it('should return null when user not found', async () => {
      const mockUsername = 'user123';

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

      const result = await userService.findByUsername(mockUsername);

      expect(result).toBeNull();
      expect(userModel.findOne).toHaveBeenCalledWith({
        username: mockUsername,
      });
    });
  });

  describe('validate', () => {
    it('should return a user if username and password are valid', async () => {
      const mockUsername = 'user123';
      const mockPassword = 'password123';

      const mockUserDocument = {
        id: '1',
        username: mockUsername,
        password: await bcrypt.hash(mockPassword, 10),
      } as UserDocument;

      jest
        .spyOn(userService, 'findByUsername')
        .mockResolvedValueOnce(mockUserDocument);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await userService.validate({
        username: mockUsername,
        password: mockPassword,
      });

      expect(result).toEqual(mockUserDocument);
      expect(userService.findByUsername).toHaveBeenCalledWith(mockUsername);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockPassword,
        mockUserDocument.password,
      );
    });
    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockUsername = 'user123';
      const mockPassword = 'password123';

      const mockUserDocument = {
        id: '1',
        username: mockUsername,
        password: await bcrypt.hash('password456', 10),
      } as UserDocument;

      jest
        .spyOn(userService, 'findByUsername')
        .mockResolvedValueOnce(mockUserDocument);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      await expect(
        userService.validate({
          username: mockUsername,
          password: mockPassword,
        }),
      ).rejects.toThrow(UnauthorizedException);
      expect(userService.findByUsername).toHaveBeenCalledWith(mockUsername);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockPassword,
        mockUserDocument.password,
      );
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const mockUsername = 'user123';
      const mockPassword = 'password123';

      jest.spyOn(userService, 'findByUsername').mockResolvedValueOnce(null);

      await expect(
        userService.validate({
          username: mockUsername,
          password: mockPassword,
        }),
      ).rejects.toThrow(UnauthorizedException);
      expect(userService.findByUsername).toHaveBeenCalledWith(mockUsername);
    });
  });
});
