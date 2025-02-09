'use client';
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Edit, Share, Share2, Trash } from "lucide-react";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from "@clerk/nextjs";
import { db } from "../../../config";
import { JsonForms } from "../../../config/schema";
import { and, eq } from "drizzle-orm";
import { toast } from 'sonner';
import { RWebShare } from 'react-web-share';


const FormListItem = ({ jsonForm, formRecord, refreshData }) => {

    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const deleteForm = async () => {
        setLoading(true);
        try {
            const result = await db.delete(JsonForms)
                .where(
                    and(
                        eq(JsonForms.id, formRecord.id),
                        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                )
            if (result === 0) {  // Check if no rows were deleted
                setLoading(false);
                toast.error('Failed to delete the form. Please try again.');
                return;
            }
            setLoading(false);
            toast.success('Form Deleted Successfully!');
            refreshData();
        } catch (error) {
            console.error('Error deleting form:', error);
            setLoading(false);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="border shadow-md rounded-lg p-5">
            <div className="flex justify-between">
                <h2></h2>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Trash
                            className="h-5 w-5 text-red-500 cursor-pointer hover:scale-105 transition-all"
                        />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your form
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteForm()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <h2 className="text-lg text-black">{jsonForm?.formTitle}</h2>
            <h2 className="text-sm text-gray-500">{jsonForm?.formTitle}</h2>
            <hr className="my-4" />
            <div className="flex justify-between">
                <RWebShare
                    data={{
                        text: jsonForm?.formHeading + "Build your form in seconds using AI Builder",
                        url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + formRecord?.id,
                        title: jsonForm?.formTitle,
                    }}
                    disableNative={true}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 "
                    >
                        <Share2 className="h-5 w-5" /> Share
                    </Button>
                </RWebShare>

                <Link href={`/edit-form/${formRecord.id}`}>
                    <Button size="sm" className='flex gap-2'><Edit className="h-5 w-5" /> Edit</Button>
                </Link>
            </div>
        </div>
    );
};

export default FormListItem;