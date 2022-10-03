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

const CoApplicantDisclaimer = (props) => {
  
  const { action, state } = useStateMachine(updateAction);

  //funciton to reset individual state variables


  return (
    <>
      <Header />
      
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading>Co-Applciant Disclaimer</Heading>
          </Center>
         
          </SimpleGrid>
          <div className="coapp">
          <Center>
            <p>
            For joint applicants who are married or living in the same household, 
            any joint expenses, eg. rent/mortgage may be shown under either of the applicants – or split between the two applicants
            </p>
          </Center>
          <Center>
            <Link to="/ca-applicant-details">
              <button className="submit-button" type="submit">
              Continue
              </button>
            </Link>
            </Center>
  
          <br />
       
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
      </div>
    </>
  );
};

export default withRouter(CoApplicantDisclaimer);
