import React from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/simple-button-css.css'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchFieldsContent} from '../actions/search-fields-content-action';
import _ from 'underscore';
import {Link, withRouter} from "react-router";
import {Row, Col} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import {currentSearch} from '../actions/current-search-acction'
import SingleOfferImage from './single-image'
import LazyLoad from 'react-lazyload';

const style = {
    margin: 12,
};
const colors = [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Black',
        'White',
];

const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontSize: '40px'
};


const getCorrectComponent = (priceFrom, priceTo, TextFieldsContent, socket, currentSearchUpdate) => {
    if((isInt(priceFrom) && isInt(priceTo) && (parseInt(priceTo) > parseInt(priceFrom))) ||
        (isInt(priceFrom) && priceTo === '') || (isInt(priceTo) && priceFrom === '') ||
        (priceTo === '' && priceFrom === '')){
        return (
            <Button style={buttonStyle} onClick={() => getOffersFromDatabase(socket, TextFieldsContent, currentSearchUpdate)}>Search</Button>
        )
    }
    else{
        return (
            <Row>
                <font style={codeStyle}>Incorrect data</font>
            </Row>
        )
    }

};

const getOffersFromDatabase = (socket, filterData, currentSearchUpdate) => {
    socket.emit('SEARCH',filterData);
    socket.on('SEARCH_RESPONSE', function(data){
        if(data.res === "SEARCH_SUCCESSFUL"){
            console.log("SEARCH DATA FROM SERVER");
            console.log(data.data);
            currentSearchUpdate(data.data);
        }
        else{
            console.log("SEARCH DATA FROM SERVER NOT SUCCESSFUL");
            currentSearchUpdate([]);

        }
    });
    // updateAddOfferStatus(true);
};

const isInt = (value) => {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
};

const updateTextFieldsState = (value, TextFieldContent, TextFieldContentUpdate, art) => {
    var newTextFieldsContent = _.clone(TextFieldContent);
    newTextFieldsContent[art] = value;
    TextFieldContentUpdate(newTextFieldsContent);
    console.log(TextFieldContent);
};


const SearchTextFields = ({TextFieldsContent, searchFieldsContentUpdate, socket, currentSearchUpdate, currentSearch}) => {
    // socket.on('INITIAL_DATA', function(data){
    //     if(_.isUndefined(data.data)){
    //         currentSearchUpdate([]);
    //     }
    //     else{
    //         currentSearchUpdate(data.data);
    //     }
    // });
    return (
    <div>
        <Row>
            <AutoComplete
                floatingLabelText="Product Name"
                filter={AutoComplete.caseInsensitiveFilter}
                onUpdateInput={(searchText, dataSource, params) => updateTextFieldsState(searchText, TextFieldsContent, searchFieldsContentUpdate, "ProductName")}
                dataSource={colors}
                style={style}
                hintText="Product Name Filed"
            />
            <AutoComplete
                floatingLabelText="Category"
                hintText="Category Field"
                filter={AutoComplete.caseInsensitiveFilter}
                onUpdateInput={(searchText, dataSource, params) => updateTextFieldsState(searchText, TextFieldsContent, searchFieldsContentUpdate, "Category")}
                dataSource={colors}
                style={style}
            />
        <TextField
            floatingLabelText="Price From"
            hintText="Price From Filed"
            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, searchFieldsContentUpdate, "PriceFrom")}
            style={style}
        />
        <TextField
            floatingLabelText="Price to"
            hintText="Price To Filed"
            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, searchFieldsContentUpdate, "PriceTo")}
            style={style}
        />
            {
                getCorrectComponent(TextFieldsContent.PriceFrom, TextFieldsContent.PriceTo, TextFieldsContent, socket, currentSearchUpdate)
            }
            </Row>
        <br/>
        <div>
            {currentSearch.map(key => {
                return (
                    <div key={Math.random()}>
                        <LazyLoad height={50} key={Math.random()}>
                    <SingleOfferImage offerInfo={key} withDescription={true} key={Math.random()} socket={socket} image="no-image3.png"/>
                    </LazyLoad>
                        </div>
                )
            })}
        </div>
    </div>
)};

function mapStateToProps(state) {
    return {
        TextFieldsContent: state.display.SearchTextFieldsContent,
        currentSearch: state.display.currentSearch
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({searchFieldsContentUpdate: searchFieldsContent,
        currentSearchUpdate: currentSearch}, dispatch);
}
export default withRouter (connect(mapStateToProps, matchDispatchToProps)(SearchTextFields));