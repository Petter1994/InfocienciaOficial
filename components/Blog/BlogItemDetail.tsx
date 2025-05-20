'use client'
import Image from "next/image"
import Link from "next/link"
import {useState, ChangeEvent} from 'react'
import {PostFull, PostPayload} from '@/types/post'
import {normalizeDate} from '@/utils/date'
import CommentBox from '@/components/Comment/CommentBox'
import {useSession} from "next-auth/react";
import Loading from '@/components/Loading/Loading'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Tooltip from "@mui/material/Tooltip";
import {Button} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import {GenericResponse} from "@/types/response";
import {editPost} from "@/lib/request/post";
import {useSnackbar} from 'notistack';

type Props = {
    post: PostFull
    mutate: () => Promise<any>
}

export default function BlogItemDetail(props: Props) {
    const post = props.post

    const {enqueueSnackbar} = useSnackbar()
    const {data: session, status} = useSession();

    const isAdmin = session?.user && session.user.role === 'ADMIN'

    const [postContent, setPostContent] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSave = async () => {
        setIsLoading(true)
        const payload: PostPayload = {
            title: post.title,
            body: postContent,
            author: post.author,
            date: new Date,
            tags: post.tags,
            center: post.center
        }

        console.log('Payload FRONT', payload);
        const res: GenericResponse = await editPost(payload, post.id)

        console.log('RES FRONT', res)

        if (res.status_name === 'error') {
            enqueueSnackbar(res.error_title, {variant: 'error'})

        } else {
            enqueueSnackbar('Artículo Salvado', {variant: 'success'});
        }
        setIsLoading(false)

    }

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.target;
        console.log('Val', value)
        setPostContent(value)
    }


    return (
        <>


            <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
                <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
                    <Tooltip title="Atrás" placement="top">
                        <Link href='/blog'>
                            <Button size="large" endIcon={<ReplyIcon/>} disabled={isLoading}/>
                        </Link>
                    </Tooltip>
                    <div className="mt-2">

                        <div className="">


                            <div
                                className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
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
                                    {
                                        post.url &&
                                        <li>
                                        <span className="text-black dark:text-white">
                                            Url:
                                        </span><Link href={post.url ? post.url : "#"}>{post.url}</Link>
                                        </li>
                                    }

                                </ul>

                                <div className="blog-details">

                                    <h3 className="pt-8">
                                        {post ? `Título: ${post.title}` : ""}
                                    </h3>
                                    <h3 className="pt-8">
                                        {post ? `Descripción: ${post.description}` : ""}
                                    </h3>


                                    {
                                        isAdmin && postContent !== "" &&

                                        <div className='justify-end flex'>
                                            <Tooltip title="Guardar" placement="top">
                                                <Button size="medium" endIcon={<SaveIcon/>}
                                                        onClick={handleSave} disabled={isLoading}/>
                                            </Tooltip>
                                        </div>
                                    }

                                    {
                                        isAdmin ?
                                            <TextareaAutosize
                                                aria-label="post content"
                                                placeholder="Escriba su articulo aqui"
                                                style={{width: '100%', padding: 5}}
                                                value={post ? post.content : ""}
                                                onChange={handleInputChange}
                                                disabled={!isAdmin}
                                            />
                                            :
                                            <TextareaAutosize
                                                aria-label="post content"
                                                style={{width: '100%', padding: 5}}
                                                value={post ? post.content : ""}
                                                disabled
                                            />
                                    }

                                </div>

                            </div>

                            {
                                status === "loading" ?
                                    <>
                                        <Loading/>
                                    </>
                                    :
                                    <>
                                        <CommentBox mutate={props.mutate} post={post}/>
                                    </>
                            }

                        </div>
                    </div>


                </div>


            </section>

        </>
    )
}