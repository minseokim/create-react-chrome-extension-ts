import styled from 'styled-components';

interface QRProps {
  contents: string;
  image?: JSX.Element;
  positionCenterColor?: string;
  positionRingColor?: string;
  moduleColor?: string;
}

export const QRCode = (props: QRProps) => {
  return (
    <NormalizePosition>
      <pretty-qr-code
        contents={props.contents}
        module-color={props.moduleColor}
        position-center-color={props.positionCenterColor}
        position-ring-color={props.positionRingColor}
      >
        {props.image}
      </pretty-qr-code>
    </NormalizePosition>
  );
};

const NormalizePosition = styled.div`
  transform: translate3d(2.5px, 2.5px, 0);
`;
