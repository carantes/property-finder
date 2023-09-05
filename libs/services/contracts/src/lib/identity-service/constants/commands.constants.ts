interface MessagePatternCommand<T> {
  cmd: string;
  payload?: T;
}

export const registerUserCommand: MessagePatternCommand<void> = {
  cmd: 'sign_up',
};

export const signInCommand: MessagePatternCommand<void> = {
  cmd: 'sign_in',
};

export const getProfileCommand: MessagePatternCommand<void> = {
  cmd: 'get_profile',
};

export const logoutCommand: MessagePatternCommand<void> = {
  cmd: 'logout',
};

export const refreshTokenCommand: MessagePatternCommand<void> = {
  cmd: 'refresh_token',
};
