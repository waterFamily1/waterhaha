import ENV from '@src/config/env';
const CONTEXTPATH = (ENV === 'development' ? '/mango' : '');


export default CONTEXTPATH;