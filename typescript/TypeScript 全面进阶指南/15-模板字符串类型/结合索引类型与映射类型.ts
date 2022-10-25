type Job = "Docor" | "Joker";
interface Foo {
  name: string;
  age: number;
  job: Job;
}

type ChangeListener = {
  on: (change: `${keyof Foo}Changed`) => void;
};

declare let listener: ChangeListener;

listener.on("ageChanged");

type Copy<T extends object> = {
  [K in keyof T]: T[K];
};

type CopyWithRename<T extends object> = {
  [K in keyof T as `modified_${string & K}`]: T[K];
};
type CopyWithRenamedFoo = CopyWithRename<Foo>;
