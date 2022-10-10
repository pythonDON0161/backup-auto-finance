import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  SimpleGrid,
  Center,
  Progress,
  Heading,Text
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";

const SubmitApplication = (props) => {
  
  const { action, state } = useStateMachine(updateAction);

  //funciton to reset individual state variables


  return (
    <>
      <Header />
      
        <SimpleGrid columns={1} spacing={0}>
          <Center>
            <Heading style={{textAlign:"center"}}>Submitting Your Application</Heading>
          </Center>
         
          </SimpleGrid>
          <div className="coapp">
          <Center>
            <Text fontWeight="bold" textAlign="center">
                Please click the “Finish/Submit My Application” button below for us to send your information to the banks 
                you have selected.
            </Text>
          </Center>

          <Center>
                <Link to="/thank-you">
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

export default withRouter(SubmitApplication);
