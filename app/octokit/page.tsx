import { getAllPosts } from "@/lib/admin-backend";
import { allPosts, Post } from "@/.contentlayer/generated";
import { columns } from "@/components/posts-list/columns";
import { DataTable } from "@/components/posts-list/data-table";
import { buttonVariants } from "@/components/button";
import { compareDesc } from "date-fns";
import Link from "next/link";
// import { Link } from "lucide-react";
// import { PostWithStatus } from "./post-with-status.model";

export default async function page() {
  // console.log('❤')
  const postsFromGithub = await getAllPosts();
  postsFromGithub.map((post: any, index: Number) => {
    console.log("post: ", index)
    console.log(post.name)
    console.log(post.sha)
  })
    
  const generatedPosts = allPosts;

  //for now, no date for the post. Advanced mode => updated content folder with repo
  // let posts = postsFromGithub
  //   .map((githubPost: any) => {
  //     let generatedPost = generatedPosts.filter((generatedPost: any) => {
  //       return generatedPost._raw.sourceFileName == githubPost.name;
  //     })[0];

  //     return {
  //       ...githubPost,
  //       // date: generatedPost.date,
  //       status: generatedPost ? "published" : "publishing",
  //     };
  //   })
  //   .sort((a: any, b: any) =>
  //     compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  //   );

  return ( <>
        <div className="pb-5 pr-5 ">
         <Link href='/octokit/create' className=''>Create a new post</Link> 
      
      </div>

      <DataTable columns={columns} data={postsFromGithub} />
  </>
  )
}