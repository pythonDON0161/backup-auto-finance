import React from 'react'
import ReactDOM from 'react-dom';
import { useStateMachine } from "little-state-machine";
import { Document, Font, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import updateAction from "../updateAction";
import raceCar from "../assets/raceCar.png";

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});


// Create styles
const styles = StyleSheet.create({
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  page: {
      //flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      padding:10,
      margin: 12,
      lineHeight: 2,
      flexGrow: 1,
      fontFamily: 'Oswald'
    },

    header: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },

    title:{
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },

    subtitle: {
      fontSize: 14,
      margin: 12,
      fontFamily: 'Oswald'
    },

    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 15,
    },

    text: {
      margin: 12,
      fontSize: 14
    },

    sectionHeading: {
      fontSize: 20,
      margin: 12,
      fontFamily: 'Oswald',
      textAlign: 'left',
      left: 0
    },
    columnLeft:{
      margin:10,
      textAlign: 'left',
      
    },
    columnRight:{
      margin:10,
      textAlign: 'right'
    },
    columnCenter:{
      margin:10,
      textAlign: 'center'
    },
    table:{
      flexDirection: 'row',
      background: '#d3d3d3',
      fontFamily: 'Oswald'
    
    }

  });


  const PDFDOC = (props) => {
    
  const { action, state } = useStateMachine();
  //console.log(props.data)
    //console.log( (props.data.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') );
  
    return( 
        <Document>
             <Page style={styles.body}>
                <Text style={styles.title}>Name: {props.data.firstName} {props.data.middleInit} {props.data.lastName}</Text>
                <Text style={styles.title}>Date Of Birth: {props.data.dateOfBirth} </Text>
                <Text style={styles.title}>Phonenumber: {props.data.cellNumber} </Text>
             
                <Text style={styles.sectionHeading}>Car Details</Text>
                  <View style={styles.table}> 
                      <Text style={styles.columnLeft}>Vehicle Value: &nbsp; ${props.data.price}</Text>
                      <Text style={styles.columnCenter}>Vehicle Status : &nbsp; {props.data.carStatus}</Text>
                      <Text style={styles.columnRight}>Vehicle Year : &nbsp; {props.data.modelYear}</Text>
                </View>

                <Text style={styles.sectionHeading}>Finances</Text>
                  <View style={styles.table}> 
                      <Text style={styles.columnLeft}>Gross Salary : &nbsp; ${props.data.grossMonthly}</Text>
                      <Text style={styles.columnCenter}>Other Income : &nbsp; $ {props.data.otherMonthly}</Text>
                      <Text style={styles.columnRight}>Credit Card : &nbsp; {props.data.creditCard}</Text>
                    </View>
                    <View style={styles.table}> 
                      <Text style={styles.columnLeft}>Mortgage: &nbsp; ${props.data.mortgage}</Text>
                      <Text style={styles.columnCenter}>Rent: &nbsp; ${props.data.rent}</Text>
                      <Text style={styles.columnRight}>Other Loans : &nbsp; ${props.data.otherLoanPayments}</Text>
                </View>
                <View style={styles.table}> 
                      <Text style={styles.columnLeft}>Existing Car Loan: &nbsp; ${props.data.existingCarLoan}</Text>
                </View>

                <Text style={styles.sectionHeading}>Employment</Text>
                 
                  <View style={styles.table}> 
                      <Text style={styles.columnLeft}>Employment Status: &nbsp;{props.data.employmentStatus}</Text>
                      <Text style={styles.columnCenter}>Work Experience: &nbsp; {props.data.workExperience}</Text>
                      
                    </View>

                    <View style={styles.table}>
                    <Text style={styles.columnRight}>Been on Probation: &nbsp; {props.data.probation}</Text>
                  </View>

                 <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) =>
                     `${pageNumber} / ${totalPages}` } />
         </Page>
        </Document>     
      
    )
}

export default PDFDOC;

  