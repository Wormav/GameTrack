import styled from '@emotion/styled';

const StyledContainer = styled.div<{ $color: string }>`
   background-color: ${(props) => props.$color};
   width: 20px;
   height: 20px;
   border-radius: 15px;
`;

export default StyledContainer;
