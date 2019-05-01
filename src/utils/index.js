const md5 = require('js-md5');

const generateMatchId = (id1, id2) => md5(`${id1}+${id2}`);

export { generateMatchId };
