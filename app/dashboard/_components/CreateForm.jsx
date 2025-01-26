'use client';

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState('');

  const onCreateForm = () => {

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
              <Button onClick={() => onCreateForm()}>Submit</Button>
              <Button variant="destructive" onClick={() => setOpenDialog(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
