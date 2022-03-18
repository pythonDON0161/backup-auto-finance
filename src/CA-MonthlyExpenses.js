import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Progress, Center, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";


const CAMonthlyExpenses = (props) => {
  const { register, handleSubmit, control, setValue, getValues } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "coAppMortgage": data.caMortgage,
        "coAppRent": data.caRent,
        "coAppCreditCard": data.caCreditCard,
        "coAppOtherLoanPayments": data.caOtherLoans,
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
    props.history.push("./ca-grade-your-credit");
  };

  function handleTotal() {
    const estimatedPayment = state.data.estimatedPayment
    console.log("Estimated payment on CA Page" + estimatedPayment)
   
    register({ name: "caTotalExpenses", type: "custom" });
    setValue(
      "caTotalExpenses",
        parseInt(getValues("caRent"), 10) +
        parseInt(getValues("caMortgage"), 10) +
       parseInt(getValues("caCreditCard"), 10) +
        parseInt(getValues("caOtherLoans"), 10) +
         parseInt(estimatedPayment,10)
    );

    console.log(state.data.caTotalExpenses)
    
    register({ name: "caRatio", type: "custom" });
    const caExpenses = getValues("caTotalExpenses");
    console.log(caExpenses)
    setValue(
      "caRatio", caExpenses / parseInt(state.data.caTotalMonthly, 10)
    );
  }

  const CurrencyFormat = ({ onChange, value, name, ...rest }) => {
    const [price, setPrice] = useState(value);
    return (
      <NumberFormat
        {...rest}
        // ref={register({ required: true })}
        name={name}
        value={price}
        thousandSeparator={true}
        allowNegative={false}
        decimalScale={0}
        onValueChange={(target) => {
          setPrice(target.value);
          onChange(target.value);
        }}
        prefix="$ "
        isNumericString
      />
    );
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Co Applicant Monthly Expenses</Heading>
        <label>
          Mortgage
          <Controller
            name="caMortgage"
            as={CurrencyFormat}
            control={control}
            className="priceInput"
            defaultValue={state.data.caMortgage}
          />
        </label>
        <label>
          Rent
          <Controller
            name="caRent"
            as={CurrencyFormat}
            control={control}
            className="priceInput"
            defaultValue={state.data.caRent}
          />
        </label>
        <label>
          Credit Card Payments:
          <Controller
            name="caCreditCard"
            as={CurrencyFormat}
            control={control}
            className="priceInput"
            defaultValue={state.data.caCreditCard}
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
            Car Loan Payment:
            <Controller
              name="caExistingCarLoan"
              as={CurrencyFormat}
              control={control}
              className="priceInput"
              defaultValue={state.data.caExistingCarLoan}
            />
          </label>
        <label>
          Other Loan Payments:
          <Controller
            name="caOtherLoans"
            as={CurrencyFormat}
            control={control}
            className="priceInput"
            defaultValue={state.data.caOtherLoans}
          />
        </label>
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

export default withRouter(CAMonthlyExpenses);
