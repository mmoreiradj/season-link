interface PaginationResponse<T> {
  items: T[];
  total: number;
}

export default PaginationResponse;
