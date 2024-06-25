import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  font-size: 3rem;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  
  height: 100dvh;
  background: linear-gradient(90deg, #000000 0%, #dfe0e2 100%);
`;



const Homepage = () => {
  return (
    <Wrapper>
        <div style={{color:"white"}}>JSONPLACEHOLDER API</div> 
    </Wrapper>
  )
}

export default Homepage;
