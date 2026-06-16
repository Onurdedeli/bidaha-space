"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

/** Görünmez izleyici: her gezinmede UTM/referans bilgisini yakalar. */
export function AttributionTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  useEffect(() => {
    captureAttribution();
  }, [pathname, search]);
  return null;
}
