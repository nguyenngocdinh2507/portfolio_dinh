import { request } from './httpClient';

export function getCv() {
  return request('/api/cv');
}

export function saveCv(cv) {
  return request('/api/cv', {
    method: 'PUT',
    body: JSON.stringify(cv),
  });
}
