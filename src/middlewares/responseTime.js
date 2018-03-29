module.exports = (ctx, next) => {
  const start = new Date();
  return next(ctx).then(() => {
    const ms = new Date() - start;
    console.log('Response time %sms', ms);
  });
};
