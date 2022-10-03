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
  Input
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar"


  // get next year for new car model
  var currentDate= new Date();
  var latestYear = currentDate.getFullYear() + 1;
  var currentYear = currentDate.getFullYear()
  
  // generates array of years 8 years prior to current year
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  var usedYears =  [ (range(currentYear, currentYear - 8, -1)) ]; 

const PreQual = (props) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const { register, handleSubmit, control, watch, errors, setValue, getValues } = useForm();
  const { action, state } = useStateMachine(updateAction);
  
  const calcData = [
    {
      id: 1,
      newOrUsed: "New",
      year: "2023",
      deposit: 0,
      term: 120,
      rate: 6.75,
    },
    
    {
      id: 1,
      newOrUsed: "New",
      year: "2022",
      deposit: 0,
      term: 120,
      rate: 6.75,
    },
    {
      id: 3,
      newOrUsed: "New",
      year: "2021",
      deposit: 0,
      term: 120,
      rate: 6.75,
    },
    {
      id: 2,
      newOrUsed: "New",
      year: "2020",
      deposit: 0,
      term: 120,
      rate: 6.99,
    },
    {
      id: 4,
      newOrUsed: "Used",
      year: "2022",
      deposit: 0,
      term: 120,
      rate: 8.95,
    },
    {
      id: 5,
      newOrUsed: "Used",
      year: "2021",
      deposit: 0,
      term: 120,
      rate: 8.95,
    },
    {
      id: 6,
      newOrUsed: "Used",
      year: "2020",
      deposit: 0,
      term: 108,
      rate: 9.95,
    },
    {
      id: 7,
      newOrUsed: "Used",
      year: "2019",
      deposit: 0,
      term: 96,
      rate: 10,
    },
    {
      id: 8,
      newOrUsed: "Used",
      year: "2018",
      deposit: 0,
      term: 84,
      rate: 9.69,
    },
    {
      id: 9,
      newOrUsed: "Used",
      year: "2017",
      deposit: 0,
      term: 72,
      rate: 9.69,
    },
    {
      id: 10,
      newOrUsed: "Used",
      year: "2016",
      deposit: 0,
      term: 60,
      rate: 8.5,
    },
    {
      id: 11,
      newOrUsed: "Used",
      year: "2015",
      deposit: 0,
      term: 48,
      rate: 9.69,
    },
    {
      id: 12,
      newOrUsed: "Used",
      year: "2014",
      deposit: 0,
      term: 48,
      rate: 9.69,
    },
    {
      id: 14,
      newOrUsed: "Used",
      year: "2013",
      deposit: 15,
      term: 30,
      rate: 8.5,
    },
    {
      id: 13,
      newOrUsed: "Used",
      year: "2012",
      deposit: 45,
      term: 23,
      rate: 12,
    },
  ];
  
  //let carStatus = watch("carStatus");

  let modelYear = watch("modelYear");
  //getValues used instead of watch to avoid triggering re-render while entering price
  let price = getValues("price");
  const url = 'https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications';
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  async function handleEstimate() {

    if (!state.data.estimatedPayment || isNaN(state.data.estimatedPayment)) {
    register({ name: "estimatedPayment" });
    setValue("estimatedPayment", calcData
    .filter(
      (term) =>
        term.newOrUsed === carStatus &&
        term.year === modelYear
    )
    .map((filteredTerm) => (Math.round(
    ((price -
      price * (filteredTerm.deposit / 100)) *
      (filteredTerm.rate / 100 / 12) *
      Math.pow(
        1 + filteredTerm.rate / 100 / 12,
        filteredTerm.term
      )) /
      (Math.pow(
        1 + filteredTerm.rate / 100 / 12,
        filteredTerm.term
      ) -
        1)
    ))));
    register({ name: "calcTerm", type: "custom" });
    setValue("calcTerm", calcData
    .filter(
      (term) =>
        term.newOrUsed === carStatus &&
        term.year === modelYear
    )
    .map((filteredTerm) => filteredTerm.term - 0));
    register({ name: "calcRate", type: "custom" });
    setValue("calcRate", calcData
    .filter(
      (term) =>
        term.newOrUsed === carStatus &&
        term.year === modelYear
    )
    .map((filteredTerm) => filteredTerm.rate - 0));
    register({ name: "calcDeposit", type: "custom" });
    setValue("calcDeposit", calcData
    .filter(
      (term) =>
        term.newOrUsed === carStatus &&
        term.year === modelYear
    )
    .map((filteredTerm) => filteredTerm.deposit - 0));}
    await new Promise((resolve, reject) => setTimeout(resolve, 300));
    props.history.push("./applicant-details");
  }
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "emailAddress": data.email,
        "carPrice": data.price,
        "carStatus": data.carStatus,
        "modelYear": data.modelYear
      }
    }
    fetch(`https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications?filter[emailAddress]=${user.email}`, {
      headers: headers,
    })
    .then((response) => response.json())
    .then(json => {
      // Do something with object
      if(json.applications[0]){
        const userID = json.applications[0].id;
        fetch(`https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications/${userID}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(body)
        })
        .then((addInfo) => addInfo.json())
      } else {
        fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .then(json => {
          // Do something with object
          console.log(json.application);
        });
      }
    });
  };


  const CurrencyFormat = ({ onChange, value, name, ...rest }) => {
    const [price, setPrice] = useState(value);
    return (
      <NumberFormat
        {...rest}
        name={name}
        value={price}
        thousandSeparator={true}
        allowNegative={false}
        decimalScale={0}
        placeholder="$ 0"
        onValueChange={(target) => {
          setPrice(parseInt(target.value, 10));
          onChange(parseInt(target.value, 10));
        }}
        isNumericString={false}
        prefix="$ "
      />
    );
  };
/*
  if (state.data.carStatus) {
    carStatus = state.data.carStatus;
  }
*/
let carStatus = watch("carStatus");

if(!carStatus ){
  
  carStatus = state.data.carStatus; 
         

  } 


  return (
    <>
   
      <div> 

   <div class="outer-container">
        <div className="header-container">
      
      </div>
      <div class="sidebar-container">   
      <Sidebar></Sidebar>
      </div>
      <Header />
      {isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading>Vehicle Details</Heading>
          <Input
            name="email"
            className="hidden-field"
            ref={register({ required: true })}
            defaultValue={user.email}
          />
          {errors.firstName && (
            <p className="error">Please enter your first name</p>
          )}
          <label htmlFor="price">
            Price of Car or Budget:
            <Controller
              name="price"
              rules={{ required: true, pattern: {value: /^[1-9][0-9]*$/}, min: {value: 10000, message: 'error'} }}
              ref={register}
              as={CurrencyFormat}
              control={control}
              className="priceInput"
              defaultValue={state.data.price}
            />
            {errors.price && <p className="error">Please enter a value</p>}
          </label>
          <label>
            New or Used:
            <Select
              name="carStatus"
              ref={register({ required: true })}
              defaultValue={state.data.carStatus}
              placeholder="Select option"
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
            </Select>
            {errors.carStatus && (
              <p className="error">Please select an option</p>
            )}
          </label>
          {carStatus === "Used" && (
            <label>
              Model Year:
              <Select
                name="modelYear"
                defaultValue={state.data.modelYear}
                placeholder="Select option"
                ref={register({ required: true })}
              >
                
               {usedYears[0].map(year => <option key={year} value={year}>{year}</option>)}


              </Select>
            </label>
          )}
          {carStatus === "New" && (
            <label>
              Model Year:
              <Select
                name="modelYear"
                options={[latestYear, currentYear]}
                defaultValue={state.data.modelYear}
                placeholder="Select option"
                ref={register({ required: true })}
              >

                <option value={`${latestYear}`}>{`${latestYear}`}</option>
                <option value={`${currentYear}`}>{`${currentYear}`}</option>


              </Select>
              {errors.modelYear && (
                <p className="error">Please select a model year</p>
              )}
            </label>
          )}
          <Center>
            <button
              type="submit"
              className="submit-button"
              value="Save & Continue"
              onClick={handleEstimate}
            >
              Save & Continue
            </button>
          </Center>
          <br />
          <Progress value={11} />
          <Center>Step 1 of 9</Center>
          <FeedbackFish projectId="01ebf0d6447158">
            <button className="feedback">Give us Feedback</button>
          </FeedbackFish>
        </form>
      )}
      {!isAuthenticated && (
        <Container centerContent className="pt-8">
          <SimpleGrid columns={1} spacing="20px">
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
       </div>
      </div>
      
    </>
  );
};

export default withRouter(PreQual);
