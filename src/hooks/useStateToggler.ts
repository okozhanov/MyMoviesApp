import {useCallback, useState} from 'react';

export const useStateToggler = (
  initialState: boolean | (() => boolean),
  activeState = true,
  inactiveState = false,
): [boolean, AnyFunction, AnyFunction] => {
  const [state, setState] = useState(initialState);

  const setStateToActive = useCallback(() => {
    if (state !== activeState) {
      setState(activeState);
    }
  }, [activeState, state]);

  const setStateToInactive = useCallback(() => {
    if (state !== inactiveState) {
      setState(inactiveState);
    }
  }, [inactiveState, state]);

  return [state, setStateToActive, setStateToInactive];
};
