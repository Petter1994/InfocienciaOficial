
'use client'
import Image from "next/image";
import { PostFull } from '@/types/post'
import { normalizeDate } from '@/utils/date'
import CommentBox from '@/components/Comment/CommentBox'
import { useSession } from "next-auth/react";
import Loading from '@/components/Loading/Loading'

type Props = {
    post: PostFull
    mutate: () => Promise<any>
}

export default function BlogItemDetail({ post, mutate }: Props) {
    const { data: session, status } = useSession();
    console.log('POS', post)


    return (
        <>
            <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
                <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
                    <div className="">


                        <div className="">
                            <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                                <h2 className="mb-5 mt-2 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">

                                </h2>


                                <div className="mb-10 w-full overflow-hidden ">
                                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                                        <Image
                                            src={post.thumbnail ? post.thumbnail : "/images/blog/blog-01.png"}
                                            alt="Kobe Steel plant that supplied"
                                            fill
                                            className="rounded-md object-cover object-center"
                                        />
                                    </div>
                                </div>



                                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                                    <li>
                                        <span className="text-black dark:text-white">Autor: </span>{" "}
                                        {post ? post.author : ""}
                                    </li>
                                    <li>
                                        <span className="text-black dark:text-white">
                                            Publicado: {post ? normalizeDate(post.createdAt) : ""}
                                        </span>{" "}
                                    </li>
                                </ul>

                                <div className="blog-details">

                                    <h3 className="pt-8">
                                        {post ? post.title : ""}
                                    </h3>

                                    <p>
                                        {post ? post.content : ""}
                                    </p>
                                </div>

                            </div>

                            {
                                status === "loading" ?
                                    <>
                                        <Loading />
                                    </>
                                    :
                                    <>
                                     <CommentBox mutate={mutate} post={post} user={session?.user} />
                                    </>
                            }


                           


                        </div>
                    </div>


                </div>


            </section>

        </>
    )
}