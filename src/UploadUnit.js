import React, { useState, useRef } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Icon
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useController, useForm, Controller } from "react-hook-form";

export const UploadUnit = ({
  name,
  placeholder,
  acceptedFileTypes,
  children,
  isRequired = false
}) => {
  const inputRef = useRef(0);

  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    watch,
    control,
    ref
  } = useForm();

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="writeUpFile">{children}</FormLabel>

        <Controller
          name="job"
          control={control}
          defaultValue=""
          render={({ onChange, name, value }) => {
            return (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiFile} />
                </InputLeftElement>
                <input
                  type="file"
                  onChange={(e) => onChange(e.target.files[0])}
                  accept={acceptedFileTypes}
                  name={name}
                  ref={inputRef}
                  style={{ display: "none" }}
                />
                <Input
                  placeholder={placeholder || "Your file ..."}
                  onClick={() => inputRef.current.click()}
                  // onChange={(e) => {}}
                  onChange={console.log(value)}
                  readOnly={true}
                  name={name}
                  ref={register}
                  value={(value && value.name) || ""}
                />
              </InputGroup>
            );
          }}
        />
      </FormControl>
    </>
  );
};

UploadUnit.defaultProps = {
  acceptedFileTypes: "",
  allowMultipleFiles: false
};

export default UploadUnit;
