export type modalProp = {
  isShown: boolean;
  hide: () => void;
  bodyContent: JSX.Element;
  headerContent: JSX.Element;
  footerContent?: JSX.Element;
  videoURL?: string;
};
