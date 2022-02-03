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
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";

const TradeIn2 = (props) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const { register, handleSubmit, control, errors } = useForm();
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

  const MAX_VAL = (state.data.currentCar - state.data.owed);
  const withValueCap = (inputObj) => {
    const { value } = inputObj;
    if (value <= MAX_VAL) return true;
    return false;
  };

  const CurrencyFormat = ({ onChange, value, name, ...rest }) => {
    const [price, setPrice] = useState(value);
    return (
      <NumberFormat
        {...rest}
        name={name}
        value={price}
        isAllowed={withValueCap}
        thousandSeparator={true}
        allowNegative={false}
        decimalScale={0}
        placeholder="$ 0"
        // defaultValue={0}
        onValueChange={(target) => {
          setPrice(target.value);
          onChange(target.value);
        }}
        isNumericString
        prefix="$ "
      />
    );
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading>Trade In</Heading>
          {parseInt(state.data.currentCar) > parseInt(state.data.owed) && (
            <>
              <label htmlFor="price">
                Based on the information you have provided, you should realize $
                {(state.data.currentCar - state.data.owed).toLocaleString("en")}{" "}
                when you sell your current car{" "}
                {state.data.owed && <>and pay off your existing loan.</>}
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
                  ref={register}
                  rules={{ required: true, max: {value: (state.data.currentCar - state.data.owed), message: 'error'} }}
                  as={CurrencyFormat}
                  control={control}
                  className="priceInput"
                  defaultValue={state.data.towardsPurchase}
                />
                {errors.towardsPurchase && (
                  <p className="error">Your input is required. Cannot enter a number greater than realized amount above.</p>
                )}
              </label>
            </>
          )}
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
              type="submit"
              className="submit-button"
              value="Save & Continue"
            >
              Save & Continue
            </button>
          </Center>
          <br />
          <Progress value={66} />
          <Center>Step 6 of 9</Center>
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
