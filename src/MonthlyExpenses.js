import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Select, Progress, Center, Heading, Container, SimpleGrid, Text, 
  Button,
   NumberInput, 
  NumberInputField } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";


const MonthlyExpenses = (props) => {
  const { register, handleSubmit, control, setValue, getValues, watch } = useForm();
  const { action, state } = useStateMachine(updateAction);
  
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "mortgage": data.mortgage,
        "rent": data.rent,
        "creditCard": data.creditCard,
        "existingCarLoan":data.existingCarLoan,
        "otherLoanPayments": data.otherLoans,
      } }
    console.log(body)
    fetch(`https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications?filter[emailAddress]=${user.email}`, {
      headers: headers,
    })
    .then((response) => response.json())
    .then(json => {
      // Do something with object
      const userID = json.applications[0].id;
      fetch(`https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications/${userID}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then((addInfo) => addInfo.json())
    .then(json => {
      // Do something with object
      console.log(json.application);
    });
    });
    props.history.push("./trade-in");
  };

  register({ name: "totalExpenses", type: "custom" });

  function handleTotal() {
   
    setValue( "totalExpenses",  finalExpenses );
  }

  const parse = (val) =>  val.replace(/^\$/, ""); 
  const format = (val) => `$` + Number(val);

  //const totalExpenses = getValues("totalExpenses");
  //console.log(totalExpenses+" "+ "This is total expenses")

  var mortgage = Number(watch("mortgage") )
  const rent = Number(watch("rent"))
  const creditCard = Number(watch("creditCard"))
  const carLoan = Number(watch("existingCarLoan"))
  const otherLoan = Number( watch("otherLoans") )
  //mortgage = Number(mortgage)

  //console.log(mortgage)
  var test

  useEffect( ()=> {

    setValue ( "finalExpenses", ( parseInt(mortgage) + parseInt(rent) + 
       parseInt(creditCard) + parseInt(carLoan) + parseInt(otherLoan)) )

       test = parseInt(mortgage) + parseInt(rent) + 
       
       parseInt(creditCard) + parseInt(carLoan) + parseInt(otherLoan) 
  
  }, [mortgage, rent, creditCard,carLoan,otherLoan] ) 

  const finalExpenses = watch("finalExpenses")

 

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Monthly Expenses</Heading>

        <label>
          Mortgage
          <Controller
            name="mortgage"
            //as={CurrencyFormat}
            control={control}
            defaultValue={ state.data.mortgage == null? 0 :
               state.data.mortgage }

            render={({ onChange, value }) => {
              return (
                <NumberInput
                  //placeholder="0"
                  onChange={ (v) => onChange(parse(v)) }
                  value={ format(value) }
                >
                  <NumberInputField />
                </NumberInput>
              );
            }}
          />
          
        </label>

        <label>
          Rent
          <Controller
            name="rent"
            //as={CurrencyFormat}
            control={control}
            defaultValue={state.data.rent == null ? 0: state.data.rent}
            render={({ onChange, value }) => {

              return (
                <NumberInput
                  onChange={(v) => onChange(parse(v))}
                  min={0}
                  value={format(value)}
                  ref={register({
                    required: "Gross Monthly Income is required",
                    min: 0,
                  })}
                >
                  <NumberInputField />
                </NumberInput>
              );
            }}
          />
        </label>

        <label>
          Credit Card Payments:
          <Controller
            name="creditCard"
            //as={CurrencyFormat}
            control={control}
            className="priceInput"
            defaultValue= {state.data.creditCard == null ? 0: state.data.creditCard}
            render={({ onChange, value }) => { 

              return (
                <NumberInput
                  onChange={(v) => onChange(parse(v))}
                  min={0}
                  value={format(value)}
                  ref={register({
                    required: "Gross Monthly Income is required",
                    min: 0,
                  })}
                >
                  <NumberInputField />
                </NumberInput>
              );
            }}
          />
        </label>

        {/* <label>
        Do you intend on selling your existing car or paying off the existing loan? (if applicable)
        <Select
          name="intent"
          ref={register}
          defaultValue={state.data.intent}
          placeholder="Select option"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
      </label>      
      {watchIntent === 'No' ? */}

          <label>
            Existing Car Loan Payment:
            <Controller
              name="existingCarLoan"
             // as={CurrencyFormat}
              control={control}
             //className="priceInput"
              defaultValue = {state.data.existingCarLoan == null ? 0: state.data.existingCarLoan}
              render={({ onChange, value }) => {
                return (
                  <NumberInput
                    onChange={(v) => onChange(parse(v))}
                    min={0}
                    value={format(value)}
                    ref={register({
                      min: 0
                    })}
                  >
                    <NumberInputField />
                  </NumberInput>
                );
              }}
            />
            
            (Please enter even if you plan on selling or trading in.)
          </label>
        <label>
          Other Loan Payments:
          <Controller
            name="otherLoans"
           // as={CurrencyFormat}
            control={control}
            defaultValue= {state.data.otherLoans == null? 0: state.data.otherLoans }
            render={({ onChange, value }) => {
              return (
                <NumberInput
                  onChange={(v) => onChange(parse(v))}
                  min={0}
                  value={format(value)}
                
                >
                  <NumberInputField />
                </NumberInput>
              );
            }}
          />
        </label>

        <Text>
         Total Monthly Obligations:${!isNaN(finalExpenses) ? finalExpenses.toLocaleString() : finalExpenses }

         </Text>

        { register({name: "finalExpenses", type: "custom"})}


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
        <Progress value={44} />
        <Center>Step 4 of 9</Center>
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
                Please Log in or Sign Up below to access this page and find out
                what you might qualify for.
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
    </>
  );
};

export default withRouter(MonthlyExpenses);
