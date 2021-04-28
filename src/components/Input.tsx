import styled from 'styled-components';

export interface InputProps {
  hasError?: boolean;
  surroundingBgColor?: 'light' | 'dark';
}

const StyledInput = styled.input<InputProps>`
  height: 60px;
  width: 100%;
  background: ${(props) =>
    props.surroundingBgColor === 'dark' ? '#ffffff' : '#f6f6f9'};
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.hasError ? '#FF656D' : 'transparent')};
  box-shadow: ${(props) =>
    props.surroundingBgColor === 'dark'
      ? `0px 2px 2px 0px #0E103C 7% inset, 0px -1px 1px 0px #0E103C 20%`
      : `0px 2px 2px 0px #0E103C 7% inset, 0px -1px 1px 0px #0E103C 20%`};
  border-radius: 9px;
  font-family: 'Gilroy';
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #0e103c;
  padding-left: 15px;
  padding-right: 2px;
  outline: none;
  will-change: border, box-shadow, opacity;
  transition: border, 0.15s ease-in, box-shadow, 0.15s ease-out;
  :hover {
    border: 1px solid ${(props) => (props.hasError ? '#FF656D' : '#D4D4E2')};
    box-shadow: ${(props) =>
      props.surroundingBgColor === 'dark'
        ? `inset 0px 2px 2px rgba(4, 8, 106, 0.07)`
        : `0px 0px 1px rgba(14, 16, 60, 0.2), inset 0px 2px 2px rgba(4, 8, 106, 0.07)`};
  }
  :focus {
    border: 1px solid ${(props) => (props.hasError ? '#FF656D' : '#706eff')};
    box-shadow: ${(props) =>
      props.surroundingBgColor === 'dark'
        ? `0px 2px 2px 0px #0E103C 7% inset, 0px -1px 1px 0px #0E103C 20%`
        : `0px 2px 2px 0px #0E103C 7% inset, 0px -1px 1px 0px #0E103C 20%`};
  }
  ::placeholder {
    color: #0e103c;
    opacity: 0.6;
  }
`;

export { StyledInput as Input };
