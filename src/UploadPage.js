import React, { useState, useRef, useEffect, memo } from "react";
import {Input,FormControl,FormLabel,InputGroup,InputLeftElement,Tabs, 
  TabList, TabPanels, Tab, TabPanel,
  FormErrorMessage, 
  ButtonGroup,Icon,Button,Checkbox,Text,Select,Center,
   SimpleGrid, Heading, Textarea, Link, Flex, Spacer,Container
} from "@chakra-ui/react";
import { withRouter, useHistory} from "react-router-dom";
import { FiFile } from "react-icons/fi";
import { useController, useForm, Controller} from "react-hook-form";
import UploadUnit from "./UploadUnit";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import storage from "./fireBaseConfig.js"
import Header from "./components/Header";
import emailjs from '@emailjs/browser';
import { getStorage, getDownloadURL } from "firebase/storage"; 
import "./styles.css";

const urlArr = new Array()
const finArr = new Array() //[];
const vehArr = new Array() //[];


export const FileUpload = ({name, 
  
  placeholder, 
  acceptedFileTypes,
  props}) => {
  
  const { register, handleSubmit, errors, getValues,
    setValue,watch,control,ref, } = useForm();

  const {
    control: control1,
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    data:data1
  } = useForm();

  const {
    control: control2,
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
    data:data2
  } = useForm();
  

  const onClicker = () => {
    console.log('INPUT VALUE: ', inputRef);
}

const { action, state } = useStateMachine(updateAction);


const history = useHistory()

if (!state.data.ratio){

  history.push("/applicant-details");

}
 

function getARR(){  const storageRef = storage;  }


function sendEmail() {
  
  //console.log(urlArr, finArr, vehArr)
  let totalIncome = parseInt(state.data.grossIncome + state.data.otherMonthlyIncome);
  //console.log(totalIncome)

  //urlArr.forEach( url => console.log("in here",url) )
 // vehArr.forEach(url => console.log(url) )

 console.log(vehArr)

  var templateParams = {
    email: state.data.email, 
    name: state.data.firstName, 
    lastName: state.data.lastName, 
    employment: state.data.employmentStatus,
    income: totalIncome, 
    dob: state.data.dateOfBirth, 
    cell: state.data.cellNumber,
    carPrice: state.data.price.toLocaleString(),
    status: state.data.carStatus,
    modelYear: state.data.modelYear,
    tdsr : state.data.ratio,

    totalBorrow: state.data.totalBorrow.toLocaleString(),
    bank1Name: state.data.bankPayments[0].thisBank.toUpperCase(),
    bank1Payments: state.data.bankPayments[0].payment.toLocaleString(),
    bank1Rate: state.data.bankPayments[0].rate,
    bank1Deposit: state.data.bankPayments[0].deposit.toLocaleString(),
    bank1Fees: state.data.bankPayments[0].fees.toLocaleString(),
    bank1Terms: state.data.bankPayments[0].term, //Bank 2 Next --->
    bank2Name: state.data.bankPayments[1].thisBank.toUpperCase(),
    bank2Payments: state.data.bankPayments[1].payment.toLocaleString(),
    bank2Rate: state.data.bankPayments[1].rate,
    bank2Deposit: state.data.bankPayments[1].deposit.toLocaleString(),
    bank2Fees: state.data.bankPayments[1].fees.toLocaleString(),
    bank2Terms: state.data.bankPayments[1].term,
    bank3Name: state.data.bankPayments[2].thisBank.toUpperCase(),
    bank3Payments: state.data.bankPayments[2].payment.toLocaleString(),
    bank3Rate: state.data.bankPayments[2].rate,
    bank3Deposit: state.data.bankPayments[2].deposit.toLocaleString(),
    bank3Fees: state.data.bankPayments[2].fees.toLocaleString(),
    bank3Terms: state.data.bankPayments[2].term,

    personalDocs:(JSON.stringify(urlArr)).replaceAll(",", "\n").replace(/[[\]]/g, "")
    .replace(/[{}]/g, "").replace(/\"/g, ""),

    financialDocs:(JSON.stringify(finArr)).replaceAll(",", "\n").replace(/[[\]]/g, "")
    .replace(/[{}]/g, "").replace(/\"/g, ""),

    vehicleDocs: (JSON.stringify(vehArr)).replaceAll(",", "\n").replace(/[[\]]/g, "")
    .replace(/[{}]/g, "").replace(/\"/g, "") 
  };

  //templateParams.push(urlArr)
  
// console.log(templateParams)


  emailjs.send('auto_finance', 'template_3wiofi8', templateParams, 'PqN3ytZ-5Y1PJ4wPp')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) { console.log('FAILED...', error); });


  //CUSTOMER EMAIL BELOW
  emailjs.send("auto_finance","template_wltw9za", templateParams, "PqN3ytZ-5Y1PJ4wPp"  )
      .then( function (response) {

         console.log('SUCCESS!', response.status, response.text);

      }, function(error) { console.log('FAILED...', error); } );

      //template_wltw9z
  }

   
  let inputRef = HTMLInputElement | null;
  let inputRefTwo = HTMLInputElement | null;
  let inputRefThree = HTMLInputElement | null;
  let inputRefFour = HTMLInputElement | null;
  let inputRefFive = HTMLInputElement | null;
  let inputRefSix = HTMLInputElement | null;
  let inputRefSeven = HTMLInputElement | null;
  let inputRefEight = HTMLInputElement | null;
  let inputRefNine = HTMLInputElement | null;
  let inputRefTen = HTMLInputElement | null;
  let inputRefEle =  HTMLInputElement | null ;
  let inputRefTwe = HTMLInputElement | null;
/*
  useEffect(() => {
    //const el2 = document.getElementById("tabs-6--tab-1")
   // console.log(el2)
    //inputRefEle = el2   // 👈️ element here
  }, []);
*/

/*
let mtHtml = `
<html><table><tbody><tr><th>Bank</th><th>Monthly Payment</th><th>Interest Rate</th><th>Deposit</th><th>Estimated Fees</th><th>Term</th></tr><tr><td>{bank1Name.toUpperCase()}</td><td>${bank1Payments.toLocaleString("`en`")}</td><td>${Math.round(bank1Rate * 100 * 100) / 100}%</td>
<td>${(Math.round(bank1Deposit * totalBorrow * 100 ) / 100).toLocaleString("en")}</td>
<td>
                    ${bank1Fees.toLocaleString("en")}
                  </td>
                  <td>{bank1Payments} months</td>
             
                </tr>
                <tr>
                  <td>{bank2Name.toUpperCase()}</td>
                  <td>
                    ${bank2Payments.toLocaleString("en")}
                  </td>
                  <td>
                    {Math.round(bank2Rate * 100 * 100) / 100} %
                  </td>
                  <td>
                    ${(Math.round(bank2Deposit * totalBorrow * 100 ) / 100).toLocaleString("en")}
                  </td>
                  <td>
                    ${bank2Fees.toLocaleString("en")}
                  </td>
                  <td>{bank2Term} months</td>
                </tr>
                <tr>
                  <td>{bank3Name.toUpperCase()}</td>
                  <td>
                    ${bank3Payments.toLocaleString("en")}
                  </td>
                  <td>
                    {Math.round(bank3Rate * 100 * 100) /
                      100}
                    %
                  </td>
                  <td>
                    ${(Math.round(bank3Deposit * totalBorrow * 100) / 100).toLocaleString("en")}
                  </td>
                  <td>
                    ${bank3Fees.toLocaleString("en")}
                  </td>
                  <td>{bank3Term} months</td>
                 
                          />
                        )}
                      />
                    </Center>
                  </td> 
                </tr>
              </tbody>
            </table></html>`

*/


  const onSubmit = (data,event) => {
    event.preventDefault();
 
    const el3 = document.getElementsByClassName("ftab")
   // console.log(el3[0])
    inputRefEle = el3[0] 
    inputRefEle.click();
    let personalDocs = []
    const storageRef = storage;
    var keyNames = [ 'id', 'identity'] // Object.keys(data);
 
    if ( data.id && data.id.length >0 ) {
          
      personalDocs.push(data.id) } //only push to personalDocs if not undefined
      
      if (data.identity && data.identity.length >0 ) {
      
       personalDocs.push(data.identity) } //only push to personalDocs if not undefined

       let personalItems = {}

      for( let i=0; i<2;i++ ) {
      
        if( personalDocs[i] && personalDocs[i] !== undefined){ 
          let link = storageRef.child(` ${state.data.firstName+" "+
          state.data.lastName}/personal/${keyNames[i]}/${personalDocs[i][0].name} `);

        storageRef.child( ` ${state.data.firstName+" "+state.data.lastName}/personal/${keyNames[i]}/${personalDocs[i][0].name} `) 
        .put(personalDocs[i][0]).then( async () => await link.getDownloadURL().then((url) => {
            
          personalItems[`${keyNames[i]}`] = url;

         // setuArr( uArr => uArr.concat(url) );
              
        }) ) }  

   
    } urlArr.push(personalItems); }

      
    const onSubmitTwo =  ( data,event) => {
    event.preventDefault();
    const el3 = document.getElementsByClassName("vtab")
    inputRefTwe = el3[0] 
    inputRefTwe.click();
    
    let financialDocs = []
    
    const storageRef = storage;
    var keyNames =['slipOne','slipTwo','slipThree','jobLetter']

        if ( data.slipOne && data.slipOne.length >0 ) {
          
          financialDocs.push(data.slipOne) 
            } //only push to personalDocs if not undefined
        
        if (data.slipTwo && data.slipTwo.length >0 ) {
        
        financialDocs.push(data.slipTwo) 
            } //only push to financialDocs if not undefined
        
        if (data.slipThree && data.slipThree.length >0 ) {
          
          financialDocs.push(data.slipThree) } 

        if (data.jobLetter && data.jobLetter.length >0 ) {
           
            financialDocs.push(data.jobLetter) } 

    for (let i=0; i<4;i++) {
        let financialItems={}

      if(financialDocs[i] && financialDocs[i] !== undefined){ 

        let link = storageRef.child(` ${state.data.firstName+" "+
        state.data.lastName}/financial/${keyNames[i]}/${financialDocs[i][0].name} `);

        storageRef.child( ` ${state.data.firstName+" "+state.data.lastName}/financial/${keyNames[i]}/${financialDocs[i][0].name} `) 
        .put(financialDocs[i][0]).then( async () => await link.getDownloadURL().then((url) => {
           
          financialItems[`${keyNames[i]}`] = url;

         // setfArr( fArr => fArr.concat(url) );
              
        }  ).then(financialItems =>{ /* finArr.push(financialItems); */ } ) ) 
    }  
     finArr.push(financialItems)
       
  }  //sendEmail(); 

};





  const onSubmitThree = (data,event) => {

    event.preventDefault();
    let vehicleDocs = []
    vehicleDocs.push(data.valuation,data.registration,data.fitness)
    const storageRef = storage;
    var keyNames = ['valuation','registration','fitness']

    if ( data.valuation && data.valuation.length >0 ) {
      
      vehicleDocs.push(data.valuation) } //only push to personalDocs if not undefined
    
    if (data.registration && data.registration >0 ) {
    
      vehicleDocs.push(data.registration ) } //only push to financialDocs if not undefined
    
    if (data.fitness && data.fitness >0 ) {
      
      vehicleDocs.push(data.fitness) } 

    for(let i=0; i<3;i++){
         let vehItems={}

          if(vehicleDocs[i] && vehicleDocs[i] !== undefined){ 

          let link = storageRef.child(` ${state.data.firstName+" "+state.data.lastName}/vehicle/${keyNames[i]}/${vehicleDocs[i][0].name} `);

          storageRef.child( ` ${state.data.firstName+" "+state.data.lastName}/vehicle/${keyNames[i]}/${vehicleDocs[i][0].name} `) 
          .put(vehicleDocs[i][0]).then( async () => await link.getDownloadURL().then((url) => {
              
              vehItems[`${keyNames[i]}`] = url;
              //setVArr( fArr => fArr.concat(url) );
          }) ) }  

          //console.log(vehArr) 
          vehArr.push(vehItems);

     } console.log("final", vehArr) ; 
     
      sendEmail() 
  
      history.push("./submit-application")
  };

  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <>
   <Header/>
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading> Document Upload </Heading>
          </Center>
        </SimpleGrid>

   <div className="myapp"> 
   
      <Tabs onChange={index => setTabIndex(index)} isFitted >
                <TabList>
                    <Tab _selected={{ color: 'white', bg: '#e65323' }}  >Personal Documents</Tab>

                    <Tab ref={node => { inputRefEle = node; }} className="ftab" id="fTab"_selected={{ color: 'white', bg: '#e65323' }}  
                    >Financial Documents</Tab>

                    <Tab _selected={{ color: 'white', bg: '#e65323' }} className="vtab" id="vehicleDocs" 
                    ref={node => { inputRefTwe = node; }} >Vehicle Documents</Tab>

                </TabList>
                <TabPanels id={"Personal"}>

              <TabPanel>
                  
                  <FormControl> 
                    <form className="upForm" onSubmit={ handleSubmit(onSubmit) } >
                      <div>
                      <Text  mb='1' p='2'>Type Of ID</Text>
                        <Select w='60'
                         name="idType"
                         options={ ["Yes","No"] }
                         placeholder="Select option"
                         ref={register()}
                          > ID Type
                            <option value="Driver's License">Driver's License</option>
                            <option value="Passport">Passport</option>
                            <option value="Voter's ID">Voter's ID</option>
                          </Select>
                      </div>
                    <div>

                    <label> 
                      <Controller 
                      name="id" 
                      control={control} 
                      defaultValue=""
                        render={({ onChange, name, value, onBlur}) => {
                          return (
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <Icon as={FiFile} />
                              </InputLeftElement>
                                  <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                                    ref={ node => { inputRef = node; register(name) } }
                                    style={{ display: "none" }}
                                  />
                              <Input name= { name } fontWeight='200' placeholder= { placeholder || "Upload copy of Selected ID" } 
                                onClick= { (e) => inputRef.click(e) } readOnly= { true }
                                value= { value ?  (value[0] && value[0].name  || ""  ): placeholder || "Upload copy of Selected ID" }
                              />
                            
                            </InputGroup>
                          );
                        }}
                      />
                      
                       <Text paddingLeft='7px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text>
                      </label>
                      { errors.id &&  <p className="error">Please upload your ID</p> }
                    
                    </div>
            
{ /*
    <div>
          <label> 
          TRN Card
        <Controller name="trn" control={control} defaultValue=""
          render={({ onChange, name, value, onBlur}) => {
            return (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiFile} />
                </InputLeftElement>
                <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                  ref={node => { inputRefTwo = node; }}
                  style={{ display: "none" }}
                />
                <Input name= { name } fontWeight='200' placeholder= { placeholder || "Upload copy of your TRN"} 
                onClick= { (e) => inputRefTwo.click(e) } readOnly= { true }
                  //value={ (value && value[0].name ) || "" }
                  value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload copy of your TRN" }
                />
              </InputGroup>
            );
          }}
        />
           <Text paddingLeft='7px' fontSize='xs' fontWeight='200' color='grey'> File format : pdf, jpg, jpeg, png</Text>
   </label>
  </div>
        */}

    <div>
          <label> 
          Proof of Identity
        <Controller name="identity" control={control} defaultValue=""
          render={({ onChange, name, value, onBlur}) => {
            return (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiFile} />
                </InputLeftElement>
                <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                  ref={node => { inputRefThree = node; }} style={{ display: "none" }}
                />
                <Input name= {name} fontWeight='200' placeholder= { placeholder || "Upload proof of identity" } 
                   onClick= { (e) => inputRefThree.click(e) } readOnly= { true }
                  //value={ (value && value[0].name ) || "" }
                  value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload proof of identity"}
                />
              </InputGroup>
            );
          }}
        />
         <Text paddingLeft='7px' fontSize='sm' fontWeight='200' color='black'>  
              Please upload a self-captured photo (selfie) of yourself holding up your photo 
              identification next to your face by either taking a Live Photo or Photo Upload
          </Text>
         <Text paddingLeft='7px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text>
    </label>

  </div>
                   <Center>
                    <button  className="uploadBtn" type="submit">
                            Save & Continue
                    </button>
                  </Center>              
     </form>
  </FormControl>

    </TabPanel>

        <TabPanel id="financial-tab">
          
          <form key={2} id="financialForm" className="upForm" onSubmit={ handleSubmit2(onSubmitTwo) }> 

                  <label> Last 3 Months Payslip</label>

                  <div> 
                    <label> 

                    <Controller name="slipOne" control={control1} defaultValue=""
                      render={({ onChange, name, value, onBlur}) => {
                        return (
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <Icon as={FiFile} />
                            </InputLeftElement>
                            <input name={name} type="file" onChange={(e) => onChange(e.target.files)} 
                              accept={acceptedFileTypes} 
                              ref={(node,name,event) => { inputRefFour = node;  }}
                              style={{ display: "none" }}
                            />
                            <Input name= { name } placeholder= { placeholder || "Upload pay-slip #1"} onClick= { (e) => inputRefFour.click(e) }
                              readOnly= { true }
                              //value={ (value && value[0].name ) || "" }
                              value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload pay-slip #1" }
                            />
                          </InputGroup>
                        );
                      }}
                    />
                       <Text paddingLeft='7px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text> 
                    </label>
                  </div>
                  
                  <div> 
                    <label> 
                    <Controller name="slipTwo" control={control1} defaultValue=""
                      render={({ onChange, name, value, onBlur}) => {
                        return (
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <Icon as={FiFile} />

                            </InputLeftElement>
                            <input name={name} type="file" onChange={(e) => onChange(e.target.files)} 
                              accept={acceptedFileTypes} 
                              ref={(node,name,event) => { inputRefFive = node; register2(event,name) }}
                              style={{ display: "none" }}
                            />
                            <Input name= { name } placeholder= { placeholder || "Upload pay-slip #2" } onClick= { (e) => inputRefFive.click(e) }
                              readOnly= { true }
                              //value={ (value && value[0].name ) || "" }
                              value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload pay-slip #2"}
                            />
                          </InputGroup>
                        );
                      }}
                    />
                        <Text paddingLeft='5px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text> 
                    </label>
                  </div>
                  
                  <div> 
                        <label> 
                            <Controller name="slipThree" control={control1} defaultValue=""
                              render={({ onChange, name, value, onBlur}) => {
                                return (
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                      <Icon as={FiFile} />
                                    </InputLeftElement>
                                    <input name={name} type="file" onChange={(e) => onChange(e.target.files)} 
                                      accept={acceptedFileTypes} 
                                      ref={(node,name,event) => { inputRefSix = node }}
                                   
                                      style={{ display: "none" }}
                                    />
                                    <Input name= { name } placeholder= { placeholder || "Upload pay-slip #3" } 
                                      onClick= { (e) => inputRefSix.click(e) }  readOnly= { true }
                                   
                                      value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload pay-slip #3"}
                                    />
                                  </InputGroup>
                                );
                              }}
                            />
                               <Text paddingLeft='5px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text>
                            </label>
                     </div>
                          
                     <div> 
                        <label> Income Verification Letter (Job Letter)
                            <Controller name="jobLetter" control={control1} defaultValue=""
                              render={({ onChange, name, value, onBlur}) => {
                                return (
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                      <Icon as={FiFile} />
                                    </InputLeftElement>
                                    <input name={name} type="file" onChange={(e) => onChange(e.target.files)}
                                     accept={acceptedFileTypes} 
                                            ref={ ( node,name,event  ) => { inputRefSeven = node }} 
                                            style={{ display: "none" }}
                                       
                                            aria-invalid={errors.name ? "true" : "false"}
                                    />
                                    <Input  name= { name } placeholder= { placeholder || "Upload Income Verification Letter" } onClick= { (e) => inputRefSeven.click(e) }
                                      value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload Income Verification Letter"}
                                    />
                                  </InputGroup>
                                );
                              }}
                            />
                                <Text paddingLeft='5px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text>
                            </label>
                     </div>

                        <label>Credit Bureau Authorization</label>

                  <Textarea
                    isReadOnly
                    value= {`I, ${state.data.firstName} ${state.data.lastName}, Date Of Birth: ${state.data.dateOfBirth}, hereby consent to Credit Bureau in Jamaica, authorizing disclosure to ${state.data.bankSelection1} and ${state.data.bankSelection2} of such credit information which it may have in regard to me`}
                        >
                  </Textarea>

                        <p>
                        </p>

                        <Checkbox name="permission">
                        I confirm that I have read the above and authorize the bank(s) listed to access my credit report
                        </Checkbox>

                        <Center>
                          <button type="submit" className="uploadBtn" >
                                  Save & Continue
                            </button>
                        
                          </Center>
                        

                        </form>

                  </TabPanel>

                  <TabPanel> 

                  <form className="upForm" onSubmit={ handleSubmit3(onSubmitThree) }> 
                  <div> 
                        <label> Vehicle Valuation Report (Used Vehicles Only)
                            <Controller name="valuation" control={control2} defaultValue=""
                              render={({ onChange, name, value, onBlur}) => {
                                return (
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                      <Icon as={FiFile} />
                                    </InputLeftElement>
                                    <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                                          ref={node => { inputRefEight = node; }} style={{ display: "none" }}
                                    />
                                    <Input name= { name } placeholder= { placeholder || "Upload Valuation Report"} onClick= { (e) => inputRefEight.click(e) }
                                      readOnly= { true } value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload Valuation Report"}
                                    />
                                  </InputGroup>
                                );
                              }}
                            />
                                <Text paddingLeft='5px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text>
                            </label>
                     </div>

                     <div> 
                        <label> Motor Vehicle Registration (Used Vehicles Only)
                            <Controller name="registration" control={control2} defaultValue=""
                              render={({ onChange, name, value, onBlur}) => {
                                return (
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                      <Icon as={FiFile} />
                                    </InputLeftElement>
                                    <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                                          ref={node => { inputRefNine = node; }} style={{ display: "none" }}
                                    />
                                    <Input name= { name } placeholder= { placeholder || "Upload Vehicle Registration" } onClick= { (e) => inputRefNine.click(e) }
                                      readOnly= { true } value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload Vehicle Registration"}
                                    />
                                  </InputGroup>
                                );
                              }}
                            />
                                <Text paddingLeft='5px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text>
                            </label>
                     </div>

                     <div> 
                        <label> Motor Vehicle Fitness (Used Vehicles Only)
                            <Controller name="fitness" control={control2} defaultValue=""
                              render={({ onChange, name, value, onBlur}) => {
                                return (
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                      <Icon as={FiFile} />
                                    </InputLeftElement>
                                    <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                                          ref={node => { inputRefTen = node; }} style={{ display: "none" }}
                                    />
                                    <Input name= { name }  placeholder= { placeholder || "Upload Fitness" } onClick= { (e) => inputRefTen.click(e) }
                                      readOnly= { true } value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload Fitness"}
                                    />
                                  </InputGroup>
                                );
                              }}
                            />
                                <Text paddingLeft='5px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text>
                            </label>
                     </div>
                     <Center>
                      
                          <button type="submit"  className="uploadBtn" >
                                 Upload Documents
                            </button>
                     
                          </Center>
                     </form>
                     </TabPanel>
                  </TabPanels>

                  <br/>

                  <div>

                <Center>
            
                
                
                </Center>

                <Center>
           
         </Center>
            </div>
        </Tabs>
        <br />

          <div>
 
          </div>
        
        <br />

        <br></br>

    </div>
      
    </>
  );
};

export default withRouter(FileUpload);
