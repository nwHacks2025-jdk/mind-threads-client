export function formatDate(date: [number, number, number]): string {
  const [year, month, day] = date;
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

export function getSortedUniqueDates(
  individualData: { date: [number, number, number] }[],
  averageData: { date: [number, number, number] }[]
): string[] {
  const uniqueDates = new Set<string>();

  individualData.forEach((item) => uniqueDates.add(formatDate(item.date)));
  averageData.forEach((item) => uniqueDates.add(formatDate(item.date)));

  return Array.from(uniqueDates).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
}

export function createDataMap<T extends { date: [number, number, number] }>(
  data: T[],
  valueKey: keyof T
): Map<string, number> {
  return new Map(
    data.map((item) => [formatDate(item.date), (item[valueKey] as number) ?? 0])
  );
}
