import React from 'react';
import PlacesAutocomplete from 'reactjs-places-autocomplete';
import { inject } from 'mobx-react';
import {isMobile, isBrowser} from 'react-device-detect';

@inject('spotStore')
class Search extends React.Component {

  spotStore = this.props.spotStore;

  state = { address: '', showResults: false, mobileSearch:{ } };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = (description, placeId, suggestion) => {
    this.spotStore.selectSearchedSpot(suggestion);
    this.setState({address:''});
  };

  handleBlur = () => {
    this.setState({ showResults: false })
  }

  handleFocus = () => {
    this.setState({ showResults: true })
  }

  render() {
    return (
      <PlacesAutocomplete   ref={(c) => {
        if (!c) return;
        c.handleInputOnBlur = () => { };
      }}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="autocomplete flex-grow-1 align-self-center">
            <input
              ref={this.exampleRef}
              onFocus={this.handleFocus}
              {...getInputProps({
                placeholder: 'Search For a Spot',
                className: 'form-control form-control-alternative',
                onBlur: () => { this.handleBlur() },
              })}
            />
            {this.state.showResults ?
              <div className="autocomplete-items">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (

                    <div 
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description} </span>
                    </div>

                  );
                })}
              </div>
              : null}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default Search;