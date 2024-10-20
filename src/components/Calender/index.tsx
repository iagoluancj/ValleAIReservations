// import { useEffect, useState } from 'react';
// import { Box, TextField, Typography, Grid } from '@mui/material';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { ptBR } from 'date-fns/locale';
// import { CalenderContainer, Hours, SpanHour } from './styles';
// import { toast } from 'react-toastify';

// export default function CalendarioComHorarios() {
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//     const [horarios, setHorarios] = useState<string[]>(['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
//     const [selectedHorarios, setSelectedHorarios] = useState<string[]>([]);

//     const handleDateChange = (newDate: Date | null) => {
//         setSelectedDate(newDate || new Date());

//     };

//     const handleClicked = (horario: string) => {
//         const horarioIndex = horarios.indexOf(horario);
//         const firstSelectedIndex = horarios.indexOf(selectedHorarios[0]);
//         const lastSelectedIndex = horarios.indexOf(selectedHorarios[selectedHorarios.length - 1]);

//         if (selectedHorarios.length >= 3 && !selectedHorarios.includes(horario)) {
//             toast.error("Para marcar mais de 3 horários, entre em contato via telefone.");
//             return;
//         }

//         if (selectedHorarios.includes(horario)) {
//             const newSelectedHorarios = selectedHorarios.filter(h => h !== horario);
//             setSelectedHorarios(newSelectedHorarios);
//         } else {
//             if (
//                 selectedHorarios.length === 0 ||
//                 horarioIndex === lastSelectedIndex + 1 ||
//                 horarioIndex === firstSelectedIndex - 1
//             ) {
//                 setSelectedHorarios([...selectedHorarios, horario].sort((a, b) => horarios.indexOf(a) - horarios.indexOf(b)));
//             } else {
//                 toast.error("Selecione apenas horários consecutivos.");
//             }
//         }
//     };

//     useEffect(() => {
//         setSelectedDate(new Date());
//     }, [])

//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
//             <Grid container spacing={0}>
//                 <CalenderContainer>
//                     <Grid item xs={0}>
//                         <DatePicker
//                             label="Selecione a data"
//                             value={selectedDate}
//                             onChange={handleDateChange}
//                         />
//                     </Grid>

//                     <Grid item xs={0}>
//                         {selectedDate ? (
//                             <Box>
//                                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
//                                     <Typography variant="h6">Horários disponíveis para {selectedDate.toLocaleDateString('pt-BR')}:</Typography>
//                                     {horarios.length > 0 ? (
//                                         <Hours>
//                                             {horarios.map((horario, index) => (
//                                                 <SpanHour key={index} onClick={() => handleClicked(horario)}
//                                                     $clicked={selectedHorarios.includes(horario)}>
//                                                     {horario}
//                                                 </SpanHour>
//                                             ))}
//                                         </Hours>
//                                     ) : (
//                                         <Typography variant="body1">Nenhum horário disponível.</Typography>
//                                     )}
//                                 </div>
//                             </Box>
//                         ) :
//                             <div></div>}
//                     </Grid>
//                 </CalenderContainer>
//             </Grid>
//         </LocalizationProvider >
//     );
// }

export {}