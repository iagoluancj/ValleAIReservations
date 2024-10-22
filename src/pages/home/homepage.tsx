import { Logo } from "../../components/Form/styles";
import { ForgotPassword, Formu, LoginContainer, PageWrapper, SeparatorLogin, SubmitButton, Subtitle, Title, TitleContainer } from "./styles";
import logoValleAI from '../../assets/logoValle.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
            navigate('/reservations'); 
        }, 2000);  
    };

    return (
        <>
            <PageWrapper>
                <SeparatorLogin>
                    <LoginContainer>
                        <TitleContainer>
                            <Logo>
                                <img alt='Logo' src={logoValleAI} />
                            </Logo>
                            <Title>Bem-vindo(a)</Title>
                            <Subtitle>Insira seu email para acessar</Subtitle>
                        </TitleContainer>

                        <Formu onSubmit={handleSubmit}>
                            <input
                                placeholder="E-mail"
                                type="text"
                                name="email"
                                required
                            />
                            {/* {message && <ErrorMessage $typeMessage={typeMessage}>{message}</ErrorMessage>} */}
                            <SubmitButton type="submit" disabled={loading}>
                                {loading ? "Acessando..." : "Acessar"}
                            </SubmitButton>
                        </Formu>

                        <ForgotPassword target="_blank" href="https://www.linkedin.com/in/iagoluancj">Falha ao acessar?</ForgotPassword>
                    </LoginContainer>
                </SeparatorLogin>
                {/* <DivLogin>
                </DivLogin> */}
            </PageWrapper>

        </>
    );
};

export default HomePage;
