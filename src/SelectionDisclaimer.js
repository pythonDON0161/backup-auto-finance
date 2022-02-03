import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Progress, Heading, Center } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";

const SelectionDisclaimer = (props) => {
  const { handleSubmit } = useForm();
  const { action } = useStateMachine(updateAction);
  const onSubmit = (data) => {
    action(data);
    props.history.push("./recommendation");
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>
          By proceeding to view the Banks we are recommending for you to choose
          from – it is understood as follows:
        </Heading>
        <ol>
          <li>
            1. The lending terms shown are, to the best of our knowledge, the
            key lending terms currently existing in the market.
          </li>
          <br />
          <li>
            2. A bank may change its terms without notice and as such it is
            possible that this app has not yet been updated to revise all such
            changes.
          </li>
          <br />
          <li>
            3. A bank may offer different terms to different customers based on
            the vehicle being purchased, your credit score and its specific
            lending policies.
          </li>
          <br />
          <li>4. Each bank may have its own specific terms and conditions.</li>
          <br />
          <li>
            5. As such, the Bank Terms we show are illustrative only, not a
            commitment by a Bank to offer finance on the terms shown.
          </li>
        </ol>
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
      </form>
      <FeedbackFish projectId="01ebf0d6447158">
        <button className="feedback">Give us Feedback</button>
      </FeedbackFish>
    </>
  );
};

export default withRouter(SelectionDisclaimer);
