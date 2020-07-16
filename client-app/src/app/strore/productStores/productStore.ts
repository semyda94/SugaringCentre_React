import { observable, action, runInAction } from 'mobx'
import {createContext} from 'react'
import agent from './../../api/agent'
import { IProduct } from '../../models/products/product'
// import { IProductImage } from '../../models/products/productImage'
import { IProductStat } from '../../models/products/productStat'
import th from '../../../assets/vendor/fullcalendar/dist/locale/th'

class ProductStore {
    @observable productList: IProduct[] = []
    @observable filteredList: IProduct[] = []
    @observable productDetails: IProduct | undefined = undefined;
    @observable productStat: IProductStat | undefined = undefined;
    @observable productImages =  new Map();
    @observable sortedProductList: IProduct[] = []
    @observable loadingInitial = false;
    @observable submiting = false;
    
    @observable openedCollapses: string[] = []
    
    @observable openedProductCollapses: string[] = []
    @observable priceSliderValues: number[] = []
    @observable categorySelected: number[] = []

    @observable page = 1;
    @observable pageSize = 12;
    @observable minPrice = 0;
    @observable maxPrice = 0;


    @action loadProducts = async () => {
        this.loadingInitial = true;
        this.productList = [];

        try {
            const products = await agent.Product.list();

            runInAction('coninue load products', () => {
                this.productList = products;

                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);

            runInAction('after load product error', () => {
                this.loadingInitial = false;
            })
        }
    }

    @action loadProductsForShop = async () => {
        this.loadingInitial = true;
        this.productList = [];

        try {
            var categorysJoined = this.categorySelected.join(',');
            const products = await agent.Shop.list(this.page, this.pageSize, this.minPrice, this.maxPrice, categorysJoined === "" ? "," : categorysJoined );

            runInAction('coninue load products', () => {
                this.productList = products;

                let max = 0;
                this.productList.map(p => {
                    if (p.price > max)
                        max = p.price;
                });

                this.priceSliderValues.push(0)
                this.priceSliderValues.push(max)

                this.productList.map(p => {
                    this.loadImageForProduct(p.productId)
                });

                this.filteredList = this.productList;

                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);

            runInAction('after load product error', () => {
                this.loadingInitial = false;
            })
        }
    }

    @action loadProductForDetails = async (id: number) => {
        this.loadingInitial = true;

        try {
            const product = await agent.Shop.productDetails(id);

            runInAction('after product details load continue', () => {
                this.productDetails = product;

                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);

            runInAction('after productDetails load error', () => {
                this.loadingInitial = false;
            })
            
        }
    }

    @action loadProductStat = async (id: number) => {
        this.submiting = true;

        try {
            const stat = await agent.Product.stat(id);

            runInAction('coninue getting stat', ()=> {
                this.productStat = stat;
                this.submiting = false;
            })
        } catch (error) {
            console.log(error);

            runInAction('Error of getting product stat', () => {
                this.submiting = false;
            })
            
        }
    }
    
    @action loadImageForProduct = async (id: number) => {
        let image = ""
        try {
            const product = await agent.Shop.image(id);

            runInAction('coninue load image', () => {
                this.productImages.set(product.productId, product.image);
            })
        } catch (error) {
            console.log(error);

            runInAction('after load image error', () => {
                this.loadingInitial = false;
            })
        }
    }

    @action createProduct = async (product: IProduct) => {
        this.submiting = true;
        
        try {
            await agent.Product.create(product);

            runInAction('continue create product', () => {
                this.productList.push(product);   
                this.submiting = false
            })
        } catch (error) {
            console.log(error)
            runInAction('error create product', () => {
                this.submiting = false
            })
        }
    }

    @action updateProduct = async (product: IProduct) => {
        this.submiting = true;
        
        try {
            await agent.Product.update(product);

            runInAction('continue update product', () => {
                this.loadProducts();

                this.submiting = false;
            })
        } catch (error) {
            console.log(error);

            runInAction('error update product', () => {
                this.submiting = false;
            })
        }
    }

    @action deleteProducts = async (idx: number) => {
        this.submiting = true;

        try {
            await agent.Product.delete(this.productList[idx].productId);

            runInAction('continue delete product', () => {
                const indexToDelete = this.productList.indexOf(this.productList[idx]);

                if (indexToDelete > -1) {
                    this.productList.splice(indexToDelete, 1);
                }
                this.submiting = false;
            })
        } catch (error) {
            console.log(error)

            runInAction('error delere product', () => {
                this.submiting = false;
            })
        }
    }

    @action updateSelectedCategory = async (id: number) => {
        const index = this.categorySelected.indexOf(id, 0);

        if (index > -1) {
            this.categorySelected.splice(index, 1);
        } else {
            this.categorySelected.push(id);
        }

        try {
            var categorysJoined = this.categorySelected.join(',');
            
            const products = await agent.Shop.list(this.page, this.pageSize, this.minPrice, this.maxPrice, categorysJoined === "" ? "," : categorysJoined );

            runInAction('coninue load products', () => {
                this.productList = products;

                this.filteredList = this.productList;
            })
        } catch (error) {
            console.log(error);
        }
    }

    @action updatePrice = async (min: number, max: number) => {
        this.minPrice = min;
        this.maxPrice = max;
        
        try {
            var categorysJoined = this.categorySelected.join(',');
            const products = await agent.Shop.list(this.page, this.pageSize, this.minPrice, this.maxPrice, categorysJoined === "" ? "," : categorysJoined );

            runInAction('coninue load products', () => {
                this.productList = products;

                this.filteredList = this.productList;
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default createContext(new ProductStore())
