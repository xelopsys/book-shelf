import CryptoJs from 'crypto-js';

const hash = ({
  method,
  path,
  body,
  secret,
}: {
  method: string;
  path: string;
  body?: Record<string, any>;
  secret: string;
}) => {
  const hash = CryptoJs.MD5(
    `${method}${path}${JSON.stringify(body) || ''}${secret}`
  ).toString();
  return hash;
};

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

export { classNames, hash };
