import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  Progress,
  Select,
  Center,
  Container,
  SimpleGrid,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";

import Header from "./components/Header";
import CurrencyInput from 'react-currency-input-field';


const CashDown = (props) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const { register,setValue,getValues, handleSubmit, control, errors } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");

  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "cashDownPayment": data.cashDown,
      }
    }
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

    

    props.history.push("./borrow-summary");

  };


  if(state.data.tradeIn === "Yes"){
   
  }

  const [cashDown, setcashDown] = useState(state.data.cashDown);

    function filterDataTwo(val) {
      setcashDown( val.target.value.replaceAll(/[^0-9]/gi, "").replace(/^\$/, "").replaceAll(",", "") ); }


    function setCash(){ setValue("cashDown", parseInt(cashDown) ) } 

  return (
    <>
      <Header />
      {isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
        
          <Heading>Cash Down</Heading>
          <>
          
          
          {/*console.log(state.data.totalExpenses) */}

            <label htmlFor="price">
              Do you intend to make a cash down payment to reduce the amount you
              need to borrow?
              <br />
              i.e. in addition to any proceeds from trade-In or sale of your
              existing car.
              <br />
              <br />
              If so, enter the amount below.
              <br />

              (Leave as $0 if you are seeking 100% financing)

              
              <Controller
                name="ow"
                control={control}
                defaultValue={state.data.cashDown}
                rules={{ min: 0 }}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="cashDown"
                      defaultValue={state.data.cashDown}
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      ref={register({
                        min:0
                      })}
                     
                      onChange={filterDataTwo}
                      onValueChange={onChange}
                    />
                  );
                }}
              />

              {errors.ow && (
                <p className="error">Your input is required</p>
              )}


            </label>
          </>

          <Center>
            <button
              type="submit"
              onClick={setCash}
              className="submit-button"
              value="Save & Continue"
            >
              Save & Continue
            </button>
          </Center>


          <br />
          <Progress value={77} />
          <Center>6 of 7</Center>
          
        </form>
      )}
      {!isAuthenticated && (
        <Container centerContent class="pt-8">
          <SimpleGrid columns={1} spacing="20px">
            {/* <Center>
              <img src={raceCar} alt="Race Car" />
            </Center> */}
            <Center>
              <Text fontSize="xl">
                Our pre-qualification process applies only for individuals and
                self-employed persons. Companies should contact their bank of
                choice directly.
              </Text>
            </Center>
            <Center>
              <Text fontSize="xl">
                Please Log in or Sign Up below to access this page and find out
                what you qualify for.
              </Text>
            </Center>
            <Center>
              <Button
                onClick={() =>

                 loginWithRedirect({
                  redirectUri: `${window.location.origin}/cash-down`,
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

export default withRouter(CashDown);
