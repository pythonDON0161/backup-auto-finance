import React, { useState }  from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import {  Grid, GridItem ,Select, Progress, Center, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
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
                <Heading>Documents To Be Uploaded</Heading>
                

                <SimpleGrid columns={2} spacing={10}>
                <label>
                  Last 3 Months Pay Slip
                <input className="fileUpload" {...register("picture")} type="file"/>
                </label>

                <label>
                  Job Letter
                <input className="fileUpload" {...register("picture")} type="file"/>
                </label>

                </SimpleGrid>
                
                <label>
                Income verification for Self-Employed persons 
                <input className="fileUpload" {...register("picture")} type="file"/>
                </label>
                 
                <small id="selfEmployed">  (May include: Audited financial statements for past 3 years, Bank statements for past 12 months, Confirmation of salary from Chartered or Public Accountant) </small>
                
                <label>
                Valid Govt Issued ID (Drivers License/Passport/National Voters ID) TRN
                <input className="fileUpload" {...register("picture")} type="file"/>
                </label>

               

                
                <label>
                Pro Forma Invoice from Dealer
                <input className="fileUpload" {...register("picture")} type="file"/>
                </label>

                
                <label>
                Valuation Report (For Used Vehicles)
                <input className="fileUpload" {...register("picture")} type="file"/>
                </label>

            <Center>
                <button className="wide-button" onClick={()=>{setStep(step-1)}} >
                  Previous
                </button>  
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
