import {combineReducers} from 'redux';

import matches from './matches';
import user from './user'

export default combineReducers({matches:matches,user:user});