package entity

import (
	"gorm.io/gorm"
)

type Medicine struct {
	gorm.Model
	Name  string
	Type  string
	Price uint

	TreatmentRecords  []TreatmentRecord  `gorm:"foreignKey:MedID"`
	MedicationRecords []MedicationRecord `gorm:"foreignKey:MedID"`
}
