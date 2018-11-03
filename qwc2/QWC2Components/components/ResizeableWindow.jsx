/**
 * Copyright 2017, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const classnames = require('classnames');
const Rnd = require('react-rnd').default
const Message = require('../../MapStore2Components/components/I18N/Message');
const Icon = require('./Icon');
require('./style/ResizeableWindow.css');

class ResizeableWindow extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        icon: PropTypes.string,
        icon: PropTypes.string,
        onClose: PropTypes.func,
        scrollable: PropTypes.bool,
        initialX: PropTypes.number,
        initialY: PropTypes.number,
        initialWidth: PropTypes.number,
        initialHeight: PropTypes.number,
        minWidth: PropTypes.number,
        minHeight: PropTypes.number,
        maxWidth: PropTypes.number,
        maxHeight: PropTypes.number,
        extraControls: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string.isRequired,
            callback: PropTypes.func.isRequired
        })),
        padding: PropTypes.string
    }
    static defaultProps = {
        icon: null,
        icon: null,
        initialX: null,
        initialY: null,
        initialWidth: 240,
        initialHeight: 320,
        minWidth: 50,
        minHeight: 50,
        maxWidth: null,
        maxHeight: null,
        onClose: () => {},
        scrollable: false,
        extraControls: null,
        padding: "0.25em"
    }
    renderRole = (role) => {
        return React.Children.toArray(this.props.children).filter((child) => child.props.role === role);
    }
    stopEvent = (ev) => {
        ev.stopPropagation();
    }
    onClose = (ev) => {
        this.props.onClose();
        ev.stopPropagation();
    }
    render() {
        let initial = {
            x: this.props.initialX !== null ? this.props.initialX : Math.max(0, Math.round(0.5 * (window.innerWidth - this.props.initialWidth))),
            y: this.props.initialY !== null ? this.props.initialY : Math.max(0, Math.round(0.5 * (window.innerHeight - this.props.initialHeight))),
            width: this.props.initialWidth,
            height: this.props.initialHeight
        };
        let icon = null;
        if(this.props.icon) {
            icon = (<Icon icon={this.props.icon} />);
        } else if(this.props.icon) {
            icon = (<img src={this.props.icon} />);
        }
        let bodyclasses = classnames({
            "resizeable-window-body": true,
            "resizeable-window-body-scrollable": this.props.scrollable
        });
        let bodystyle = {
            padding: this.props.padding
        };
        return (
            <div className="resizeable-window-container">
                <Rnd className="resizeable-window" bounds="parent" default={initial}
                    minWidth={this.props.minWidth} minHeight={this.props.minHeight}
                    maxWidth={this.props.maxWidth || window.innerWidth} maxHeight={this.props.maxHeight || window.innerHeight}>
                    <div className="resizeable-window-titlebar">
                        <span className="resizeable-window-titlebar-icon">
                            {icon}
                        </span>
                        <span className="resizeable-window-titlebar-title">
                            <Message msgId={this.props.title} />
                        </span>
                        {(this.props.extraControls || []).map(entry => (
                            <Icon key={entry.icon} className="resizeable-window-titlebar-control" onClick={entry.callback} icon={entry.icon}/>
                        ))}
                        <Icon className="resizeable-window-titlebar-control" onClick={this.onClose} icon="remove"/>
                    </div>
                    <div style={bodystyle} className={bodyclasses} onMouseDown={this.stopEvent} onMouseUp={this.stopEvent} onTouchStart={this.stopEvent}>
                        {this.renderRole("body")}
                    </div>
                </Rnd>
            </div>
        );
    }
};

module.exports = ResizeableWindow;
