'use client'
import SectionHeader from "../Common/SectionHeader";
import EditUserForm  from '@/components/User/Form/EditUserForm'
import { useSession } from "next-auth/react";
import Loading from '@/components/Loading/Loading'

export default function UserProfile() {
    const { data: session, status,update } = useSession();

    const updateSeccion =async()=>{
        if(session){
            await update({
                ...session,
                user: {
                  ...session.user,
                }
              });
        }
    }


    return (
        <>
            <section className="py-20 lg:py-25 xl:py-30">
                <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                    <SectionHeader
                        headerInfo={{
                            title: "Infociencia",
                            subtitle: "Perfil",
                            description: `Diseñando mi propio camino.`,
                        }}
                    />
                </div>

                {
                    status === "loading" ?
                        <>
                            <Loading />
                        </>
                        :
                        <>
                            {
                                session?.user &&
                                    <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
                                        <EditUserForm user={session.user} updateSeccion={updateSeccion}/>
                                    </div>
                            }
                        </>
                }


            </section>
        </>
    )
}