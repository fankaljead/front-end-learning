declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    port?: string;
  }
  export function parse(
    urlStr: string,
    parseQueryString?: boolean,
    slashesDenoteHost?: boolean
  ): Url;
}

declare module "path" {
  export function normilize(p: string): string;
  export function join(...paths: string[]): string;
  export let seq: string;
}
