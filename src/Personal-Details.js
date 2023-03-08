import React from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Input, Progress, Center, Select, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import InputMask from "react-input-mask";

import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";
const PersonalDetails = (props) => {
  const { register, setValue, handleSubmit, errors, control } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    registerPersonal(data)

        async function registerPersonal(data) {

            register({ name: "trn", type: "custom" });
            setValue("trn", data.trn);
        
            register({ name: "maidenName", type: "custom" });
            setValue("maidenName", data.maidenName);
        
            register({ name: "gender", type: "custom" });
            setValue("gender", data.gender);
            
            register({ name: "dependents", type: "custom" });
            setValue("dependents", data.dependents);
        
            register({ name: "maritalStatus", type: "custom" });
            setValue("maritalStatus", data.maritalStatus);
            
            register({ name: "education", type: "custom" });
            setValue("education", data.education);
        }
        
       props.history.push("./identification");
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Applicant Details</Heading>
        <label>
         TRN (Tax Registration Number)
          <Input
            name="trn"
            placeholder="123456789"
            maxLength="13"
            ref={register({ required: true })}
            defaultValue={state.data.trn}
          />
          {errors.firstName && (
            <p className="error">Please enter your TRN</p>
          )}
        </label>
        <label>
          Maiden Name (If applicable):
          <Input
            name="middleInit"
            ref={register}
            defaultValue={state.data.middleInit}
          />
        </label>


        <label>
          No. Of Dependents: 
          <Input
            name="dependents"
            type="number"
            ref={register({ required: true })}
            defaultValue={state.data.dependents}
          />
          {errors.lastName && (
            <p className="error">Please enter your last name</p>
          )}
        </label>

        <label>
           What is your Marital Status? 
            <Select
              name="tradeIn"
              options={["Single", "Married", "Separated","Divorced","Other"]}
              defaultValue={state.data.tradeIn}
              placeholder="Select option"
              ref={register({ required: true })}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="separated">Separated</option>
              <option value="divorced">Divorced</option>
              <option value="other">Other</option>
            </Select>
            {errors.tradeIn && <p className="error">Please select an option</p>}
          </label>


          <label>
           What is your Education Level? 
           
            <Select
              name="education"
              options={["highSchool", "diploma", "undergrad","postGrad","Other"]}
              defaultValue={state.data.education}
              placeholder="Select option"
              ref={register({ required: true })}
            >
              <option value="highSchool">High School</option>
              <option value="diploma">Diploma</option>
              <option value="undergrad">Undergrad</option>
              <option value="postGrad">Post Graduate</option>
              <option value="other">Other</option>
            </Select>
            {errors.tradeIn && <p className="error">Please select an option</p>}
          </label>

        <Center>     
          <button
            type="submit"
           
            className="submit-button"
            value="Save & Continue"
          >
            Save & Continue
          </button>
        </Center>


        <br />
        <Progress value={22} />
        <Center>Step 2 of 9</Center>

      </form>
      )}
      {!isAuthenticated && (
        <Container centerContent className="pt-8">
          <SimpleGrid columns={1} spacing="20px">
            <Center>
              <Text fontSize="xl">
                Please Log in or Sign Up below to access this page and find out
                what you might qualify for.
              </Text>
            </Center>
            <Center>
              <Button
                onClick={() =>
                  loginWithRedirect({
                    redirectUri: `${window.location.origin}/personal-details`,
                  })
                }
              >
                Log In or Sign Up
              </Button>
            </Center>
          </SimpleGrid>
        </Container>
      )}
    </>
  );
};

export default withRouter(PersonalDetails);
