import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Progress, Text, Heading, Center, Select, Container, SimpleGrid, Button } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";

const CreditGrade = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const { action, state } = useStateMachine(updateAction);
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "gradeYourCredit": data.creditGrade,
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
    props.history.push("./co-applicant");
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Which of the Following Best Applies to You?</Heading>
        <div className="mb-5">
          <Text fontSize="3xl">Excellent Credit</Text>
          <p>
            No significant late payments or arrears in past 3 years, credit
            cards/lines of credit not maxed out
          </p>
        </div>
        <div className="mb-5">
          <Text fontSize="3xl">Average Credit</Text>
          <p>
            Limited late payments or no arrears over 90 days in past 3 years
          </p>
        </div>
        <div className="mb-5">
          <Text fontSize="3xl">Below Average Credit</Text>
          <p>
            Significant amount of late payments or arrears over 90 days or
            defaults in past 3 years.
          </p>
        </div>
        <div className="mb-5">
          <Text fontSize="3xl">Overseas Credit History</Text>
        </div>
        <div className="mb-5">
          <Text fontSize="3xl">No Credit History</Text>
        </div>
        <label>
          Credit Grade:
          <Select
            name="creditGrade"
            options={["Below Average", "Average", "Excellent"]}
            defaultValue={state.data.creditGrade}
            placeholder="Select option"
            ref={register({ required: true })}
          >
            <option value="Excellent">Excellent Credit</option>
            <option value="Average">Average Credit</option>
            <option value="Below Average">Below Average Credit</option>
            <option value="Overseas">Overseas Credit History</option>
            <option value="No Credit">No Credit History</option>
          </Select>
          {errors.creditGrade && (
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
        <Progress value={88} />
        <Center>Step 8 of 9</Center>
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
                    redirectUri: `${window.location.origin}/pre-qualification`,
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

export default withRouter(CreditGrade);
