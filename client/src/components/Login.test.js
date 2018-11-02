import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { loginUser } from '../actions/authentication';

import Login, { mapStateToProps } from './Login';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('<Login>', () => {
    let wrapper, store, wrapperDive;

    const mockLoginfn = jest.fn();
    
    const initialState = {
      auth: {
        isAuthenticated: false
      },
      errors: {

      }
    }
    
    
    beforeEach(()=>{ 
        store = mockStore(initialState)
        wrapper = shallow(<Login store={store} />).dive();
    });

    it('mapStateToProps', () => {
      expect(mapStateToProps(initialState).auth).toEqual({ isAuthenticated: false });
    })

    it('snapshot', () => {
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    });




});