"use server"
import { clerkClient as getClerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";
import type { User } from "@clerk/clerk-sdk-node";  // Adjust if necessary

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const clerkClient = await getClerkClient();

    const usersResponse = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    // Access the array of users in the `data` property
    const users = usersResponse.data.map((user: User) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};
