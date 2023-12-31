import Head from "next/head";
import Link from "next/link";
import Image from "next/image"

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"

import { api } from "~/utils/api";

import type { RouterOutputs } from "~/utils/api"

import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const CreatePostWizard = () => {
  const { user } = useUser()

  if (!user) return null

  return <div className="flex gap-3">
    <img src={user.imageUrl} alt="Profile Image" className="w-14 h-14 rounded-full"/>
    <input placeholder="Type some emojis!" className="bg-transparent grow outline-none" type="text" />
  </div>
}

type PostWithUser = RouterOutputs["posts"]["getAll"][number]

const PostView = (props : PostWithUser) => {

  const {post, author} = props;

  return (
    <div key={post.id} className="p-8 border-b border-slate-400 p-8 flex gap-4">
      <Image src={author.imageUrl} className="w-14 h-14 rounded-full" alt={`@${author.username}`} width={56} height={56}/>
      <div className="flex flex-col">
        <div className="flex text-slate-300 gap-2">
          <span>{`@${author.username}`}</span>
          <span className="font-thin">{`·  ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <div>
          <span>{post.content}</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {

  
  const { data, isLoading } = api.posts.getAll.useQuery()

  const user = useUser()
  console.log(user)

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>Something went wrong</div>

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center h-screen">
        <div className="border-x border-slate-400 w-full h-full md:max-w-2xl">
          <div className="border-b border-slate-400 p-4">
            {!user.isSignedIn && <div className="flex justify-center"><SignInButton /></div>}
            {!!user.isSignedIn && <CreatePostWizard />}
          </div>
          <div className="flex flex-col">
            {[...data, ...data]?.map(fullPost => <PostView {...fullPost} key={fullPost.post.id}/>)}
          </div>
        </div>
      </main>
    </>
  );
}
