import {observable, action, runInAction} from 'mobx'
import {createContext} from 'react'
import agent from './../../api/agent'
import {ICategory} from './../../models/products/category'


class CategoryStory {
    @observable categoryList : ICategory[] = []
    @observable categoryOption: {value: number, label: string}[] = []
    @observable loadingInitial = false;
    @observable submiting = false;

    //Actions
    @action loadCategory = async () => {
        this.loadingInitial = true;
        this.categoryList = [];
        this.categoryOption = [];

        try {
            const categories = await agent.Category.list();
            runInAction('continue load categories', () => {
                
                
                categories.forEach(category => {
                    this.categoryList.push(category);
                    this.categoryOption.push({
                        value: category.categoryId,
                        label: category.name
                    });
                })

                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);

            runInAction('after load category error', () => {
                this.loadingInitial = false;
            })
        }
    }

    @action deleteCategory = async (id: number) => {
        this.submiting = true;

        try {
            await agent.Category.delete(this.categoryList[id].categoryId);

            runInAction('continue delete category', () => {
                const indexToDelete = this.categoryList.indexOf(this.categoryList[id]);

                if (indexToDelete > -1) {
                    this.categoryList.splice(indexToDelete, 1);
                }
                this.submiting = false;
            })
        } catch (error) {
            console.log(error);

            runInAction('delete category error', () => {
                this.submiting = false;
            })
        }
    }

    @action createCategory = async (category: ICategory) => {
        this.submiting = true;

        try {
            await agent.Category.create(category);

            runInAction('continue create category', () => {
                this.categoryList.push(category);
                this.submiting = false;
            })
        } catch (error) {
            console.log(error)

            runInAction('create category error', () => {
                this.submiting = false;
            })
        }
    }

    @action editCategory = async (category: ICategory) => {
        this.submiting = true;

        try {
            await agent.Category.update(category);
            
            runInAction('continue edit category', () => {
                this.categoryList.forEach(categoryToUpdate => {
                    if (categoryToUpdate.categoryId === category.categoryId) {
                        categoryToUpdate.name = category.name
                    }
                });

                this.submiting = false;
            })
        } catch (error) {
            console.log(error);

            runInAction('edit category error', () => {
                this.submiting = false;
            })
        }
    }
}

export default createContext(new CategoryStory())