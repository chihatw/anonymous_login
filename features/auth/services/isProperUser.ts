import { Session } from "next-auth";

export const isProperUser = (session: Session | null) => {
  return session?.user && !session.user.isAnonymous;
};
