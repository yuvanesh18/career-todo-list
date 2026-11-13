/**
 * Helper to get local date string in YYYY-MM-DD format based on local calendar (not UTC)
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates current active streak days based on local calendar.
 * - If completed today: streak counts backwards consecutively.
 * - If not completed today, but completed yesterday: streak is still active from yesterday.
 * - Otherwise: streak is 0.
 */
export function calculateStreak(completedDatesList: (string | null | undefined)[]): number {
  const validDates = new Set(
    completedDatesList
      .filter((d): d is string => typeof d === 'string' && d.length === 10)
  );

  const todayStr = getLocalDateString(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getLocalDateString(yesterday);

  let streak = 0;
  let checkDate: Date;

  if (validDates.has(todayStr)) {
    checkDate = new Date();
  } else if (validDates.has(yesterdayStr)) {
    checkDate = yesterday;
  } else {
    return 0;
  }

  while (true) {
    const dStr = getLocalDateString(checkDate);
    if (validDates.has(dStr)) {
      streak++;
      checkDate = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
