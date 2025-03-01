"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Edit, Share2, Trash, FileText } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../config";
import { JsonForms } from "../../../config/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";

const FormListItem = ({ jsonForm, formRecord, refreshData }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const deleteForm = async () => {
    setLoading(true);
    try {
      const result = await db
        .delete(JsonForms)
        .where(
          and(
            eq(JsonForms.id, formRecord.id),
            eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      if (result === 0) {
        setLoading(false);
        toast.error("Failed to delete the form. Please try again.");
        return;
      }
      setLoading(false);
      toast.success("Form Deleted Successfully!");
      refreshData();
    } catch (error) {
      console.error("Error deleting form:", error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all duration-300"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {jsonForm?.formTitle}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {jsonForm?.formHeading}
              </p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors">
                <Trash className="h-5 w-5 text-red-500 hover:text-red-600 transition-colors" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-gray-900">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black dark:text-white">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                  This action cannot be undone. This will permanently delete
                  your form and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteForm()}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4"></div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    text:
                      jsonForm?.formHeading +
                      " Build your form in seconds using AI Builder",
                    url:
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "/aiform/" +
                      formRecord?.id,
                    title: jsonForm?.formTitle,
                  })
                  .catch((error) => console.log("Error sharing:", error));
              } else {
                const url =
                  process.env.NEXT_PUBLIC_BASE_URL +
                  "/aiform/" +
                  formRecord?.id;
                navigator.clipboard.writeText(url);
                toast.success("Link copied to clipboard!");
              }
            }}
          >
            <Share2 className="h-4 w-4" /> Share
          </Button>

          <Link href={`/edit-form/${formRecord.id}`}>
            <Button
              size="sm"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              <Edit className="h-4 w-4" /> Edit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormListItem;
