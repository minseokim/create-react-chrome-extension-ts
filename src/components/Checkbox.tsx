import React from 'react';
import {
  CustomCheckboxContainer,
  CustomCheckboxInput,
  CustomCheckboxProps,
} from '@reach/checkbox';
import { CheckmarkIcon } from './icons/Checkmark';

function getContainerStyle() {
  return {
    background: '#E8ECFD',
    border: '1px solid #706EFF',
    borderRadius: '4px',
    height: 24,
    minHeight: 24,
    width: 24,
    minWidth: 24,
    cursor: 'pointer',
    userSelect: 'none' as 'none',
  };
}

function getCheckStyle(checked: boolean) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute' as 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    userSelect: 'none' as 'none',
    transform: `translate(-50%, -50%) scaleX(${!!checked ? 1 : 0}) scaleY(${
      checked === true ? 1 : 0
    })`,
    transition: 'transform 150ms ease-out, background 150ms ease-out',
    zIndex: 1,
    background: checked === true ? '#706EFF' : 'transparent',
  };
}

export interface MatchaCheckboxProps extends CustomCheckboxProps {
  checked: boolean;
}

const MatchaCheckbox: React.FC<MatchaCheckboxProps> = (props) => {
  const { onChange, ...rest } = props;
  const checked = props.checked;
  return (
    <CustomCheckboxContainer
      checked={props.checked != null ? props.checked : checked}
      onChange={props.onChange}
      style={getContainerStyle()}
    >
      <CustomCheckboxInput {...rest} />
      <span aria-hidden style={getCheckStyle(checked)}>
        <CheckmarkIcon />
      </span>
    </CustomCheckboxContainer>
  );
};

const MatchaCheckboxMemo = React.memo(MatchaCheckbox);

export { MatchaCheckboxMemo as Checkbox };
