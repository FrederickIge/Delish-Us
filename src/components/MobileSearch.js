import React from 'react';
import PlacesAutocomplete from 'reactjs-places-autocomplete';
import { inject } from 'mobx-react';
import { isMobile } from 'react-device-detect';
import ReactDOM from "react-dom"
@inject('spotStore')
class MobileSearch extends React.Component {

  spotStore = this.props.spotStore;

  state = { address: '', showResults: false, mobileSearch:{ } };
  search = React.createRef()
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = (description, placeId, suggestion) => {
    this.spotStore.selectSearchedSpot(suggestion);
    this.setState({address:''});
    this.search.current.blur();
  };

  handleBlur = () => {
    this.setState({ showResults: false })
  }

  handleFocus = () => {
    this.setState({ showResults: true })
  }

  componentDidMount() {
    console.log(this.search)
    if (isMobile) {
      this.setState({ mobileSearch: { position: "absolute", top: "0px" , zIndex :"4"} })
    }
  }

  render() {
    return (
      <PlacesAutocomplete  style={ this.state.mobileSearch } ref={(c) => {
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
              name="search"
              ref={this.search}
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
                      <span>{suggestion.description} gang</span>
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

export default MobileSearch;