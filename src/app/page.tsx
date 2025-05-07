
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LandingPage from "./landing/page";

export default function HomePage() {
  const router = useRouter();
  
  return (
    <LandingPage />
  );
}
