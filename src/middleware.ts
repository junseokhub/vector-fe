import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    const pathname = req.nextUrl.pathname.replace(/^\/api/, "");
    const search = req.nextUrl.search;
    const targetUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${pathname}${search}`;

    return NextResponse.rewrite(targetUrl);
  }

  return NextResponse.next();
}