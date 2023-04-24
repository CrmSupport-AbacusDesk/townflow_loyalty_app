import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Loading,LoadingController } from 'ionic-angular';
import { DbserviceProvider } from '../../../providers/dbservice/dbservice';
// import { HomePage } from '../home/home';
import { SurveyListPage } from '../../survey/survey-list/survey-list';
import { ConstantProvider } from '../../../providers/constant/constant';
import { HomePage } from '../../../pages/home/home';

/**
* Generated class for the SurveyDetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-survey-detail',
  templateUrl: 'survey-detail.html',
})
export class SurveyDetailPage {
  
  surveyDetail:any=''
  surveyId:any='';
  detail:any='';
  surveyAnswer:any='';
  questionCheckCount:any=''
  submitData:any=''
  loading:Loading;
  selected_answer:any='';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dbService:DbserviceProvider,
    public con:ConstantProvider,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController) {
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad SurveyDetailPage',this.surveyId);
      this.surveyId=this.navParams.get('id')
      this.getSurveyDetail(this.surveyId);
      this.presentLoading();
      console.log(this.loading);
      
    }
    
    
    getSurveyDetail(surveyId){
      this.dbService.onPostRequestDataFromApi({"id":String(surveyId),user_id: this.dbService.karigar_id},'master/surveyDetail',this.con.rootUrl).subscribe(response=>{
        console.log(response);
        this.loading.dismiss();
        console.log( this.loading);
        
        this.surveyDetail = response.details;
        console.log(this.surveyDetail);
        
        if(response != null){
          
          this.detail=response.details['question']
          // this.surveyAnswer=response.details['question']['answers']
          console.log("deatil ===========>",this.detail);
          console.log("surveyAnswer",this.surveyAnswer);
        }
      })
    }
    
    checkcount(value){

      console.log("radio click");
      console.log(value);
      
   
      this.questionCheckCount = 0;
      console.log(this.detail)
      for (let i = 0; i < this.detail.length; i++) 
      {
        if (this.detail[i]['selected_answer']) 
        {
          console.log("selected_answer",this.detail[i]['selected_answer']);
          this.questionCheckCount++; 
          console.log(this.questionCheckCount);
          // break;
        }
      }
    }
    
    surveySubmit(){
      console.log("call submit button");
      
      if(this.questionCheckCount != this.detail.length){
        console.log("call innner submit button");
        // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        let alert = this.alertCtrl.create({
          title: 'Alert!',
          message: 'All questions Are Compulsory. ',
          buttons: [
            {
              text: 'ok',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
          ]
          
        })
        alert.present();
        return;
      }
      
      this.dbService.onPostRequestDataFromApi( {"question" :  this.detail,survey_id:this.surveyId,user_id: this.dbService.karigar_id},'master/saveSurveyAnswer',this.con.rootUrl).subscribe(response=>{
        console.log(response);
        if(response.msg == "success"){
          // this.myForm.controls.listOptions.reset()
          
          let alert = this.alertCtrl.create({
            title: 'Success',
            message: 'Your form Submit Succesfully',
            buttons: [
              {
                text: 'ok',
                handler: () => {
                  this.navCtrl.push(HomePage)
                }
              },
            ] 
          })
          alert.present();  
         
        }
      })
    }

    
    
    presentLoading()
    {
      this.loading = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: true
      });
      this.loading.present();
    }        
    
    
  }
  