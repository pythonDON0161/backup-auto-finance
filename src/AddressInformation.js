import React from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine, StateMachineProvider } from "little-state-machine";
import { DevTool } from 'little-state-machine-devtools';
import updateAction from "./updateAction";
import { Input, Progress, Center,Flex,Box,Spacer, Select, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import InputMask from "react-input-mask";

import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

const AddressInformation = (props) => {
  const { register, setValue, handleSubmit, errors, control } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  //multistep form constants
  const {useState} = React;
  const [step,setStep] = useState(0);
  const [hideButton,setHideButton] = useState(0);
  const step_form = step+1;
  const Form = ()=>{
    
   //console.log(step)
    if(step==0){
    
    return (
    <First /> );
    
    }else if(step==1){
    
    return (
    <Second /> );
    
    }else if(step==2){
    
    return (
    <Third /> );
    
    }
    }

  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    registerPersonal(data)

        async function registerPersonal(data) {

            register({ name: "street", type: "custom" });
            setValue("street", data.street);
        
            register({ name: "city", type: "custom" });
            setValue("city", data.city);
        
            register({ name: "parish", type: "custom" });
            setValue("parish", data.parish);
            
            register({ name: "country", type: "custom" });
            setValue("country", data.country);
        
            register({ name: "timeAddress", type: "custom" });
            setValue("timeAddress", data.timeAddress);
            
            register({ name: "residentStatus", type: "custom" });
            setValue("residentStatus", data.residentStatus);

            register({ name: "prevTimeAddress", type: "custom" });
            setValue("prevTimeAddress", data.prevTimeAddress);
        }
        
       props.history.push("./employer");
  };


  const First = () =>{ 
  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Address Information</Heading>
        

        {/*console.log(step)*/}
        <label>
         Street Name & Number:
          <Input
            name="street"
            type="text"
            ref={register({ required: true })}
            defaultValue={state.data.street}
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
            defaultValue={state.data.city}
          />
        </label>

        <label>
          Parish: 
          <Input
            name="parish"
            type="text"
            ref={register({ required: true })}
            defaultValue={state.data.parish}
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
            defaultValue={state.data.country}
          />
          {errors.lastName && (
            <p className="error">Please enter the country you reside in</p>
          )}
        </label>

        <label >  
            How long have you been at this address?
          <Controller
                name="timeAddress"
                control={control}
                render={({ onChange, value }) => (
                    <DatePicker
                        selected={value}
                        onChange={onChange}
                    />
                )}
            />
            </label>

          <label>
           Residential Status:
            <Select
              name="residentStatus"
              options={["own", "rent", "parents","other"]}
              defaultValue={state.data.residentStatus}
              placeholder="Select option"
              ref={register({ required: true })}
            >
              <option value="own">Own</option>
              <option value="rent">Rent</option>
              <option value="parents">Living With Parents</option>
             
              <option value="other">Other</option>
            </Select>
         
          </label>
          <Center>
          <div className="footer">
            <button  className="submit-button" onClick={()=>{setStep(step+1)}}>Next</button>
        </div>
          </Center>
        
       
        <br />
        <Progress value={22} />
        <Center>Step 2 of 9</Center>

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
                    redirectUri: `${window.location.origin}/address-information`,
                  })
                }
              >
                Log In or Sign Up
              </Button>
            </Center>
          </SimpleGrid>
        </Container>
      )}
    </>
  );
};


const Second = () =>{ 
    return (
        <>
          <Header />
          {isAuthenticated && (
          <form >
            <Heading>Previous Address</Heading>
            <Text fontSize='2xl'>Complete if at Current Address less than 2 Years</Text>
            <label>
         Street Name & Number:
          <Input
            name="street"
            type="text"
            ref={register({ required: false })}
            defaultValue={state.data.prevStreet}
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
            defaultValue={state.data.prevCity}
          />
        </label>

        <label>
          Parish/State: 
          <Input
            name="parish"
            type="text"
            ref={register({ required: false })}
            defaultValue={state.data.prevParish}
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
            ref={register({ required: false })}
            defaultValue={state.data.prevCountry}
          />
          {errors.lastName && (
            <p className="error">Please enter the country you reside in</p>
          )}
        </label>

        <label>
         How long have you been at this address:
          <Input
            name="prevTimeAddress"
            ref={register}
            defaultValue={state.data.prevTimeAddress}
          />
        </label>
          <label>
           Residential Status:
            <Select
              name="residentStatus"
              options={["own", "rent", "parents","other"]}
              defaultValue={state.data.prevresidentStatus}
              placeholder="Select option"
              ref={register({ required: false })}
            >
              <option value="own">Own</option>
              <option value="rent">Rent</option>
              <option value="parents">Living With Parents</option>
             
              <option value="other">Other</option>

            </Select>
            </label>

            <Flex>
            <Box p='4' >
               <button onClick={()=>{setStep(step-1)}} className="submit-button" value=""
                >
                Previous
                </button>
            </Box>

            <Spacer />

            <Box p='4' >
                <button onClick={()=>{setStep(step+1)}}  className="submit-button" value="">
                Next
                </button>
            </Box>

            </Flex>
      </form>
        
       
        )}     </>

    );
};

const Third = () =>{ 

    return (
        <>
          <Header />
          {isAuthenticated && (
          <form >
            <Heading>Mailing Address</Heading>
            <Text fontSize='2xl'>Complete if Mailing address different from Current Address:</Text>
            <label>
         Street Name & Number:
          <Input
            name="street"
            type="text"
            ref={register({ required: false })}
            defaultValue={state.data.mailStreet}
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
            defaultValue={state.data.mailCity}
          />
        </label>

        <label>
          Parish/State: 
          <Input
            name="parish"
            type="text"
            ref={register({ required: false })}
            defaultValue={state.data.mailParish}
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
            ref={register({ required: false })}
            defaultValue={state.data.mailCountry}
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
            ref={register({ required: false })}
            defaultValue={state.data.mailAddress}
          />
           
          </label>

          <label>
           Residential Status:
            <Select
              name="residentStatus"
              options={["own", "rent", "parents","other"]}
              defaultValue={state.data.mailResidentStatus}
              placeholder="Select option"
              ref={register({ required: false })}
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
                <button  type="submit" className="submit-button" value="">
                Save & Continue
                </button>
            </Box>

            </Flex>
      </form>
        
       
        )}     </>
    )
}
    
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



export default withRouter(

  
  AddressInformation
  
  );
