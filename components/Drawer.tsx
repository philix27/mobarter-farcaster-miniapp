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


export function DrawerComp(props: { trigger: React.ReactNode; title: string; description?: string; body: React.ReactNode; footer?: React.ReactNode }) {



    return (
        <Drawer>
            <DrawerTrigger asChild>
                {props.trigger}
            </DrawerTrigger>
            <DrawerContent className="border-1 border-muted">
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
