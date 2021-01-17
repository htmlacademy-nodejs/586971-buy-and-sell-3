'use strict';

module.exports = {
  DEFAULT_COMMAND: `--help`,
  USER_ARGV_INDEX: 1,
  MAX_ID_LENGTH: 6,
  MAX_COMMENTS: 4,
  ExitCode: {
    SUCCESS: 0,
    ERROR: 1
  },
  HttpCode: {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400
  }
};
