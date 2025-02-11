'use client';

import React, { useEffect, useState } from "react";
import { db } from "../../../config";
import { JsonForms } from "../../../config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import FormListItem from "./FormListItem";
import { Loader2 } from "lucide-react";

const FormList = () => {
    const { user } = useUser();
    const [formList, setFormList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) GetFormList();
    }, [user]);

    const GetFormList = async () => {
        setLoading(true);
        try {
            const result = await db
                .select()
                .from(JsonForms)
                .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(JsonForms.id));

            setFormList(result);
        } catch (error) {
            console.error("Error fetching forms:", error);
        }
        setLoading(false);
    };

    return (
        <div className="mt-5">
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-600 dark:text-gray-300" />
                </div>
            ) : formList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {formList.map((form, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
                            <FormListItem
                                jsonForm={JSON.parse(form.jsonform)}
                                formRecord={form}
                                refreshData={GetFormList}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">No forms found.</p>
            )}
        </div>
    );
};

export default FormList;
