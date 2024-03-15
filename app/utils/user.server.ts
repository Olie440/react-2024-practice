import { prisma } from "~/services/db.server";
import User from "~/models/user";

export type UserFields = Record<keyof User, true>;

export const USER_FIELDS: UserFields = {
  id: true,
  email: true,
};

export async function findUser(where: Partial<User>): Promise<User | null> {
  try {
    return await prisma.user.findFirst({
      select: USER_FIELDS,
      where,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}
