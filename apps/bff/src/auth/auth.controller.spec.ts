import { AuthController } from './auth.controller';
import { User } from './interfaces/user.interface';

describe('AuthController', () => {
  let authController: AuthController;
  let authService;

  beforeEach(() => {
    authService = { signIn: () => Promise.resolve({} as User) };
    authController = new AuthController(authService);
  });

  describe('signIn', () => {
    it('should authenticate the user', async () => {
      const mockUser: User = {
        name: 'John',
        email: '',
        dob: new Date(),
        password: '',
      };
      jest
        .spyOn(authService, 'signIn')
        .mockImplementation(() => Promise.resolve(mockUser));

      expect(
        await authController.signIn({
          email: 'test@test.com',
          password: '1234',
        })
      ).toBe(mockUser);
    });
  });
});
