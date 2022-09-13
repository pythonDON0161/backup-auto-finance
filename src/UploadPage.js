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
import "./styles.css";
import Header from "./components/Header";




export const FileUpload = ({
  name,
  placeholder,
  acceptedFileTypes,
}) => {
  

  const { register,handleSubmit,errors,getValues,setValue,watch,control,ref } = useForm();
  
  let inputRef = HTMLInputElement | null;
  let inputRefTwo = HTMLInputElement | null;
  let inputRefThree = HTMLInputElement | null;
  let inputRefFour = HTMLInputElement | null;
  let inputRefFive = HTMLInputElement | null;
  let inputRefSix = HTMLInputElement | null;
  let inputRefSeven = HTMLInputElement | null;

  const onClicker = () => {
    console.log('INPUT VALUE: ', inputRef);
}


function url_array_get(data){
  //let user=firebase.auth().currentUser;
  let personalDocs = []
  personalDocs.append(data.nis)
  const storageRef = storage;
  let ref = storage().ref(data.firstname+'/personal');

  //let files=Array.from(review_photo.files);
  /*let promises = files.map(function(file) {
      return ref.child(file.name).put(file).then(function(snapshot){
          return snapshot.ref.getDownloadURL()
      })
  }); */
  //return Promise.all(promises);

}


const onSubmitOne = (data,event) => {

  event.preventDefault();
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
  
  const onSubmitTwo = (data,event) => {

    event.preventDefault();
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



  return (
    <>
   <Header/>
    
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading> Upload Section </Heading>
          </Center>
        </SimpleGrid>
<div className="myapp"> 
    <FormControl> 
      <form onSubmit={ handleSubmit(onSubmitTwo) } >

      <Tabs isFitted >
                <TabList>
                    <Tab _selected={{ color: 'white', bg: '#e65323' }}>Personal Documents</Tab>
                    <Tab _selected={{ color: 'white', bg: '#e65323' }}>Financial Documents</Tab>
                </TabList>
                <TabPanels id={"tabPanel"}>

                    <TabPanel>
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

                      </div>

                    <div>

                    <label> 
                      <Controller name="trn" control={control} defaultValue=""
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
        

    </TabPanel>

        <TabPanel>

                  <label> Last 3 Months Payslip</label>

                  <div> 
                    <label> 

                    <Controller name="slipOne" control={control} defaultValue=""
                      render={({ onChange, name, value, onBlur}) => {
                        return (
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <Icon as={FiFile} />

                            </InputLeftElement>
                            <input name={name} type="file" onChange={(e) => onChange(e.target.files)} 
                              accept={acceptedFileTypes} 
                              ref={node => { inputRefFour = node; }}
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
                    <Controller name="slipTwo" control={control} defaultValue=""
                      render={({ onChange, name, value, onBlur}) => {
                        return (
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <Icon as={FiFile} />

                            </InputLeftElement>
                            <input name={name} type="file" onChange={(e) => onChange(e.target.files)} 
                              accept={acceptedFileTypes} 
                              ref={node => { inputRefFive = node; }}
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
                            <Controller name="slipThree" control={control} defaultValue=""
                              render={({ onChange, name, value, onBlur}) => {
                                return (
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                      <Icon as={FiFile} />
                                    </InputLeftElement>
                                    <input name={name} type="file" onChange={(e) => onChange(e.target.files)} 
                                      accept={acceptedFileTypes} 
                                      ref={node => { inputRefSix = node; }}
                                      style={{ display: "none" }}
                                    />
                                    <Input name= { name } placeholder= { placeholder || "Upload pay-slip #3" } onClick= { (e) => inputRefSix.click(e) }
                                      readOnly= { true }
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
                            <Controller name="jobLetter" control={control} defaultValue=""
                              render={({ onChange, name, value, onBlur}) => {
                                return (
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                      <Icon as={FiFile} />
                                    </InputLeftElement>
                                    <input name={name} type="file" onChange={(e) => onChange(e.target.files)} accept={acceptedFileTypes} 
                                          ref={node => { inputRefSeven = node; }} style={{ display: "none" }}
                                    />
                                    <Input name= { name } placeholder= { placeholder || "Upload Income Verification Letter" } onClick= { (e) => inputRefSeven.click(e) }
                                      readOnly= { true } value= { value ? (value[0] && value[0].name  || ""  ): placeholder || "Upload Income Verification Letter"}
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
                        >
                        The loan for which you are applying involves various disclosures, records, and documents (“Loan Documents”), 
                            including this eDisclosure Agreement. The purpose of this eDisclosure Agreement
                            is to obtain Your consent to receive certain Loan Documents from us in electronic form rather than in paper form. 
                            With Your consent, You will also be able to sign and
                            authorize these Loan Documents electronically, rather than on paper.
                        </Textarea>
                        <p>
                        </p>

                        <Checkbox isRequired >

                          I confirm that I have read and agree to allow VMBS to apply for a credit report on my behalf.
                          
                        </Checkbox>

                  </TabPanel>
                  
                  </TabPanels>

                  <br/>

                  <div>

                  <Center>
            
                  <Link to="/document-upload">
                    <button onClick={onSubmitOne} className="uploadBtn" type="submit">
                          Save & Exit
                      
                    </button>
                  </Link>``
                
                </Center>

                <Center>
                <Link to="/thank-you" >
                    <button onClick={onSubmitTwo} className="wide-button" type="submit">
                              Review Documents
                      
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

     

      </form>
    </FormControl>

    </div>
      
    </>
  );
};

export default FileUpload;
