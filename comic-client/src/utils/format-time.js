import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}
export function isWithinTwoMinutes(date) {
  let distance = fToNow(date);

  // Kiểm tra nếu khoảng cách là "2 minutes ago" và nếu số phút là nhỏ hơn 2
  if ((distance.includes('minute') && parseInt(distance) < 2) ||distance.includes('less')) {
    return true; // Khoảng cách nhỏ hơn 2 phút
  }

  return false; // Khoảng cách lớn hơn hoặc bằng 2 phút
}
export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
