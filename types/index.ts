export type CreateUserParams = {
  clerkId: string;
  username: string;
  lastName: string;
  firstName: string;
  photo: string;
  email: string;
};

export type UpdateUserParams = {
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type CreateCategoryParams = {
  categoryName: string;
};
