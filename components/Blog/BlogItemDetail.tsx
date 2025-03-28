
'use client'
import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import Image from "next/image";
import { PostFull } from '@/types/post'
import { normalizeDate } from '@/utils/date'


type Props = {
    post: PostFull
}

export default function BlogItemDetail({ post }: Props) {



    return (
        <>
            <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
                <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
                    <div className="">


                        <div className="">
                            <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                                <h2 className="mb-5 mt-2 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                                    {post ? post.title : ""}
                                </h2>


                                <div className="mb-10 w-full overflow-hidden ">
                                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                                        <Image
                                            src={post.coverImage ? post.coverImage : "/images/blog/blog-01.png"}
                                            alt="Kobe Steel plant that supplied"
                                            fill
                                            className="rounded-md object-cover object-center"
                                        />
                                    </div>
                                </div>



                                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                                    <li>
                                        <span className="text-black dark:text-white">Autor: </span>{" "}
                                        {post ? post.authors : ""}
                                    </li>
                                    <li>
                                        <span className="text-black dark:text-white">
                                            Publicado: {post ? normalizeDate(post.createdAt) : ""}
                                        </span>{" "}
                                    </li>
                                    <li>
                                        <span className="text-black dark:text-white">
                                            Category:
                                        </span>
                                        Events
                                    </li>
                                </ul>

                                <div className="blog-details">
                                    <p>
                                        {post ? post.body : ""}
                                    </p>



                                    <h3 className="pt-8">
                                        Nunc elementum elit viverra, tempus quam non
                                    </h3>

                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nunc quis nibh lorem. Duis sed odio lorem. In a efficitur
                                        leo. Ut venenatis rhoncus quam sed condimentum. Curabitur
                                        vel turpis in dolor volutpat imperdiet in ut mi. Integer non
                                        volutpat nulla. Nunc elementum elit viverra, tempus quam
                                        non, interdum ipsum.
                                    </p>
                                </div>

                                <SharePost post={post} />
                            </div>
                        </div>
                    </div>

                    <div className=" mt-5">
                        <RelatedPost />
                    </div>
                </div>


            </section>

        </>
    )
}