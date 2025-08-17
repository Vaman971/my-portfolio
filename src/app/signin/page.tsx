// /app/signin/page.tsx
"use client";

import React, { Suspense } from "react";
import SignInPage from "@/sections/SignInPage";

export default function Page() {
  return(
  <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
  </Suspense>
)}
