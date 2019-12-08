import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";

class CSVExport extends React.Component {

    render () {
        if (typeof this.props.JSON != 'string') {
            console.log(this.props.JSON);
            return (<CSVLink data={this.props.JSON}>Export Data</CSVLink>);
        } else {
            return(" ");
        }

    }

}

export default CSVExport;
