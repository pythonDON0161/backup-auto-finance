import React from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Input, Progress, Center,Flex,Box,Spacer, Select, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import PDFDOC from "./components/PDFMAKE";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Sidebar from "./components/Sidebar"

const EmployerDetails = (props) => {
  const { register, setValue, handleSubmit, errors, control } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  //multistep form constants
  const {useState} = React;
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

  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    registerPersonal(data)

        async function registerPersonal(data) {

            register({ name: "emplyStreet", type: "custom" });
            setValue("emplyStreet", data.emplyStreet);
        
            register({ name: "emplyCity", type: "custom" });
            setValue("emplyCity", data.emplyCity);
        
            register({ name: "emplyParish", type: "custom" });
            setValue("emplyParish", data.emplyParish);
            
            register({ name: "emplyCountry", type: "custom" });
            setValue("emplyCountry", data.emplyCountry);
        
            register({ name: "occupation", type: "custom" });
            setValue("occupation", data.occupation);
            
            register({ name: "jobTitle", type: "custom" });
            setValue("jobTitle", data.jobTitle);

            register({ name: "prevOccupation", type: "custom" });
            setValue("prevOccupation", data.prevOccupation);
            
            register({ name: "prevJobTitle", type: "custom" });
            setValue("prevJobTitle", data.prevJobTitle);
        }
        
       props.history.push("./employer");
  };


  const First = () =>{ 
  return (
    <>
    <div>
    <div class="outer-container">
        <div className="header-container">
          </div>

     <div class="sidebar-container">   
       <Sidebar></Sidebar>
       </div>
       <div class="form-container"> 
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Current Employer</Heading>
        
        <label>
         Street Name & Number:
          <Input
            name="street"
            type="text"
            ref={register({ required: true })}
            defaultValue={state.data.emplyStreet}
          />
          {errors.street && (
            <p className="error">Please enter your employer's street address</p>
          )}
        </label>
        
        <label>
         City/Town:
          <Input
            name="city"
            ref={register}
            defaultValue={state.data.emplyCity}
          />
        </label>

        <label>
          Parish: 
          <Input
            name="parish"
            type="text"
            ref={register({ required: true })}
            defaultValue={state.data.emplyParish}
          />
          {errors.lastName && (
            <p className="error">Please enter the parish you reside in</p>
          )}
        </label>

        <label>
          Country: 
          <Input
            name="country"
            type="text"
            ref={register({ required: true })}
            defaultValue={state.data.emplyCountry}
          />
          {errors.lastName && (
            <p className="error">Please enter the country you reside in</p>
          )}
        </label>

        <label>
          Occupation:
          <Input
            name="occupation"
            type="text"
            ref={register({ required: true })}
            defaultValue={state.data.occupation}
          />
           
          </label>

          <label>
           Job Title:
            <Input
                name="jobTitle"
                type="text"
                ref={register({ required: true })}
                defaultValue={state.data.jobTitle}
            />
            <label>

            </label>
         
          </label>
          <Center>
          <div className="footer">
            <button  className="submit-button" onClick={()=>{setStep(step+1)}}>Next</button>
        </div>
          </Center>
        
        <br />
        <Progress value={22} />
        <Center>Step 2 of 9</Center>
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
      </form>
      )}
      {!isAuthenticated && (
        <Container centerContent className="pt-8">
          <SimpleGrid columns={1} spacing="20px">
            <Center>
              <Text fontSize="xl">
                Please Log in or Sign Up below to access this page and find out
                what you might qualify for.
              </Text>
            </Center>
            <Center>
              <Button
                onClick={() =>
                  loginWithRedirect({
                    redirectUri: `${window.location.origin}/employer`,
                  })
                }
              >
                Log In or Sign Up
              </Button>
            </Center>
          </SimpleGrid>
        </Container>
      )}
      </div>
      </div>
      </div>
    </>
  );
};

const Second = () =>{ 
    return (
        <>
          <Header />
          {isAuthenticated && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading>Previous Employer Information</Heading>
            <Text fontSize='2xl'>Complete if less than 5 years at Current Employer</Text>
           
            <label>
            Employer Name
            <Input
                name="street"
                type="text"
                ref={register({ required: true })}
                defaultValue={state.data.employerName}
            />
            {errors.street && (
                <p className="error">Please enter your street address</p>
            )}
        </label>
           
            <label>
            Street Name & Number:
            <Input
                name="street"
                type="text"
                ref={register({ required: true })}
                defaultValue={state.data.prevEmplyStreet}
            />
            {errors.street && (
                <p className="error">Please enter your street address</p>
            )}
        </label>
        
        <label>
         City/Town:
          <Input
            name="city"
            ref={register}
            defaultValue={state.data.prevcity}
          />
        </label>

        <label>
          Parish/State: 
          <Input
            name="parish"
            type="text"
            ref={register({ required: true })}
            defaultValue={state.data.prevparish}
          />
          {errors.lastName && (
            <p className="error">Please enter the parish you reside in</p>
          )}
        </label>

        <label>
          Country: 
          <Input
            name="country"
            type="text"
            ref={register({ required: true })}
            defaultValue={state.data.prevcountry}
          />
          {errors.lastName && (
            <p className="error">Please enter the country you reside in</p>
          )}
        </label>

        <label>
          Time At Current Address:
          <Input
            name="timeAddress"
            type="text"
            ref={register({ required: true })}
            defaultValue={state.data.prevtimeAddress}
          />
           
          </label>

          <label>
           Residential Status:
            <Select
              name="residentStatus"
              options={["own", "rent", "parents","other"]}
              defaultValue={state.data.prevresidentStatus}
              placeholder="Select option"
              ref={register({ required: true })}
            >
              <option value="own">Own</option>
              <option value="rent">Rent</option>
              <option value="parents">Living With Parents</option>
             
              <option value="other">Other</option>

            </Select>
            </label>

            <Flex>
            <Box p='4' >
               <button onClick={()=>{setStep(step-1)}}  className="submit-button" value=""
                >
                Previous
                </button>
            </Box>

            <Spacer />

            <Box p='4' >
                <button type="submit" className="submit-button" value="">
                Save & Continue
                </button>
            </Box>

            </Flex>
      </form>
        )}     
    
    </>

    );
};

return (
    <>
        <div class="form">
            <div className="card">
                <div>{
                    <Form />}</div>
    
            </div>
        </div>
    </>
    );
}

export default withRouter(EmployerDetails);

