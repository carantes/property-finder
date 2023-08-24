import { MessagePatternCommand } from '../models/message-pattern-command.model';

export const signInCommand: MessagePatternCommand<void> = {
  cmd: 'sign_in',
};
