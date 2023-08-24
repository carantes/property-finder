import axios from 'axios';

describe('Accounts', () => {
  describe('POST /api/v1/accounts/register', () => {
    it('should create a new user if required data is provided', async () => {
      const res = await axios.post(`/api/v1/accounts/register`, {
        username: 'carantes',
        password: '1234',
        confirmPassword: '1234',
        name: 'Carlos Arantes',
        email: 'name@email.com',
      });

      expect(res.status).toBe(200);
      // expect(res.data).toEqual({ accessToken: '1234', refreshToken: '1234' });
    });
  });
});
