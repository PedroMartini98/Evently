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

export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type GetAllEventsParams = {
  query: string;
  limit: number;
  page: number;
  category: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type GetRelatedEventsByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type getEventsByUserParams = {
  userId: string;
  page: number;
  limit?: number;
};

export type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  buyerId: string;
  price: string;
  isFree: boolean;
};

export type CreateOrderParams = {
  stripeId: string;
  buyerId: string;
  eventId: string;
  totalAmount: string;
  createdAt: Date;
};
