export type Mode = "notStarted" | "inProgress" | "finished"
export type TypingResult = "correct" | "incorrect" | "null"
export type View = "login" | "register" | "play" | "leaderboard"
export interface User {
  name: string;
  id: number;
}
export type Result = {
  uid: number;
  uname: string;
  wpm: number;
  words: number;
  createdAt: string
};
