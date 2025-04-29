import { beforeAll, afterAll, vi } from 'vitest';
import { db } from './db/drizzle';

beforeAll(() => {
  vi.mock('../drizzle', () => ({
    db: {
      select: vi.fn(),
      update: vi.fn(),
      query: {
        users: {
          findFirst: vi.fn(),
        },
      },
    },
  }));
});

afterAll(() => {
  vi.restoreAllMocks();
});
