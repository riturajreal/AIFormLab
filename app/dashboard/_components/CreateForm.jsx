'use client';

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/config/AiModal";
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {db} from "@/config";
import { JsonForms } from "@/config/schema";
import moment from 'moment'
import { Loader2 } from "lucide-react";


const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const PROMPT = ",On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle,FieldType, Placeholder, label , required fields, and checkbox and select field type options will be in array only and in JSON format";

  const onCreateFrom = async () => {
    // console.log(userInput);

    setLoading(true);
    // GEMINI Response
    const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
    console.log("resp:", result.response.text());

    if (result.response.text()) {
      const resp = await db.insert(JsonForms).values({
        jsonform: result.response.text(),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD/MM/YYYY')
      }).returning({ id: JsonForms.id });

      if(resp[0].id) {
        router.push('/edit-form/'+resp[0].id)
      }
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              Write a description for your form below.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Textarea
              className="my-2"
              placeholder="Write description for your form"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
            />
            <div className="flex gap-2 my-3 justify-end">
              <Button disabled={loading} onClick={() => onCreateFrom()}>{loading ? <Loader2 className="animate-spin" /> : 'Submit'}</Button>
              <Button variant="destructive" onClick={() => setOpenDialog(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
