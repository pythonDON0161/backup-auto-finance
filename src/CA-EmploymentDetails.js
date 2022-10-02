import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {Select,Progress,Center,Heading,Container,SimpleGrid,
  Text,
  Button,
  Input,
  NumberInputField,
  NumberInput, Modal,ModalOverlay,ModalContent,ModalHeader, ModalFooter,ModalBody,
  ModalCloseButton, useDisclosure
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import CurrencyInput from 'react-currency-input-field';
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "./components/Sidebar";


const employementStatus = [
  "Full-time",
  "Part-time",
  "Contract",
  "Self Employed",
  "Retired",
  "Student",
  "Unemployed",
];

const EmploymentDetails = (props) => {
 
  const {
    register,
    control,
    getValues,
    setValue,
    watch,
    reset,
    handleSubmit,
    errors,
  } = useForm({
    defaultValues: {
      employementStatus: "",
      caGrossMonthlyIncome: 0,
      caOtherMonthlyIncome: 0,
      total: 0,
    },
  });
  

  
  const { action, state } = useStateMachine(updateAction);

  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  
  const { isOpen, onOpen, onClose } = useDisclosure()


  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");


  const onSubmit = (data) => {
    action(data);
    const body = {
      application: {
        caEmploymentStatus: data.caEmploymentStatus,
        caGrossMonthlyIncome: data.caGrossMonthly,
        caOtherMonthlyIncome: data.caOtherMonthly,
      },
    };
    
    fetch(
      `https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications?filter[emailAddress]=${user.email}`,
      {
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((json) => {
        // Do something with object
        const userID = json.applications[0].id;
        fetch(
          `https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications/${userID}`,
          {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body),
          }
        )
          .then((addInfo) => addInfo.json())
          .then((json) => {
            // Do something with object
            console.log(json.application);
          });
      });
     // handleTotal()
       //props.history.push("./ca-monthly-expenses");
      //console.log( state.data.caOtherMonthly , state.data.caGrossMonthly )
        
    };
    

  const watchStatus = watch("employmentStatus", state.data.employmentStatus);

  
  //const finale = watch("caTotalMonthly")
  //const caGrossIncome = Number(watch("caGrossMonthly") )
  //const caOtherIncome = Number(watch("caOtherMonthly"))


  { register({name: "caTotalMonthly", type: "custom"})}

  const [input_values, set_inputvalues] = useState ({
    caGrossMonthly: 0,
    caOtherMonthly: 0,
  });


  const [caTotal, set_caTotal] = useState(0);

  useEffect(() => {

    const arrValues = Object.values( input_values );
    const inputTotals = arrValues.reduce( (accum, curr) => (accum += curr), 0 );
    set_caTotal( parseInt(inputTotals).toLocaleString() );
    //console.log( "inputTotals", inputTotals );
    //parseInt( caGrossIncome) + parseInt(caOtherIncome) ) 

  }, [input_values]);

  var expTot = watch("totalExpenses")

  const changeValues = ({ name, value }) => {
    set_inputvalues({ ...input_values, [name]: parseInt(value
      .replaceAll(/[^0-9]/gi, "")
      .replace(/^\$/, "")
      .replaceAll(",", "")) });
  };

  function sumVals (obj) {
        return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
       }
    
 
 let tIncome

 function handleTotal(){

  const dVals =  getValues( ["caGrossMonthly", "caOtherMonthly"] );
  //console.log( "dVals", dVals );
  tIncome =  parseInt( sumVals( dVals ) );
  //console.log("tIncome is",tIncome);
  setValue( "caTotalMonthly", tIncome);
  onOpen()

  //return tIncome;

  return tIncome;
  


}


  return (
    <>
      <div>
        <div class="outer-container">
          <div className="header-container"></div>

          <div class="sidebar-container">
            <Sidebar></Sidebar>
          </div>
          <div class="form-container">
            <Header />
            {isAuthenticated && (
             <form onSubmit={ handleSubmit(onSubmit) } >

            <Heading>Co-Applicant Employment Details</Heading>

              <label>
                  Employment Status:

                  <Select name="employmentStatus" ref={register}>
                    {employementStatus.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>

                  {errors.employementStatus && (
                    <p className="error">Please select an option</p>
                  )}
                </label>

                <label>
                Gross Monthly Salary (before any tax or salary deductions)
                  <Controller
                name="caGrossMonthly"
                control={control}
                defaultValue={state.data.caGrossMonthly}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="caGrossMonthly"
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      defaultValue={state.data.caGrossMonthly}
                      onChange={({ target }) => changeValues(target)}
                      onValueChange={onChange}
                    />
                  );
                }}
              />
              {errors.caGrossMonthly && (
                    <p className="error">Please enter your Gross Monthly Salary</p>
                  )}
                </label>

              
                <label>
                  Other Monthly Income
                  <Controller
                name="caOtherMonthly"
                control={control}
                defaultValue={state.data.caOtherMonthly}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="caOtherMonthly"
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      defaultValue={state.data.caOtherMonthly}
                      onChange={({ target }) => changeValues(target)}
                      onValueChange={onChange}
                            />

                  );
                }}
              />
                  {errors.caOtherMonthly && (
                    <p className="error">Please select an option</p>
                  )}
                </label>

                <Text fontWeight="bold">
                 {/*Total Monthly Income:$ { !isNaN(expTot) ? expTot.toLocaleString(undefined, {minimumFractionDigits: 2}); */}
                 Total Monthly Income:${ handleTotal().toLocaleString() }
                
         </Text>
              
                <Center>
                  <button
                    type="submit"
                    onClick={handleTotal}
                    className="submit-button"
                    value="Save & Continue"
                  >
                    Save & Continue
                  </button>
                </Center>

                <Button onClick={onOpen}>Trigger modal</Button>

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>For joint applicants who are married or living in the same household,
 any joint expenses, eg. rent/mortgage may be shown under either of the applicants – 
or split between the two applicants</Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Continue</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
                <br />
                <Progress value={33} />
                <Center>Step 3 of 9</Center>
                <FeedbackFish projectId="01ebf0d6447158">
                  <button className="feedback">Give us Feedback</button>
                </FeedbackFish>

             </form>

            )}
            {!isAuthenticated && (
              <Container centerContent className="pt-8">
                <SimpleGrid columns={1} spacing="20px">
                  {/* <Center>
              <img src={raceCar} alt="Race Car" />
            </Center> */}
                  <Center>
                    <Text fontSize="xl">
                      Please Log in or Sign Up below to access this page and
                      find out what you might qualify for.
                    </Text>
                  </Center>
                  <Center>
                    <Button
                      onClick={() =>
                        loginWithRedirect({
                          redirectUri: `${window.location.origin}/ca-employment-details`,
                        })
                      }
                    >
                      Log In/Sign Up
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

export default withRouter(EmploymentDetails);
