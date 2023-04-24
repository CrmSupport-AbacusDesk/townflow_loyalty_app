import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading} from 'ionic-angular';
import { SurveyDetailPage } from '../survey-detail/survey-detail';
import { DbserviceProvider } from '../../../providers/dbservice/dbservice';
import { ConstantProvider } from '../../../providers/constant/constant';


@IonicPage()
@Component({
  selector: 'page-survey-list',
  templateUrl: 'survey-list.html',
})
export class SurveyListPage {

  surveyList:any=[];
  loading:Loading;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public service:DbserviceProvider,
     public dbService:DbserviceProvider,
     public con:ConstantProvider,
     public loadingCtrl:LoadingController,
     ) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyListPage');
    this.getSurveyList();
    this.presentLoading();
    console.log(this.loading);
  }

  Slist(id){
    this.navCtrl.push(SurveyDetailPage,{id:id})
  }

  

  getSurveyList()
  {
    this.dbService.onPostRequestDataFromApi({user_id: this.dbService.karigar_id},'master/surveyList', this.con.rootUrl).subscribe(response =>
      {
        console.log(response);
        this.loading.dismiss();
        console.log( this.loading);

        if(response != null){
          this.surveyList = response.surveyList['data']
          console.log(this.surveyList);  
        }
        
      });
      
    }
    presentLoading()
    {
      this.loading = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: true
      });
      this.loading.present();
    }        

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }
}
