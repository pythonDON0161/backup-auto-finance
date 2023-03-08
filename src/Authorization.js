import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Input, Progress, Center, Heading, Select, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";

import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header";

const Authorization = (props) => {
  const { handleSubmit, register, errors, watch } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  let authorization = watch("authorization");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "authorization": data.authorization,
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
    props.history.push("./preference");
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Authorization</Heading>
        <p className="declaration">
          I hereby authorize Deal Selecta JA to share my personal information submitted herein with the
          banks I have selected, for purposes of applying for an auto loan.
        </p>
        <label>
          Yes or No:
          <Select
            name="authorization"
            defaultValue={state.data.authorization}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="Yes">Yes, contact the bank on my behalf</option>
            <option value="No">No, do not contact the bank on my behalf</option>
          </Select>
          {errors.authorization && (
            <p className="error">Please choose an option</p>
          )}
        </label>
        {authorization === "Yes" &&
        <label>
          Sign your name:
          <Input
            name="signature"
            ref={register({ required: true })}
            defaultValue={state.data.signature}
          />
          {errors.signature && (
            <p className="error">Please type your name for your signature</p>
          )}
        </label>
        }
        <div>
          <Center>
            <button className="submit-button pad" type="submit">
              Continue
            </button>
          </Center>
        </div>
        <br />
        <Progress value={100} />
        <Center>Step 9 of 9</Center>

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
                    redirectUri: `${window.location.origin}/authorization`,
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

export default withRouter(Authorization);
