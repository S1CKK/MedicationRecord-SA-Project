import { MedicineInterface } from "./IMedicine";
import { AdmissionInterface } from "./IAdmission";
import { PharmacistInterface } from "./IPharmacist";
import { TreatmentInterface } from "./ITreatment";

export interface MedRecordInterface {
    /*ID: string, 
    Name: string;   
    Pid: string;*/

    ID: number,
    RecordTime: Date,
    MedID: number,
    Med: MedicineInterface,
    TreatmentID: number,
    Treatment: TreatmentInterface,
    PharmaID: number,
    Pharma: PharmacistInterface,
    AdmissionID: number,
    Admission: AdmissionInterface,
    Amount: number,

}