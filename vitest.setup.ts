import { expect, afterEach, vi } from 'vitest';

// Cleanup after each test case
afterEach(() => {
  vi.clearAllMocks();
});

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
  usePathname: () => '',
}));

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: () => new Map(),
  cookies: () => new Map(),
}));

// Mock drizzle-orm
vi.mock('drizzle-orm', () => {
  const actual = vi.importActual('drizzle-orm');
  return {
    ...actual,
    sql: vi.fn(),
    eq: vi.fn(),
    and: vi.fn(),
    or: vi.fn(),
    desc: vi.fn(),
    asc: vi.fn(),
  };
});

// Mock @vercel/postgres
vi.mock('@vercel/postgres', () => ({
  sql: vi.fn(),
  db: {
    query: vi.fn(),
    execute: vi.fn(),
  },
}));

// Helper function to create a mock query result
export const createMockQueryResult = <T>(data: T) => {
  const mockQuery = vi.fn().mockResolvedValue(data);
  return mockQuery;
};

// Helper function to create a mock database
export const createMockDb = () => ({
  query: {
    users: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    teams: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    // Add other tables as needed
  },
});
