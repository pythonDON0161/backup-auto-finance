import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  SimpleGrid,
  Center,
  Progress,
  Heading,
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";

const CoApplicant = (props) => {
  
  const { action, state } = useStateMachine(updateAction);

  return (
    <>
      <Header />
      <div className="coapp">
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading>Completing Your Application</Heading>
          </Center>
          <Center>
            <p className="prompt-text">
            The banks you have selected will need some additional Personal Details, including Employment and Address information and for your Credit Report in order to complete your application.
             <br/>
             You can upload this information online, or you can choose to provide this information to each of the banks directly.
            </p>
          </Center>
          <Center>
            <Link to="/credit-prompt">
              <button className="wide-button" type="submit">
                Yes - I would like to upload some or all of this information in order to speed up my application (Recommended)
              </button>
            </Link>``
           
          </Center>

          <Center>
          <Link to="/thank-you" >
              <button className="wide-button" type="submit">
                No - I will provide this information to the banks myself
              </button>
             </Link>
         </Center>

          <br />
        </SimpleGrid>
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
      </div>
    </>
  );
};

export default withRouter(CoApplicant);
