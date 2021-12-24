import {
    DATA_POOL_LIST_REQUEST, 
    DATA_POOL_LIST_SUCCESS, 
    DATA_POOL_LIST_FAIL,
    DATA_POOL_LIST_RESET, 
    
    DATA_POOL_INSERT_REQUEST,
    DATA_POOL_INSERT_SUCCESS, 
    DATA_POOL_INSERT_FAIL, 
    
    DATA_POOL_DELETE_REQUEST, 
    DATA_POOL_DELETE_SUCCESS, 
    DATA_POOL_DELETE_FAIL, 
    
    DATA_POOL_UPDATE_REQUEST, 
    DATA_POOL_UPDATE_SUCCESS, 
    DATA_POOL_UPDATE_FAIL, 
    DATA_POOL_UPDATE_RESET, 
    } from '../constants/dataPoolConstants.js'

    export const dataListReducer = (state = { orders: []}, action ) => {
        switch(action.type){
            case DATA_POOL_LIST_REQUEST:
                return {
                    loading: true,
                }
            case DATA_POOL_LIST_SUCCESS:
                return {
                    loading: false,
                    displayData: action.payload,
                }
            case DATA_POOL_LIST_FAIL:
                return {
                    loading: false,
                    error: action.payload,
                }
            case DATA_POOL_LIST_RESET:
                return {orders: []}
            default:
                return state
        }
    }