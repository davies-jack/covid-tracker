import styled from 'styled-components'

export const AppContainer = styled.div`
  max-width: 70vw;
  margin: 0 auto;

  @media(max-width: 1024px) {
    max-width: 90vw;
  }
  @media(max-width: 768px) {
    max-width: 95vw;
  }
`;
export const Header = styled.div`
  padding: 2em 0;
  h1 {
    margin: 0;
  }
`;