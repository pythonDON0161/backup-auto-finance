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

  //funciton to reset individual state variables
  function resetCA(){
    state.data.caFirstName =""
    state.data.caMiddleInit=""
    state.data.caLastName=""
    state.data.caDateOfBirth=""
    state.data.caCellNumber=""
    state.data.caCreditGrade=""
    state.data.caMortgage = 0
    state.data.caGrossMonthly = 0
    state.data.caTotalMonthly = 0
    state.data.caTotalExpenses = 0
    state.data.caOtherMonthly = 0
    state.data.caExistingCarLoan = 0
    state.data.caOtherLoans = 0
    state.data.caCreditCard= 0
    state.data.caRent = 0
    state.data.caRatio = 0 
    state.data.caTDSR = 0
    //window.alert("hello")
  }
  return (
    <>
      <Header />
      
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading >Do You Have a Co-Applicant?</Heading>
          </Center>
         
          </SimpleGrid>
          <div className="coapp">
          <Center>
            <p>
              Having a well qualified coapplicant can significantly boost your
              ability to get the auto-loan of your dreams. In the case of{" "}
              <strong>students</strong>, <strong>retired</strong> or <strong>unemployed</strong> persons,
              you are in most cases <strong>required</strong> to have a coapplicant to be
              considered for a loan.{" "}
              <br />
              <br />
              Where mortgage, rent or other obligations are joint, you may show the entire monthly payment under either applicant, or split between the two applicants
            </p>
          </Center>
          <Center>
            <Link to="/co-app-disclaimer">
              <button className="submit-button" type="submit">
                Yes
              </button>
            </Link>
            </Center>
            <Center>
            <Link to="/grade-your-credit" onClick={resetCA}>
              <button className="submit-button" type="submit">
                No
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

export default withRouter(CoApplicant);
