import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Select, Progress, Center, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";

import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";

const CAEmploymentDetails2 = (props) => {
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
          "coAppWorkExperience": data.caWorkExperience,
          "coAppProbation": data.caProbationaryPeriod,
          "coAppOutOfWork": data.caOutOfWork,
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
       //console.log(json.application);
      });
      });
    props.history.push("./ca-monthly-expenses");
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Co Applicant Employment Details</Heading>
        <label>
          Do you have less than 1 year total full-time work experience?
          <Select
            name="caWorkExperience"
            defaultValue={state.data.caWorkExperience}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="Less than 1 year">Yes</option>
            <option value="More than 1 year">No</option>
          </Select>
          {errors.caWorkExperience && (
            <p className="error">Please select an option</p>
          )}
        </label>
        <label>
          In your current position, are you still in a probationary period?
          <Select
            name="caProbationaryPeriod"
            defaultValue={state.data.caProbationaryPeriod}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
          {errors.caProbationaryPeriod && (
            <p className="error">Please select an option</p>
          )}
        </label>
        <label>
          During the past 2 years, have you been out of work at any time for
          over a month (other than vacation/maternity time off)?
          <Select
            name="caOutOfWork"
            defaultValue={state.data.caOutOfWork}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
          {errors.caOutOfWork && <p className="error">Please select an option</p>}
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
                          redirectUri: `${window.location.origin}/applicant-details`,
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

export default withRouter(CAEmploymentDetails2);
