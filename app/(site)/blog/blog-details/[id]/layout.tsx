import {ReactNode} from 'react'
import {Metadata} from "next"


export const metadata: Metadata = {
    title: "Articulo Detalle",
    description: "Infociencia Articulo Detalle",
};

type Props = {
    children: ReactNode
}

export default function ChaptersLayout({children}: Props) {

    return (
        <>
            {children}
        </>
    );
}
