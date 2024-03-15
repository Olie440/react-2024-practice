import { vi } from "vitest";
import { mockDeep } from "vitest-mock-extended";

import "@testing-library/jest-dom/vitest";

vi.mock("~/services/db.server", () => {
  return {
    __esModule: true,
    prisma: mockDeep(),
  };
});
