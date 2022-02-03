import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Progress, Text, Heading, Center } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";

const NextSteps = (props) => {
  const { handleSubmit } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const onSubmit = (data) => {
    action(data);
    props.history.push("./thank-you");
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Next Steps - Document Gathering</Heading>
        <Text fontSize="2xl">
          To speed up the process, please start gathering the following
          documents, which a Bank will likely ask for:
        </Text>
        <br />
        <Text fontSize="2xl">Salaried Persons:</Text>
        <br />
        <ol>
          <li>1. Job letter</li>
          <li>2. Last 3 Mths pay slips (6 Mths if variable income)</li>
          <li>3. 2 proof of address (Utility Bill, D/L and /or Voter’s ID)</li>
          <li>4. 1 ID (D/L, Voters ID, Work ID and /or Passport) </li>
          <li>5. Statement balances for all external loans/mortgages.</li>
        </ol>
        <br />
        <Text fontSize="2xl">Self Employed Persons:</Text>
        <br />
        <ol>
          <li>1. Statement balances for all external loans/mortgages.</li>
          <li>
            2. Income/Accountant letter + last 2 years audited/unaudited
            financial statements, or Last 2 years filed tax returns
          </li>
          <li>3. 2 proof of address (Utility Bill, D/L and /or Voter’s ID)</li>
          <li>4. Business registration</li>
          <li>5. Last 6 months business account transaction history</li>
        </ol>
        <Center>
          <button
            type="submit"
            className="submit-button"
            value="Save & Continue"
          >
            Finish
          </button>
        </Center>
        <br />
      </form>
      <FeedbackFish projectId="01ebf0d6447158">
        <button className="feedback">Give us Feedback</button>
      </FeedbackFish>
    </>
  );
};

export default withRouter(NextSteps);
