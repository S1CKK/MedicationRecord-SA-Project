package entity

import (
	"gorm.io/gorm"
)

type Medicine struct {
	gorm.Model
	Med_name  string
	Med_type  string
	Med_price int

	Patients          []Patient          `gorm:"foreignKey:MedID"`
	TreatmentRecords  []TreatmentRecord  `gorm:"foreignKey:MedID"`
	MedicationRecords []MedicationRecord `gorm:"foreignKey:MedID"`
}
