/*global google*/
import React from 'react';
import PlacesAutocomplete from 'reactjs-places-autocomplete';
import { inject } from 'mobx-react';
import {isMobile, isBrowser} from 'react-device-detect';
import { SEARCH_OPTIONS } from "../../constants/mapConstants"

var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
var searchOptions = { };

@inject('spotStore')
class DesktopSearch extends React.Component {
  spotStore = this.props.spotStore;
  maps = this.props.spotStore.maps;

  state = {address: '', showResults: false};

  handleChange = address => {
    this.setState({address});
  };

  handleSelect = (description, placeId, suggestion) => {
    this.spotStore.selectSearchedSpot(suggestion);
    this.setState({address: ''});
  };

  handleBlur = () => {
    this.setState({showResults: false});
  };

  handleFocus = () => {
    this.setState({showResults: true});
  };

  componentWillMount() {
    searchOptions = {
        location: new this.maps.LatLng(39.0147002, -76.91346539999999),
        radius: 2000,
        types: ['establishment']
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.spotStore.gmapsLoaded ? (
          <PlacesAutocomplete
            ref={c => {
              if (!c) return;
              c.handleInputOnBlur = () => {};
            }}
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={searchOptions}
          >
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
              <div id="desktop-search" className='autocomplete flex-grow-1 align-self-center'>
                <input
                style = {{fontFamily:"FontAwesome, inherit"}}
                  ref={this.exampleRef}
                  onFocus={this.handleFocus}
                  placeholder = 'Search For a New Spot Here!'
                  {...getInputProps({
                  
                    className: 'form-control form-control-alternative',
                    onBlur: () => {
                      this.handleBlur();
                    }
                  })}
                />
                {this.state.showResults ? (
                  <div className='autocomplete-items'>
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                        : {backgroundColor: '#ffffff', cursor: 'pointer'};
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>{suggestion.description} </span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            )}
          </PlacesAutocomplete>
        ) : null}
      </React.Fragment>
    );
  }
}

export default DesktopSearch;