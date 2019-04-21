import React from 'react';
import PlacesAutocomplete from 'reactjs-places-autocomplete';
import { inject } from 'mobx-react';
import preventDefault from "../../utils/eventListeners"


@inject('spotStore','uiStore')
class MobileSearch extends React.Component {

  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  
  state = { address: '', showResults: false, mobileSearch:{ } };
  
  search = React.createRef();

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = (description, placeId, suggestion) => {
    window.scrollTo(0,0);
    this.spotStore.selectSearchedSpot(suggestion);
    this.setState({address:''});
    this.search.current.blur();
  };

  handleBlur = () => {
    this.setState({ showResults: false })
    this.uiStore.hideMobileMap = true;
    window.addEventListener('touchmove', preventDefault, { passive: false });
    this.nav.removeEventListener('touchmove', preventDefault);
    this.searchInput.removeEventListener('touchmove', preventDefault);
  }

  handleFocus = () => {
    this.setState({ showResults: true });
    this.uiStore.hideMobileMap = false;
    window.removeEventListener('touchmove', preventDefault);
    this.nav.addEventListener('touchmove', preventDefault, { passive: false })
    this.searchInput.addEventListener('touchmove', preventDefault, { passive: false })
  }
  componentDidMount(){
    this.nav = document.getElementById("app-navbar");
    this.searchInput = document.getElementById("mobile-search-input");
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
          <div id="mobile-search" className="mobile-autocomplete flex-grow-1 align-self-center fix" >




            <input
            id="mobile-search-input"
              name="search"
              style = {{fontFamily:"FontAwesome, inherit"}}
              ref={this.search}
              placeholder = '&#xF002;  Search For a New Spot Here!'
              onFocus={this.handleFocus}
              {...getInputProps({
                
                className: 'form-control',
               
                onBlur: () => { this.handleBlur() },
              })}
            />


            {this.state.showResults ?
              <div className="autocomplete-items" style={{ height:"100vh", backgroundColor: "white"}}>
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

export default MobileSearch;