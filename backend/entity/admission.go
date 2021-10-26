package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admission struct {
	gorm.Model
	PatientID       string
	Patient_Name    string
	RoomID          string
	Right_Treatment string
	AdmitTime       time.Time

	TreatmentRecords []TreatmentRecord `gorm:"foreignKey:AdmissionID"`
}
