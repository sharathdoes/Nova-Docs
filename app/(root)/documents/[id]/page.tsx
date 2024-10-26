import Collaborativeroom from '@/components/Collaborativeroom';
import { getDocument } from '@/lib/actions/room.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Document = async ({ params }: { params: { id: string } }) => {
  // Await params to ensure we can access its properties correctly
  const { id } = await params; // Awaiting params

  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId: id, // Using id from awaited params
  });

  return (
    <main className="flex w-full flex-col items-center">
      <Collaborativeroom 
        roomId={id} // Use id directly here as well
        roomMetadata={room.metadata} 
        users={[]} 
        currentUserType={'creator'} 
      />
    </main>
  );
}

export default Document;
