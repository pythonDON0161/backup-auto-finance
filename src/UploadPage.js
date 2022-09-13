import React, { useState, useRef, memo } from "react";
import {Input,FormControl,FormLabel,InputGroup,InputLeftElement,Tabs, 
  TabList, TabPanels, Tab, TabPanel,
  FormErrorMessage, 
  ButtonGroup,Icon,Button,Checkbox,Text,Select,Center,
   SimpleGrid, Heading, Textarea, Link, Flex, Spacer,Container
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useController, useForm, Controller } from "react-hook-form";
import UploadUnit from "./UploadUnit";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import storage from "./fireBaseConfig.js"
import Header from "./components/Header";
import emailjs from '@emailjs/browser';
import "./styles.css";


export const FileUpload = ({name, placeholder, acceptedFileTypes,}) => {
  
  const { register,handleSubmit,errors,getValues,setValue,watch,control,ref, } = useForm();

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

  } = useForm();
  
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

  const onClicker = () => {
    console.log('INPUT VALUE: ', inputRef);
}

const { action, state } = useStateMachine(updateAction);


const onSubmitOne = (data,event) => {

  event.preventDefault();
  sendEmail()
  let personalDocs = []
  personalDocs.push(data.trn,data.nis,data.photo)
  const storageRef = storage;
  var keyNames = Object.keys(data);

  for (let x=1; x < keyNames.length && x <2; x++){
      let i = 1 //start at 1 to avoid firstName key

      personalDocs.forEach( (file,) =>{
      storageRef.child( ` ${data.firstName}/${keyNames[i]}/${file[0].name} `)
       .put(file[0]).then( () => { console.log( "this is " +i+" "+ "uploaded a file") })
       i++
     } )
  }
};



function sendEmail() {

  console.log("im in here")

  var templateParams = {
    email: state.data.email, 
    name: state.data.firstName, 
    lastName: state.data.lastName, 
    income:state.data.grossMonthly, 
    dob: state.data.dateOfBirth, 
    cell: state.data.cellNumber,
    carPrice: state.data.price,
    status: state.data.carStatus,
    modelYear: state.data.modelYear,
    employment: state.data.employmentStatus
  };
 
  emailjs.send('auto_finance', 'template_3wiofi8', templateParams, 'PqN3ytZ-5Y1PJ4wPp')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });

    }
 
  
  const onSubmitTwo = (data,event) => {
    event.preventDefault();
    sendEmail()
    console.log(data)
    let personalDocs = []
    personalDocs.push(data.trn,data.nis,data.id)
    const storageRef = storage;
    var keyNames = Object.keys(data);
    
    for (let x=1; x < keyNames.length && x <2; x++){
        let i = 1 //start at 1 to avoid firstName key
        personalDocs.forEach( (file,) =>{
        storageRef.child( ` ${state.data.firstName}/${keyNames[i]}/${file[0].name} `)
         .put(file[0]).then( () => { console.log( "this is " +i+" "+ "uploaded a file") })
         i++
       } )
    } 
  };

  const onSubmitThree = (data1,event) => {

    event.preventDefault();
    console.log(data1)
    let personalDocs = []
    personalDocs.push(data1.trn,data1.nis,data1.id)
    const storageRef = storage;
    var keyNames = Object.keys(data1);
    
    for (let x=1; x < keyNames.length && x <2; x++){
        let i = 1 //start at 1 to avoid firstName key
        personalDocs.forEach( (file,) =>{
        storageRef.child( ` ${state.data.firstName}/${keyNames[i]}/${file[0].name} `)
         .put(file[0]).then( () => { console.log( "this is " +i+" "+ "uploaded a file") })
         i++
       } )
    } 
  };



  return (
    <>
   <Header/>
    
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading> Document Upload</Heading>
          </Center>
        </SimpleGrid>

<div className="myapp"> 
   
      <Tabs isFitted >
                <TabList>
                    <Tab _selected={{ color: 'white', bg: '#e65323' }}>Personal Documents</Tab>
                    <Tab _selected={{ color: 'white', bg: '#e65323' }}>Financial Documents</Tab>
                    <Tab _selected={{ color: 'white', bg: '#e65323' }}>Vehicle Documents</Tab>
                </TabList>
                <TabPanels id={"Personal"}>

                    <TabPanel>
                  
                  <FormControl> 
                    <form className="upForm" onSubmit={ handleSubmit(onSubmitTwo) } >
                      <div>
                      <Text  mb='1' p='2'>Type Of ID</Text>
                        <Select w='60'
                         name="idType"
                         options={ ["Yes","No"] }
                         placeholder="Select option"
                         ref={register({ required: true })}
                          > ID Type
                            <option value="Driver's License">Driver's License</option>
                            <option value="Passport">Passport</option>
                            <option value="Voter's ID">Voter's ID</option>
                          </Select>
                          {errors.idType&& (
                           <p className="error">Please select your ID Type</p>
                               )}

                      </div>

                    <div>

                    <label> 
                      <Controller name="id" control={control} defaultValue=""
                        render={({ onChange, name, value, onBlur}) => {
                          return (
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <Icon as={FiFile} />
                              </InputLeftElement>
                                <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                                  ref={node => { inputRef = node; }}
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
                    
                    </div>
            

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
                <Input name= { name } fontWeight='200' placeholder= { placeholder || "Upload copy of your TRN"} onClick= { (e) => inputRefTwo.click(e) } readOnly= { true }
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


          
    <div>
          <label> 
            NIS Card
        <Controller name="nis" control={control} defaultValue=""
          render={({ onChange, name, value, onBlur}) => {
            return (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiFile} />
                </InputLeftElement>
                <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                  ref={node => { inputRefThree = node; }}
                  style={{ display: "none" }}
                />
                <Input name= { name } fontWeight='200' placeholder= { placeholder || "Upload copy of your NIS" } onClick= { (e) => inputRefThree.click(e) } readOnly= { true }
                  //value={ (value && value[0].name ) || "" }
                  value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload copy of your NIS"}
                />
              </InputGroup>
            );
          }}
        />
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

        <TabPanel>
          
          <form  key={2} className="upForm" onSubmit={ handleSubmit2() }> 

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
                              ref={(node,name,event) => { inputRefFour = node; register2(event,name) }}
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
                                    <Input name= { name } placeholder= { placeholder || "Upload pay-slip #3" } onClick= { (e) => inputRefSix.click(e) }
                                      
                                      //value={ (value && value[0].name ) || "" }
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
                                    <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                                            ref={(node,name,event) => { inputRefSeven = node }} style={{ display: "none" }}
                                    />
                                    <Input name= { name } placeholder= { placeholder || "Upload Income Verification Letter" } onClick= { (e) => inputRefSeven.click(e) }
                                      value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload Income Verification Letter"}
                                    />
                                  </InputGroup>
                                );
                              }}
                            />
                                <Text paddingLeft='5px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text>
                            </label>
                     </div>

                        <label>Credit Authorization</label>

                        <Textarea
                          isReadOnly
                          value= 'The loan for which you are applying involves various disclosures, records, and documents (“Loan Documents”) including this eDisclosure Agreement. The purpose of this eDisclosure Agreement is to obtain Your consent to receive certain Loan Documents from us in electronic form rather than in paper form. With Your consent, You will also be able to sign an authorize these Loan Documents electronically, rather than on paper.'
                        >
               
                        </Textarea>
                        <p>
                        </p>

                        <Checkbox name="permission" value="True"  ref={register2({ required: true })}>

                          I confirm that I have read and agree to allow VMBS to apply for a credit report on my behalf.

                        </Checkbox>

                        </form>

                  </TabPanel>

                  <TabPanel> 

                  <form className="upForm" onSubmit={ handleSubmit() }> 
                  <div> 
                        <label>  Vehicle Valuation Report(Used Vehicles Only)
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
                                    <Input name= { name } placeholder= { placeholder || "Upload Fitness" } onClick= { (e) => inputRefTen.click(e) }
                                      readOnly= { true } value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload Fitness"}
                                    />
                                  </InputGroup>
                                );
                              }}
                            />
                                <Text paddingLeft='5px' fontSize='xs' fontWeight='200' color='grey'>  File format : pdf, jpg, jpeg, png</Text>
                            </label>
                     </div>
                     </form>
                     </TabPanel>
                  </TabPanels>

                  <br/>

                  <div>

                  <Center>
            
                
                
                </Center>

                <Center>
                <Link  >
                    <button className="wide-button" type="submit">
                              Home/Save & Exit
                      
                    </button>
                  </Link>
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

export default FileUpload;
