import { UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UserService,
          useValue: {
            validate: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('validate', () => {
    it('should return user if valid', async () => {
      const payload = { username: 'testuser' };
      const user = new User();
      user.username = 'testuser';
      jest.spyOn(userService, 'validate').mockResolvedValue(user);
      const result = await jwtStrategy.validate(payload);
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if invalid', async () => {
      const payload = { username: 'testuser' };
      jest.spyOn(userService, 'validate').mockResolvedValue(null);
      await expect(jwtStrategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
