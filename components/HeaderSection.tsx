import { useRouter } from "next/router";
import { MdArrowBackIos } from "react-icons/md";

export function HeaderSection(props: { title: string; link?: string }) {
    const router = useRouter()
    return (
        <div className='h-[40px] bg-card flex items-center px-5'>
            <MdArrowBackIos className='text-muted mr-2'
                onClick={() => {
                    void router.push(props.link ?? "/")
                }}
            />
            <p className='text-[12px] font-bold'>{props.title}</p>
        </div>
    )
}