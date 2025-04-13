import { toast } from 'react-toastify';

export const post = async ({
  url,
  data,
  needToken = true,
  acceptJson = true
}: {
  url: string;
  data?: any;
  needToken?: boolean;
  acceptJson?: boolean;
}): Promise<{ statusCode: number; content?: any }> => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: needToken ? `Bearer ${localStorage.getItem('token')}` : undefined
  };
  const config = {
    method: 'post',
    headers: headers,
    body: undefined
  };
  if (data) config.body = JSON.stringify(data);

  const rawResponse = await fetch(url, config);
  if (rawResponse.status === 201 || rawResponse.status === 204)
    return { statusCode: rawResponse.status, content: null };
  if (rawResponse.status === 401) {
    window.localStorage.removeItem('toke');
    toast('توکن شما منقضی شده است و باید مجدد لاگین کنید', { type: 'error' });
    window.location.href = '/login';
    return { statusCode: 401 };
  }
  if (rawResponse.status === 500) {
    toast('خطایی به وجود آمده است', { type: 'error' });
    return { statusCode: 500 };
  }
  const content = acceptJson
    ? await rawResponse.json()
    : await rawResponse.text();

  if (rawResponse.status === 400) {
    if (content?.fields) {
      Object.keys(content?.fields).forEach((key) => {
        toast(key + ': ' + content?.fields[key], { type: 'error' });
      });
    } else if (content?.detail) toast(content?.detail, { type: 'error' });
    else if (content?.msg) toast(content?.msg, { type: 'error' });
  }
  return { statusCode: rawResponse.status, content: content };
};

export const put = async ({
  url,
  data,
  needToken = true,
  acceptJson = true
}: {
  url: string;
  data?: any;
  needToken?: boolean;
  acceptJson?: boolean;
}): Promise<{ statusCode: number; content?: any }> => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: needToken ? `Bearer ${localStorage.getItem('token')}` : undefined
  };
  const config = {
    method: 'put',
    headers: headers,
    body: undefined
  };
  if (data) config.body = JSON.stringify(data);

  const rawResponse = await fetch(url, config);
  if (rawResponse.status === 201 || rawResponse.status === 204)
    return { statusCode: rawResponse.status, content: null };
  if (rawResponse.status === 401) {
    window.localStorage.removeItem('toke');
    toast('توکن شما منقضی شده است و باید مجدد لاگین کنید', { type: 'error' });
    window.location.href = '/login';
    return { statusCode: 401 };
  }
  if (rawResponse.status === 500) {
    toast('خطایی به وجود آمده است', { type: 'error' });
    return { statusCode: 500 };
  }
  const content = acceptJson
    ? await rawResponse.json()
    : await rawResponse.text();

  if (rawResponse.status === 400) {
    if (content?.fields) {
      Object.keys(content?.fields).forEach((key) => {
        toast(key + ': ' + content?.fields[key], { type: 'error' });
      });
    } else if (content?.detail) toast(content?.detail, { type: 'error' });
    else if (content?.msg) toast(content?.msg, { type: 'error' });
  }
  return { statusCode: rawResponse.status, content: content };
};

export const remove = async ({ url, data }: { url: string; data?: any }) => {
  const config = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: undefined
  };
  if (data) config.body = JSON.stringify(data);

  const rawResponse = await fetch(url, config);
  if (rawResponse.status === 500)
    toast('خطایی به وجود آمده است', { type: 'error' });

  return { statusCode: rawResponse.status };
};

export const get = async ({
  url,
  needToken = true,
  acceptJson = true
}: {
  url: string;
  needToken?: boolean;
  acceptJson?: boolean;
}): Promise<{ statusCode: number; content?: any }> => {
  const headers = {
    Accept: 'application/json',
    Authorization: needToken ? `Bearer ${localStorage.getItem('token')}` : undefined
  };
  const config = {
    method: 'get',
    headers: headers
  };

  const rawResponse = await fetch(url, config);
  if (rawResponse.status === 401) {
    window.localStorage.removeItem('toke');
    toast('توکن شما منقضی شده است و باید مجدد لاگین کنید', { type: 'error' });
    window.location.href = '/login';
    return { statusCode: 401 };
  }
  if (rawResponse.status === 500) {
    toast('خطایی به وجود آمده است', { type: 'error' });
    return { statusCode: 500 };
  }
  const content = acceptJson
    ? await rawResponse.json()
    : await rawResponse.text();

  return { statusCode: rawResponse.status, content: content };
};
