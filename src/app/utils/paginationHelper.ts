interface IOptionsResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

export const calculatePagination = (
  options: Record<string, any>
): IOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;

  const sortBy: string = options.sortBy || "createAt";
  const sortOrder: string = options.sortOrder || "desc";

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
