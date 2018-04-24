import md5 from 'js-md5';

const URL       = 'https://uxcandy.com/~shapoval/test-task-backend';
const DEVELOPER = 'developer=Name';

export const getTasks = async (page, sortField, sortDirection) => {
  try {
    const response = await fetch(
      `${URL}/?${DEVELOPER}&page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`
    );
    const body = await response.json();

    if (body.status !== 'ok') {
      throw Error(body.message);
    }

    return body.message;
  } catch (err) {
    throw Error(err.message);
  }
}

export const createTask = async (task) => {
  try {
    // const data = {
    //   username: 'another test',
    //   email: 'test@emailzz.com',
    //   text: 'test text',
    //   image,
    // };

    let formData  = new FormData();

    for (let name in task) {
      formData.append(name, task[name]);
    }

    const response = await fetch(`${URL}/create?${DEVELOPER}`, {
      method: 'POST',
      body: formData
    });

    const body = await response.json();

    if (body.status !== 'ok') {
      throw Error(body.message);
    }
  } catch (err) {
    throw Error(err.message);
  }
}

export const editTask = async ({ id, text, status }) => {
  try {
    const params_string = `status=${status}&text=${encodeURIComponent(text)}&token=beejee`;
    const data = {
      token: 'beejee',
      text,
      status,
      signature: md5(params_string),
    };

    let formData  = new FormData();

    for(let name in data) {
      formData.append(name, data[name]);
    }

    const response = await fetch(`${URL}/edit/${id}?${DEVELOPER}`, {
      method: 'POST',
      body: formData
    });

    const body = await response.json();

    if (body.status !== 'ok') {
      throw Error(body.message);
    }

    return body;
  } catch (err) {
    throw Error(err.message);
  }
}