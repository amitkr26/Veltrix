import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Appwrite SDK with Constructor Support
class MockClient {
  setEndpoint = vi.fn().mockReturnThis();
  setProject = vi.fn().mockReturnThis();
}

class MockDatabases {
  listDocuments = vi.fn();
  createDocument = vi.fn();
}

class MockAccount {
  get = vi.fn();
  createSession = vi.fn();
  create = vi.fn();
  deleteSession = vi.fn();
}

class MockStorage {
  createFile = vi.fn();
}

class MockAvatars {
  getInitials = vi.fn();
}

vi.mock("appwrite", () => ({
  Client: MockClient,
  Databases: MockDatabases,
  Account: MockAccount,
  Storage: MockStorage,
  Avatars: MockAvatars,
  ID: {
    unique: vi.fn(() => "unique-id"),
  },
  Query: {
    orderDesc: vi.fn(),
    limit: vi.fn(),
    search: vi.fn(),
  },
  AppwriteException: class extends Error {
    constructor(message: string, public code: number) {
      super(message);
    }
  },
}));

// Mock Next.js Navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/",
}));
