import { Component, ViewChild } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import {ForumService} from '../../providers/forum-service';
import {ResourceService} from '../../providers/resource-service';

import {ForumThreadListComponent} from '../forum-thread-list/forum-thread-list';
import {AdPositionPromotionComponent} from '../ad-position-promotion/ad-position-promotion';

// declare var Wechat:any;

@Component({
  selector: 'forum-board-list',
  templateUrl: 'forum-board-list.html'
})
export class ForumBoardListComponent {
  @ViewChild(AdPositionPromotionComponent)
  private adComponent:AdPositionPromotionComponent;

  adName = 'forum-board-list';
  items: Array<{id:number, name: string, caption: string, image: string}> = [];

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,     
    public resourceService :ResourceService,     
    public forumService:ForumService,    
  )
  {
    this.updateList();
  }

  public ionViewWillEnter() {
    // Wechat.isInstalled(function (installed) {
    //   Wechat.share({
    //       message: {
    //           title: "Hi, everyone",
    //           description: "This is test.",
    //           mediaTagName: "TEST-TAG-001",
    //           media: {
    //             thumb: "https://cordova.apache.org/images/cordova_256.png",
    //             type: Wechat.Type.LINK,
    //             url: "http://tech.qq.com/zt2012/tmtdecode/252.htm",
    //             webpageUrl: "http://tech.qq.com/zt2012/tmtdecode/252.htm"
    //           },
    //       },
    //       scene: Wechat.Scene.TIMELINE   // share to Timeline
    //   }, function () {
    //       alert("Share Success");
    //   }, function (reason) {
    //       alert("Share Failed: " + reason);
    //   });
    // }, function (reason) {
    //     alert("Init Failed: " + reason);
    // });
    this.adComponent.updateSlides();
  }

  updateList() {
    this.forumService.getBoardsData().subscribe(
      (data: any) => {
        this.items = data;
      },
      (_error: any) =>{
        this.toastCtrl.create({
          message: '获取数据出错,请检查您的网络连接情况.' + _error,
          position: 'middle',
          duration: 10000
        }).present();
      }
    );
  }

  gotoBoard(item: any){
    this.navCtrl.push(ForumThreadListComponent, {
      item: item
    });
  }
}
