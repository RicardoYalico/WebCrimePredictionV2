import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {IReportEmbedConfiguration} from "embed";
import {models} from "powerbi-client";
import {PowerBIEmbedModule} from "powerbi-client-angular";

export interface myinterface {
  remove(index: number): any;
}

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    PowerBIEmbedModule
  ],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements AfterViewInit{
  // @Input() inputSearch ="San Miguel"
  search = ''
  @ViewChild('powerBiReport') powerBiReport!: ElementRef;

  public index: number = 0;
  public selfRef: ChildComponent | undefined;

  //interface for Parent-Child interaction
  public compInteraction: myinterface | undefined;

  constructor() {

  }
  embedConfig: IReportEmbedConfiguration = {

    type: 'report',
    id: '001cedf1-13df-4420-bad7-e976e4c24c03',
    embedUrl: `https://app.powerbi.com/reportEmbed?reportId=001cedf1-13df-4420-bad7-e976e4c24c03&groupId=37078e78-d47f-4fbd-9d27-cc69e1e4121a&filter=CrimeCoordinatesWithPlusCode%2Fdistrito%20eq%20%27${localStorage.getItem('distrito')!.toString()}%27`,
    accessToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGUwY2IwNjAtMDlhZC00OWY1LWEwMDUtNjhiOWI0OWFhMWY2LyIsImlhdCI6MTcyNTU2OTkwNywibmJmIjoxNzI1NTY5OTA3LCJleHAiOjE3MjU1NzU0MDIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUE2Mm9BcUw0RFJxY3p5T3NacWR5U2ZOSk03NzkvdFY1ZGlHci9kTUdZMjdVL1pkemJYcS9vaEJ4dTVObjN1YU8rUWt5ZUdqQUkzNkJhbEY0WVNGZG9JQmQzTHBzSDZNREJrNVc1emdFQ281VT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMjNkOGY2YmQtMWViMC00Y2MyLWEwOGMtN2JmNTI1YzY3YmNkIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJZYWxpY28gUm9uY2FsIiwiZ2l2ZW5fbmFtZSI6IlJpY2FyZG8gQW5kZXJzb24iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyMDAuMTIzLjIzMC4yNTEiLCJuYW1lIjoidTIwMTkyMDE0MCAoWWFsaWNvIFJvbmNhbCwgUmljYXJkbyBBbmRlcnNvbikiLCJvaWQiOiIzZDFiNmJiYi0wNjdmLTQxYmMtYjE3Yy00MGZiZGI1ZWQ3M2IiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtODU4MzU0MTc4LTE3MjYzMDU4NC0xMTM2MjYzODYwLTEyNzA3NTUiLCJwdWlkIjoiMTAwMzIwMDA0NUNDRTNCMCIsInJoIjoiMC5BUVlBWUxBTURxMEo5VW1nQldpNXRKcWg5Z2tBQUFBQUFBQUF3QUFBQUFBQUFBQUdBQjAuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWQuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInN1YiI6ImpHdFJVUEF1bkEzN0lfOUkyLUJyeTBRYWR3cFF6NENUaGkxcFBEZXJkWE0iLCJ0aWQiOiIwZTBjYjA2MC0wOWFkLTQ5ZjUtYTAwNS02OGI5YjQ5YWExZjYiLCJ1bmlxdWVfbmFtZSI6InUyMDE5MjAxNDBAdXBjLmVkdS5wZSIsInVwbiI6InUyMDE5MjAxNDBAdXBjLmVkdS5wZSIsInV0aSI6IkwydGlwZFotQmtHMEhZS0ZweXRIQVEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDE4In0.WqLM4IXfTjhkjcbW6UNIU9kq2BxJ-4viXMb0Vx4sfJAmGy3LH04KFzZ442XzfLJj92ey9Pj_4foW1796_zOQVt4HJhkMnkN6BRITpRoO_dmgJ-LffaMns1e6KAtSmHU4X3ZFG1uLq2mB0n83bwfdzSMjQu4h8w2gYLDylzwooFhdMPsLExA6-Ovy-zmJlL1369uuIcu8SiFEJHFfuLd9Tbk7PzNzq-0cdRwp6Yfl6-cfJ34wJI0L39v_XQ2dvNzsXRjUTonDN0VAsxtR_PodEBW74BFca8JQn13jcoUSyqSk6nLE3Ak1zGyAoEcpub27R58VPynDP3967eiH_Vy0yg'
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

  ngAfterViewInit(): void {
    const reportElement = this.powerBiReport.nativeElement;
    let pDiv  = document.getElementById('powerBiReport2');
    let cDiv = pDiv!.getElementsByTagName('div');

    for (let i = 0; i < cDiv.length; i++) {
      if (cDiv[i].tagName == "DIV") {   //or use toUpperCase()
        cDiv[i].style.height = '510px';  //do styling here
        cDiv[i].style.width = '730px';  //do styling here
      }
    }
  }

  removeMe(index: number) {
    this.compInteraction!.remove(index)
  }


}
