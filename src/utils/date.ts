export function formatDateWithOrdinal(
  date: Date
): string {
  let day = date.getDate();
  let month = date.toLocaleString("default", { month: "long" });
  let year = date.getFullYear();

  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  return `${month} ${day}${daySuffix}, ${year}`;
}

interface MonthYear {
  year: string;
  month: string;
  formatted: string;
}

export function getMonthYears(
  startDate?: Date
): Array<MonthYear> {
  const monthYears: Array<MonthYear> = [];

  const start = new Date(startDate ?? new Date());
  const current = new Date();

  start.setDate(1);
  current.setDate(1);

  while (
    current.getFullYear() > start.getFullYear() ||
    (current.getFullYear() === start.getFullYear() &&
      current.getMonth() >= start.getMonth())
  ) {
    let year = current.getFullYear();
    const month = current.getMonth() + 1;

    let formattedYear = year;

    monthYears.push({
      year: year.toString(),
      month: month.toString().padStart(2, "0"),
      formatted: current
        .toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
        .replace(year.toString(), formattedYear.toString()),
    });

    // Create a new date to avoid mutation
    current.setMonth(current.getMonth() - 1);
  }

  return monthYears;
}