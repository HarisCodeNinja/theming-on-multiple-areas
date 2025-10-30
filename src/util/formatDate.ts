import { DATE_FORMATE, DATE_TIME_FORMATE, TIMESTAMP_FORMATE, TIME_FORMATE, OFF_SET } from '@/config/constant';
type DateType = 'DATE' | 'DATE_TIME' | 'MONTH' | 'WEEK' | 'TIMESTAMP' | 'TIME';

/**
 * Formats an ISO date string according to the provided type and time zone.
 * 
 * @param isoString - ISO date string (e.g., '2025-10-27T10:30:00Z')
 * @param type - The desired format type (default 'DATE')
 * @param timeZone - The target time zone (default 'UTC')
 * @returns A formatted date string
 */
export const formatDate = (isoString: string, type: DateType = 'DATE', _timeZone: string = 'UTC'): string => {
  if (!isoString) return '';

  // Parse date and apply OFF_SET (assumed minutes) before formatting
  const originalDate = new Date(isoString);
  const parseOffsetToMinutes = (raw: unknown): number => {
    if (raw === null || raw === undefined) return 0;
    const value = String(raw).trim();
    if (!value) return 0;

    // Case 1: plain integer minutes, e.g., "330" or "-120"
    if (/^-?\d+$/.test(value)) {
      const minutes = Number(value);
      return Number.isFinite(minutes) ? minutes : 0;
    }

    // Case 2: "+HH:mm" or "-HH:mm"
    const hhmmColon = /^([+-])?(\d{1,2}):(\d{2})$/;
    const m1 = value.match(hhmmColon);
    if (m1) {
      const sign = m1[1] === '-' ? -1 : 1;
      const hours = Number(m1[2]);
      const minutes = Number(m1[3]);
      if (hours <= 23 && minutes <= 59) {
        return sign * (hours * 60 + minutes);
      }
    }

    // Case 3: "+HHmm" or "-HHmm"
    const hhmm = /^([+-])?(\d{2})(\d{2})$/;
    const m2 = value.match(hhmm);
    if (m2) {
      const sign = m2[1] === '-' ? -1 : 1;
      const hours = Number(m2[2]);
      const minutes = Number(m2[3]);
      if (hours <= 23 && minutes <= 59) {
        return sign * (hours * 60 + minutes);
      }
    }

    // Fallback: attempt Number(); else no offset
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const offsetMinutes = parseOffsetToMinutes(OFF_SET);
  const dateWithOffset = new Date(originalDate.getTime() + offsetMinutes * 60 * 1000);

  const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const formatWithPattern = (date: Date, pattern: string): string => {
    const YYYY = date.getFullYear().toString();
    const MM = pad2(date.getMonth() + 1);
    const DD = pad2(date.getDate());
    const HH = pad2(date.getHours());
    const mm = pad2(date.getMinutes());
    const ss = pad2(date.getSeconds());

    return pattern
      .replace(/YYYY/g, YYYY)
      .replace(/MM/g, MM)
      .replace(/DD/g, DD)
      .replace(/HH/g, HH)
      .replace(/mm/g, mm)
      .replace(/ss/g, ss);
  };

  switch (type) {
    case 'DATE':
      return formatWithPattern(dateWithOffset, DATE_FORMATE.display);

    case 'DATE_TIME':
      return formatWithPattern(dateWithOffset, DATE_TIME_FORMATE.display);

    case 'TIMESTAMP':
      return formatWithPattern(dateWithOffset, TIMESTAMP_FORMATE.display);

    case 'TIME':
      return formatWithPattern(dateWithOffset, TIME_FORMATE.display);

    case 'MONTH': {
      // Fallback to a readable month-year if no explicit pattern provided
      return `${dateWithOffset.toLocaleString('en-US', { month: 'long' })} ${dateWithOffset.getFullYear()}`;
    }

    case 'WEEK': {
      // Compute ISO week number manually (based on UTC to keep consistency)
      const tempDate = new Date(Date.UTC(
        dateWithOffset.getFullYear(),
        dateWithOffset.getMonth(),
        dateWithOffset.getDate()
      ));
      const dayNum = tempDate.getUTCDay() || 7;
      tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
      const weekNum = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
      return `Week ${weekNum}, ${tempDate.getUTCFullYear()}`;
    }

    default:
      return formatWithPattern(dateWithOffset, DATE_FORMATE.display);
  }
};