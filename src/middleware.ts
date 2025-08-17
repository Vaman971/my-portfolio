// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/protected-route"], // keep it empty or minimal until admin works
};