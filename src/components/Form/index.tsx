import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Button, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { FormContainer, FormHeader, Logo, NameTable, Subtitle, Tables, Title, TitleContainer } from './styles';
import logoValle from '../../assets/logoValle.png'
import imageMesas from '../../assets/mesas.webp'
import { TypeReservations } from '../../types/types';
import { Box, Typography, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { CalenderContainer, Hours, SpanDisabled, SpanHour } from '../Calender/styles';
import { toast } from 'react-toastify';
import ConfirmModal from '../Modal';

function Form() {
  const [mesas, setMesas] = useState<{ id: number; capacity: number; style: React.CSSProperties, name: string }[]>([]);
  const [reservations, setReservations] = useState<TypeReservations[]>([]);

  // Modal para controle visual do usuário sob as ações de carregamento da aplicação
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [horarios, setHorarios] = useState<string[]>(['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
  const [selectedHorarios, setSelectedHorarios] = useState<string[]>([]);
  const [disabledHour, setDisabledHour] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    numPeople: '',
    dateHour: '',
  })

  const [errors, setErrors] = useState({ name: false, numPeople: false });

  const formatPhoneNumber = (value: string) => {
    let newValue = value.replace(/\D/g, '');

    if (newValue.length <= 10) {
      newValue = newValue
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      newValue = newValue
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return newValue;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validações do formulário.
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData({
        ...formData,
        phone: formattedPhone,
      });
    } else if (name === 'numPeople') {
      const numericValue = Number(value);
      if (numericValue >= 0 && numericValue <= 10) {
        setFormData({
          ...formData,
          numPeople: value,
        });
      }
    } else if (name === 'name') {
      const onlyLetters = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      setFormData({
        ...formData,
        name: onlyLetters,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Função para ajustar end_time ao padrões utilizados no sistema.
  function ajustarEndTime(selectedHorarios: string[]): string | null {
    if (selectedHorarios.length === 1) {
      let [hora, minuto] = selectedHorarios[0].split(':').map(Number);
      hora += 1;
      return `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:00`;
    } else if (selectedHorarios.length > 1) {
      let [hora, minuto] = selectedHorarios[selectedHorarios.length - 1].split(':').map(Number);
      hora += 1;
      return `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:00`;
    }
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setShowModal(true);

    //Função para ajustar o starttime aos padrões utilizados no sistema.
    function ajustarStartTime(selectedHorarios: string[]): string | null {
      if (selectedHorarios.length > 0) {
        const startTime = selectedHorarios[0];
        return startTime;
      }
      return null;
    }

    try {
      const formattedDate = selectedDate?.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '');

      const startTime = ajustarStartTime(selectedHorarios);

      const day = formattedDate?.slice(0, 2);
      const month = formattedDate?.slice(2, 4);
      const year = formattedDate?.slice(4, 8);

      // Conversão final antes de enviar para o backend.
      const finalDateTime = `${year}-${month}-${day}T${startTime}:00-03:00`;

      const retirarMascara = formData.phone.replace(/\D/g, '');

      //Envia post com os dados da reserva
      const reservationResponse = await fetch('https://bookingsystem-mblf.onrender.com/reservations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: retirarMascara,
          num_people: Number(formData.numPeople),
          datetime: finalDateTime
        }),
      });

      if (!reservationResponse.ok) {
        throw new Error('Erro ao criar reserva.');
      }

      const reservationData = await reservationResponse.json();
      const bookingId = reservationData.id;

      const endTime = ajustarEndTime(selectedHorarios);
      const endDateTime = `${year}-${month}-${day}T${endTime}-03:00`;

      // Com base no valor retornado pelo primeiro post, pega o ID da reserva e relaciona a mesa dentro da tabela de "bookedtables".
      const bookedTableResponse = await fetch('https://bookingsystem-mblf.onrender.com/bookedtables/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('admin:admin')}`,
        },
        body: JSON.stringify({
          end_date: endDateTime,
          booking_id: bookingId,
          mesa_id: selectedTable,
        }),
      });

      if (!bookedTableResponse.ok) {
        throw new Error('Erro ao criar relação mesa-reserva.');
      }

      console.log('Mesa reservada com sucesso.');
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
      setShowModal(false);
      console.log('Processo de reserva concluído.');
    }

    // Apresenta erros de acordo com a validação após enviar o submit. 
    const newErrors = {
      name: !formData.name.trim(),
      numPeople: !formData.numPeople.trim(),
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.numPeople) {

      // Para melhor compreensão do usuário, retorna o formulário para default.
      setFormData({
        dateHour: '',
        name: '',
        numPeople: '',
        phone: ''
      });
    }
  };

  // Controle visual do usuário em relação a mesa selecionada.
  const handleTableClick = async (id: number) => {
    if (selectedTable === id) {
      setSelectedTable(null);
    } else {
      setSelectedTable(id);
    }
  };

  // Controle sobre o valor de "data" do calendário do formulário.
  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate || new Date());
  };

  // Todo controle referente aos horários. 
  const handleClicked = (horario: string) => {
    if (disabledHour.includes(horario)) {
      toast.error("Este horário já está ocupado.");
      return;
    }

    const horarioIndex = horarios.indexOf(horario);
    const firstSelectedIndex = horarios.indexOf(selectedHorarios[0]);
    const lastSelectedIndex = horarios.indexOf(selectedHorarios[selectedHorarios.length - 1]);

    if (selectedHorarios.length >= 3 && !selectedHorarios.includes(horario)) {
      // Retorno visual para o usuário
      toast.error("Para marcar mais de 3 horários, entre em contato via telefone.");
      return;
    }

    if (selectedHorarios.includes(horario)) {
      const newSelectedHorarios = selectedHorarios.filter(h => h !== horario);
      setSelectedHorarios(newSelectedHorarios);
    } else {
      if (
        selectedHorarios.length === 0 ||
        horarioIndex === lastSelectedIndex + 1 ||
        horarioIndex === firstSelectedIndex - 1
      ) {
        setSelectedHorarios([...selectedHorarios, horario].sort((a, b) => horarios.indexOf(a) - horarios.indexOf(b)));
      } else {
        // Retorno visual para o usuário
        toast.error("Selecione apenas horários consecutivos.");
      }
    }

  };

  useEffect(() => {
    if (!mesas || mesas.length === 0) {
      const fetchMesas = async () => {
        try {
          const response = await fetch('https://bookingsystem-mblf.onrender.com/seats/');
          const data = await response.json();

          // Estilização manual com base no ID de cada mesa.
          // A principio decidi deixar dessa forma, para melhor visualiação durante o desenvolvimento e até que o MVP fosse totalmente definido
          // após isso, integrar uma solução de melhor escalabilidade para interface visual sobre as mesas. 
          const mesasComStyle = data.map((mesa: any) => {
            let style = {};
            switch (mesa.id) {
              case 1:
                style = { top: '13%', left: '6.5%', width: '100px', height: '220px' };
                break;
              case 2:
                style = { top: '60%', left: '6.5%', width: '100px', height: '180px' };
                break;
              case 3:
                style = { top: '9%', left: '21%', width: '150px', height: '140px' };
                break;
              case 4:
                style = { top: '6%', left: '37.5%', width: '120px', height: '120px' };
                break;
              case 5:
                style = { top: '5.5%', left: '51.2%', width: '120px', height: '120px' };
                break;
              case 6:
                style = { top: '39.5%', left: '21.2%', width: '150px', height: '140px' };
                break;
              case 7:
                style = { top: '70%', left: '21.2%', width: '150px', height: '140px' };
                break;
              case 8:
                style = { top: '71%', left: '43.5%', width: '150px', height: '140px' };
                break;
              case 9:
                style = { top: '70%', left: '64%', width: '150px', height: '140px' };
                break;
              case 10:
                style = { top: '32%', left: '39.5%', width: '235px', height: '210px' };
                break;
              case 11:
                style = { top: '40%', left: '66%', width: '150px', height: '140px' };
                break;
              case 12:
                style = { top: '10%', left: '65%', width: '150px', height: '140px' };
                break;
              case 13:
                style = { top: '13%', left: '84%', width: '100px', height: '220px' };
                break;
              case 14:
                style = { top: '60%', left: '84%', width: '100px', height: '180px' };
                break;
              default:
                style = { top: '0%', left: '0%', width: '100px', height: '100px' };
            }

            return {
              id: mesa.id,
              capacity: mesa.size,
              name: mesa.name,
              style: style,
            };
          });
          setMesas(mesasComStyle);
        } catch (error) {
          console.error('Erro ao buscar mesas:', error);
        }
      };

      fetchMesas();
    }

    // Busca as mesas e armazena-as no estado local.
    // Por ora, optei por tratar os dados diretamente na comunicação com o backend, portanto o "reservations" não está sendo usado.
    // Visei facilitar o desenvolvimento inicial antes de implementar um contexto ou hook para gerenciamento de estado global.
    const fetchReservations = async () => {
      try {
        const response = await fetch('https://bookingsystem-mblf.onrender.com/reservations/');
        const data = await response.json();
        setReservations(data);

      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
      }
    }

    fetchReservations()
    setSelectedDate(new Date());
  }, []);

  // Inicialmente, minha ideia, e pelas melhores práticas, era separar a "ImageTables" do "Fomulário", contudo, ainda sobre a facilidade no 
  // desenvolvimento, e devido ao tempo curto, optei por deixa-los em um unico arquivo para facilidade na trativa dos dados.
  // Mas que, posteriormente, para melhor controle e qualidade do software, seria separado em components e gerenciados atráves do context. 
  return (
    <FormContainer>
      <FormHeader>
        <TitleContainer>
          <Logo><img src={logoValle} alt="Logo" /></Logo>
          <div>
            <Title>Bem-vindo(a)</Title>
            <Subtitle>Faça sua reserva</Subtitle>
          </div>
        </TitleContainer>
      </FormHeader>
      <Subtitle>Não fique de fora! Garanta sua reserva agora e prepare-se para algo único e exclusivo. Seu lugar está esperando por você!</Subtitle>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" error={errors.name}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <FormHelperText>Nome é obrigatório.</FormHelperText>}
        </FormControl>

        <FormControl fullWidth margin="normal" error={errors.numPeople}>
          <InputLabel htmlFor="numPeople">Número de pessoas</InputLabel>
          <Input
            id="numPeople"
            name="numPeople"
            value={formData.numPeople}
            onChange={handleChange}
          />
          {errors.numPeople && <FormHelperText>Quantidade inválida.</FormHelperText>}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="phone">Telefone</InputLabel>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Visualização de erros em "phone" desativado por hora, devido a algum bug que está fazendo com que não se comporte da maneira esperada.*/}
          {/* {errors.phone && <FormHelperText>Telefone inválido.</FormHelperText>} */}
        </FormControl>
        <FormControl fullWidth margin="normal">
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <Grid container spacing={0}>
            <CalenderContainer>
              <Grid item xs={0}>
                <DatePicker
                  label="Selecione a data"
                  value={selectedDate}
                  minDate={new Date()}
                  onChange={handleDateChange}
                />
              </Grid>

              <Grid item xs={0}>
                {selectedDate ? (
                  <Box>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant="h6">Horários disponíveis para {selectedDate.toLocaleDateString('pt-BR')}:</Typography>
                      {horarios.length > 0 ? (
                        <Hours>
                          {/* {horarios.map((horario, index) => (
                            <SpanDisabled $isDisabled={false}>
                              <SpanHour key={index} onClick={() => handleClicked(horario)}
                                $clicked={selectedHorarios.includes(horario)}>
                                {horario}
                              </SpanHour>
                            </SpanDisabled>
                          ))} */}
                          {horarios.map((horario, index) => (
                            <SpanDisabled $isDisabled={disabledHour.includes(horario)}>
                              <SpanHour
                                key={index}
                                onClick={() => handleClicked(horario)}
                                $clicked={selectedHorarios.includes(horario)}
                                className={disabledHour.includes(horario) ? 'disabled' : ''}
                                style={{
                                  textDecoration: disabledHour.includes(horario) ? 'line-through' : 'none',
                                  cursor: disabledHour.includes(horario) ? 'not-allowed' : 'pointer'
                                }}
                              >
                                {horario}
                              </SpanHour>
                            </SpanDisabled>
                          ))}
                        </Hours>
                      ) : (
                        <Typography variant="body1">Nenhum horário disponível.</Typography>
                      )}
                    </div>
                  </Box>
                ) :
                  <div></div>}
              </Grid>
            </CalenderContainer>
          </Grid>
        </LocalizationProvider >
        <Tables>
          <img src={imageMesas} alt="Restaurant Tables" />
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              className="table-area"
              onClick={() => handleTableClick(mesa.id)}
              style={{
                ...mesa.style,
                background: selectedTable === mesa.id ? '#0000FF50' : '#ffb70020', // A utilização de ambos "background" é apenas para visualização, será corrigido futuramente.
                backgroundColor: Number(formData.numPeople) === mesa.capacity ? '#15ff0050' : '#ffb70020',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                transform: selectedTable === mesa.id ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <span><p>{mesa.capacity}</p><NameTable>{mesa.name}</NameTable></span>
            </div>
          ))}
        </Tables>
        <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}> {/* Botão é desabilitado ao enviar o submit, para evitar demasiadas requisições a API */}
          {loading ? 'Reservando...' : 'Reservar'}
        </Button>
      </form >

      {/* Simples solução que peguei de outro projeto para reposta visual ao usuário */}
      {showModal && <ConfirmModal message="Reserva sendo criada, aguarde..." onClose={() => setShowModal(false)} />}

    </FormContainer >
  );
}

export default Form;
