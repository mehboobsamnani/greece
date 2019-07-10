import React from 'react';
import {  PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

// Create Document Component
const Pdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

// function PdfLink(props){
//   console.log('props',props);
//   return (
//     <div className={props.className}>
//       <PDFDownloadLink document={<Pdf />} fileName="doc.pdf">
//         {({ blob, url, loading, error }) => (loading ? 'Generating TCE' : 'Download TCE')}
//       </PDFDownloadLink>
//     </div>
//   )
// }

const PdfLink = (props) => (
    <div className={props.className}>
      <PDFDownloadLink document={<Pdf />} fileName="doc.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Generating TCE' : 'Download TCE')}
      </PDFDownloadLink>
    </div>
  )

export default PdfLink
