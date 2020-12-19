import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { PropTypes } from 'prop-types';

class Plaid extends Component {
    constructor(props) {
        super(props)
        this.Actions = new Map([
            ['ready', this.props.onReady ? this.props.onReady : this.sendMessage],
            ['acknowledged', this.props.onAcknowledged ? this.props.onAcknowledged : this.sendMessage],
            ['event', this.props.onEvent ? this.props.onEvent : this.sendMessage],
            ['connected', this.props.onConnected ? this.props.onConnected : this.sendMessage],
            ['exit', this.props.onExit ? this.props.onExit : this.sendMessage],
        ]);
    }
    render() {
        // console.log(this.props)
        let map = Object.entries(this.props);
        let url = '?';
        map.forEach(element => {
            url += element[0] + '=' + element[1] + '&';
        });
        url = url.replace('PublicKey', 'key')
        console.log(url, url);
        const {
            PlaidLinkUri,
        } = this.props;

        let baseUri = PlaidLinkUri ? PlaidLinkUri : 'https://cdn.plaid.com/link/v2/stable/link.html';
        let uri = baseUri + url
        console.log('uri', uri)
        const injectedJavascript = `(function() {
      window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };
})()`
        return (
            <WebView
                injectedJavaScript={injectedJavascript}
                ref={this.props.plaidRef}
                source={{ uri }}
                onMessage={e => this.onMessage(e)}
                onLoad={this.onLoad}
                useWebKit
                isWebview={true}
            />
        );
    }

    onMessage = e => {
        let data = JSON.parse(e.nativeEvent.data)
        let theaction = data.action

        if (theaction) {
            theaction = theaction.split("::")
            let key = theaction[1]
            let f = this.Actions.get(key)
            if(typeof(f) == "function"){f(data)}
            else {this.sendMessage(data)}
        }else(this.sendMessage(data))
    };

    sendMessage = data => {
        if (this.props.onMessage) {
            this.props.onMessage(data);
        }
    }

    plaidRef = () => {
        console.log('plaidRef')
        if(this.props.onPlaidRef)this.props.onPlaidRef()
    }
}

Plaid.propTypes = {
    PublicKey: PropTypes.string.isRequired,
    env: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    clientName: PropTypes.string,
    webhook: PropTypes.string,
    onMessage: PropTypes.func,
    onPlaidRef: PropTypes.func,
    onLoad: PropTypes.func,
    onSuccess: PropTypes.func,
    onExit: PropTypes.func,
    onEvent: PropTypes.func,
};

Plaid.defaultProps = {
    clientName: 'Plaid Client',
//  plaidRef: () => {}
};

export default Plaid;