import leoProfanity from "leo-profanity";

leoProfanity.loadDictionary("en");

export function containsProfanity(name: string): boolean {
  const normalized = name
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/\$/g, "s")
    .replace(/@/g, "a");

  return leoProfanity.check(normalized);
}