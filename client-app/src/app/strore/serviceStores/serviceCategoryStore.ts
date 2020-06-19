import { observable, action, runInAction } from "mobx";
import { createContext } from "react";
import agent from "./../../api/agent";

import { IServiceCategory } from "./../../models/services/serviceCategory";

class ServiceCategoryStore {
  @observable serviceCategoryList: IServiceCategory[] = [];
  @observable categoryOption: { value: number; label: string }[] = [];
  @observable initialLoading = false;
  @observable submiting = false;

  @action loadServiceCategory = async () => {
    this.initialLoading = true;

    try {
      this.serviceCategoryList = [];
      this.categoryOption = [];

      var categories = await agent.ServiceCategory.list();

      runInAction("Continue after loading service categories", () => {
        this.serviceCategoryList = categories;
        this.serviceCategoryList.map((category) => {
          this.categoryOption.push({
            value: category.serviceCategoryId,
            label: category.title,
          });
        });
        this.initialLoading = false;
      });
    } catch (error) {
      console.log(error);

      runInAction("Error loading service category", () => {
        this.initialLoading = false;
      });
    }
  };

  @action createServiceCategory = async (newCategory: IServiceCategory) => {
    this.submiting = true;

    try {
      await agent.ServiceCategory.create(newCategory);

      runInAction("continue after creating service category", () => {
        this.serviceCategoryList.push(newCategory);

        this.submiting = false;
      });
    } catch (error) {
      console.log(error);

      runInAction("Error during creating service category", () => {
        this.submiting = false;
      });
    }
  };

  @action editServiceCategory = async (category: IServiceCategory) => {
    this.submiting = true;

    try {
      await agent.ServiceCategory.update(category);

      runInAction("continue after creating service category", () => {
        this.serviceCategoryList.forEach((categoryToUpdate) => {
          if (categoryToUpdate.serviceCategoryId === category.serviceCategoryId) {
            categoryToUpdate.title = category.title;
            categoryToUpdate.description = category.description;
          }
        });

        this.submiting = false;
      });
    } catch (error) {
      console.log(error);

      runInAction("Error during creating service category", () => {
        this.submiting = false;
      });
    }
  };

  @action deleteServiceCategory = async (id: number) => {
    this.submiting = true;

    try {
      await agent.ServiceCategory.delete(
        this.serviceCategoryList[id].serviceCategoryId
      );

      runInAction("continue after deleting service category", () => {
        this.submiting = false;

        this.serviceCategoryList.splice(id, 1);
      });
    } catch (error) {
      console.log(error);

      runInAction("Error during deleting service category", () => {
        this.submiting = false;
      });
    }
  };
}

export default createContext(new ServiceCategoryStore());
