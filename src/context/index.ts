/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { Config, emptyConfig } from '../config';
import { NavigationState } from '../providers/navigation-provider';

export type ModalActionType = string;

export const ModalActionTypeOpen = 'open';
export const ModalActionTypeClose = 'close';

export type ModalListenerFn = (action: ModalActionType) => void;
export type UnlistenFn = () => void;

export type ModalType = string;
export const ModalTypeAddEvent: ModalType = 'addEvent';

export type ModalContextType = {
  contents: React.ReactNode;
  isShowing: boolean;
  show: () => void;
  hide: () => void;
  setContents: (
    type: ModalType,
    contents: React.ReactNode,
    show?: boolean
  ) => void;
  addListener: (type: ModalType, fn: ModalListenerFn) => UnlistenFn;
};

export type AppContextType = {
  roles: {
    data: {
      [roleName: string]: {
        data: boolean;
        loading: boolean;
      };
    };
    fetch: (roleName: string) => Promise<boolean>;
    fetchRoles: () => Promise<void>;
  };
};

export const emptyAppContext = {
  roles: {
    data: {},
    fetch: async () => false,
    fetchRoles: async () => {},
  },
};

export const NavigationContext = createContext<NavigationState>({
  navigationItems: [],
  selectedID: null,
  showSignInButton: false,
  setShowSignInButton: () => {},
});

export const ConfigContext = createContext<Config>(emptyConfig);
export const ModalContext = createContext<ModalContextType>({
  contents: null,
  isShowing: false,
  show: () => {},
  hide: () => {},
  setContents: () => {},
  addListener: (type: ModalType, fn: ModalListenerFn) => () => {},
});

export const AppContext = createContext<AppContextType>(emptyAppContext);
