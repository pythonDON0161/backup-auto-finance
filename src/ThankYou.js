import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Progress, Text, Center } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";

const ThankYou = (props) => {
  const {  handleSubmit } = useForm();
  const { action } = useStateMachine(updateAction);
  const onSubmit = (data) => {
    action(data);
    props.history.push("./");
  };
//TODO clear state on exit
  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
          <Text fontSize="4xl">
            Thank You!
          </Text>
            <br />
            <br />
          <Text fontSize="2xl">  
            The banks you have selected should contact you within 1 business day.
            <br />  
            <br />If you have any questions, please contact us at autofinancejamaica@gmail.com
            </Text>
        <Center>
          <button
            type="submit"
            className="submit-button"
            value="Save & Continue"
          >
            Exit
          </button>
        </Center>
        <br />
        <Progress value={100} />
      </form>
      <FeedbackFish projectId="01ebf0d6447158">
        <button className="feedback">Give us Feedback</button>
      </FeedbackFish>
    </>
  );
};

export default withRouter(ThankYou);
