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

import Header from "./components/Header";

const CreditReportPrompt = (props) => {
  
  const { action, state } = useStateMachine(updateAction);

  return (
    <>
      <Header />
      <div className="coapp">
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading>Your Credit Report</Heading>
          </Center>
          <Center>
            <p className="prompt-text">
            You are entitled to a Free Credit Report once per year from each of the credit bureaus in Jamaica.
             <br/>
             You can request your Free Credit Report online, which will then be sent to you by email.

            </p>
          </Center>
          <Center>
           <Link to="/credit-report"> 
              <button className="wide-button" type="submit">
              Yes - I would like to request my Free Credit Report and then upload it so that the banks I have selected can access it (Recommended)
              </button>
            </Link>
      
           
          </Center>

          <Center>
            <Link to="/document-upload">
              <button className="wide-button" type="submit">
                No – I will authorize the banks I have selected to pull my credit report
              </button>
              </Link>
            
         </Center>

          <br />
        </SimpleGrid>

      </div>
    </>
  );
};

export default withRouter(CreditReportPrompt);
