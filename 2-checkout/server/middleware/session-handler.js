const { v4: uuidv4 } = require('uuid');

module.exports = (request, response, next) => {
  /**
   *
   * Parse cookies in incoming request:
   *
   */

  let cookieString = request.get('Cookie') || '';

  const parsedCookies = cookieString.split('; ').reduce((cookies, cookie) => {
    if (cookie.length) {
      let index = cookie.indexOf('=');
      let key = cookie.slice(0, index);
      let token = cookie.slice(index + 1);
      cookies[key] = token;
    }
    return cookies;
  }, {});

  if (parsedCookies.session_id) {
    request.session_id = parsedCookies.session_id;
  } else {
    request.session_id = uuidv4();
    response.cookie('session_id', request.session_id, {
      sameSite: 'Lax',
      secure: true
    });
  }

  next();
};
