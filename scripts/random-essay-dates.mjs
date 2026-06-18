const START = new Date("2024-12-01T00:00:00+08:00").getTime();
const END = new Date("2026-05-31T23:59:59+08:00").getTime();

export function randomEssayTimestamp(index, seed = "floscas") {
  const source = `${seed}:${index}`;
  let hash = 2166136261;
  for (let i = 0; i < source.length; i += 1) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const ratio = (hash >>> 0) / 4294967295;
  return new Date(START + Math.floor((END - START) * ratio));
}

export function formatEssayDate(date, locale = "en") {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function buildEssayDateMap(count = 9, locale = "en") {
  return Array.from({ length: count }, (_, item) => {
    const index = item + 1;
    const date = randomEssayTimestamp(index);
    return {
      id: `Essay ${String(index).padStart(3, "0")}`,
      iso: date.toISOString(),
      label: formatEssayDate(date, locale)
    };
  });
}

if (import.meta.url === `file://${process.argv[1].replaceAll("\\", "/")}`) {
  console.table(buildEssayDateMap(9, process.argv[2] || "en"));
}
