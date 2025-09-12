import { Button } from '@/components/Button';
import { HeaderSection } from '@/components/HeaderSection';
import { Input } from '@/components/Input'
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useUserInfoCreate } from '@/src/lib/mongodb/user/hook';

const formSchema = z.object({
    first: z.string().min(2, "Name must be at least 2 characters long"),
    last: z.string().min(2, "Name must be at least 2 characters long"),
    middle: z.string().min(2, "Name must be at least 2 characters long").optional(),
    phone: z.string().max(11).min(11),
    nin: z.string().max(11).min(11),
    bvn: z.string().max(11).min(11),
    dob: z.string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        })
        .refine((val) => new Date(val) <= new Date(), {
            message: "Date cannot be in the future",
        })
});


// You can export the inferred type
export type FormSchema = z.infer<typeof formSchema>;


export default function KycForm() {
    const createUser = useUserInfoCreate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormSchema) => {
        // console.log("Form Data", data)
        // toast.success("Sent for verification")
        createUser.mutate({
            bvn: data.bvn,
            nin: data.nin,
            first_name: data.first,
            last_name: data.last,
            middle_name: data.middle,
            phone: data.phone,
            dob: data.dob
        }, {
            onSuccess: () => {
                toast.success("Sent for verification")
                reset()
            },
            onError: (e) => {
                toast.error("Err: " + e.message)
            },

        })


    }
    return (
        <>
            <HeaderSection title='KYC Verification' />
            <form onSubmit={handleSubmit(onSubmit)} className='py-2 px-4 space-y-5'>
                <Input
                    label={`First name*`}
                    placeholder={`John`}
                    error={errors.first?.message}
                    control={register("first")}
                />
                <Input
                    label={`Last name*`}
                    placeholder={`Doe`}
                    error={errors.last?.message}
                    control={register("last")}
                />
                <Input
                    label={`Middle name`}
                    placeholder={``}
                    error={errors.middle?.message}
                    control={register("middle")}
                />
                <Input
                    label={`Date of Birth (DOB)*`}
                    placeholder={`DY-MM-YR`}
                    error={errors.dob?.message}
                    control={register("dob")}
                    type="date"
                    max={"2010-01-01"}
                    min={"1940-01-01"}
                    onChange={(e) => {
                        console.log("Date", + e)
                    }}
                />
                <Input
                    label={`National Identity No (NIN)*`}
                    placeholder={`012345678901`}
                    error={errors.nin?.message}
                    control={register("nin")}
                />
                <Input
                    label={`Bank Verification No (BVN)*`}
                    placeholder={`012345678901`}
                    type="number"
                    error={errors.bvn?.message}
                    control={register("bvn")}
                    maxLength={11}
                />
                <Input
                    label={`Phone*`}
                    placeholder={`08012345678`}
                    type="number"
                    error={errors.phone?.message}
                    control={register("phone")}
                />
                <div className='flex justify-center items-center mt-5'>
                    <Button
                        btnName='Submit KYC'
                        className='w-[45%]'
                        type="submit"
                        isLoading={false} >Add</Button>
                </div>
            </form>
        </>
    )
}
