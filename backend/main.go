package main

import (
	"github.com/S1CKK/med-record-system/controller"

	"github.com/S1CKK/med-record-system/entity"
	"github.com/S1CKK/med-record-system/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	/*gin.SetMode(gin.ReleaseMode)*/
	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Pharmacist Routes
			protected.GET("/pharmacists", controller.ListPharmacists)
			protected.GET("/pharmacist/:id", controller.GetPharmacist)
			protected.POST("/pharmacists", controller.CreatePharmacist)
			//protected.PATCH("/pharmacists", controller.UpdatePharmacist)
			//protected.DELETE("/pharmacists/:id", controller.DeletePharmacist)

			// Medicine Routes
			protected.GET("/medicines", controller.ListMedicine)
			protected.GET("/medicine/:id", controller.GetMedicine)
			protected.POST("/medicines", controller.CreateMedicine)
			//protected.PATCH("/medicines", controller.UpdateMedicine)
			//protected.DELETE("/medicines/:id", controller.DeleteMedicine)

			// Admission Routes
			protected.GET("/admissions", controller.ListAdmission)
			protected.GET("/admission/:id", controller.GetAdmission)
			//protected.GET("/admission/watched/user/:id", controller.GetPlaylistWatchedByUser)
			protected.POST("/admissions", controller.CreateAdmission)
			//protected.PATCH("/admissions", controller.UpdateAdmission)
			//protected.DELETE("/admissions/:id", controller.DeleteAdmission)

			// Treatment Routes
			protected.GET("/treatment_records", controller.ListTreatmentRecord)
			protected.GET("/admission/treatments", controller.AdmissionByTreatment)
			protected.GET("/treatment_record/:id", controller.GetTreatmentRecord)
			protected.POST("/treatment_records", controller.CreateTreatmentRecord)
			//protected.PATCH("/treatment_records", controller.UpdateTreatmentRecord)
			//protected.DELETE("/treatments_records/:id", controller.DeleteTreatmentRecord)

			// MedRecord Routes
			protected.GET("/medication_records", controller.ListMedicationRacord)
			protected.GET("/medication_record/:id", controller.GetMedicationRacord)
			protected.POST("/medication_records", controller.CreateMedicationRecord)
			//protected.PATCH("/medication_records", controller.UpdateMedicationRacord)
			//protected.DELETE("/medication_records/:id", controller.DeleteMedicationRacord)

		}
	}
	// Pharmacist Routes
	r.POST("/pharmacists/create", controller.CreatePharmacist)

	// Authentication Routes
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()

	}

}
