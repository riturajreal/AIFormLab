'use client';
import React, { useState } from "react";
import { LucideLoader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Download, Users } from "lucide-react";
import { db } from "../../../../config";
import { userResponses } from "../../../../config/schema";
import { eq } from "drizzle-orm";
import * as XLSX from 'xlsx'

const FormListItemResp = ({ formRecord, jsonForm }) => {

    const [loading, setLoading] = useState(false);
    let jsonData = [];

    const ExportData = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(userResponses)
                .where(eq(userResponses.formRef, formRecord.id))
                .orderBy(userResponses.createdAt);
            setLoading(false);
            result?.map((item) => {
                jsonData.push(JSON.parse(item?.jsonResponse));
            });
            exportToExcel(jsonData);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Convert JSON into EXCEL File to download it
    const exportToExcel = (jsonData) => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, jsonForm?.formTitle + ".xlsx");
    }

    return (
        <div className="border shadow-sm rounded-lg p-4 hover:shadow-xl duration-150">
            <div className="h-[100px]">
                <h2 className="font-semibold text-lg">{jsonForm?.formTitle}</h2>
                <p className="text-sm text-gray-500">{jsonForm?.formHeading}</p>
            </div>

            <div className="flex mt-4 gap-4 items-center justify-between ">
                <h2 className='flex gap-2 text-sm'><Users className='h-5 w-5' /> <strong>45</strong> Responses</h2>
                <Button
                    onClick={() => ExportData()}
                    disabled={loading}
                    className='flex gap-2' size='sm'>

                    {loading ? <><LucideLoader className="animate-spin" /> Exporting</> : <> <Download className="h-5 w-5" /> Export </>}
                </Button>
            </div>
        </div>
    )
}

export default FormListItemResp;