import styled from '@emotion/styled';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--primary);

     .form-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
     }

    .page-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100vw;

        img{
            width: 50vw;
            height: 100vh;
            object-fit: cover;

            @media (max-width: 950px){
                display: none;
            }
        }
    }

        h1 {
    color: var(--text);
    text-shadow: 2px 2px 2px black;
    margin-top: 20px;
    @media (max-width: 950px){
            margin-top: 50px;
            margin-bottom: -50px;
            }

}

`;
export default StyledContainer;
