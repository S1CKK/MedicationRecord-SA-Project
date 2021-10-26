package controller

import (
	"net/http"

	"github.com/S1CKK/med-record-system/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// GET /users
// List all users
func ListPharmacists(c *gin.Context) {
	var pharmacists []entity.Pharmacist
	if err := entity.DB().Raw("SELECT * FROM pharmacists").Scan(&pharmacists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pharmacists})
}

// GET /user/:id
// Get user by id
func GetPharmacist(c *gin.Context) {
	var pharmacist entity.Pharmacist
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM pharmacists WHERE id = ?", id).Scan(&pharmacist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pharmacist})
}

/*
// POST /pharmacists
func CreatePharmacist(c *gin.Context) {
	var pharmacist entity.Pharmacist
	if err := c.ShouldBindJSON(&pharmacist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&pharmacist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pharmacist})
}*/
// POST /users
func CreatePharmacist(c *gin.Context) {
	var pharmacist entity.Pharmacist
	if err := c.ShouldBindJSON(&pharmacist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	bytes, err := bcrypt.GenerateFromPassword([]byte(pharmacist.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	pharmacist.Password = string(bytes)

	if err := entity.DB().Create(&pharmacist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pharmacist})
}

// PATCH /pharmacists
func UpdatePharmacist(c *gin.Context) {
	var pharmacist entity.Pharmacist
	if err := c.ShouldBindJSON(&pharmacist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", pharmacist.ID).First(&pharmacist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&pharmacist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pharmacist})
}

// DELETE /pharmacists/:id
func DeletePharmacist(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM pharmacists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pharmacist not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.Pharmacist{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
