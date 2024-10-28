import { liveblocks } from "@/lib/liveblocks";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export async function POST() {
    const clerkUser = await currentUser();
    if(!clerkUser) redirect('/sign-in');
    const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // Get the current user from your database
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avator: imageUrl,
      color: "#000000",
    }
  }
  // Get the current user from your database
//   const user = __getUserFromDB__(request);

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [], // Optional
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}