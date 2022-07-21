import { decodeCaseSensitiveClientID } from './util/id';

export type Web3Network = 'ethMainnet' | 'ethRinkeby';

const clientIDRegex = /^([^\\.]+)\.forms.ext\.slashauth\.xyz$/;

const FALLBACK_CLIENT_ID = 'W8SLanP5LEBUE6JU';

const extractClientID = () => {
  if (!window.location) {
    return FALLBACK_CLIENT_ID;
  }

  const match = window.location.host.match(clientIDRegex);
  if (match && match.length > 1) {
    return decodeCaseSensitiveClientID(match[1]);
  }

  return FALLBACK_CLIENT_ID;
};

export type FeatureFlags = {
  userManagementEnabled: boolean;
  organizationsEnabled: boolean;
};

export type Config = {
  appEndpoint: () => string;
  restDomain: string;
  appClientID: string;
  featureFlags: FeatureFlags;
};

export const emptyConfig: Config = {
  appEndpoint: () => '',
  restDomain: '',
  appClientID: '',
  featureFlags: {
    userManagementEnabled: true,
    organizationsEnabled: false,
  },
};

const localConfig: Config = {
  appEndpoint: () => 'http://localhost:3000',
  restDomain: 'http://localhost:8080',
  appClientID: extractClientID(),
  featureFlags: {
    userManagementEnabled: true,
    organizationsEnabled: true,
  },
};

const prodConfig: Config = {
  appEndpoint: () => `https://${extractClientID()}.forms.ext.slashauth.xyz`,
  restDomain: 'https://api.demo.slashauth.xyz',
  appClientID: extractClientID(),
  featureFlags: {
    userManagementEnabled: true,
    organizationsEnabled: true,
  },
};

const getConfig = (): Config => {
  if (process.env.REACT_APP_ENVIRONMENT === 'prod') {
    return prodConfig;
  } else {
    return localConfig;
  }
};

export { prodConfig, getConfig };
