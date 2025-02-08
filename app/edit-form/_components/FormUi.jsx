import React from "react";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import FieldEdit from "./FieldEdit";



const FormUi = ({ jsonForm, onFieldUpdate, deleteField }) => {

  return (
    <div className="border p-5 md:w-[600px] rounded-lg">
      <h1 className="font-bold text-2xl text-center">{jsonForm?.formTitle}</h1>
      <h1 className="text-sm text-gray-400 text-center">{jsonForm?.formHeading}</h1>
      {jsonForm?.fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field.fieldType === 'select' ?
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            : field.fieldType === 'radio' ?
              <div className="my-3 w-full">
                <label className="text-xs text-gray-500">{field.label}</label>
                <RadioGroup required={field?.required}>
                  {field?.options?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <RadioGroupItem value={item.label} id={item.label}
                        onClick={() => handleSelectChange(field.fieldName, item.label)}
                      />
                      <Label htmlFor={item.label}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              : field.fieldType == "checkbox" ? (
                <div className="my-3 w-full">
                  <label className="text-xs text-gray-500">{field?.label}</label>
                  {field?.options ? (
                    field?.options?.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Checkbox onCheckedChange={(v) => handleCheckboxChange(field?.label, item.label ? item.label : item, v)} />
                        <h2>{item.label ? item.label : item}</h2>
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-2 items-center">
                      <Checkbox required={field.required} />
                      <h2>{field.label}</h2>
                    </div>
                  )}
                </div>
              ) :
                <div className="my-3 w-full">
                  <label className="text-xs text-gray-500">{field.label}</label>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    name={field.fieldName}
                    onChange={(e) => onFieldUpdate(e.target.value, index)}
                    className="w-full rounded-md border-gray-300 p-2 text-sm"
                  />
                </div>
          }
          <div>
            <FieldEdit
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormUi;