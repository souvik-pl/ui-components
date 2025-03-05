## **Problem Statement:**

Develop a reusable React hook, `useFetchData`, that efficiently manages asynchronous data fetching with the following specifications:

1. **Query Key Dependency:** The hook should accept a `queryKey` array. The API should be re-fetched whenever the `queryKey` array changes.
2. **Query Function:** The hook should accept a `queryFn` function. This function should be used to fetch data from the API.
3. **Status Reporting:** Provide clear states for `data`, `isLoading`, `isError`, `error`, `isRefetching` and a `refetch` function.
4. **Type Safety:** Implement the hook with TypeScript, ensuring type safety and reusability

## Interfaces

```typescript
interface UseFetchDataResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isRefetching: boolean;
}

interface UseFetchDataProps<T> {
  queryKey: any[];
  queryFn: () => Promise<T>;
}

function useFetchData<T>(props: UseFetchDataProps<T>): UseFetchDataResult<T> {
  // Implement the hook here
  return {
    data: undefined, // Replace with actual implementation
    isLoading: false, // Replace with actual implementation
    isError: false, // Replace with actual implementation
    error: null, // Replace with actual implementation
    refetch: async () => {}, // Replace with actual implementation
    isRefetching: false, // Replace with actual implementation
  };
}
```
