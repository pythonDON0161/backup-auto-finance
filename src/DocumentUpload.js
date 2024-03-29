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
        <Second /> );
        
        }else if(step==1){
        
        return (
        <Second /> );
        
        }
        }
 

  const Second = () =>{ 
    return (
        <>
        <Header />
        
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading>Documents</Heading>
                <Text>You may upload some or all of the following:</Text>

              <br></br>

                <Text align='left' fontSize='2xl' >Personal Documents</Text>
                <UnorderedList spacing={3}>

                    <ListItem> Identification (Drivers License, Passport Picture Page or Voters ID)  </ListItem>
                    <ListItem> Self-capture image of yourself holding up your ID  </ListItem>

                </UnorderedList>

              <br></br>

              <Text align='left' fontSize='2xl' >Financial Documents</Text>
                <UnorderedList spacing={3}>

                    <ListItem>Last 3 Months Pay Slip</ListItem>
                    <ListItem>Income Verification Letter From Your Employer</ListItem>
                    <ListItem> Credit Bureau Authorization </ListItem>

                </UnorderedList>

              <br></br>

              <Text align='left' fontSize='2xl'> Vehicle Documents (For Used Cars) </Text>
              
                <UnorderedList spacing={3}>
                    <ListItem> Motor Vehcile Valuation </ListItem>
                    <ListItem> Motor Vehicle Fitness </ListItem>
                    <ListItem> Motor Vehicle Registration </ListItem>
                </UnorderedList>

           
              <br></br>

            <Center>
              <Link to="/upload-section">
                <button className="wide-button"  >
                  Continue
                </button> 
                </Link> 
            </Center>
      {/* 
            <Center>
            <Link to="/personal-details" >
                <button className="wide-button" type="submit">
                    Home
                </button>
               </Link>
    </Center> */ }
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
