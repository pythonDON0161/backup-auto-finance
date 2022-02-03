import React from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Input, Progress, Center, Heading, Container, SimpleGrid, Text, Button, Textarea } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { FeedbackFish } from "@feedback-fish/react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header";

const AdditionalInfo = (props) => {
  const { handleSubmit, register, errors, control } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "officerName": data.officerName,
        "officerNumber": data.officerNumber,
        "officerEmail": data.officerEmail
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
    props.history.push("./authorization");
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Additional information</Heading>
        {state.data.primaryBank !== "N/A" &&
        <label>
          If you have an existing loan officer at {state.data.primaryBank.toUpperCase()}:
          <br /><br />
          Name:
          <Input
            name="officerName"
            ref={register}
            defaultValue={state.data.officerName}
          />
          <br /><br />
          Best Contact Number:
          <Controller
            name="officerNumber"
            control={control}
            defaultValue={state.data.officerNumber}
            render={({ onChange, value }) => (
              <InputMask mask="(999)-999-9999" placeholder="(876) 555-5555" value={value} onChange={onChange}>
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    type="tel"
                    disableUnderline
                  />
                )}
              </InputMask>
            )}
          />
          <br /><br />
          Email Address:
          <Input
            name="officerEmail"
            ref={register}
            defaultValue={state.data.officerEmail}
          />
        </label>}
        {/* <label>
          If you have an existing loan officer at {state.data.bankSelection2}:
          <br /><br />
          Name:
          <Input
            name="officerTwoName"
            // defaultValue={state.data.officerOneName}
          />
          <br /><br />
          Best Contact Number:
          <Controller
            name="officerTwoNumber"
            control={control}
            // defaultValue={state.data.officerTwoNumber}
            render={({ onChange, value }) => (
              <InputMask mask="(999)-999-9999" placeholder="(876) 555-5555" value={value} onChange={onChange}>
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    type="tel"
                    disableUnderline
                  />
                )}
              </InputMask>
            )}
          />
          <br /><br />
          Email Address:
          <Input
            name="officerTwoEmail"
            // defaultValue={state.data.officerOneEmail}
          />
        </label> */}
        <p>
          Please enter any additional information which you believe would assist
          a bank in finding the right loan for you, or which you believe would
          be relevant to a loan application.
        </p>
        <label>
          <Textarea
            name="additionalInfo"
            placeholder="Enter additional information here ..."
            // defaultValue={state.data.additionalInfo}
          />
        </label>
        <div>
          <Center>
            <button
              type="submit"
              className="submit-button"
              value="Save & Continue"
            >
              Continue
            </button>
          </Center>
        </div>
        <br />
        <Progress value={100} />
        <Center>Step 9 of 9</Center>
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
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
                    redirectUri: `${window.location.origin}/additional-info`,
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

export default withRouter(AdditionalInfo);
