import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Select, Progress, Center, Heading, Container, SimpleGrid, Text, 
  Button,NumberInput, NumberInputField } from "@chakra-ui/react";

import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import CurrencyInput from 'react-currency-input-field';


const MonthlyExpenses = (props) => {
  const { register, handleSubmit, control, setValue, getValues, watch } = 
  
  useForm( {
    defaultValues: {
      //mortgage: 0,
      //rent: 0,
      //creditCard: 0,
      //existingCarLoan: 0,
      //otherLoans:0
      
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
        "mortgage": data.mortgage,
        "rent": data.rent,
        "creditCard": data.creditCard,
        "existingCarLoan":data.existingCarLoan,
        "otherLoanPayments": data.otherLoans,
      } }
   //console.log(body)
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
     //console.log(json.application);
    });
    });   
    
   

    props.history.push("./trade-in");
  };
  

  { register({name: "totalExpenses", type: "custom"})}
  { register({name: "finalExpenses", type: "custom"})}


  //const myValues = getValues(["mortgage", "rent","creditCard","existingCarLoan","otherLoans"]);

  const mortgage = Number(watch("mortgage") )
  const rent = Number(watch("rent"))
  const creditCard = Number(watch("creditCard"))
  const carLoan = Number(watch("existingCarLoan"))
  const otherLoan = Number( watch("otherLoans") )
  //mortgage = Number(mortgage)
  

  const [input_values, set_inputvalues] = useState ({
    mortgage: 0,
    rent: 0,
    creditCard: 0,
    existingCarLoan: 0,
    otherLoans: 0
  });

  const [total, set_total] = useState(0);

  useEffect(() => {
    const arrValues = Object.values(input_values);
    const inputTotals = arrValues.reduce((accum, curr) => (accum += curr), 0);

    set_total(parseInt(inputTotals).toLocaleString());
    

    setValue( "totalExpenses",// parseInt(inputTotals)
       parseInt(mortgage) + parseInt(rent) + parseInt(creditCard) + parseInt(carLoan) + parseInt(otherLoan)  ) 

   
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

  let tExpenses

 function handleTotal(){
    const dVals =  getValues(["mortgage", "rent","creditCard","existingCarLoan","otherLoans"]);

    tExpenses =  parseInt(sumVals(dVals) )

    setValue( "totalExpenses", tExpenses)

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
                name="mortgage"
                control={control}
                defaultValue={state.data.mortgage}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="mortgage"
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      defaultValue={state.data.mortgage}
                      maxLength={7}
                      min={0}
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
                name="rent"
                control={control}
                defaultValue={state.data.rent}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="rent"
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      defaultValue={state.data.rent}
                      maxLength={7}
                      decimalsLimit={2}
                      //defaultValue={state.data.rent}
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
                name="creditCard"
                control={control}
                defaultValue={state.data.creditCard}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="creditCard"
                      defaultValue={state.data.creditCard}
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      //defaultValue={state.data.rent}
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
                name="existingCarLoan"
                control={control}
                defaultValue={state.data.existingCarLoan}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="existingCarLoan"
                      defaultValue={state.data.existingCarLoan}
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
                name="otherLoans"
                control={control}
                defaultValue={state.data.otherLoans}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="otherLoans"
                      defaultValue={state.data.otherLoans}
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
                  {console.log(total,expTot )}
        <Text fontWeight="bold">
         Total Monthly Obligations: ${ !isNaN(expTot)  ? expTot.toLocaleString(undefined, {minimumFractionDigits: 0})
         : handleTotal()
         
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
        <Progress value={58} />
        <Center>4 of 7</Center>

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
                    redirectUri: `${window.location.origin}/monthly-expenses`,
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
