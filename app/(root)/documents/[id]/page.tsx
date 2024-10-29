import Collaborativeroom from '@/components/Collaborativeroom';
import { getDocument } from '@/lib/actions/room.actions';
import { getClerkUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Document = async ({ params }: { params: { id: string } }) => {
  // Await params to ensure we can access its properties correctly
  const { id } = await params; 

  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId: id, // Using id from awaited params
  });

  if(!room) redirect('/')

    const userIds=Object.keys(room.usersAccesses)
  const users=await getClerkUsers({ userIds});
  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer'
  }))
  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className="flex w-full flex-col items-center">
      <Collaborativeroom 
        roomId={id} // Use id directly here as well
        roomMetadata={room.metadata} 
        users={usersData} 
        currentUserType={currentUserType} 
      />
    </main>
  );
}

export default Document;
