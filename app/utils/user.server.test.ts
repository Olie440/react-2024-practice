import { describe, expect, it, vi } from "vitest";
import { mockUser } from "~/models/user.mocks";
import { prisma } from "~/services/db.server";
import { USER_FIELDS, findUser } from "~/utils/user.server";

const mockedFindFirst = vi.mocked(
  prisma.user.findFirst<{ select: typeof USER_FIELDS }>
);

describe("User Utils", () => {
  it("queries the database with the correct fields and passed in where values ", async () => {
    await findUser({ id: mockUser.id });

    expect(mockedFindFirst).toHaveBeenCalledWith({
      select: USER_FIELDS,
      where: { id: mockUser.id },
    });
  });

  it("returns a user object if a match is found", async () => {
    mockedFindFirst.mockResolvedValue(mockUser);

    const user = await findUser({ id: mockUser.id });

    expect(user).toEqual(mockUser);
  });

  it("returns null if a match is not found", async () => {
    mockedFindFirst.mockResolvedValue(null);

    const user = await findUser({ id: 567 });

    expect(user).toEqual(null);
  });

  it("returns null if an error occurs", async () => {
    mockedFindFirst.mockRejectedValue(new Error("test error"));

    const user = await findUser({ id: mockUser.id });

    expect(user).toEqual(null);
  });

  it("catches and logs the error thrown", async () => {
    mockedFindFirst.mockRejectedValue(new Error("test error"));
    vi.spyOn(console, "error");

    await findUser({ id: mockUser.id });

    expect(console.error).toHaveBeenCalledWith(new Error("test error"));
  });
});
