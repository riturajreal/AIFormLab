"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../config";
import { JsonForms } from "../../../config/schema";
import { and, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { RWebShare } from "react-web-share"
import FormUi from "../_components/FormUi";
import { toast } from "sonner"
import Controller from "../_components/Controller";

const EditForm = ({ params }) => {
    const { user } = useUser();
    const [jsonForm, setJsonForm] = useState([]);
    const pathname = usePathname();
    const [updateTrigger, setUpdateTrigger] = useState();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState("light");
    const [selectedBackground, setSelectedBackground] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("");
    const router = useRouter();


    useEffect(() => {
        user && GetFormData();
    }, [user]);

    const GetFormData = async () => {
        setLoading(true);
        try {
            const result = await db
                .select()
                .from(JsonForms)
                .where(
                    and(
                        eq(JsonForms.id, Number(params?.formId)),
                        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                );
            setRecord(result[0]);
            setJsonForm(JSON.parse(result[0].jsonform));
            setSelectedTheme(result[0].theme);
            setSelectedBackground(result[0].background);
            setSelectedStyle(JSON.parse(result[0].style));
            console.log("result: ", result);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (updateTrigger) {
            setJsonForm(jsonForm);
            updateJsonFormInDb();
        }
    }, [updateTrigger]);

    const onFieldUpdate = (value, index) => {
        jsonForm.fields[index].label = value.label;
        jsonForm.fields[index].placeholder = value.placeholder;
        setUpdateTrigger(Date.now());
    }

    const deleteField = (index) => {
        jsonForm.fields.splice(index, 1);
        setUpdateTrigger(Date.now());
    }

    const updateControllerFields = () => {
        setUpdateTrigger(Date.now());
    }

    const updateJsonFormInDb = async () => {
        try {
            setLoading(true);
            const result = await db
                .update(JsonForms)
                .set({
                    jsonform: JSON.stringify(jsonForm),
                    theme: selectedTheme,
                    background: selectedBackground,
                    style: JSON.stringify(selectedStyle),
                })
                .where(
                    and(
                        eq(JsonForms.id, Number(params?.formId)),
                        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                );
            console.log("result: ", result);
            setLoading(false);
            toast.success('Form Updated Successfully')
        } catch (error) {
            setError(error);
            setLoading(false);
            toast.error('something went wrong')
        }
    };


    return <div className="p-6">
        <div className="md:flex md:items-center md:justify-between">
            <h2
                onClick={() => router.back()}
                className="flex gap-2 items-center my-5 cursor-pointer hover:font-semibold transition-all"
            >
                <ArrowLeft /> Back
            </h2>
            {/* controls */}
            <div className="flex items-center justify-between gap-2 mb-4 md:mb-0">
                <Link href={`/aiform/${record?.id}`} target="_blank">
                    <Button variant='outline' className='flex items-center gap-2'>
                        <SquareArrowOutUpRight className="h-5 w-5" />
                        Live Preview</Button>
                </Link>

                {/* Web share */}
                <RWebShare
                    data={{
                        text: jsonForm?.formHeading + "Build your form in seconds using AI Builder",
                        url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform" + record?.id,
                        title: jsonForm?.formTitle,
                    }}
                    disableNative={true}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button className="flex item-center gap-2 bg-gray-700 hover:bg-gray-950">
                        <Share2 className="h-5 w-5" /> Share
                    </Button>
                </RWebShare>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 border rouned-lg shadow-md">
                <Controller
                    selectedTheme={(value) => {
                        setSelectedTheme(value);
                        updateControllerFields();
                    }}
                    selectedBackground={(value) => {
                        setSelectedBackground(value);
                        updateControllerFields();
                    }}
                    selectedStyle={(value) => {
                        setSelectedStyle(value);
                        updateControllerFields();
                    }}
                />
            </div>
            <div
                className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center"
                style={{ background: selectedBackground }}
            >
                <FormUi
                    jsonForm={jsonForm}
                    selectedTheme={selectedTheme}
                    selectedStyle={selectedStyle}
                    onFieldUpdate={onFieldUpdate}
                    deleteField={(index) => deleteField(index)}
                />
            </div>
        </div>
    </div>;
};

export default EditForm;