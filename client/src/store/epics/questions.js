// npm packages
import {Observable} from 'rxjs/Observable';
import {push} from 'react-router-redux';

// our packages
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {signRequest, genericErrorToMessage} from '../../util/signRequest';

export const getAllQuestions = action$ => action$
  .ofType(ActionTypes.GET_ALL_QUESTIONS)
  .map(signRequest)
  .switchMap(({headers}) => Observable
    .ajax.get(`${API_HOST}/api/question`, headers)
    .map(res => res.response)
    .map(questions => ({
      type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS,
      payload: {questions},
    }))
    .catch(error => Observable.of({
      type: ActionTypes.GET_ALL_QUESTIONS_ERROR,
      payload: {error},
    })));

export const answerQuestion = action$ => action$
  .ofType(ActionTypes.ANSWER_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`${API_HOST}/api/question/${payload.question.id}/answer`, {answer: payload.answer}, headers)
    .map(res => res.response)
    .map(question => ({
      type: ActionTypes.ANSWER_QUESTION_SUCCESS,
      payload: question,
    }))
    .concat(Observable.of(Actions.addNotificationAction({
      text: 'Answer created with success!',
      alertType: 'info',
    })))
    .catch(error => Observable.of(
      {
        type: ActionTypes.ANSWER_QUESTION_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction({text: genericErrorToMessage(error), alertType: 'danger'}),
    )));

export const createQuestion = action$ => action$
  .ofType(ActionTypes.CREATE_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`${API_HOST}/api/question/`, payload, headers)
    .map(res => res.response)
    .mergeMap(question => Observable.merge(
      Observable.of(
        {
          type: ActionTypes.CREATE_QUESTION_SUCCESS,
          payload: question,
        },
        Actions.addNotificationAction({
          text: 'Question created with success!',
          alertType: 'info',
        }),
      ),
      Observable.timer(0)
        .map(() => (push('/')))
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.CREATE_QUESTION_ERROR,
        payload: {
          error,
        },
      },
      Actions.addNotificationAction({text: genericErrorToMessage(error), alertType: 'danger'}),
    )));

export const deleteQuestion = action$ => action$
  .ofType(ActionTypes.DELETE_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.delete(`${API_HOST}/api/question/${payload.id}`, headers)
    .map(res => res.response)
    .map(() => ({
      type: ActionTypes.DELETE_QUESTION_SUCCESS,
      payload,
    }))
    .concat(Observable.of(Actions.addNotificationAction({
      text: 'Question deleted with success!',
      alertType: 'info',
    })))
    .catch(error => Observable.of(
      {
        type: ActionTypes.DELETE_QUESTION_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction({text: genericErrorToMessage(error), alertType: 'danger'})
    )));

export const updateQuestion = action$ => action$
  .ofType(ActionTypes.UPDATE_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`${API_HOST}/api/question/${payload.id}`, payload, headers)
    .map(res => res.response)
    .map(question => ({
      type: ActionTypes.UPDATE_QUESTION_SUCCESS,
      payload: question,
    }))
    .concat(Observable.of(Actions.addNotificationAction({
      text: 'Question updated with success!',
      alertType: 'info',
    })))
    .catch(error => Observable.of(
      {
        type: ActionTypes.UPDATE_QUESTION_ERROR,
        payload: {
          error,
        },
      },
      Actions.addNotificationAction({text: genericErrorToMessage(error), alertType: 'danger'}),
    )));
