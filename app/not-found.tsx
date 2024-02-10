"use client";

import { redirect, usePathname } from "next/navigation";

const defaultLocale = "en";

export default function NotFound() {
    const pathname = usePathname();
    
    redirect(`/${defaultLocale}/${pathname}`);
}