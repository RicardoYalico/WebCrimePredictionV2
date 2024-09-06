import {Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import {models} from "powerbi-client";
import {IReportEmbedConfiguration} from "embed";
import {PowerBIEmbedModule} from "powerbi-client-angular";
import {NgForOf} from "@angular/common";
import {IDistrict} from "../../core/models/idistrict";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-powerbi-modal',
  standalone: true,
  imports: [
    PowerBIEmbedModule,
    NgForOf
  ],
  templateUrl: './powerbi-modal.component.html',
  styleUrl: './powerbi-modal.component.css'
})

export class PowerbiModalComponent {

  componentsCount: IDistrict[] = [];
  title = ''

  embedConfig: IReportEmbedConfiguration = {
    type: 'report',
    id: '001cedf1-13df-4420-bad7-e976e4c24c03',
    embedUrl: ``,
    accessToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGUwY2IwNjAtMDlhZC00OWY1LWEwMDUtNjhiOWI0OWFhMWY2LyIsImlhdCI6MTcyNTYzNzE0NCwibmJmIjoxNzI1NjM3MTQ0LCJleHAiOjE3MjU2NDEzNTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUFDcTMvZ0FQOHFac05KWTRHdTV3VTZPVDl2SUFqMnVVSUNmZEhVVmZjYUlULzFoWTBaeExnUkIvUXA1Yy9BeTd3QmdOVlhHZzBQQzU2Rk5xbTc4YXpnQ2ZURzFNcjc0TGxtTEhscmNXdSt6UT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMjNkOGY2YmQtMWViMC00Y2MyLWEwOGMtN2JmNTI1YzY3YmNkIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJZYWxpY28gUm9uY2FsIiwiZ2l2ZW5fbmFtZSI6IlJpY2FyZG8gQW5kZXJzb24iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyMDAuMTIzLjIzMC4yNTEiLCJuYW1lIjoidTIwMTkyMDE0MCAoWWFsaWNvIFJvbmNhbCwgUmljYXJkbyBBbmRlcnNvbikiLCJvaWQiOiIzZDFiNmJiYi0wNjdmLTQxYmMtYjE3Yy00MGZiZGI1ZWQ3M2IiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtODU4MzU0MTc4LTE3MjYzMDU4NC0xMTM2MjYzODYwLTEyNzA3NTUiLCJwdWlkIjoiMTAwMzIwMDA0NUNDRTNCMCIsInJoIjoiMC5BUVlBWUxBTURxMEo5VW1nQldpNXRKcWg5Z2tBQUFBQUFBQUF3QUFBQUFBQUFBQUdBQjAuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWQuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInN1YiI6ImpHdFJVUEF1bkEzN0lfOUkyLUJyeTBRYWR3cFF6NENUaGkxcFBEZXJkWE0iLCJ0aWQiOiIwZTBjYjA2MC0wOWFkLTQ5ZjUtYTAwNS02OGI5YjQ5YWExZjYiLCJ1bmlxdWVfbmFtZSI6InUyMDE5MjAxNDBAdXBjLmVkdS5wZSIsInVwbiI6InUyMDE5MjAxNDBAdXBjLmVkdS5wZSIsInV0aSI6ImJLWE5SOU1LX2s2dFF1UVhQRThTQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDE2In0.e8dTIMoQ1y9ruFZffRYV5wlQaanNOhjcR-chmNt431RSYN7lHKKt_Qj2LSRd5GtjlMXQ4KgikoMOQYmf6p0Ll_qu9r2_0fLs6GQb53KAEVoEZmgVl0n2Xp85-DJIdSYGqJq9TLGQiUS4vRQAPv2uTgiSsh30fELVq0iQpt-wDGtYrhADxHMKVZfQpt3vruguEZjMYbjIYZscQgF4g4z47vjPG1usXQ6vLWtgRi4hgeVkDOE5a3ApAd62OXd2u6noveiVoIzUoMNS5GsWo8YcZshEZex9BKf0LiOVtjn9yM_PtReElfO9-9C-VRUD8DFFpnAwNJC1eugGJb2Uc-Fy0w'
    ,
    tokenType: models.TokenType.Aad,
    settings: {
      layoutType: models.LayoutType.Custom,
      panes: {
        filters: {
          expanded: false,
          visible: false
        },
        visualizations:{
          expanded: true
        }
      },
      customLayout: {
        displayOption: models.DisplayOption.ActualSize,
      },
    }
  };

  createSingleComponent(district: string, powerBiToken: string){

    console.log(powerBiToken)
    let id = uuidv4();
    this.embedConfig.embedUrl = `https://app.powerbi.com/reportEmbed?reportId=001cedf1-13df-4420-bad7-e976e4c24c03&groupId=37078e78-d47f-4fbd-9d27-cc69e1e4121a&filter=CrimeCoordinatesWithPlusCode%2Fdistrito%20eq%20%27${district}%27`;
    // this.embedConfig.accessToken = powerBiToken
    this.componentsCount = []

    // this.title = 'Actual'
    this.componentsCount.push({district: district, id: id})
    this.title = district
    // let pDiv  = document.getElementById('modalBodyNgFor');

    setTimeout(()=>{
      let pPowerBiReport = document.getElementById(id);
      let cDiv = pPowerBiReport!.getElementsByTagName('div');

      for (let i = 0; i < cDiv.length; i++) {
        if (cDiv[i].tagName == "DIV") {   //or use toUpperCase()
          cDiv[i].style.height = '510px';  //do styling here
          cDiv[i].style.width = '730px';  //do styling here
        }
      }
      console.log(pPowerBiReport)

    }, 1200)




    // setTimeout(()=>{
    //   // let pDiv  = document.getElementById('uuidH2s5');
    //   // console.log(pDiv)
    //   // let cDiv = pDiv!.getElementsByTagName('div');
    //
    //   // for (let i = 0; i < cDiv.length; i++) {
    //   //   if (cDiv[i].tagName == "DIV") {   //or use toUpperCase()
    //   //     cDiv[i].style.height = '510px';  //do styling here
    //   //     cDiv[i].style.width = '730px';  //do styling here
    //   //   }
    //   // }
    // }, 1000)

  }
  ngAfterViewInit(): void {

  }
}
