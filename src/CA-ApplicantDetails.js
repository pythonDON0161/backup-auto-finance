import React from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Input, Progress, Center, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";

const CAApplicantDetails = (props) => {
  const { register, handleSubmit, errors, control } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "coAppFirstName": data.caFirstName,
        "coAppMiddle": data.caMiddleInit,
        "coAppLastName": data.caLastName,
        "coAppBirthdate": data.caDateOfBirth,
        "coAppCell": data.caCellNumber
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
    props.history.push("./ca-employment-details");
  };
  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Co-Applicant Details</Heading>
        <label>
          First Name:
          <Input
            name="caFirstName"
            ref={register({ required: true })}
            defaultValue={state.data.caFirstName}
          />
          {errors.caFirstName && (
            <p className="error">Please enter your first name</p>
          )}
        </label>
        <label>
          Middle Initials:
          <Input
            name="caMiddleInit"
            ref={register}
            defaultValue={state.data.caMiddleInit}
          />
        </label>

        <label>
          Last Name:
          <Input
            name="caLastName"
            ref={register({ required: true })}
            defaultValue={state.data.caLastName}
          />
          {errors.caLastName && (
            <p className="error">Please enter your last name</p>
          )}
        </label>

          <label>
          Date of Birth (MM/DD/YYYY):
          <Controller
            name="caDateOfBirth"
            control={control}
            defaultValue={state.data.caDateOfBirth}
            rules={{ required: true }}
            render={({ onChange, value }) => (

              <InputMask mask="99/99/9999" placeholder="MM/DD/YYYY" value={value} onChange={onChange}>
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    ref={register({ required: true })}
                    type="tel"
                    disableUnderline
                    defaultValue={state.data.caDateOfBirth}
                  />
                )}
              </InputMask>
            )}
            
          />

          {errors.caDateOfBirth && (
            <p className="error">Please enter your date of birth</p>
          )}

          </label>


        <label>
            Cell Number:
          <Controller
            name="caCellNumber"
            control={control}
            defaultValue={state.data.caCellNumber}
            rules={{ required: true }}
            render={({ onChange, value }) => (
              <InputMask mask="(999)-999-9999" placeholder="(876) 555-5555" value={value} onChange={onChange}>
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    type="tel"
                    ref={register({ required: true })}
                    disableunderline
                  />
                )}
              </InputMask>
            )}
          />
          {errors.caCellNumber && (
            <p className="error">Please enter your cellphone number</p>
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
        <Center>Step 1 of 3</Center>
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
                    redirectUri: `${window.location.origin}/ca-applicant-details`,
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

export default withRouter(CAApplicantDetails);
