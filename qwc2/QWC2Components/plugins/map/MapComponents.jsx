/**
* Copyright 2016, GeoSolutions Sas.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree.
*/

const React = require('react');
const {connect} = require('react-redux');
const assign = require('object-assign');

const {changeMapView, clickOnMap} = require('../../actions/map');
const {setLayerLoading} = require('../../actions/layers');
const {changeMousePositionState} = require('../../actions/mousePosition');


const Map = connect((state) => ({
    trackMousePos: state.mousePosition.enabled || false
}), {
    onMapViewChanges: changeMapView,
    onClick: clickOnMap,
    onMouseMove: changeMousePositionState,
    setLayerLoading: setLayerLoading
})(require('../../../MapStore2Components/components/map/openlayers/Map'));

module.exports = {
    Map: Map,
    Layer: require('../../../MapStore2Components/components/map/openlayers/Layer'),
    Feature: require('../../../MapStore2Components/components/map/openlayers/Feature')
};
