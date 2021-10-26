package entity

import (
	"gorm.io/gorm"
)

type TreatmentRecord struct {
	gorm.Model
	Doctor_id      string
	Length_of_stay uint
	Treatment      string
	Food_type      uint
	Med_amount     uint
	Cost           uint
	Equipment_id   uint

	MedID *uint
	Med   Medicine

	AdmissionID *uint
	Admission   Admission

	MedicationRecords []MedicationRecord `gorm:"foreignKey:TreatmentID"`
}
