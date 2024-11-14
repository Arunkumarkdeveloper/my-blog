import { NextResponse } from "next/server";
import * as jose from "jose";
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
import { jwtDecode } from "jwt-decode";

export async function middleware(request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  const clientToken = request.cookies.get("jwtToken")?.value;
  const path = request.nextUrl.pathname;
  const method = request.method;
  // Decode and verify server token once
  let serverAuth = null;
  if (token) {
    try {
      serverAuth = await jose.jwtVerify(token, secretKey);
    } catch (error) {}
  }

  const jwtToken = clientToken && jwtDecode(clientToken);

  const isAdmin =
    serverAuth?.payload?.email === "findbestonebusiness@gmail.com" ||
    jwtToken?.email === "findbestonebusiness@gmail.com";

  if (jwtToken) {
    if (path.includes("/login") || path.includes("/register")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (
    path.includes("/api/blog") &&
    ["POST", "PUT", "DELETE"].includes(method)
  ) {
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  if (path.includes("/api/subscribe") && ["GET", "DELETE"].includes(method)) {
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  // client-side
  if (!isAdmin) {
    const restrictedAdminPaths = ["/admin/blog/create", "/admin/subscribers"];

    if (
      restrictedAdminPaths.includes(path) ||
      path.startsWith("/admin/blog/edit/")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
