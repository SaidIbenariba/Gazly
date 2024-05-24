import React from "react";
import {
  Input,
  Typography,
  Card,
  Select,
  Button,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
/**
 * FormFielProps :  {
 * name :
 * label:
 * variant:
 * type:
 * value:
 *
 * }
 */
const FormField = ({
  label,
  value,
  handleChange,
  type = "text",
  options = [],
  inputType = "",
  name,
}) => {
  return (
    <>
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        {label}
      </Typography>
      {inputType === "select" ? (
        <Select
          value={value || ""}
          className="input"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => handleChange(e, name)}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      ) : (
        <Input
          type={type}
          size="lg"
          value={value}
          className="input"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          // onChange={(e) => setValues({ ...values, firstname: e.target.value })}
          onChange={(e) => handleChange(e.target.value, name)}
        />
      )}
    </>
  );
};

const form = ({ fields, onSubmit, values }) => {
  const [formValues, setFormValues] = useState(values || {});
  // console.log(formValues);
  const handleChange = (value, fieldName) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };
  useEffect(() => {
    setFormValues(values || {});
  }, [values]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    onSubmit(formValues);
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
            />
          ))}
          <Button type="submit" className="button w-full mt-10" text={`save`}>
            save
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default form;

/**
 * <div className=" flex flex-col h-[100vh] p-2 items-center">
        <div className="flex flex-col ">
          <nav className="flex justify-between">
            <h1 className=" text-3xl font-bold text-text dark:text-text">
              Edit User
            </h1>
            <Link to="/users" className="button">
              Home
            </Link>
          </nav>
          <Card color="transparent" className="w-fit p-5" shadow={true}>
            <form className="mt-2 mb-2 w-80 sm:w-96" onSubmit={handleUpdate}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  FirstName
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  value={values.firstname}
                  className="input"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setValues({ ...values, firstname: e.target.value })
                  }
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  LastName
                </Typography>
                <Input
                  size="lg"
                  className="input"
                  value={values.lastname}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setValues({ ...values, lastname: e.target.value })
                  }
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Email
                </Typography>
                <Input
                  type="email"
                  size="lg"
                  placeholder="name@mail.com"
                  value={values.email}
                  className="input"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Role
                </Typography>
                <Select
                  className="input"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={values.role}
                  onChange={(value) => setValues({ ...values, role: value })}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="responsable">Responsable</Option>
                  <Option value="ouvrier">Ouvrier</Option>
                </Select>
              </div>
              <Button
                type="submit"
                className="button w-full mt-10"
                text={`save`}
              >
                save
              </Button>
            </form>
          </Card>
        </div>
      </div>
 */
