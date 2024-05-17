export interface Team{
    idTeam: number;
    teamName: string;
    teamImage?: string | null;
    golesAFavor: number;
    golesEnContra: number;
    diferenciaGoles: number;
    puntos: number;
}