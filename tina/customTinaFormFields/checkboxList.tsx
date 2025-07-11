import { Checkbox, Field, Label } from '@headlessui/react';

export interface CheckboxListProps {
  criteriaSatisfaction: {
    criteria: string;
    satisfied: boolean;
  }[];
}

export const checkboxList = (onChange, criteriaSatisfaction) => {
  return (
    <div className="flex flex-col gap-2">
      {criteriaSatisfaction?.map((entry, idx) => {
        return (
          <div key={`${idx}-satisfaction`}>
            <Field className="flex items-center gap-2">
              <Checkbox
                checked={entry.satisfied}
                onChange={(checked: boolean) => {
                  entry.satisfied = checked;
                  onChange(entry.criteria, checked);
                }}
                className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
              >
                <svg
                  className="stroke-white opacity-0 group-data-checked:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="text-gray-600 text-sm">{entry.criteria}</Label>
            </Field>
          </div>
        );
      })}
    </div>
  );
};
