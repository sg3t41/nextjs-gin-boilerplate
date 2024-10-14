package post

import (
	model "github.com/sg3t41/syomei_api/model/post"
)

type Post struct {
	ID           string
	userID       string
	CategoriesID string
	Title        string
	Content      string
	CreatedAt    string
	UpdatedAt    string
	DeletedAt    string
}

func (p *Post) Get() (interface{}, error) {
	gp, err := model.GetByID(1)
	if err != nil {
		return nil, err
	}
	return gp, nil
}

func (p *Post) Add() error {
	return nil
}

func (p *Post) Edit() error {
	return nil
}

func (p *Post) Delete() error {
	return nil
}
