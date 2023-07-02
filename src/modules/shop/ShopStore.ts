import {action, observable, flow} from 'mobx';
import Loading from '../../components/widget/Loading';
import {request} from '../../utils/request';

const SIZE = 10;
export default class ShopStore {
  page: number = 1;

  @observable goodsList: GoodsSimple[] = [];

  @observable refreshing: boolean = false;

  @observable categoryList: GoodsCategory[] = [];

  @action
  resetPage = () => {
    this.page = 1;
  };

  @action
  requestGoodsList = async () => {
    if (this.refreshing) return;
    Loading.show();
    try {
      this.refreshing = true;
      const params = {
        page: this.page,
        size: SIZE,
      };
      const {data} = await request('goodsList', params);
      if (data?.length) {
        if (this.page === 1) {
          this.goodsList = data;
        } else {
          this.goodsList = [...this.goodsList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.goodsList = [];
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.refreshing = false;
      Loading.hide();
    }
  };

  @action
  requestTop10Category = flow(function* (this: ShopStore) {
    try {
      const {data} = yield request('top10Category', {});
      this.categoryList = data || [];
    } catch (error) {
      console.log(error);
    }
  });
}