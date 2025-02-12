"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/config";
import { userResponses } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useTheme } from "next-themes";

const FormAnalysisPage = ({ params }) => {
    const { theme } = useTheme();
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const result = await db
                    .select()
                    .from(userResponses)
                    .where(eq(userResponses.formRef, params?.formId))  // Use params to fetch data
                    .orderBy(userResponses.createdAt);
                setResponses(result);
            } catch (error) {
                console.error("Error fetching responses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, [params?.formId]);

    console.log("ganesh", responses);

    return (
        <div className="p-6">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Form Analysis
            </h1>

            {/* Loading State */}
            {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Loading responses...</p>
            ) : responses.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No responses yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    {/* Table */}
                    <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                                <th className="px-4 py-2 border">User</th>
                                <th className="px-4 py-2 border">Response</th>
                                <th className="px-4 py-2 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responses.map((response, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 border text-gray-800 dark:text-gray-300">
                                        {response.createdBy}
                                    </td>
                                    <td className="px-4 py-2 border text-gray-800 dark:text-gray-300">
                                        {response.jsonResponse}
                                    </td>
                                    <td className="px-4 py-2 border text-gray-800 dark:text-gray-300">
                                        {response.createdAt}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FormAnalysisPage;
