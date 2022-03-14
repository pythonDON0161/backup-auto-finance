import React from 'react'
import ReactDOM from 'react-dom';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';



// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  const PDFDOC = () => {
        <Document>
             <Page>
                 <Text>
                     testing 123
                 </Text>

             </Page>
        </Document>     

}

export default PDFDOC;

  