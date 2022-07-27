import React, { useState }  from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import {  Grid, ListItem,
  GridItem,
  Select, 
  Progress, 
  Center, 
  Heading, Container, SimpleGrid, 
  Text, Button, UnorderedList} from "@chakra-ui/react";
import updateAction from "./updateAction";

import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";

const DocumentUpload = (props) => {
    const {
        register,
        handleSubmit,
        control,
        errors,
        getValues,
        setValue,
        watch,
      } = useForm();
    const { action, state } = useStateMachine(updateAction);
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data)

  }
    const [step,setStep] = useState(0);
    const [hideButton,setHideButton] = useState(0);
    const step_form = step+1;

    const Form = ()=>{
    
        if(step==0){
        
        return (
        <First /> );
        
        }else if(step==1){
        
        return (
        <Second /> );
        
        }
        }
 

const First = () =>{
  return (
    <>
      <Header />
      <div className="coapp">
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading>Document Upload</Heading>
          </Center>
          <Center>
            <p className="prompt-text">
            The banks you have selected will require certain documents in order to  give you a conditional loan decision.

             <br/>
             You can upload this information online, or you can choose to provide this information to each of the banks directly.
            </p>
          </Center>
          <Center>
           
              <button className="wide-button" onClick={()=>{setStep(step+1)}} >
                Yes - I would like to upload some or all of this information in order to speed up my application (Recommended)
              </button>
              </Center>
       

          <Center>
          <Link to="/personal-details" >
              <button className="wide-button" type="submit">
              No – I will provide this information to the banks myself

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
  )
  }

  const Second = () =>{ 
    return (
        <>
        <Header />
        
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading>Documents Summary </Heading>
                <Text>Thank you for your application, based on your selections 
                  here are a list of documents you will need to upload.</Text>

              <br></br>

                <Text align='left' fontSize='2xl' >Personal Documents</Text>
                <UnorderedList spacing={3}>

                    <ListItem>Driver’s License/Passport/Voter’s ID</ListItem>
                    <ListItem>Tax Registration Number (TRN) Card</ListItem>
                    <ListItem>NIS Card</ListItem>

                </UnorderedList>

              <br></br>

              <Text align='left' fontSize='2xl' >Financial Documents</Text>
                <UnorderedList spacing={3}>

                    <ListItem>Last 3 Months Pay Slip</ListItem>
                    <ListItem>Income Verification Letter</ListItem>
                    <ListItem>Credit Authorization</ListItem>

                </UnorderedList>

              <br></br>

              <Text align='left' fontSize='2xl' >Proof Of Identity</Text>
                <UnorderedList spacing={1}>

                    <ListItem>A self captured image of yourself holding up your photo verification.</ListItem>

                </UnorderedList>

              <br></br>

            <Center>
              <Link to="/upload-section">
                <button className="wide-button"  >
                  Continue
                </button> 
                </Link> 
            </Center>
  
            <Center>
            <Link to="/personal-details" >
                <button className="wide-button" type="submit">
                    Save & Continue
                </button>
               </Link>
           </Center>
            </form>
      
            
      </>       
    )
  }

  return (
    <>
        <div className="form">
            <div className="card">
                <div>{
                    <Form />}</div>
    
            </div>
        </div>
    </>
    );
    
};

export default withRouter(DocumentUpload);
