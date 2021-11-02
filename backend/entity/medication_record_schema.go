package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admission struct {
	gorm.Model
	AdmitTime time.Time

	PatientID       string
	Patient_Name    string
	RoomID          string
	Right_Treatment string

	TreatmentRecords []TreatmentRecord `gorm:"foreignKey:AdmissionID"`
}

type Medicine struct {
	gorm.Model
	Name  string
	Type  string
	Price uint

	TreatmentRecords  []TreatmentRecord  `gorm:"foreignKey:MedID"`
	MedicationRecords []MedicationRecord `gorm:"foreignKey:MedID"`
}

type Pharmacist struct {
	gorm.Model
	Name              string
	Password          string
	Pid               string             `gorm:"uniqueIndex"`
	MedicationRecords []MedicationRecord `gorm:"foreignKey:PharmaID"`
}

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

	MedicationRecord  []MedicationRecord `gorm:"foreignKey:AdmissionID"`
	MedicationRecords []MedicationRecord `gorm:"foreignKey:TreatmentID"`
}

type MedicationRecord struct {
	gorm.Model
	Amount     uint
	RecordTime time.Time

	PharmaID *uint
	Pharma   Pharmacist

	MedID *uint
	Med   Medicine

	TreatmentID *uint
	AdmissionID *uint

	Treatment TreatmentRecord
}
