import * as actions from './postActions';
import * as types from './types';
import axios from 'axios';

jest.mock('axios');

describe('async actions', () => {
  afterEach(() => {
    axios.mockReset();
  });

  // Я немного поправил тест, посмотри все ли тебе понятно и попробуй протестировать action sendPost
  describe('getPosts action', () => {
    it('should make request and dispatch action', async () => {
      const dispatch = jest.fn();
      axios.get.mockResolvedValue({ data: 'posts' });

      await actions.getPosts()(dispatch);
      expect(axios.get).toHaveBeenCalledWith('/api/form/posts');
      expect(dispatch).toHaveBeenCalledWith({
        type: types.POST_FORM,
        payload: 'posts'
      });
    });
  });

  describe('sendPosts action', () => {
    it('should make request and dispatch action', async () => {
        // Диспатчер
        const dispatch = jest.fn();
        // Массив отправим на сервер
        const data = []
        // Сам запрос с параметром post
        // mockResolvedValue - функция с положительным ответом Promise 
        axios.post.mockResolvedValue({ data: 'post' });
        // await ожидает разрешения Promise
        // Далее вызываем функцию sendPost с аргументом data
        await actions.sendPost(data)(dispatch);
        // Наш запрос должен быть с двумя аргументами
        // Url запроса и массив с обьектами
        expect(axios.post).toHaveBeenCalledWith('/api/form/post', data);
        // Вызвайный диспачер должен иметь обьект
        // первое это тип обычная константа SEND POST
        // второе это payload то есть полученные данные 
        expect(dispatch).toHaveBeenCalledWith({
            type: types.SEND_POST,
            payload: 'post'
        });
    });
  });
  
});
