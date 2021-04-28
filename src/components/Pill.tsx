import styled from 'styled-components';

const Pill = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7ff;
  color: #0e103c;
  font-family: 'Gilroy';
  font-weight: ${(props) => props.theme.fontWeights.semiBold};
  font-size: 16px;
  line-height: 19px;
  border: 1px solid #f7f7ff;
  border-radius: 72px;
  padding: 0 18px;
  height: 38px;
`;

export { Pill };
