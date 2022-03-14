import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Select, Progress, Center, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";

const EmploymentDetails2 = (props) => {
  const { register, handleSubmit, control, errors } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {

    action(data);
      const body = {
        "application": {
          "workExperience": data.workExperience,
          "probation": data.probationaryPeriod,
          "outOfWork": data.outOfWork,
        }
      }
      fetch(`https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications?filter[emailAddress]=${user.email}`, {
        headers: headers,
      })
      .then((response) => response.json())
      .then(json => {
        // Do something with object
        const userID = json.applications[0].id;
        fetch(`https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications/${userID}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
      })
      .then((addInfo) => addInfo.json())
      .then(json => {
        // Do something with object
        console.log(json.application);
      });
      });
    props.history.push("./monthly-expenses");
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Employment Details</Heading>
        <label>
          Do you have less than 1 year total full-time work experience?
          <Select
            name="workExperience"
            defaultValue={state.data.workExperience}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="Less than 1 year">Yes</option>
            <option value="More than 1 year">No</option>
          </Select>
          {errors.workExperience && (
            <p className="error">Please select an option</p>
          )}
        </label>
        <label>
          In your current position, are you still in a probationary period?
          <Select
            name="probationaryPeriod"
            defaultValue={state.data.probationaryPeriod}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
          {errors.probationaryPeriod && (
            <p className="error">Please select an option</p>
          )}
        </label>
        <label>
          During the past 2 years, have you been out of work at any time for
          over a month (other than vacation/maternity time off)?
          <Select
            name="outOfWork"
            defaultValue={state.data.outOfWork}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
          {errors.outOfWork && <p className="error">Please select an option</p>}
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
        <Progress value={33} />
        <Center>Step 3 of 9</Center>
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
      </form>
            )}
            {!isAuthenticated && (
              <Container centerContent className="pt-8">
                <SimpleGrid columns={1} spacing="20px">
                  {/* <Center>
                    <img src={raceCar} alt="Race Car" />
                  </Center> */}
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
                          redirectUri: `${window.location.origin}/employment-details-2`,
                        })
                      }
                    >
                      Log In/Sign Up
                    </Button>
                  </Center>
                </SimpleGrid>
              </Container>
            )}
    </>
  );
};

export default withRouter(EmploymentDetails2);
