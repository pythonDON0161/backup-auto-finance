import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Select, Progress, Center, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";

const EmploymentDetails = (props) => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    getValues,
    setValue,
    watch,
  } = useForm();
  const { action, state } = useStateMachine(updateAction);
  // const watchAllFields = watch();
  // const watchGross = watch("grossMonthly", state.data.grossMonthly);
  // const watchOther = watch("otherMonthly", state.data.otherMonthly);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "employmentStatus": data.employmentStatus,
        "grossMonthlyIncome": data.grossMonthly,
        "otherMonthlyIncome": data.otherMonthly,
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
    if (watchStatus === "Self Employed") {
      props.history.push("./self-employed");
    } else if (watchStatus === "Full-time" || watchStatus === "Contract" || watchStatus === "Part-time") {
      props.history.push("./employment-details-2");
    } else if (watchStatus === "Retired" || watchStatus === "Student" || watchStatus === "Unemployed") {
      props.history.push("./monthly-expenses");
    }
  };

  function handleTotal() {
    
    register({ name: "totalMonthly", type: "custom" });
    setValue(
      "totalMonthly",
      parseInt(getValues("grossMonthly"), 10) +
        parseInt(getValues("otherMonthly"), 10)
    );
  }


  const CurrencyFormat = ({ onChange, value, name, ...rest }) => {
    const [price, setPrice] = useState(value);
    return (
      <NumberFormat
        {...rest}
        name={name}
        value={value}
        thousandSeparator={true}
        allowNegative={false}
        decimalScale={0}
        onValueChange={(target) => {
          setPrice(target.value);
          onChange(target.value);
        }}
        isNumericString
        prefix="$ "
      />
    );
  };
  console.log(state.data.firstName)
  const watchStatus = watch("employmentStatus", state.data.employmentStatus);

  return (
    <>
      <Header />
      { isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Employment Details</Heading>
        <label>
          Employment Status:
          <Select name="employmentStatus" defaultValue={state.data.employmentStatus}
            placeholder="Select option"ref={register({ required: true })}>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Retired">Retired</option>
            <option value="Student">Student</option>
            <option value="Unemployed">Unemployed</option>
          </Select>
          {errors.employmentStatus && (
            <p className="error">Please select an option</p>
          )}
        </label>
        <label>
          Gross Monthly Salary/Commissions/Self-Employment Earnings <br/>(Before taxes and deductions):
          <Controller
            name="grossMonthly"
            as={CurrencyFormat}
            rules={{ required: true }}
            control={control}
            className="priceInput"
            defaultValue={state.data.grossMonthly}
          />
          {errors.grossMonthly && (
            <p className="error">Please enter your gross monthly earnings</p>
          )}
        </label>
        <label>
        Other Monthly Income (Rental Income/Investment Income etc.):
          <Controller
            name="otherMonthly"
            as={CurrencyFormat}
            control={control}
            className="priceInput"
            defaultValue={state.data.otherMonthly}
          />
        </label>
        {/* <label htmlFor="totalMonthly">
          Total Monthly Income:{" "}
          {(parseInt(watchGross, 10) + parseInt(watchOther, 10)).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
        </label> */}
         
        
        <Center>
          <button type="submit" onClick={handleTotal}
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

export default withRouter(EmploymentDetails);
