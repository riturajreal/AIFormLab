'use client';
import React, { useEffect, useState } from "react";
import { db } from "../../../config";
import { JsonForms } from "../../../config/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import FormUi from "../../edit-form/_components/FormUi";

const LiveAiForm = ({ params }) => {
    const [record, setRecord] = useState(null);
    const [jsonForm, setJsonForm] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        params && GetFormData();
    }, [params]);

    const GetFormData = async () => {
        setLoading(true);
        try {
            const result = await db
                .select()
                .from(JsonForms)
                .where(eq(JsonForms.id, Number(params?.formId)));
            setRecord(result[0]);
            setJsonForm(JSON.parse(result[0].jsonform));
            console.log("result: ", result);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return (
        <div
            className="p-6 min-h-screen flex flex-col justify-center items-center"
            style={{
                background: record?.background,
            }}
        >
            {loading ? (
                <div className="flex justify-center items-center">
                    <span className="h-6 w-6 border-4 border-t-gray-900 border-gray-300 dark:border-t-white dark:border-gray-600 rounded-full animate-spin"></span>
                </div>
            ) : (
                <>
                    <Image src={"/logo.svg"} alt="logo" className="mb-6" width={260} height={26} />
                    {record && (
                        <FormUi
                            jsonForm={jsonForm}
                            selectedStyle={JSON.parse(record?.style)}
                            selectedTheme={record?.theme}
                            editable={false}
                            formId={record?.id}
                            enabledSignIn={record?.enabledSignIn}
                        />
                    )}
                    <Link
                        className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer"
                        href={'/'}
                    >
                        <Image src={"/badge-logo.webp"} alt="logo" width={50} height={50} className="rounded-full" />
                        Build your own AI Form
                    </Link>
                </>
            )}
        </div>
    )
};

export default LiveAiForm;