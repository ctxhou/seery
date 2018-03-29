exports.secondsToHourMin = (second) => {
  let res = [];
  second = Number(second);

  const h = Math.floor(second / 3600);
  const m = Math.floor(second % 3600 / 60);
  const s = Math.floor(second % 3600 % 60);
  res = h ? [...res, `${h} ${h === 1 ? `hr` : `hrs`}`] : res;
  res = m ? [...res, `${m} ${m === 1 ? `min` : `mins`}`] : res;
  res = s ? [...res, `${s} ${s === 1 ? `sec` : `secs`}`] : res;
  return res.join(' ');
};
