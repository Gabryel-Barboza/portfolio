/**
 * Sorts array elements using string date fields in format dd/mm/yyyy.
 * @param a first element to compare.
 * @param b second element to compare.
 * @param orient sorting direction: `'asc' || 'desc'`.
 * @returns 0 if equals, negative if a less than b or positive if a greater than b.
 */
const sortArrayByDate = (a: string, b: string, orient?: 'asc' | 'desc') => {
  try {
    const [dayA, monthA, yearA] = a.split('/').map(Number);
    const [dayB, monthB, yearB] = b.split('/').map(Number);

    const dateA = new Date(yearA, monthA, dayA);
    const dateB = new Date(yearB, monthB, dayB);

    return orient === 'desc'
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  } catch {
    console.log(
      `Invalid arguments received: ${a}, ${b}. Please use Date objects in ISO 86001 format for sorting.`
    );

    return 0;
  }
};

export { sortArrayByDate };
