import { observable, action, runInAction } from "mobx";
import { createContext } from "react";
import agent from "./../../api/agent";

import { IService } from "./../../models/services/service";

class ServiceStore {
  @observable serviceList: IService[] = [];
  
  @observable serviceDetails: IService | undefined = undefined;
  @observable openedCollapses: string[] = []

  @observable serviceOptions: {value: number, label: string}[] = []
  @observable masterOptions: {value: number, label: string}[] = [];

  @observable initialLoading = false;
  @observable submiting = false;

  @action loadServices = async () => {
    this.initialLoading = true;
    this.serviceList = [];
    try {
      var services = await agent.Service.list();
      runInAction("Continue load services", () => {
        services.forEach((service) => {
          this.serviceList.push(service);
        });

        this.initialLoading = false;
      });
      console.log(this.serviceList);
    } catch (error) {
      console.log(error);

      runInAction("Error load services", () => {
        this.initialLoading = false;
      });
    }
  };

  @action loadServiceOptions = async () => {
    this.serviceOptions = [];

    try {
      var opt = await agent.Service.options();

      runInAction('Continue load options', () => {
        this.serviceOptions = opt;
      })
    } catch (error) {
      console.log(error);
    }
  }

  @action loadServiceDetails = async (id: number) => {
    this.initialLoading = true;

    try {
      this.serviceDetails = await agent.Service.details(id);

      runInAction("Continue getting service details", () => {
        this.initialLoading = false;
      });
    } catch (error) {
      console.log(error);
      
      runInAction("Error getting service details", () => {
        this.initialLoading = false;
      });
    }
  };

  @action loadMasters = async (id: number) => {
    this.initialLoading = true;

    try {
      var masters = await agent.Service.masters(id);

      this.masterOptions = [];
      masters.forEach((master) => {
        this.masterOptions.push({value: master.staffId, label: master.firstName + ' ' + master.lastName})
      })

      runInAction("Continue getting service details", () => {
        this.initialLoading = false;
      });
    } catch (error) {
      console.log(error);
      
      runInAction("Error getting service details", () => {
        this.initialLoading = false;
      });
    }
  };

  @action createService = async (service: IService) => {
    this.submiting = true;

    try {
      await agent.Service.create(service);

      runInAction("Continue creating service", () => {
        this.serviceList.push(service);
        this.submiting = false;
      });
    } catch (error) {
      console.log(error);

      runInAction("Error creating service", () => {
        this.submiting = false;
      });
    }
  };

  @action deleteService = async (id: number) => {
    this.submiting = true;

    try {
      await agent.Service.delete(this.serviceList[id].serviceId);

      runInAction("Continue deleting service", () => {
        this.serviceList.splice(id, 1);
        this.submiting = false;
      });
    } catch (error) {
      console.log(error);

      runInAction("Error deleting service", () => {
        this.submiting = false;
      });
    }
  };
}

export default createContext(new ServiceStore());
