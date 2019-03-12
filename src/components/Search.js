import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { inject } from 'mobx-react';

@inject('spotStore')
class Search extends React.Component {

  spotStore = this.props.spotStore;

  state = { address: '', showResults: false };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = suggestion => {
    console.log(suggestion.placeId)
    // this.spotStore.selectSearchedSpot(address);
    // this.setState({address:''});
  };

  handleBlur = () => {
    this.setState({ showResults: false })
  }

  handleFocus = () => {
    this.setState({ showResults: true })
  }

  render() {
    return (
      <PlacesAutocomplete ref={(c) => {
        if (!c) return;
        c.handleInputOnBlur = () => { };
      }}
        value={this.state.address}
        onChange={this.handleChange}
        // onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="autocomplete">
            <input
              onFocus={this.handleFocus}
              {...getInputProps({
                placeholder: 'Search Places ...',
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
                      <span onClick={() => this.handleSelect(suggestion) }>{suggestion.description} gang</span>
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