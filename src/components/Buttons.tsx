import styled from 'styled-components';
import { BaseButton } from './BaseButton';

const MatchaPrimaryButton = styled(BaseButton)`
  width: 100%;
  height: 60px;
  background: #706eff;
  box-shadow: 0px 1px 2px #0f0e39, inset 0px 4px 9px rgba(255, 255, 255, 0.25);
  border-radius: 13px;
  outline: none;
  font-weight: bold;
  font-style: normal;
  font-family: 'Gilroy';
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  transition: all 0.15s ease-in;
  will-change: transform, background-color, box-shadow;
  cursor: pointer;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    background-color: #dfdff1;
    box-shadow: inset 0px 4px 9px rgba(255, 255, 255, 0.25);
    color: #5f5e89;
    cursor: not-allowed;
  }
  /* also focus ?? */
  :hover:not(:disabled) {
    transform: scale(0.98), translateY(-2px);
  }
`;

const MatchaSecondaryButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid #e8ecfd;
  box-shadow: inset 0px 4px 9px rgba(255, 255, 255, 0.25);
  border-radius: 13px;
  outline: none;
  font-weight: bold;
  font-style: normal;
  font-family: 'Gilroy';
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #706eff;
  transition: all 0.15s ease-in;
  will-change: transform, background-color, box-shadow;
  cursor: pointer;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    box-shadow: inset 0px 4px 9px rgba(255, 255, 255, 0.25);
    cursor: not-allowed;
  }
  :hover:not(:disabled) {
    transform: scale(0.98), translateY(-2px);
  }
`;

export { MatchaPrimaryButton, MatchaSecondaryButton };
