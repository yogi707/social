import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";

export async function middleware(request: NextRequest) {
  console.log("I am called ");
  const response = NextResponse.next();
  console.log(response);
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        console.log({ contextSpec });
        const session = await fetchAuthSession(contextSpec);
        console.log({ session });
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  console.log({ authenticated });
  if (authenticated) {
    return response;
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)",
  ],
};
