import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  Progress,
  Center,
  Container,
  SimpleGrid,
  Text,
  Button,
  Heading,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import CurrencyInput from 'react-currency-input-field';

const TradeIn2 = (props) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const { register, handleSubmit, control, errors, setValue } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "towardsNewCar": data.towardsPurchase,
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
      console.log(json.application);
    });
    });
    props.history.push("./cash-down");
  };

  const MAX_VAL = (parseInt(state.data.currentCar) - parseInt(state.data.owed) );
  const withValueCap = (inputObj) => {
    const { value } = inputObj;
    if (value <= MAX_VAL) return true;
    return false;
  };



  const [towardsPurchase, settowardsPurchase] = useState(state.data.towardsPurchase);

  function filterData(val) {
    settowardsPurchase(
      val.target.value.replaceAll(/[^0-9]/gi, "").replace(/^\$/, "").replaceAll(",", "")
      
    );  }

  function setVals(){
    setValue("towardsPurchase", towardsPurchase)
  }

  return (
    <>
      <Header />
      {isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading>Trade In</Heading>
          {parseInt(state.data.currentCar) > parseInt(state.data.owed) && (
            <>
            {/* If trade in value is positive */}
              <label htmlFor="price">
                Based on the information you have provided, you should realize $
                {( parseInt(state.data.currentCar) - parseInt(state.data.owed) ).toLocaleString("en")}{" "}
                when you sell your current car 
                
                {" "}
                {state.data.owed && <> and pay off your existing loan (if applicable) </>}
                <br />
                <br />
                How much of this would you like to apply towards the purchase of
                your new car?
                <br />
                <br />
                <Text>
                  Enter $0 if you are seeking 100% financing, or to borrow the
                  maximum amount.
                </Text>


                <Controller
                  name="towardsPurchase"
                  //TODO perhaps the max value prevents it from going negative
                  rules={{ required: true, max: {value: (state.data.currentCar - state.data.owed), message: 'error'} }}
                  control={control}
                  defaultValue={state.data.towardsPurchase}
                  render={({ onChange, value }) => { 
                    return (
                      <CurrencyInput
                      name="towardsPurchase"
                      className="priceInput"
                      defaultValue={state.data.towardsPurchase}
                      ref={register({
                        min: 0
                      })}
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      onChange={filterData}
                      onValueChange={onChange}
                      
                    />)}}
                />
                {errors.towardsPurchase && (
                  <p className="error">Your input is required. Cannot enter a number greater than realized amount above.</p>
                )}
              </label>
            </>
          )}
          {/* If trade in value is negative */}
          {parseInt(state.data.owed) >= parseInt(state.data.currentCar) && (
            <Text>
              Based on the information you have provided, you owe more on your
              current car than it is worth. You may need to find the shortfall
              to pay off your existing loan, or in some cases the bank will
              allow you to add this amount to your new loan.
            </Text>
          )}
          <Center>
            <button
              onClick={setVals}
              type="submit"
              className="submit-button"
              value="Save & Continue"
            >
              Save & Continue
            </button>
          </Center>
          <br />
          <Progress value={66} />
          <Center>Step 5 of 7</Center>
          <FeedbackFish projectId="01ebf0d6447158">
            <button className="feedback">Give us Feedback</button>
          </FeedbackFish>
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
                    redirectUri: `${window.location.origin}/pre-qualification`,
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

export default withRouter(TradeIn2);
