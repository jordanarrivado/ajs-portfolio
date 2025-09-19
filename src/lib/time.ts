export function getPhilippineTime(): string {
  return new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" });
}
