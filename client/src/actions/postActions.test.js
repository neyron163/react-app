import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './postActions'
import * as types from './types'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
      afterEach(() => {
        fetchMock.restore()
    })
    it('POST_FORM', () => {
        fetchMock.getOnce('/api/form/posts', {
            body: { data: [] },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { payload: [], type: types.POST_FORM },
          ]

        const store = mockStore({ data: [] })

        return store.dispatch(actions.getPosts()).then(() => {

            expect(store.getActions()).toEqual(expectedActions)
        
        })
    })

})