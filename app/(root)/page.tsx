import Header from '@/components/Header'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from "next/image"
import AddDocumentButton from '@/components/addDocument'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDocuments } from '@/lib/actions/room.actions'
import Link from 'next/link'
import AddDocumentBtn from '@/components/addDocument'
const Home = async () => {
  const clerkUser = await  currentUser();
  console.log(clerkUser);
  if(!clerkUser) redirect('/sign-in');

  const documents=await getDocuments(clerkUser.emailAddresses[0].emailAddress);
  return (
    <main className="home-container">
    <Header className="sticky left-0 top-0">
      <div className="flex items-center gap-2 lg:gap-4">
        Notification
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </Header>
    {
      documents.data.length>0 ? (<div className='document-list-container'>
        <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn 
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {documents.data.map(({ id, metadata, createdAt }: any) => (
              <li key={id} className="document-list-item">
                <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <Image 
                      src="/assets/icons/doc.svg"
                      alt="file"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

      </div>) : (<div className='documents-list-empty'>
        <Image src="/assets/icons/doc.svg" alt="document"
        width={40} height={40} className="mx-auto"/>
      <AddDocumentButton
      
      userId={clerkUser.id}
      email={clerkUser.emailAddresses[0].emailAddress}/>
      </div>)
    }
    
    </main>
  )
}

export default Home