import { AdmissionInterface } from "./IAdmission";

export interface TreatmentInterface {
    ID: number, 
    AdmissionID: number;
    Admission: AdmissionInterface;
    Treatment: string;
    
    
}