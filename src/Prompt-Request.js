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
            The banks you have selected will require certain documents in order to process your application. 
             <br/>
             You can upload your documents to speed up your application
            </p>

          </Center>
          <Center>
            
            <Link to="/document-upload">
              <button className="wide-button" type="submit">
              Yes, I would like to upload my documents (Recommended)
              </button>
            </Link>
           
          </Center>

          <Center>
          <Link to="/submit-application" >
              <button className="wide-button" type="submit">
              No, I will provide my documents to the banks directly
              </button>
             </Link>
         </Center>

          <br />
        </SimpleGrid>

      </div>
    </>
  );
};

export default withRouter(CoApplicant);
