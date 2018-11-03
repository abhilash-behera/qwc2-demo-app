/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const {connect} = require('react-redux');
const Message = require('../../MapStore2Components/components/I18N/Message');
const LocaleUtils = require("../../MapStore2Components/utils/LocaleUtils");
const {setCurrentTask} = require('../actions/task')
const Icon = require('./Icon');
require('./style/Toolbar.css');

class Toolbar extends React.Component {
    static propTypes = {
        toolbarItems: PropTypes.array,
        setCurrentTask: PropTypes.func,
        currentTask: PropTypes.string,
        currentTaskMode: PropTypes.string,
        currentTheme: PropTypes.object
    }
    static contextTypes = {
        messages: PropTypes.object
    }
    renderToolbarItem = (item) => {
        if(item.themeWhitelist && !item.themeWhitelist.includes(this.props.currentTheme.title)) {
            return null;
        }
        let active = this.props.currentTask == item.key && this.props.currentTaskMode == item.mode;
        let title = LocaleUtils.getMessageById(this.context.messages, "appmenu.items." + item.key) || null;
        return (
            <Icon
                key={item.key + item.mode}
                className={active ? "toolbar-item-active" : ""}
                icon={item.icon}
                onClick={active ? () => this.props.setCurrentTask(null) : () => this.props.setCurrentTask(item.key, item.mode)}
                title={title}
                size="xlarge"
            />
        );
    }
    render() {
        return (
            <span id="Toolbar">
                {this.props.toolbarItems.map(this.renderToolbarItem)}
            </span>
        );
    }
};

module.exports = connect((state) => ({
    currentTask: state.task ? state.task.id : "",
    currentTaskMode: state.task ? state.task.mode : "",
    currentTheme: state.theme.current || {}
}), {
    setCurrentTask: setCurrentTask,
})(Toolbar);
