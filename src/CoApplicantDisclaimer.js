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

import Header from "./components/Header";

const CoApplicantDisclaimer = (props) => {
  
  const { action, state } = useStateMachine(updateAction);

  //funciton to reset individual state variables


  return (
    <>
      <Header />
      
        <SimpleGrid columns={1} spacing={0}>
          
          <Center>
            <Heading>Note re Co-Applicant Expenses</Heading>
          </Center>
         
          </SimpleGrid>
          <div className="coapp">
          <Center>
            <Text fontWeight="bold">
            For joint applicants who are married or living in the same household, 
            any joint expenses, eg. rent/mortgage may be shown under either of the applicants – or split between the two applicants
            </Text>
          </Center>
          <Center>
            <Link to="/ca-applicant-details">
              <button className="submit-button" type="submit">
              Continue
              </button>
            </Link>
            </Center>
  
          <br />
       

      </div>
    </>
  );
};

export default withRouter(CoApplicantDisclaimer);
