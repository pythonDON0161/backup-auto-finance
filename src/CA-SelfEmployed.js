import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Select, Progress, Center, Heading, Container, Button, Text, SimpleGrid } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";

const CASelfEmployed = (props) => {
  const { register, handleSubmit, control, errors } = useForm();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const { action, state } = useStateMachine(updateAction);
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "coAppYearsSelfEmployed": data.caYearsSelfEmployed,
        "coAppBusinessMonthlySales": data.caMonthlySales,
        "coAppFinancials": data.caFinancials
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
    props.history.push("./ca-monthly-expenses");
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Self Employment</Heading>
        <label>
          For how many years have you been Self-Employed?
          <Select
            name="caYearsSelfEmployed"
            defaultValue={state.data.caYearsSelfEmployed}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="<2">Less than 2 years</option>
            <option value="2-4">2 - 4 years</option>
            <option value=">4">5 years or more</option>
          </Select>
          {errors.caYearsSelfEmployed && (
            <p className="error">Please select an option</p>
          )}
        </label>
        <label>
          Approximately how much sales does your business do in an average
          month?
          <Select
            name="caMonthlySales"
            defaultValue={state.data.caMonthlySales}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="<250k">Under $250,000</option>
            <option value="250k-500k">$250,000 - $500,000</option>
            <option value=">500k">More than $500,000</option>
          </Select>
          {errors.caMonthlySales && (
            <p className="error">Please select an option</p>
          )}
        </label>
        <label>
          What type of Financial Information do you have?During the past 2
          years, have you been out of work at any time for over a month (other
          than vacation/maternity time off)?
          <Select
            name="caFinancials"
            defaultValue={state.data.caFinancials}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="Audited">Audited covering at least 2 years</option>
            <option value="Unaudited">
              Unaudited/In-house covering at least 2 years
            </option>
            <option value="lessThanTwoYears">
              Financial information does not cover a full 2 years
            </option>
          </Select>
          {errors.caFinancials && (
            <p className="error">Please select an option</p>
          )}
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
        <Container centerContent class="pt-8">
          <SimpleGrid columns={1} spacing="20px">
            {/* <Center>
              <img src={raceCar} alt="Race Car" />
            </Center> */}
            <Center>
              <Text fontSize="xl">
                Please Log in or Sign Up below to access this page and find out
                what you qualify for.
              </Text>
            </Center>
            <Center>
              <Button
                onClick={() =>
                  loginWithRedirect({
                    redirectUri: `${window.location.origin}/ca-self-employed`,
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

export default withRouter(CASelfEmployed);
