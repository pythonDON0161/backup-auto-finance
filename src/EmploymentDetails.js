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
  const parse = (val) => val.replace(/^\$/+ "")
  const format = (val) =>  `$` + Number(val) //wrapping val in Number replaces leading zero // { Number(val)}

  
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
      //grossMonthlyIncome: "",
    //  otherMonthlyIncome: "",
      total: 0,
    },
  });
  
  var totalText

  const grossIncome = Number(watch("grossMonthlyIncome"));
  const otherIncome = Number(watch("otherMonthlyIncome"));
  const finale = watch("total")

  
 
  useEffect( () => {
      setValue("total", parseInt(grossIncome) +  parseInt(otherIncome) ) 
      //totalText = (parseInt(grossIncome) + parseInt(otherIncome)) 
      console.log(finale + "finale")
      //if( (grossIncome != "" && grossIncome != undefined) && (otherIncome !=""|| otherIncome !== undefined) )
      }, [grossIncome, otherIncome]
  );

  /*
  useEffect(() => {
    
    setValue("total", parseInt(grossIncome) + parseInt(otherIncome));
  }, [grossIncome, otherIncome]
     
  ); */

  const { action, state } = useStateMachine(updateAction);

  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");

  const onSubmit = (data) => {
    action(data);
    const body = {
      application: {
        employmentStatus: data.employmentStatus,
        grossMonthlyIncome: data.grossMonthly,
        otherMonthlyIncome: data.otherMonthly,
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
      const watchStatus = watch("employmentStatus", state.data.employmentStatus);

      console.log("im here" + watchStatus)
    if (watchStatus === "Self Employed") {

      props.history.push("./self-employed");
    } 
    else if ( watchStatus === "Full-time" || watchStatus === "Contract" || watchStatus === "Part-time" ) 

    {  props.history.push("./monthly-expenses");  } 

    else if ( watchStatus === "Retired" || watchStatus === "Student" || watchStatus === "Unemployed"
    ) 
    
    {  props.history.push("./monthly-expenses"); }
  };
  

  function handleTotal() {
    register({ name: "totalMonthly", type: "custom" });
    setValue( "totalMonthly", Number(grossIncome) + Number(otherIncome) ) ;
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
              <form onSubmit={handleSubmit(onSubmit)} >
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
                  Gross Monthly Salary/Commissions/Self-Employment Earnings{" "}
                  <br />
                  (Before taxes and deductions):
                  <Controller
                    control={control}
                    
                    name="grossMonthlyIncome"
                   
                    defaultValue = {state.data.grossMonthlyIncome == null?
                       0: state.data.grossMonthlyIncome}
                    render={({ onChange, value }) => {
                      return (
                        <NumberInput
                        onChange={(v) => onChange(parse(v) )} 
  
                        min={0}
                          //{...otherIncome !== "undefined" ?"defined":"undefined" }
                       // onFocus={ (e) =>  e.target.value = setValue() }
                        value={format(value)}
                   
                        ref={register({
                          required: "Other Monthly Income is required",
                          min: 0,
                        })}
                      >
                        <NumberInputField />
                      </NumberInput>
                      );
                    }}
                  />
                  {errors.grossMonthlyIncome && (
                    <p className="error">{errors.grossMonthlyIncome.message}</p>
                  )}
                </label>


                <label>
                  Other Monthly Income (Rental Income/Investment Income etc.): 
                  <Controller
                    control={control}
                    
                    name="otherMonthlyIncome"
                    defaultValue= {state.data.otherMonthlyIncome == null?
                       "": state.data.otherMonthlyIncome}
                    render={({ onChange, value, onFocus }) => {
                      return (
                        <NumberInput
                          onChange={(v) => onChange(parse(v) )} 
    
                          min={0}
                            //{...otherIncome !== "undefined" ?"defined":"undefined" }
                         // onFocus={ (e) =>  e.target.value = setValue() }
                          value={format(value)}
                          defaultValue={state.data.otherMonthlyIncome}
                          ref={register({
                            required: "Other Monthly Income is required",
                            min: 0,
                          })}
                        >
                          <NumberInputField />
                        </NumberInput>
                      );
                    }}
                  />
                  {errors.otherMonthlyIncome && (
                    <p className="error">{errors.otherMonthlyIncome.message}</p>
                  )}
                </label>

                <Text>

                Total Monthly Income: $
                 

                { !isNaN(finale)  ? finale.toLocaleString(undefined, {minimumFractionDigits: 2}): 

                <>

                  { isNaN(parseInt(grossIncome)) ? 0: parseInt(grossIncome).toLocaleString(undefined, {minimumFractionDigits: 2}) }
                
                </> } 

                </Text>

                {register({name: "total",type: "custom"})}

                { /*
                <label>
                  <Controller
                    control={control}
                    name="total"
                    render={({ onChange, value }) => {
                      return (
                        <NumberInput
                          onChange={(v) => onChange(parse(v))}
                          min={0}
                          value={format(value)}
                          ref={register()}
                        >
                          <NumberInputField />
                        </NumberInput>
                      );
                    }}
                  />
                </label>
                  */}

                <Text></Text>

                {/*<label htmlFor="totalMonthly">
          Total Monthly Income:{" "}
          {(parseInt(watchGross, 10) + parseInt(watchOther, 10)).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </label> */}

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
