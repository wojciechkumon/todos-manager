import { format, parseISO } from 'date-fns';

export const formatDateTime = (date: Date) => format(date, 'dd.MM.yyyy HH:mm');

export const parseIsoDateTime = (dateTimeString: string): Date =>
  parseISO(dateTimeString);
