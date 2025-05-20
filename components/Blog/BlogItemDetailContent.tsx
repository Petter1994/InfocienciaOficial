'use client'
import useSWR from 'swr'
import {PostFull, emptyPostFull} from '@/types/post'
import {getFetchPostDetailsUrl, fetchPostDetails} from '@/lib/request/post'
import BlogItemDetail from "@/components/Blog/BlogItemDetail";
import LoadingFull from '@/components/Loading/LoadingFull'


type Props = {
    postId: string
}

export default function BlogItemDetailContent({postId}: Props) {

    const {data, isLoading, error, mutate} = useSWR(getFetchPostDetailsUrl(postId), fetchPostDetails)
    const post = data ? data.result as PostFull : emptyPostFull


    return (
        <>
            {
                isLoading || error ?
                    <LoadingFull/>
                    :
                    <BlogItemDetail post={post} mutate={mutate}/>
            }
        </>
    )
}