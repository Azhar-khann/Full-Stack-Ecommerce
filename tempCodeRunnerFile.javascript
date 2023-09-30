const crypto = require('crypto');

const googleId = '112814385211037693989';

const hashedId = crypto.createHash('sha256').update(googleId).digest('hex');

console.log(hashedId);
