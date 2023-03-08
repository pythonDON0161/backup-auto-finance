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

const CreditReport = (props) => {
  
  const { action, state } = useStateMachine(updateAction);

  return (
    <>
      <Header />
      <div className="coapp">
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading>Links To Credit Report </Heading>
          </Center>
          <Center>
            <p className="prompt-text">
            You can select either of the links below to access your credit report – from CreditInfo Jamaica or CRIF.
             <br/>
             Each of the links below will take you to an external website. You may sign back into the Deal Selecta JA - Auto Loan Wizard once you completed your request to either CreditInfo or CRIF]

            </p>
          </Center>
          <Center>
            <a href="https://jm.creditinfo.com/" target="_blank"> 
              <button className="wide-button" type="submit">
               Visit Credit Info Jamaica Website
              </button>
            </a>
      
           
          </Center>

          <Center>
            <a href="https://www.crif.com.jm/" target="_blank">  
              <button className="wide-button" type="submit">
                  Visit CRIF Website
              </button>
              </a>
            
         </Center>

          <br />
        </SimpleGrid>

      </div>
    </>
  );
};

export default withRouter(CreditReport);
