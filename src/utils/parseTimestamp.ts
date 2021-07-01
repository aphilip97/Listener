const parseTimestamp = (ts: string) => {

  const hour = '(?:(?:(?<hours>\\d+):)?';
  const min = '(?<minutes>0*[0-5]?\\d):)?';
  const sec = '(?<seconds>0*[0-5]?\\d)';
  const timestampRegex = new RegExp(
    `^${hour}${min}${sec}$`, 'm'
  );

  const matches = ts.match(timestampRegex);
  if (matches === null) {
    // Matched nothing, therefore it is an invalid timestamp
    throw new Error(`Failed to parse timestamp - ${ts}.`);
  }

  const groups = matches.groups ?? {};

  const {
    hours: h,
    minutes: m,
    seconds: s
  } = groups;

  const seconds = parseInt(s ?? '0');
  const minutes = parseInt(m?.split(':')[0] ?? '0');
  const hours = parseInt(h?.split(':')[0] ?? '0');

  return (hours * 60 * 60) + (minutes * 60) + seconds;

};

export { parseTimestamp };
