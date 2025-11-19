"use client"

import * as React from "react"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { MdClose } from "react-icons/md";


export function DrawerComp(props: { trigger: React.ReactNode; title: string; description?: string; body: React.ReactNode; footer?: React.ReactNode }) {


    return (
        <Drawer noBodyStyles >
            <DrawerTrigger asChild>
                {props.trigger}
            </DrawerTrigger>
            <DrawerContent className="border-1 border-muted" >
                {/* <DrawerContent className="border-1 border-muted h-[100vh] w-[50%]" > */}
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{props.title}</DrawerTitle>
                        {props.description && <DrawerDescription>{props.description}</DrawerDescription>}
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        {props.body}
                    </div>
                    {props.footer &&
                        <DrawerFooter>
                            {props.footer}
                        </DrawerFooter>
                    }

                    {/* <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter> */}
                </div>
            </DrawerContent>
        </Drawer>
    )
}
export function DrawerSideContent(props: { open: boolean; onClose: VoidFunction; trigger?: React.ReactNode; title: string; description?: string; body: React.ReactNode; footer?: React.ReactNode }) {

    if (!props.open) {
        return <>{props.trigger}</>
    }
    return (
        <div className="w-screen h-screen fixed z-50 top-0 right-0">

            <div className="w-full flex  h-full">

                <div style={{ backgroundColor: "#0000006C" }} className="h-full w-[64.2%]" onClick={props.onClose}></div>

                <div className="max-w-[35%] w-full h-full bg-background animate-slide-in-right">
                    <div className="flex h-[45px] bg-background items-center px-10 w-full  justify-between border-border border-b">
                        <h4 className="font-semibold text-sm">
                            {props.title}
                        </h4>
                        <div className="size-[35px] bg-card rounded-full flex items-center justify-center" onClick={props.onClose}>
                            <MdClose size={24} />
                        </div>
                    </div>

                    <div className="p-4 pb-0 h-full">
                        {props.body}
                    </div>

                </div>
            </div>
        </div >
    )
}
