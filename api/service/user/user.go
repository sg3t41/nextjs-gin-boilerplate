package user

import (
	model "github.com/sg3t41/syomei_api/model/user"
)

type User struct {
	ID           string
	Username     string
	Email        string
	PasswordHash string
}

func (u *User) Get() (interface{}, error) {
	return nil, nil
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
