import { MessagePatternCommand } from '../models/message-pattern-command.model';

export const findAllPropertiesCommand: MessagePatternCommand<void> = {
  cmd: 'find_all_properties',
};
