"use client" 
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { Editor } from "@/components/editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import Image from 'next/image';
import { updateDocument } from "@/lib/actions/room.actions";
const Collaborativeroom = ({roomId, roomMetadata}:CollaborativeRoomProps) => {

  const currentUserType='editor'
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      setLoading(true);

      try {
        if(documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          
          if(updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [roomId, documentTitle])

  useEffect(() => {
    if(editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing])
  
  return (
   
    
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <div className="collaborative-room ">
            <Header>
            <div ref={containerRef} className="flex mr-24 w-full items-center justify-between">
  {editing && !loading ? (
    <Input 
      type="text"
      value={documentTitle}
      placeholder="Enter title"
      onChange={(e) => setDocumentTitle(e.target.value)}
      onKeyDown={updateTitleHandler}
      className="document-title-input"
    />
  ) : (
    <div className="flex items-center justify-center flex-grow">
      <p className="document-title text-center">{documentTitle}</p>
      {currentUserType === 'editor' && (
        <Image 
          src="/assets/icons/edit.svg"
          alt="edit"
          width={24}
          height={24}
          onClick={() => setEditing(true)}
          className="ml-2 cursor-pointer" // Added margin-left for spacing
        />
      )}
    </div>
  )}

  {currentUserType !== 'editor' && !editing && (
    <p className="view-only-tag">View only</p>
  )}
</div>


            
              <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators /></div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </Header>
            <Editor />
          </div>
        </ClientSideSuspense>
      </RoomProvider>
  );
};

export default Collaborativeroom;
