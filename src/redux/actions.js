import {ADD_TASK, EDIT_TASK, GET_TASKS, MARK_TASK} from './types';
export function getTasks(tasks) {
  return {
    type: GET_TASKS,
    payload: tasks,
  };
}
export function addTask(task) {
  return {
    type: ADD_TASK,
    payload: task,
  };
}
export function editTask(task) {
  return {
    type: EDIT_TASK,
    payload: task,
  };
}
export function markTask(task) {
  return {
    type: MARK_TASK,
    payload: task,
  };
}
