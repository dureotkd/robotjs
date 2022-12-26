// Type "Hello World" then press enter.
// const robot = require("robotjs");

/**
 * Apache combined log format.
 */

morgan.format(
  "combined",
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);

/**
 * Apache common log format.
 */

morgan.format(
  "common",
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
);

/**
 * Default format.
 */

morgan.format(
  "default",
  ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);

/**
 * Short format.
 */

morgan.format(
  "short",
  ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"
);

/**
 * Tiny format.
 */

morgan.format(
  "tiny",
  ":method :url :status :res[content-length] - :response-time ms"
);

const morgan = require("morgan");

/**
 * dev (colored)
 */

/**
 * dev (colored)
 */

morgan.format("dev", function developmentFormatLine(tokens, req, res) {
  // get the status code if response written
  var status = headersSent(res) ? res.statusCode : undefined;

  // get status color
  var color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 0; // no color

  // get colored function
  var fn = developmentFormatLine[color];

  if (!fn) {
    // compile
    fn = developmentFormatLine[color] = compile(
      "\x1b[0m:method :url \x1b[" +
        color +
        "m:status\x1b[0m :response-time ms - :res[content-length]\x1b[0m"
    );
  }

  return fn(tokens, req, res);
});

module.exports.morgan = morgan;
