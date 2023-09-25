import Head from "next/head";
import Link from "next/link";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"

import { api } from "~/utils/api";

export default function Home() {
  
  const { data } = api.posts.getAll.useQuery()

  const user = useUser()


  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>
          <div>
            {data?.map(post => <div key={post.id}>{post.content}</div>)}
          </div>
        </div>
      </main>
    </>
  );
}
