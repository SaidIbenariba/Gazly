import React, { useState, useEffect } from "react";
import { Input, Typography, Card, Select, Button, Option, Textarea } from "@material-tailwind/react";
import axios from "axios";

const FormField = ({
  label,
  value,
  handleChange,
  type = "text",
  options = [],
  inputType = "",
  name,
  required = false 
}) => {
  return (
    <>
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        {label}
      </Typography>
      {inputType === "select" ? (
        //  { 
          required ? (
            <Select
            value={value || ""}
            className="input"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(value) => handleChange(value, name)}
            aria-required = "true"
          >
            {options.map((option,index) => (
              <Option key={index} value={String(option.value)}>
                {option.label}  
              </Option>
            ))}
          </Select>
          ) : (
            <Select
            value={value || ""}
            className="input"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(value) => handleChange(value, name)}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          )
  
      ) : ( 
          inputType == "area" ? ( 
            <Textarea
            type={type}
          size="lg"
          value={value}
          className="input"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => handleChange(e.target.value, name)}
            />
          ) :   (required  ? (
            <Input
            type={type}
            size="lg"
            value={value}
            className="input"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => handleChange(e.target.value, name)}
            // {required ? }
            required 
          />
          ):(
            <Input
            type={type}
            size="lg"
            value={value}
            className="input"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => handleChange(e.target.value, name)}
          />
          ))
      )}
    </>
  );
};

const Form = ({ fields, onSubmit, initialValues, isEditMode }) => {
  const [formValues, setFormValues] = useState(initialValues);
  
  console.log("initial values of form ", formValues); 

  const handleChange = (value, fieldName) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // If in edit mode, call edit mission handler
      // console.log(formValues); 
      onSubmit(formValues);
      
    } else {
      // If in create mode, call create mission handler
      onSubmit(formValues);
    }
  };

  return (
    <Card color="transparent" className="w-fit p-5" shadow={true}>
      <form className="mt-2 mb-2 w-80 sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          {fields.map((field, index) => (
            <FormField
              key={index}
              label={field.label}
              type={field.type}
              value={formValues[field.name]}
              name={field.name}
              options={field.options}
              handleChange={handleChange}
              inputType={field.inputType}
              required={field.required}
            />
          ))}
          <Button type="submit" className="button w-full mt-10" text={`save`}>
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Form;
