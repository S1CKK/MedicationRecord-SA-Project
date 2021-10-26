package entity

import (
	"gorm.io/gorm"
)

type Pharmacist struct {
	gorm.Model
	Name              string
	Password          string
	Pid               string             `gorm:"uniqueIndex"`
	MedicationRecords []MedicationRecord `gorm:"foreignKey:PharmaID"`
}
