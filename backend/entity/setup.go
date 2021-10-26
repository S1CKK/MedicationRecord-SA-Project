package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-64.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	//Migrate the schema
	database.AutoMigrate(
		&Pharmacist{}, &Medicine{}, &Admission{}, &TreatmentRecord{}, &MedicationRecord{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	//Pharmacist
	db.Model(&Pharmacist{}).Create(&Pharmacist{
		Name:     "Chawarat Narit",
		Pid:      "1400011111111",
		Password: string(password),
	})
	db.Model(&Pharmacist{}).Create(&Pharmacist{
		Name:     "Pichanon  Srisongmuang",
		Pid:      "1400011111112",
		Password: string(password),
	})
	db.Model(&Pharmacist{}).Create(&Pharmacist{
		Name:     "Chin Love",
		Pid:      "1400011111113",
		Password: string(password),
	})

	//Medicine
	db.Model(&Medicine{}).Create(&Medicine{
		Name:  "PARACETAMOL 500 MG",
		Type:  "TAB",
		Price: 1,
	})
	db.Model(&Medicine{}).Create(&Medicine{
		Name:  "CEFCINIR 100 MG",
		Type:  "CAP",
		Price: 14,
	})
	db.Model(&Medicine{}).Create(&Medicine{
		Name:  "PREDNISLONE 5 MG",
		Type:  "TAB",
		Price: 1,
	})
	//Admission
	ad1 := Admission{
		PatientID:       "I562",
		Patient_Name:    "huy",
		RoomID:          "RM2002",
		Right_Treatment: "GM0001",
	}
	db.Model(&Admission{}).Create(&ad1)

	db.Model(&Admission{}).Create(&Admission{
		PatientID:       "I563",
		Patient_Name:    "guli",
		RoomID:          "RM2005",
		Right_Treatment: "IV0003",
	})
	db.Model(&Admission{}).Create(&Admission{
		PatientID:       "I564",
		Patient_Name:    "ball",
		RoomID:          "RM2004",
		Right_Treatment: "IV0002",
	})
	var huy Admission
	var ball Admission
	db.Raw("SELECT * FROM admissions WHERE patient_id=?", "I562").Scan(&huy)
	db.Raw("SELECT * FROM admissions WHERE patient_id=?", "I564").Scan(&ball)

	//TreatmentRecord
	tr1 := TreatmentRecord{
		Length_of_stay: 3,
		Treatment:      "Heart Transplant",
		Food_type:      3000,
		Med_amount:     3,
		Cost:           50000,
		Equipment_id:   002,
		Med:            Medicine{},
		Admission:      ad1,
	}
	db.Model(&TreatmentRecord{}).Create(&tr1)

	db.Model(&TreatmentRecord{}).Create(&TreatmentRecord{
		Length_of_stay: 3,
		Treatment:      "Gastric lavage",
		Food_type:      3001,
		Med_amount:     3,
		Cost:           50000,
		Equipment_id:   001,
		Med:            Medicine{},
		Admission:      ball,
	})
	var t1 TreatmentRecord
	db.Raw("SELECT * FROM treatment_records WHERE med_amount=?", "3").Scan(&t1)

	// === Query
	//

	//var target Pharmacist
	//db.Model(&Pharmacist{}).Find(&target, db.Where("pid = ?", "1400011111111"))

	/*var admissionTreatment Admission
	db.Model(&Admission{}).Find(&admissionTreatment, db.Where("title = ? and owner_id = ?", "Watched", target.ID))

	var medRecsList []*MedicationRecord
	db.Model(&MedicationRecord{}).
		Joins("Treatment").
		Joins("Pharmacist").
		Joins("Medicine").
		Find(&medRecsList, db.Where("playlist_id = ?", admissionTreatment.ID))*/

}
