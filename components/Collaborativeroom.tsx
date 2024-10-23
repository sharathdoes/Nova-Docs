import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { Editor } from "@/components/editor/Editor";

const Collaborativeroom = () => {
  return (
    <div>
      {" "}
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <div className="collaborative-room ">
            <Header>
              <div className="flex w-fit items-center justify-center gap-2">
                {/* <p className="document-title"> doc titlw</p> */}
              </div>
            </Header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Editor />
          </div>
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  );
};

export default Collaborativeroom;
