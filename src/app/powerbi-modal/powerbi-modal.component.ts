import {Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import {models} from "powerbi-client";
import {IReportEmbedConfiguration} from "embed";
import {PowerBIEmbedModule} from "powerbi-client-angular";
import * as pbi from 'powerbi-client'
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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGUwY2IwNjAtMDlhZC00OWY1LWEwMDUtNjhiOWI0OWFhMWY2LyIsImlhdCI6MTcyNzIxMTgwNiwibmJmIjoxNzI3MjExODA2LCJleHAiOjE3MjcyMTU5MDQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUFQQ04yUElFcU13UVlraTFtZWI5UW50QkxaTGt4RTUvTURjbEUvMnMydXlRT0cvOXVUcEJocmxPMnNYalNxT29BbG1pc2FXVklnS2xPSUNVbkUyZml1WWdzODBWcXlZeUsvUXlyTGszV3BBWT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMjNkOGY2YmQtMWViMC00Y2MyLWEwOGMtN2JmNTI1YzY3YmNkIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJZYWxpY28gUm9uY2FsIiwiZ2l2ZW5fbmFtZSI6IlJpY2FyZG8gQW5kZXJzb24iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiI0NS4xODkuMTA4Ljk1IiwibmFtZSI6InUyMDE5MjAxNDAgKFlhbGljbyBSb25jYWwsIFJpY2FyZG8gQW5kZXJzb24pIiwib2lkIjoiM2QxYjZiYmItMDY3Zi00MWJjLWIxN2MtNDBmYmRiNWVkNzNiIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTg1ODM1NDE3OC0xNzI2MzA1ODQtMTEzNjI2Mzg2MC0xMjcwNzU1IiwicHVpZCI6IjEwMDMyMDAwNDVDQ0UzQjAiLCJyaCI6IjAuQVFZQVlMQU1EcTBKOVVtZ0JXaTV0SnFoOWdrQUFBQUFBQUFBd0FBQUFBQUFBQUFHQUIwLiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIFBpcGVsaW5lLkRlcGxveSBQaXBlbGluZS5SZWFkLkFsbCBQaXBlbGluZS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkV3JpdGUuQWxsIFRlbmFudC5SZWFkLkFsbCBUZW5hbnQuUmVhZFdyaXRlLkFsbCBVc2VyU3RhdGUuUmVhZFdyaXRlLkFsbCBXb3Jrc3BhY2UuUmVhZC5BbGwgV29ya3NwYWNlLlJlYWRXcml0ZS5BbGwiLCJzdWIiOiJqR3RSVVBBdW5BMzdJXzlJMi1CcnkwUWFkd3BRejRDVGhpMXBQRGVyZFhNIiwidGlkIjoiMGUwY2IwNjAtMDlhZC00OWY1LWEwMDUtNjhiOWI0OWFhMWY2IiwidW5pcXVlX25hbWUiOiJ1MjAxOTIwMTQwQHVwYy5lZHUucGUiLCJ1cG4iOiJ1MjAxOTIwMTQwQHVwYy5lZHUucGUiLCJ1dGkiOiJmLXo5LU9aXzNrV0JhOWJCRXlPNEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMSAyIn0.G-Ky04KwGsy4d89B7fGm8WPben3PvX3ge7RNuLPJ8t3TDscfZE0blnpfkwntFQndptRBz3HI7dntSGp352FOD_FFgGOEjzeFvDn-dsILpVoj0Gh3xwQUCVSabpfXc5D4iMjCS6Z5_gjyfjbsytN8rLJebe-YDxrtLFDnlVkiHNN8BQq6qKo4VCvI6kUxvt3pSzdjegylxypbmNizhLj6EcWFEzDJ0pGkSVAePHwMhp4xnMg90utfbIys-9jAt9guWbffztQRBYV6m3FTFHo4QJRiRHUkkmW-f312aXTSA-NoZkOqGrmubL_C4-b_Ti6ThUfq3UVGbV4OAarkEPiYXg'
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
    let id = uuidv4();
    // this.embedConfig.embedUrl = `https://app.powerbi.com/reportEmbed?reportId=001cedf1-13df-4420-bad7-e976e4c24c03&groupId=37078e78-d47f-4fbd-9d27-cc69e1e4121a&filter=CrimeCoordinatesWithPlusCode%2Fdistrito%20eq%20%27${district}%27`;
    this.embedConfig.embedUrl = `https://app.powerbi.com/reportEmbed?reportId=001cedf1-13df-4420-bad7-e976e4c24c03&groupId=37078e78-d47f-4fbd-9d27-cc69e1e4121a&filter=CrimeCoordinatesWithPlusCode%2Fdistrito%20eq%20%27${district}%27 and UserReports/distrito%20eq%20%27${district}%27`;
    this.componentsCount = []
    this.componentsCount.push({district: district, id: id})
    this.title = district
    setTimeout(()=>{
      let pPowerBiReport = document.getElementById(id);
      let cDiv = pPowerBiReport!.getElementsByTagName('div');
      for (let i = 0; i < cDiv.length; i++) {
        if (cDiv[i].tagName == "DIV") {
          cDiv[i].style.height = '510px';
          cDiv[i].style.width = '730px';
        }
      }
    }, 1200)
  }
  ngAfterViewInit(): void {

  }
}
