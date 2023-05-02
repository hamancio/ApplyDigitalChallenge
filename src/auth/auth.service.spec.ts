import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User } from '../schemas/user.schema';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => 'test_token'),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('generateToken', () => {
    it('should return a valid JWT token', async () => {
      const mockUser = new User();
      mockUser._id = 'test_id';
      mockUser.username = 'test_username';
      jest
        .spyOn(jwtService, 'signAsync')
        .mockImplementation(async () => 'test_token');

      const token = await authService.generateToken(mockUser);

      expect(token).toBe('test_token');
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        username: mockUser.username,
        sub: mockUser._id,
      });
    });
  });

  describe('verifyPassword', () => {
    it('should return true if the password is correct', async () => {
      const plainTextPassword = 'test_password';
      const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

      const result = await authService.verifyPassword(
        plainTextPassword,
        hashedPassword,
      );

      expect(result).toBe(true);
    });

    it('should return false if the password is incorrect', async () => {
      const plainTextPassword = 'test_password';
      const incorrectPassword = 'incorrect_password';
      const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

      const result = await authService.verifyPassword(
        incorrectPassword,
        hashedPassword,
      );

      expect(result).toBe(false);
    });
  });
});
