
'use client'
import useSWR from 'swr'
import { Suspense } from 'react'
import { PostFull, emptyPostFull } from '@/types/post'
import { getFetchPostDetailsUrl, fetchPostDetails } from '@/lib/request/post'
import BlogItemDetail from "@/components/Blog/BlogItemDetail";


type Props = {
    postId: string
}

export default function BlogItemDetailContent({ postId }: Props) {

    const { data, isLoading, error, mutate } = useSWR(getFetchPostDetailsUrl(postId), fetchPostDetails)
    const post = data ? data.result as PostFull : emptyPostFull


    

    return (
        <>
            <Suspense fallback={<h1>LOADING</h1>}>
                <BlogItemDetail post={post} />
            </Suspense>
        </>
    )
}