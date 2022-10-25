interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}

interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

declare function fetchUserProfile(): Promise<IRes<IUserProfileRes>>;

type StatusSucceed = boolean;

declare function handleOperation(): Promise<IRes<StatusSucceed>>;

fetchUserProfile().then((r) => {
  console.log(r.data.homepage);
});

interface IPaginationaRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}

declare function fetchUserProfileList(): Promise<
  IRes<IPaginationaRes<IUserProfileRes>>
>;

fetchUserProfileList().then((r) => {
  console.log(r.data.data[0]);
});
