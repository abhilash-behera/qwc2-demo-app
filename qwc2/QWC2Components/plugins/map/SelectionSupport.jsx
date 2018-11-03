/**
* Copyright 2016, GeoSolutions Sas.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree.
*/

const {connect} = require('react-redux');
const {changeSelectionState} = require('../../../MapStore2Components/actions/selection');

module.exports = connect((state) => ({
    selection: state.selection || {}
}), {
    changeSelectionState
})(require('../../../MapStore2Components/components/map/openlayers/SelectionSupport'));
