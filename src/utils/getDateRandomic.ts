export function getDateRandomic(): Date {
  const startTime = new Date("2000-01-01").getTime();
  const endTime = new Date("2020-12-31").getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}
