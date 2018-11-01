import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme';
import Navbar from './Navbar';
import { logoutUser } from '../actions/authentication';
import { getPosts } from '../actions/postActions'
// import store from '../store'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('<Navbar>', () => {
    let wrapper;

    const store = { 
        subscribe: () => {},
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
    }
    
    beforeEach(()=>{ 
        wrapper = shallow(<Navbar store={store}/>).dive();
    })

    it('just test on exist component', () => {
        expect(wrapper.length).toEqual(1)
    });

});