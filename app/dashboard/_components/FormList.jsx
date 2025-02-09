'use client';
import React, { useEffect, useState } from "react";
import { db } from "../../../config";
import { JsonForms } from "../../../config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import FormListItem from "./FormListItem";

const FormList = () => {
    const { user } = useUser();
    const [formList, setFormList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        user && GetFormList();
    }, [user]);

    const GetFormList = async () => {
        setLoading(true);
        try {
            const result = await db
                .select()
                .from(JsonForms)
                .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(JsonForms.id));
            console.log("result: ", result);
            setFormList(result);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
            {formList.map((form, index) => (
                <div key={index}>
                    <FormListItem
                        jsonForm={JSON.parse(form.jsonform)}
                        formRecord={form}
                        refreshData={GetFormList}
                    />
                </div>
            ))}
        </div>
    );
};

export default FormList;