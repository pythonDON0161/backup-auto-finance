import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Link } from "react-router-dom";
import updateAction from "./updateAction";
import Sidebar from "./components/Sidebar"


import {
  Select,
  Slider,
  SliderTrack,
  Spacer,
  SliderFilledTrack,
  SliderThumb,
  Center,Flex, Grid, GridItem,Drawer,DrawerBody,Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Button
} from "@chakra-ui/react";

import Header from "./components/Header";
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme'


function Calculator(props) {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    setValue,
  } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const [deposit, setDeposit] = useState();
  const [rate, setRate] = useState();
  const [term, setTerm] = useState();
  const [results, setResults] = useState(false)
  var headers = new Headers();
  const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");

  // get next year for new car model
  var currentDate= new Date();
  var latestYear = currentDate.getFullYear() + 1;
  var currentYear = currentDate.getFullYear()
  
  // generates array of years 8 years prior to current year
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  var usedYears =  [ (range(currentYear, currentYear - 8, -1)) ]; 
  

  //This data is used to calculate the deposit amount, length of loan and interest rate
  // TODO Make calcdata objects generate dynamically using inputs from calculator instead of predefining them
  
  const calcData = [
    {
      id: 1,
      newOrUsed: "New",
      year: "2023",
      deposit: 0,
      term: 10,
      rate: 7.50,
    },
    
    {
      id: 2,
      newOrUsed: "Used",
      year: "2023",
      deposit: 0,
      term: 9.5,
      rate: 7.25,
    },
    {
      id: 3,
      newOrUsed: "Used",
      year: "2022",
      deposit: 0,
      term: 10,
      rate: 7.25,
    },
    {
      id: 4,
      newOrUsed: "Used",
      year: "2021",
      deposit: 0,
      term: 8,
      rate: 8.00,
    },
    {
      id: 5,
      newOrUsed: "Used",
      year: "2020",
      deposit: 0,
      term: 7,
      rate: 8.25,
    },
  
    {
      id: 6,
      newOrUsed: "Used",
      year: "2019",
      deposit: 0,
      term: 6,
      rate: 8.50,
    },
    {
      id: 7,
      newOrUsed: "Used",
      year: "2018",
      deposit: 0,
      term: 5,
      rate: 8.75,
    },
    {
      id: 8,
      newOrUsed: "Used",
      year: "2017",
      deposit: 0,
      term: 4,
      rate: 8.75,
    },
    {
      id: 9,
      newOrUsed: "Used",
      year: "2016",
      deposit: 0,
      term: 4,
      rate: 8.75,
    },
    {
      id: 10,
      newOrUsed: "Used",
      year: "2015",
      deposit: 15,
      term: 4,
      rate: 10.00,
    },
    {
      id: 11,
      newOrUsed: "New",
      year: "2024",
      deposit: 0,
      term: 10,
      rate: 7.5,
    },
  ];


      let calcDeposit; 
      let calcRate;
      let calcTerm;


  {/* On Initial Page Load The Function Starts Here */}

  async function handleEstimate() {

  register({ name: "estimatedPayment", type: "custom" });
  //console.log("this is first")
    setValue("estimatedPayment", calcData
    .filter( (term) => term.newOrUsed === state.data.carStatus && term.year === state.data.modelYear )
    .map((filteredTerm) => (Math.round(
    
    ((state.data.price - state.data.price * (filteredTerm.deposit / 100)) *
      
      (filteredTerm.rate / 100 / 12) *
      
      Math.pow( 1 + filteredTerm.rate / 100 / 12, filteredTerm.term  )) /
      
      (Math.pow( 1 + filteredTerm.rate / 100 / 12,  filteredTerm.term) - 1)
    ))));

    register({ name: "calcTerm", type: "custom" });
    setValue("calcTerm", calcData
    .filter(
      (term) =>
        term.newOrUsed === state.data.carStatus &&
        term.year === state.data.modelYear
    )
    .map((filteredTerm) => filteredTerm.term *12 - 0));
    
    register({ name: "calcRate", type: "custom" });
    setValue("calcRate", calcData
    .filter(
      (term) =>
        term.newOrUsed === state.data.carStatus &&
        term.year === state.data.modelYear
    )
    .map((filteredTerm) => filteredTerm.rate - 0));

    register({ name: "calcDeposit", type: "custom" });
    setValue("calcDeposit", calcData
    .filter(
      (term) =>
        term.newOrUsed === state.data.carStatus &&
        term.year === state.data.modelYear
    )
    .map((filteredTerm) => filteredTerm.deposit - 0)); 

     
      
      register({ name: "deposit", type: "custom" });
      setValue("deposit",  calcData
      .filter(
        (term) =>
          term.newOrUsed === state.data.carStatus &&
          term.year === state.data.modelYear
      )
      .map((filteredTerm) => filteredTerm.deposit- 0)); 


      register({ name: "term", type: "custom" });
      setValue("term",  calcData
      .filter(
        (term) =>
          term.newOrUsed === state.data.carStatus &&
          term.year === state.data.modelYear
      )
      .map((filteredTerm) => filteredTerm.term *12 - 0));
        
      register({ name: "terms", type: "custom" });
      setValue("terms",  calcData
      .filter(
        (term) =>
          term.newOrUsed === state.data.carStatus &&
          term.year === state.data.modelYear
      )
      .map((filteredTerm) => filteredTerm.term *12 - 0));

      register({ name: "rate", type: "custom" });
      setValue("rate",  calcData
      .filter(
        (term) =>
          term.newOrUsed === state.data.carStatus &&
          term.year === state.data.modelYear
      )
      .map((filteredTerm) => filteredTerm.rate - 0));


      //setValue("rate", state.data.calcRate );
      //setValue("deposit", state.data.calcDeposit);
      //setValue("terms", calcTerm)
      //console.log(state.data.estimatedPayment)
    
  }

  async function handleEstimate2() {
    register({ name: "usedCalc", type: "custom" });
    setValue( "usedCalc", true )
    register({ name: "estimatedPayment", type: "custom" });
    setValue("estimatedPayment", calcData
    .filter(
      (term) =>
        term.newOrUsed === state.data.carStatus &&
        term.year === state.data.modelYear
    )
    .map((filteredTerm) => (Math.round(
    ((state.data.price -
      state.data.price * (filteredTerm.deposit / 100)) *
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
        term.newOrUsed === state.data.carStatus &&
        term.year === state.data.modelYear
    )
    .map((filteredTerm) => filteredTerm.term *12- 0));
    register({ name: "calcRate", type: "custom" });
    setValue("calcRate", calcData
    .filter(
      (term) =>
        term.newOrUsed === state.data.carStatus &&
        term.year === state.data.modelYear
    )
    .map((filteredTerm) => filteredTerm.rate - 0));
    register({ name: "calcDeposit", type: "custom" });
    setValue("calcDeposit", calcData
    .filter(
      (term) =>
        term.newOrUsed === state.data.carStatus &&
        term.year === state.data.modelYear
    )
    .map((filteredTerm) => filteredTerm.deposit - 0));
    await new Promise((resolve, reject) => setTimeout(resolve, 50));
    props.history.push("./pre-qualification");
  }

  
  const onSubmit = async data => {
    action(data);
    setResults(true);
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
          setPrice(target.value);
          onChange(target.value);
        }}
        isNumericString={false}
        prefix="$ "
      />
    );
  };

  const handleDepChange = useCallback(
    (newDeposit) => {
      if (deposit === newDeposit) return deposit;
      setDeposit(newDeposit);
    },
    [deposit]
  );

  const handleDepChangeEnd = useCallback(
    (newDeposit) => {
      state.data.deposit = deposit;
      return newDeposit;
    },
    [state.data.deposit, deposit],
    (state.data.deposit = deposit)
  );

  const handleRateChange = useCallback(
    (newRate) => {
      if (rate === newRate) return rate;
      setRate(newRate);
    },
    [rate]
  );

  const handleRateChangeEnd = useCallback(
    (newRate) => {
      state.data.rate = rate;
      return newRate;
    },
    [state.data.rate, rate],
    (state.data.rate = rate )
  );

  const handleTermChange = useCallback(
    (newTerm) => {
      if (term === newTerm) return (term);
      setTerm(newTerm);
    },
    [term]
  );

  /* Multiplied term by 12 to get months */
  const handleTermChangeEnd = useCallback(
    (newTerm) => {
    state.data.terms = term;
      
      return newTerm;
    },
    [state.data.terms, term],
    
    (state.data.terms = term  )
  );


  let carStatus = watch("carStatus", state.data.carStatus);
  let modelYear = watch("modelYear");
  let myDeposit = watch("deposit")

  function handleReset(filteredTerm) {
    state.data.modelYear = null;
    state.data.price = null;
    state.data.carStatus = null;
    setValue("modelYear", null);
    setValue("carStatus", null);
    setValue("price", null);
    setValue("deposit", null);
    state.data.term = null;
    state.data.rate = null;
    state.data.deposit = null;
    setTerm(filteredTerm.term);
    setRate(filteredTerm.rate);
    setDeposit(filteredTerm.deposit);
    setResults(false)
    onClose()
  }



  let monInt = (watch("rate")/1200);
  let months = watch("term")

  //console.log( filteredTerm.deposit)

  return (
  
    <div> 
    <div className="">

      <div className="header-container">
     
      </div>
     
      <div className="form-container"> 
         <Header/>
    
      <form id="myform" onSubmit={handleSubmit(onSubmit)}>
  
        {results === false ? (
        <>
          <h1>Auto-Loan Calculator</h1>
          <label>
            Price of Car or Budget:
            <Controller
              name="price"
              rules={{ required: true }}
              as={CurrencyFormat}
              control={control}
              className="priceInput"
              defaultValue={state.data.price}
            />
            {errors.price && <p className="error">Your input is required</p>}
          </label>

          {/* user selects if they want new or used cars */}
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
            {errors.carStatus && <p className="error">Please select an option</p>}
          </label>


          {/* if car status is used */}
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

          {/* If car status is new get latest year using getFullYear() function */}
          {carStatus === "New" && (
            <label>
              Model Year:
              <Select
                name="modelYear"
                options={[ latestYear, currentYear]}
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
          
          <button type="submit" onClick={handleEstimate} className="centered-button" > 
              Save & Continue
          </button>
          
            {console.log(results)}
          </Center>

        </>
      ):
        
        (
          <>
            <div>
              {calcData
                .filter(
                  (term) =>
                    term.newOrUsed === state.data.carStatus &&
                    term.year === state.data.modelYear
                )
                .map((filteredTerm) => (
                  <div key={filteredTerm.id}>
                    <h2 className="results">Results</h2>
                    <h2>
                    The estimated monthly payment below is based on actual available bank terms, subject to bank approval. 
                    You may drag the yellow circles below to adjust Down Payment, Interest Rate and Loan Term to see how this would affect your monthly payment. 
                    Hit the Find Bank Deals button to see what you might qualify for.
                    </h2>
                    <br />
                    {state.data.deposit >= 0 && (
                      <h1>
                        {state.data.deposit}% Down Payment ($
                        {Math.round(
                          state.data.price * (state.data.deposit / 100)
                        ).toLocaleString("en")}
                        )
                      </h1>
                    )}{" "}
                    {state.data.deposit == null && (
                      <h1>
                        {filteredTerm.deposit}% Down Payment ($
                        {Math.round(
                          state.data.price * (filteredTerm.deposit / 100)
                        ).toLocaleString("en")}
                        )
                      </h1>
                    )}
                    <Slider
                      value={deposit}
                      onChange={handleDepChange}
                      onChangeEnd={handleDepChangeEnd}
                      colorScheme="orange"
                      defaultValue={filteredTerm.deposit}
                      name="deposit"
                      ref={register}
                      min={0}
                      max={100}
                      step={1}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb  bg="yellow.300"  />
                    </Slider>
                    {state.data.rate >= 0 && <h1>{rate}% Interest Rate</h1>}{" "}
                    {state.data.rate == null && (
                      <h1>{filteredTerm.rate}% Interest Rate</h1>
                    )}
                    <Slider
                      value={rate}
                      onChange={handleRateChange}
                      onChangeEnd={handleRateChangeEnd}
                      colorScheme="orange"
                      defaultValue={filteredTerm.rate}
                      name="rate"
                      ref={register}
                      min={1}
                      max={20}
                      step={0.05}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb  bg="yellow.300"  />
                    </Slider>

                   
                    { state.data.terms == null ? <h1>{filteredTerm.term} Years</h1> : <h1>{term} Years</h1>}{" "}
                  

                    <Slider
                      value={term}
                      onChange={handleTermChange}
                      onChangeEnd={handleTermChangeEnd}
                      colorScheme="orange"
                      defaultValue={filteredTerm.term}
                      name="term"
                      ref={register}
                      min={2}
                      max={12}
                      step={0.5}
                    >

                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb fontSize="lg" bg="yellow.300"  />
                    </Slider>
                    <Center>
                      <h1><strong> Monthly Payment:</strong>&nbsp;</h1>
                      {state.data.deposit == null && state.data.rate == null && !state.data.terms ?  (
                        <h1> <strong> 
                          $
                          {Math.round(
                            ((state.data.price - state.data.price * (filteredTerm.deposit / 100))  *(filteredTerm.rate / 100 / 12)  *

                              Math.pow( 1 + filteredTerm.rate / 100 / 12,  filteredTerm.term *12  ) ) /

                              (Math.pow( 1 + filteredTerm.rate / 100 / 12, filteredTerm.term * 12) - 1)

                          ).toLocaleString("en")}
                          </strong>
                        </h1> 
                      ) : null}


                      { state.data.deposit == null && state.data.rate == null && state.data.terms ?  (
                        <h1>
                          
                          ${Math.round(
                            ((state.data.price - state.data.price * (filteredTerm.deposit / 100)) *
                              (filteredTerm.rate / 100 / 12) *
                                Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms *12  )) /
                                
                              (Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms * 12 ) - 1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}


                      { state.data.deposit && state.data.rate == null && !state.data.terms ? (
                        
                        <h1>
                          $ 
                          { Math.round(
                            ((monInt + (monInt / ( Math.pow( (1 + monInt), months * 12) -1)) ) * 

                            (state.data.price - (Math.round( state.data.price * ( myDeposit / 100 ) ) || 0)) )
                            
                            ).toLocaleString("en")
                           }
                        </h1>
                      ) : null}

                      {state.data.rate && !state.data.deposit && !state.data.terms ?  (
                        <h1>
                          $
                          {Math.round(
                            ((state.data.price - state.data.price * (filteredTerm.deposit / 100)) *
                              (state.data.rate / 100 / 12) *
                              
                              Math.pow( 1 + state.data.rate / 100 / 12, filteredTerm.term *12   )) /
                              
                              (Math.pow(  1 + state.data.rate / 100 / 12, filteredTerm.term*12
                              ) -
                                1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}


                      {state.data.terms && state.data.rate == null && !state.data.deposit == null ? (
                        <h1>
                          $
                          {Math.round(
                            ((state.data.price - state.data.price * (filteredTerm.deposit / 100)) *
                              (filteredTerm.rate / 100 / 12) * Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms *12
                              )) /

                              (Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms*12) - 1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}


                      { state.data.deposit && state.data.rate && state.data.terms == null ?  (
                        <h1>
                          $ {Math.round( ((state.data.price - state.data.price * (state.data.deposit / 100)) *
                              (state.data.rate / 100 / 12) *
                              Math.pow( 1 + state.data.rate / 100 / 12, filteredTerm.term *12)) /
                              (Math.pow(
                                1 + state.data.rate / 100 / 12, filteredTerm.term * 12 ) - 1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null }


                      {state.data.deposit && state.data.rate == null && state.data.terms ? (
                        <h1>
                         
                          $ {Math.round( ((state.data.price - state.data.price * (state.data.deposit / 100)) *
                              (filteredTerm.rate / 100 / 12) *
                               
                              Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms * 12  )) /

                              (Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms *12) -1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}


                      {/*This should be correct calculation */}
                      

                      { !state.data.deposit && state.data.rate &&  state.data.terms ?  (                          
                          
                        <h1>
                            
                          ${Math.round( ((state.data.price - state.data.price * (filteredTerm.deposit / 100)) *
                              (state.data.rate / 100 / 12) *
                               
                               Math.pow(1 + state.data.rate / 100 / 12, state.data.terms * 12 )) /
                              
                              (Math.pow(  1 + state.data.rate / 100 / 12, state.data.terms * 12) - 1)
                            
                            ).toLocaleString("en")}
                        </h1>
                      ) : null }


                      {  state.data.deposit && state.data.rate &&
                        state.data.terms ? (
                        <h1> 
                         
                          ${Math.round( ((state.data.price - state.data.price * (state.data.deposit / 100)) *
                              (state.data.rate / 100 / 12) *
                              Math.pow(
                                1 + state.data.rate / 100 / 12,
                                state.data.terms *12
                              )) /
                              (Math.pow(
                                1 + state.data.rate / 100 / 12,
                                state.data.terms *12
                              ) -
                                1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}


                    {state.data.deposit === 0 && state.data.rate == null & !state.data.terms ?  (
                   
                        <h1>
                            
                          $ {Math.round( (state.data.price * (state.data.calcRate / 100 / 12) *
                              Math.pow( 1 + state.data.calcRate / 100 / 12, state.data.calcTerm)) 
                                 /
                              (Math.pow( 1 + state.data.calcRate / 100 / 12, state.data.calcTerm ) - 1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}

                 {state.data.deposit === 0 && !state.data.rate && state.data.terms ?  (
                   
                   <h1> 
                       
                     $ {Math.round( (state.data.price * (state.data.calcRate / 100 / 12) *
                         Math.pow( 1 + state.data.calcRate / 100 / 12, (state.data.terms*12) )) 
                            /
                         (Math.pow( 1 + state.data.calcRate / 100 / 12, (state.data.terms*12) ) - 1)
                     ).toLocaleString("en")}
                   
                   </h1>
                 ) : null}

                      {state.data.deposit === 0 &&
                      state.data.rate === 0 &&
                      !state.data.terms ? (
                        <h1>
                          $
                          
                          {Math.round(
                            state.data.price / filteredTerm.term
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}


                      {state.data.deposit === 0 &&
                      state.data.rate === 0 &&
                      state.data.terms ? (
                        <h1>
                         
                          $
                          {Math.round(
                            state.data.price / state.data.terms
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}

                    

                      { state.data.deposit == null && state.data.rate === 0 && state.data.terms == null ? (
                        <h1>
                          {console.log("rate null 3")}
                          $
                          {Math.round(
                            state.data.price / filteredTerm.term
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}


                      { state.data.deposit == null && state.data.rate === 0 &&  state.data.terms ? (
                        <h1>
                          $
                          {Math.round( state.data.price / state.data.terms ).toLocaleString("en")}
                        </h1>
                      ) : null}


                      {state.data.deposit && state.data.rate === 0 &&
                      state.data.terms ? (
                        <h1>
                          ${Math.round(
                            (state.data.price - state.data.price * (state.data.deposit / 100)) / state.data.terms
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}


                      {state.data.deposit && state.data.rate === 0 && !state.data.terms ? (
                        <h1>
                          ${Math.round( (state.data.price - state.data.price * (state.data.deposit / 100)) /
                              filteredTerm.term *12 ).toLocaleString("en")}
                        </h1>
                      ) : null}
                       
                    </Center>
                    <br />

                    <div>

                        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                            <GridItem>

                            </GridItem>
                        </Grid>

                    </div>

                  <div>
                    <Center>
                    <button  className="centered-button"  onClick={handleEstimate2} > 
                        Find Bank Deals
                    </button>

                    </Center>
                    <Center> 

                      <Link to="/"> 
                        <button  id="exit-btn" className="centered-button">
                              Home
                        </button>
                      </Link>

                      </Center>
                  </div>
                 
                    </div>
                  
                ))}
            </div>
            <br />
            <br />
          </>
        )}
      </form>
      </div>
      
    </div>
    </div>
   
  );
}

export default withRouter(Calculator);
