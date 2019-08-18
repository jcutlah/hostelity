import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
const google = window.google


export default class SearchBox extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        onPlacesChanged: PropTypes.func
    }

    render() {
        return <input ref="input" {...this.props} type="text" />;
    }
    // resolveAfter2Seconds() {
    //     return new Promise(resolve => {
    //         resolve(window.document.createElement('script').setAttribute('type', 'text/javascript')
    //             .setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ'));
    //     });
    // }
    // async loadScript() {
    //     await this.resolveAfter2Seconds()

    // }
    onPlacesChanged = () => {
        if (this.props.onPlacesChanged) {
            this.props.onPlacesChanged(this.searchBox.getPlaces());
        }

    }

    componentDidMount() {
        var input = ReactDOM.findDOMNode(this.refs.input);
        this.searchBox = new window.google.maps.places.SearchBox(this.input);
        this.searchBox.addListener('places_changed', this.onPlacesChanged);

    }
    componentWillUnmount() {

        // https://developers.google.com/maps/documentation/javascript/events#removing
        google.maps.event.clearInstanceListeners(this.searchBox);
    }
}