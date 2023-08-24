import { MessagePatternCommand } from '../models/message-pattern-command.model';

export const registerAccountCommand: MessagePatternCommand<void> = {
  cmd: 'register_account',
};
