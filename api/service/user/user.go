package user

import (
	"fmt"
	"strconv"

	model "github.com/sg3t41/syomei_api/model/user"
)

type User struct {
	ID           string
	Username     string
	Email        string
	PasswordHash string
}

func (u *User) GetByEmailAndPassword() (*User, error) {
	record, err := model.GetUserByEmailAndPassword(u.Email, u.PasswordHash)
	if err != nil {
		return nil, fmt.Errorf("GetUser: %v", err)
	}

	return &User{
		ID:           strconv.Itoa(record.ID),
		Username:     record.Username,
		Email:        record.Email,
		PasswordHash: record.PasswordHash,
	}, nil

}

func (u *User) Add() (int64, error) {
	id, err := model.Create(u.Username, u.Email, u.PasswordHash)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func (u *User) Edit() error {
	return nil
}

func (u *User) Delete() error {
	return nil
}
