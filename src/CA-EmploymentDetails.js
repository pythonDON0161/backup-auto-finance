import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  Select,
  Progress,
  Center,
  Heading,
  Container,
  SimpleGrid,
  Text,
  Button,
  Input,
  NumberInputField,
  NumberInput,
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

  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");


  const onSubmit = (data) => {
    action(data);
    const body = {
      application: {
        employmentStatus: data.caEmploymentStatus,
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
       props.history.push("./monthly-expenses");
      //console.log( state.data.caOtherMonthly , state.data.caGrossMonthly )

    };
    

  const watchStatus = watch("employmentStatus", state.data.employmentStatus);

  
  function handleTotal() {
    setValue("caGrossMonthly", caGrossMonthlyIncome);
    setValue("caOtherMonthly", caOtherMonthlyIncome);
    register({ name: "caTotalMonthly", type: "custom" });
    setValue( "caTotalMonthly", Number(caGrossMonthlyIncome) + Number(caOtherMonthlyIncome) ) ;
  }

  register({name: "caTotalMonthly",type: "custom"}) 
  const finale = watch("caTotalMonthly")


      const [caGrossMonthlyIncome, setcaGrossMonthlyIncome] = useState(state.data.caGrossMonthly);
      const [caOtherMonthlyIncome, setcaOtherMonthlyIncome] = useState(state.data.caOtherMonthly);


      function getData(val) {
        setcaGrossMonthlyIncome(
          val.target.value.replaceAll(/[^0-9]/gi, "").replace(/^\$/, "").replaceAll(",", "")
        );
        setValue("caGrossMonthly", val.target.value);
      }

      function otherMIncome(val) {
        setcaOtherMonthlyIncome(
          val.target.value.replaceAll(/[^0-9]/gi, "").replace(/^\$/, "").replaceAll(",", "")
        );
        setValue("caOtherMonthly", val.target.value);
      }
    


      useEffect( () => {
        //console.log("watching for value", caGrossMonthlyIncome); //this will not log anything
        console.log( "this is gross" + caGrossMonthlyIncome );
        console.log( "this is other" + caOtherMonthlyIncome );
         setValue("caTotalMonthly", parseInt(caGrossMonthlyIncome) + parseInt(caOtherMonthlyIncome));
         console.log(state.data.caTotalMonthly)
         
      }, [caGrossMonthlyIncome,caOtherMonthlyIncome]);

    
  

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

            <Heading>Employment Details</Heading>

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
               // defaultValue={state.data.caGrossMonthly}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="caGrossMonthlyui"
                      ref={register({
                        required: "Your Gross Income Is Required",
                        min:0
                      })}
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      defaultValue={state.data.caGrossMonthly}
                      // onChange={getData}
                      onChange={ getData} 
                      onValueChange={onChange}
                    />
                  );
                }}
              />
              {errors.caGrossMonthly && (
                    <p className="error"></p>
                  )}
                </label>

              
                <label>
                  Other Monthly Income
                  <Controller
                name="caOtherMonthlyui"
                control={control}
               // defaultValue={state.data.caOtherMonthly}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="caOtherMonthly"
                      ref={register({
                        required: "Other Monthly Income Is Required",
                        min:0
                      })}
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      defaultValue={state.data.caOtherMonthly}
                      // onChange={getData}
                      onChange={otherMIncome}
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
                  

                Total Monthly Income: $
                
                { !isNaN(finale) ? finale.toLocaleString(undefined, {minimumFractionDigits: 2}): 
                <>
                  { isNaN(parseInt(caGrossMonthlyIncome)) ? 0: 
                  parseInt(caGrossMonthlyIncome).toLocaleString(undefined, {minimumFractionDigits: 2}) }
                </> } 

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
                          redirectUri: `${window.location.origin}/applicant-details`,
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
