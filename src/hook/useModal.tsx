import { useState } from 'react';

export function useModal() {
  const [isShow, setIsShow] = useState<boolean>(false);

  function toggleModal() {
    setIsShow(!isShow);
  }

  return {
    isShow,
    toggleModal,
  };
}
