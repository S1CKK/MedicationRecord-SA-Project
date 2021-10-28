package entity

import (
	"time"

	"gorm.io/gorm"
)

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
