import { withReauth } from './withReAuth';
import { refreshToken } from '@/services/auth/authApi';
import { setAccessToken } from '@/store/features/authSlice';

jest.mock('@/services/auth/authApi', () => ({
  refreshToken: jest.fn(),
}));

jest.mock('@/store/features/authSlice', () => ({
  setAccessToken: jest.fn((token) => ({
    type: 'auth/setAccessToken',
    payload: token,
  })),
}));

const mockedRefreshToken = refreshToken as jest.MockedFunction<
  typeof refreshToken
>;

const mockedSetAccessToken = setAccessToken as jest.MockedFunction<
  typeof setAccessToken
>;

describe('withReauth', () => {
  const access = 'old-access-token';
  const refresh = 'refresh-token';

  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('возвращает результат API при успешном запросе', async () => {
    const apiFunction = jest
      .fn()
      .mockResolvedValue({ data: 'success' });

    const result = await withReauth(
      apiFunction,
      access,
      refresh,
      dispatch,
    );

    expect(result).toEqual({ data: 'success' });

    expect(apiFunction).toHaveBeenCalledTimes(1);
    expect(apiFunction).toHaveBeenCalledWith(access);

    expect(mockedRefreshToken).not.toHaveBeenCalled();
  });

  it('обновляет токен после ошибки 401 и повторяет запрос', async () => {
    const newAccess = 'new-access-token';

    mockedRefreshToken.mockResolvedValue({
      access: newAccess,
    });

    const error401 = {
      response: {
        status: 401,
      },
    };

    const apiFunction = jest
      .fn()
      .mockRejectedValueOnce(error401)
      .mockResolvedValueOnce({ data: 'success' });

    const result = await withReauth(
      apiFunction,
      access,
      refresh,
      dispatch,
    );

    expect(result).toEqual({ data: 'success' });

    expect(apiFunction).toHaveBeenCalledTimes(2);

    expect(apiFunction).toHaveBeenNthCalledWith(
      1,
      access,
    );

    expect(apiFunction).toHaveBeenNthCalledWith(
      2,
      newAccess,
    );

    expect(mockedRefreshToken).toHaveBeenCalledTimes(1);
    expect(mockedRefreshToken).toHaveBeenCalledWith(refresh);

    expect(mockedSetAccessToken).toHaveBeenCalledWith(
      newAccess,
    );

    expect(dispatch).toHaveBeenCalled();
  });

  it('пробрасывает ошибку, если статус не 401', async () => {
    const error500 = {
      response: {
        status: 500,
      },
    };

    const apiFunction = jest
      .fn()
      .mockRejectedValue(error500);

    await expect(
      withReauth(
        apiFunction,
        access,
        refresh,
        dispatch,
      ),
    ).rejects.toEqual(error500);

    expect(apiFunction).toHaveBeenCalledTimes(1);
    expect(mockedRefreshToken).not.toHaveBeenCalled();
  });

  it('пробрасывает ошибку обновления токена', async () => {
    const error401 = {
      response: {
        status: 401,
      },
    };

    const refreshError = new Error(
      'Refresh token expired',
    );

    mockedRefreshToken.mockRejectedValue(refreshError);

    const apiFunction = jest
      .fn()
      .mockRejectedValue(error401);

    await expect(
      withReauth(
        apiFunction,
        access,
        refresh,
        dispatch,
      ),
    ).rejects.toThrow('Refresh token expired');

    expect(mockedRefreshToken).toHaveBeenCalledWith(refresh);

    expect(apiFunction).toHaveBeenCalledTimes(1);
  });

  it('пробрасывает ошибку повторного запроса после обновления токена', async () => {
    const newAccess = 'new-access-token';

    mockedRefreshToken.mockResolvedValue({
      access: newAccess,
    });

    const error401 = {
      response: {
        status: 401,
      },
    };

    const retryError = new Error('Retry failed');

    const apiFunction = jest
      .fn()
      .mockRejectedValueOnce(error401)
      .mockRejectedValueOnce(retryError);

    await expect(
      withReauth(
        apiFunction,
        access,
        refresh,
        dispatch,
      ),
    ).rejects.toThrow('Retry failed');

    expect(apiFunction).toHaveBeenCalledTimes(2);

    expect(mockedRefreshToken).toHaveBeenCalledWith(refresh);
    expect(mockedSetAccessToken).toHaveBeenCalledWith(
      newAccess,
    );
  });
});