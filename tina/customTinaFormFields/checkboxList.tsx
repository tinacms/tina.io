import { Checkbox, Field, Label } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import client from "tina/__generated__/client";
import { wrapFieldsWithMeta } from "tinacms";

export interface CheckboxListProps {
  criteriaSatisfaction: {
    criteria: string;
    satisfied: boolean;
  }[];
}

export const checkboxList = (criteriaSatisfaction, formatOnSave) => wrapFieldsWithMeta(({input}) => {

    return (
      <div className="flex flex-col gap-2">
        <p>Test text@</p>
        {criteriaSatisfaction?.map((entry) => {
          
          const [enabled, setEnabled] = useState(entry.satisfied);

        return <>
          <Field className="flex items-center gap-2">
        <Checkbox
          checked={enabled}
          onChange={(checked: boolean) => {setEnabled(checked); input.onChange(formatOnSave(entry.criteria, checked))}}
          className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
        >
          <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Checkbox>
        <Label>{entry.criteria}</Label>
      </Field>
        </>})}
      </div>
  )});