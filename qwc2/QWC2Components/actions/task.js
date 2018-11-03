/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
const SET_CURRENT_TASK_BLOCKED = 'SET_CURRENT_TASK_BLOCKED';
const {setIdentifyEnabled} = require('./identify');

function setCurrentTask(task, mode=null, allowIdentify=false) {
    return (dispatch, getState) => {
        // Don't do anything if current task is blocked
        if(getState().task && getState().task.blocked === true) {
            return;
        }
        dispatch(setIdentifyEnabled(task === null || task === 'LayerTree'));
        dispatch({
            type: SET_CURRENT_TASK,
            id: task,
            mode: mode
        });
    }
}

function setCurrentTaskBlocked(blocked) {
    return {
        type: SET_CURRENT_TASK_BLOCKED,
        blocked
    }
}

module.exports = {
    SET_CURRENT_TASK,
    SET_CURRENT_TASK_BLOCKED,
    setCurrentTask,
    setCurrentTaskBlocked
}
