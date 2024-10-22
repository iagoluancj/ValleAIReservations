import styled from "styled-components";

// A principio, ainda seguindo o foco de visualização dos dados, deixei a responsividade em segundo plano enquanto a concepção
// da aplicação era realizada. 
// Contudo, para agregar valor, e como um ponto muito importante, irei implementar a responsividade na aplicação durante o dia de hoje.

export const TableContainer = styled.div`
  width: 100%;
  height: 620px;
  position: relative;


    @media (max-width: 1048px) {
      overflow-x: scroll;
    }
`

export const Tables = styled.div`
    margin-top: 2rem;
    padding: 2;
    position: absolute; 
    overflow: auto;
    border-radius: 20px;

    img {
        width: 1000px;
        border-radius: 15px;
        background-position: center;
    }

    .table-area {
        position: absolute;
        border: 2px solid rgba(0, 0, 0, 0.5);
        cursor: pointer;
        background: rgba(255, 255, 255, 0.2);
        transition: background-color 0.3s ease;
        transition: .2s ease-out;

        &:hover {
            background: #15ff0050;
            transform: scale(1.05);
            transition: .5s ease;
        }

        span {
            width: 50px;
            height: 70px;
            background-color: #444444;
            border-radius: 20%;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
                p {
                  font-weight: 500;
                  font-size: 30px;
                  color: #fff;
                  margin: 0;
                  padding: 0;
                }
        }
    }
`;

export const NameTable = styled.p`
  font-size: 12px !important;
  font-weight: 300 !important;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;  
    }
`

export const FormDiv = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;
`

const FormHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Logo = styled.div`
  color: #fff;
  font-family: 'Poppins', sans-serif;

  img {
    width: 150px;
  }
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #000000;
  font-weight: bold;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #00000080;
`;

export const ButtonSubmit = styled.button`
  margin-top: 1rem;
  width: 100%;
  padding: .5rem;
  font-size: 18px;
  font-weight: 600;
  border-radius: 7px;
  background: linear-gradient(135deg, #f8c4a1, #e79675);
  color: #fff;
  border: 1px solid transparent;
  box-shadow: 1px 1px 10px 1px rgb(0, 0, 0, .3);

  transition: .4s ease-out;

  &:hover {
    border: 1px solid #e79675;
    background: linear-gradient(135deg, #f8c4a100, #e7967500);
    color: #e79675;
    transform: scale(1.01);
    cursor: pointer;

    transition: .4s ease-out;
  }
`;

export { FormContainer, FormHeader };
