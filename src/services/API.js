import axios from 'axios';
import { Message, xwwwfurlenc, getItem } from './index';
import CookieManager from 'react-native-cookies';

export const API_URL = 'https://backend.edelweiss.id/api/';
export const IMAGE_URL = 'https://digispace.id/images/';
export const EMPTY_USER_IMAGE = 'https://digispace.id/assets/no_pic.png';
export const EMPTY_IMAGE = 'https://digispace.id/assets/empy_image.png';

export function clearCookie() {
  return new Promise((response, reject) => {
    CookieManager.clearAll()
      .then((res) => {
        console.log('CookieManager.clearAll =>', res);
        response(res);
      })
      .catch((err) => console.log(err));
  });
}

export function PostLogin(url, form) {
  CookieManager.clearAll().then((res) => {
    console.log(`Clear Cookie ${url} =>`, res);
  });
  return new Promise((response, reject) => {
    fetch(`${API_URL}${url}`, {
      method: 'POST',
      body: xwwwfurlenc(form),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: null,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        response(res);
      })
      .catch((error) => {
        reject(error.response);
      });

    // axios
    //   .post(`${API_URL}${url}`, xwwwfurlenc(form), {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       Cookie: null,
    //     },
    //   })
    //   .then((res) => {
    //     console.warn('res', res);
    //     response(res);
    //   }) // promise
    //   .catch((error) => {
    //     reject(error.response);
    //   });
  });
}

export function Post(url, form) {
  CookieManager.clearAll().then((res) => {
    console.log(`Clear Cookie ${url} =>`, res);
  });
  return new Promise((response, reject) => {
    getItem('code').then((res) => {
      let token = res.access_token;
      console.warn('url', token);
      axios
        .post(`${API_URL}${url}`, xwwwfurlenc(form), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            access_token: token,
            Cookie: null,
          },
        })
        .then((res) => {
          console.warn('encoded : ', res);
          response(res);
        }) // promise
        .catch((error) => {
          reject(error.response);
        });
    });
  });
}

export function Put(url, form) {
  CookieManager.clearAll().then((res) => {
    console.log(`Clear Cookie ${url} =>`, res);
  });
  return new Promise((response, reject) => {
    getItem('code').then((res) => {
      let token = res.access_token;
      // console.warn(`token admin`, token.toString());
      axios
        .put(`${API_URL}${url}`, xwwwfurlenc(form), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            access_token: token,
            Cookie: null,
          },
        })
        .then((res) => {
          response(res);
        }) // promise
        .catch((error) => {
          reject(error.response);
        });
    });
  });
}

export function Get(url) {
  var token = '';
  CookieManager.clearAll().then((res) => {
    console.log(`Clear Cookie ${url} =>`, res);
  });
  return new Promise((response, reject) => {
    getItem('code').then((res) => {
      token = res.access_token;
      //token = 's1AcCGzK9dK8kNak1FyN2Nx0HnCCeV';
      fetch(`${API_URL}${url}`, {
        method: 'GET',
        headers: {
          // access_token: 's1AcCGzK9dK8kNak1FyN2Nx0HnCCeV',
          access_token: token,
          Cookie: null,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          response(res);
        }) // promise
        .then((error) => {
          reject(error);
        });
    });
  });
}
