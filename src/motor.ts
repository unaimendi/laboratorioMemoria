import { pacientes, Pacientes, numeroPacientesPorEspecialidad } from "./modelo";

export const obtenPacientesAsignadosAPediatria: Pacientes[] = pacientes.filter((paciente: Pacientes) => paciente.especialidad === "Pediatra");

export const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios: Pacientes[] = pacientes.filter((paciente: Pacientes) => paciente.especialidad === "Pediatra" && paciente.edad < 10);

export const activarProtocoloUrgencia: boolean = pacientes.some((paciente: Pacientes): boolean => !(paciente.frecuenciaCardiaca > 100 && paciente.temperatura > 39));

export const reasignaPacientesAMedicoFamilia: Pacientes[] = pacientes.map((paciente: Pacientes) => (paciente.especialidad === "Pediatra" ? { ...paciente, especialidad: "Medico de familia" } : { ...paciente }));

export const HayPacientesDePediatria: boolean = pacientes.some((paciente: Pacientes) => paciente.especialidad === "Pediatra");

export const cuentaPacientesPorEspecialidad = () => {
	numeroPacientesPorEspecialidad.medicoDeFamilia = pacientes.filter((paciente: Pacientes) => paciente.especialidad === "Medico de familia").length;
	numeroPacientesPorEspecialidad.pediatria = pacientes.filter((paciente: Pacientes) => paciente.especialidad === "Pediatra").length;
	numeroPacientesPorEspecialidad.cardiologia = pacientes.filter((paciente: Pacientes) => paciente.especialidad === "Cardiólogo").length;

	return numeroPacientesPorEspecialidad;
};
