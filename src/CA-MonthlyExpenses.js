import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Select, Progress, Center, Heading, Container, SimpleGrid, Text, 
  Button,NumberInput, NumberInputField } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import CurrencyInput from 'react-currency-input-field';


const MonthlyExpenses = (props) => {
  const { register, handleSubmit, control, setValue, getValues, watch } = 
  
  useForm( {
    defaultValues: {
      //caMortgage: 0,
      //caRent: 0,
      //caCreditCard: 0,
      //caExistingCarLoan: 0,
      //caOtherLoans:0
      
    },}
  );

  const { action, state } = useStateMachine(updateAction);
  
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "caMortgage": data.caMortgage,
        "caRent": data.caRent,
        "caCreditCard": data.caCreditCard,
        "caExistingCarLoan":data.caExistingCarLoan,
        "caOtherLoanPayments": data.caOtherLoans,
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
  
    props.history.push("/result");
  };

  const totalEarned = state.data.caTotalMonthly
  
  { register({name: "caTotalExpenses", type: "custom"})};

  { register({name: "caTDSR", type: "custom"})}

  //const myValues = getValues(["caMortgage", "caRent","caCreditCard","caExistingCarLoan","caOtherLoans"]);

  const caMortgage = Number(watch("caMortgage") )
  const caRent = Number(watch("caRent"))
  const caCreditCard = Number(watch("caCreditCard"))
  const carLoan = Number(watch("caExistingCarLoan"))
  const otherLoan = Number( watch("caOtherLoans") )

  const [input_values, set_inputvalues] = useState ({
    caMortgage: 0,
    caRent: 0,
    caCreditCard: 0,
    caExistingCarLoan: 0,
    caOtherLoans: 0
  });

  const [caTotal, set_caTotal] = useState(0);

  useEffect(() => {
    const arrValues = Object.values(input_values);
    const inputTotals = arrValues.reduce((accum, curr) => (accum += curr), 0);

    set_caTotal(parseInt(inputTotals).toLocaleString());
    setValue( "caTotalExpenses",// parseInt(inputTotals)
       parseInt(caMortgage) + parseInt(caRent) + parseInt(caCreditCard) + parseInt(carLoan) + parseInt(otherLoan)  );

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

  let tExpenses;
  let tempTDSR;

 function handleTotal(){

    const dVals =  getValues( ["caMortgage", "caRent","caCreditCard","caExistingCarLoan","caOtherLoans"] );
   
    tExpenses =  parseInt(sumVals(dVals) );

    //console.log(tExpenses);

    setValue( "caTotalExpenses", tExpenses);

    setValue("caTDSR", Math.round( (tExpenses / totalEarned ) * 100) / 100);

    tempTDSR = state.data.caTDSR //getValues("caTDSR")

    //console.log("tempTDSR",tempTDSR)

    setValue("finalTDSR", tempTDSR );

   

    //console.log("finaltdsr", state.data.finalTDSR)

    return tExpenses;
   
  }


  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Monthly Expenses</Heading>

        <label>
          Mortgage
          <Controller
                name="caMortgage"
                control={control}
                defaultValue={state.data.caMortgage}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="caMortgage"
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      defaultValue={state.data.caMortgage}
                      maxLength={7}
                      decimalsLimit={2}
                      onChange={({ target }) => changeValues(target)}
                      onValueChange={onChange}
                    />
                  );
                }}
              />
        </label>

        <label>
          Rent
          <Controller
                name="caRent"
                control={control}
                defaultValue={state.data.caRent}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="caRent"
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      defaultValue={state.data.caRent}
                      maxLength={7}
                      decimalsLimit={2}
                      //defaultValue={state.data.caRent}
                     onChange={({ target }) => changeValues(target)}
                     onValueChange={onChange}
                    />
                  );
                }}
              />
        </label>

        <label>
        Credit Card Minimum Payments:
          <Controller
                name="caCreditCard"
                control={control}
                defaultValue={state.data.caCreditCard}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="caCreditCard"
                      defaultValue={state.data.caCreditCard}
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      //defaultValue={state.data.caRent}
                      onChange={({ target }) => changeValues(target)}
                      onValueChange={onChange}
                    />
                  );
                }}
              />
        </label>

          <label>
            Existing Car Loan Payment:
            <Controller
                name="caExistingCarLoan"
                control={control}
                defaultValue={state.data.caExistingCarLoan}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="caExistingCarLoan"
                      defaultValue={state.data.caExistingCarLoan}
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      onChange={({ target }) => changeValues(target)}
                      onValueChange={onChange}
                    />
                  );
                }}
              />
            
            (Please enter even if you plan on selling or trading in.)
          </label>
        <label>
          Other Loan Payments:
          <Controller
                name="caOtherLoans"
                control={control}
                defaultValue={state.data.caOtherLoans}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="caOtherLoans"
                      defaultValue={state.data.caOtherLoans}
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      onChange={({ target }) => changeValues(target)}
                      onValueChange={onChange}
                    />
                  );
                }}
              />
        </label>
                 

        <Text fontWeight="bold">
         Total Monthly Obligations:${!isNaN(expTot)  ? expTot.toLocaleString(undefined, {minimumFractionDigits: 2})
         : handleTotal().toLocaleString()
         
         }
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
                    redirectUri: `${window.location.origin}/ca-monthly-expenses`,
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
