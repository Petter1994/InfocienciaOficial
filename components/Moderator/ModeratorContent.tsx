'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { fetchAllComment, fetchAllCommentUrl } from '@/lib/request/comment'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import SectionHeader from "../Common/SectionHeader";
import { Comment, emptyComment } from '@/types/comment'
import LoadingFull from '@/components/Loading/LoadingFull'
import CommentTable from '@/components/Moderator/Table/CommentTable'


import {
    TextField,
} from '@mui/material';


export default function ModeratorContent() {

    const { data, isLoading, error, mutate } = useSWR(fetchAllCommentUrl, fetchAllComment)
    const comments = data ? data.result as Comment[] : [emptyComment]

    const [searchTerm, setSearchTerm] = useState<string>('');

    let filterComments = comments
    if (searchTerm !== "") {
        filterComments = comments.filter(comments => comments.name === searchTerm)
    }


    return (
        <>
            <div className="shape shape-left ">
                <img src="/images/shape/shape-7a.svg" alt=""/>
            </div>
            <div className="shape shape-right">
                <img src="/images/shape/shape-2a.svg" alt=""/>
            </div>


            {/* <!-- ===== Blog Grid Start ===== --> */}
            <section className="py-20 lg:py-25 xl:py-30">
                <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                    <SectionHeader
                        headerInfo={{
                            title: "Infociencia",
                            subtitle: "Moderadar Comentarios",
                            description: `Donde la curiosidad se encuentra con la evidencia.`,
                        }}
                    />
                </div>
                <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">

                    <div className="flex justify-between gap-5">
                        <TextField
                            required
                            id="search"
                            name="search"
                            aria-label='Buscar'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon className='dark:text-white ' />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className='justify-start dark:text-white border-white ml-5 py-5'
                        />
                    </div>





                    {
                        isLoading || error ?
                            <div className='w-full mx-auto justify-center items-center mt-5'>
                                <LoadingFull />
                            </div>
                            :
                            <div className='mt-5'>
                                <CommentTable comments={filterComments} mutate={mutate}/>
                            </div>

                    }


                </div>
            </section>


        </>
    )
}