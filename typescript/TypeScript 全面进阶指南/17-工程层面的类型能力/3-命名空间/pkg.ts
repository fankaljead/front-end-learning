declare module "pkg" {
  const handler: () => boolean;
  const sum: (a: number, b: number) => number;
}

interface Window {
  userTracker: (...args: any[]) => Promise<void>;
}

declare module "fs" {
  type BumpKey = "slow" | "normal" | "fast";
  export function bump(speed: BumpKey): void;
}
