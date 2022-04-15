import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectorModel, DiagramComponent, NodeModel, PaletteModel, PortConstraints, PortVisibility, SymbolInfo, SymbolPreviewModel } from '@syncfusion/ej2-angular-diagrams';
import { DiagramModel } from '../model/diagram-component';
import { InspectionVerificationService } from '../services/inspection-verification.service';

@Component({
  selector: 'app-diagram-home',
  templateUrl: './diagram-home.component.html',
  styleUrls: ['./diagram-home.component.css']
})
export class DiagramHomeComponent implements OnInit {
  @ViewChild("diagram")
  public diagram!: DiagramComponent;
  diagramComponent = new DiagramModel();
  
  public nodes: NodeModel[] = [
    {
      id: 'nodeIp1', offsetX: 100, offsetY: 50, width: 80, height: 20, annotations: [
        {
          content: 'Input 1',
          style: { fontSize: 11 }
        }],
      shape: { type: 'Image', source: 'https://www.syncfusion.com/content/images/nuget/sync_logo_icon.png' }
    },
    {
      id: 'nodeIp2', offsetX: 100, offsetY: 150, width: 80, height: 20, annotations: [
        {
          content: 'Input 2',
          style: { fontSize: 11 }
        }
      ],
    },
    {
      id: 'nodeIp3', offsetX: 100, offsetY: 250, width: 80, height: 20, annotations: [
        {
          content: 'Input 3',
          style: { fontSize: 11 }
        }
      ],
    },
    {
      id: 'nodeIp4', offsetX: 100, offsetY: 350, width: 80, height: 20, annotations: [
        {
          content: 'Input 4',
          style: { fontSize: 11 }
        }
      ],
    },
    {
      id: 'node1', offsetX: 250, offsetY: 200, width: 100, height: 200, annotations: [
        {
          content: '4X1',
          style: { fontSize: 11 }
        }
      ],
    },
    {
      id: 'node2', offsetX: 450, offsetY: 200, width: 100, height: 200, annotations: [
        {
          content: 'Output',
          style: { fontSize: 11 }
        }
      ],
    },
  ];
  diagramData: any;
  flag: boolean = false;

  public getNodeDefaults(node: any): NodeModel {
    // node.height = 200;
    // node.width = 100;
    //node.style.border = "#28a745";
    node.style.fill = "transparent";
    node.style.strokeColor = "white";    
    return node;
  }

  public getConnectorDefaults(obj: ConnectorModel): any {
    obj.style = {
      strokeColor: '#6BA5D7',
      fill: '#6BA5D7',
      strokeWidth: 2
    }
    obj.targetDecorator = {
      style: {
        fill: '#6BA5D7',
        strokeColor: '#6BA5D7'
      }
    }
  }
  
  public loadDiagram(userName: any,fileName: any){
    this.inspectionService.retriveDiagram(userName,fileName).subscribe(
      data => {
        console.log(data);
        this.diagramData = JSON.parse(data);
        this.flag = true;
        this.diagramComponent.diagramId = this.diagramData.diagramId;
        this.diagramComponent.fileName = this.diagramData.fileName;
        this.diagramComponent.createdBy = this.diagramData.createdBy;
        this.diagramComponent.createdDate = this.diagramData.createdDate;
        this.diagramComponent.updatedBy = this.diagramData.updatedBy;
        this.diagramComponent.updatedDate = this.diagramData.updatedDate;
        this.diagram.loadDiagram(this.diagramData.file);

      }
    )
  }
  // public portIp1: PointPortModel[] = [
  //   {
  //     id: 'portIp1',
  //     offset: {
  //       x: 1,
  //       y: 0.5
  //     },
  //     visibility: PortVisibility.Visible
  //   }
  // ]

  // public portIp2: PointPortModel[] = [
  //   {
  //     id: 'portIp2',
  //     offset: {
  //       x: 1,
  //       y: 0.5
  //     },
  //     visibility: PortVisibility.Visible
  //   }
  // ]

  // public portIp3: PointPortModel[] = [
  //   {
  //     id: 'portIp3',
  //     offset: {
  //       x: 1,
  //       y: 0.5
  //     },
  //     visibility: PortVisibility.Visible
  //   }
  // ]

  // public portIp4: PointPortModel[] = [
  //   {
  //     id: 'portIp4',
  //     offset: {
  //       x: 1,
  //       y: 0.5
  //     },
  //     visibility: PortVisibility.Visible
  //   }
  // ]

  // public ports: PointPortModel[] = [
  //   {
  //       id: 'port1',
  //       offset: {
  //           x: 0,
  //           y: 0.15
  //       },
  //       visibility: PortVisibility.Visible
  //   },
  //   {
  //       id: 'port2',
  //       offset: {
  //           x: 0,
  //           y: 0.35
  //       },
  //       visibility: PortVisibility.Visible
  //   },
  //   {
  //       id: 'port3',
  //       offset: {
  //           x: 0,
  //           y: 0.65
  //       },
  //       visibility: PortVisibility.Visible
  //   },
  //   {
  //       id: 'port4',
  //       offset: {
  //           x: 0,
  //           y: 0.85
  //       },
  //       visibility: PortVisibility.Visible
  //   }
  // ]




  //SymbolPalette Properties
  public expandMode: any = 'Multiple';

  public a:any= [
    { offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
    { offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
    { offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
    { offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
  ];

  //public b:any=[{ strokeWidth: 1, strokeColor: '#757575' }];
 
  public palettes: PaletteModel[] = [
    {
      id: 'flow', expanded: true, title: 'Flow Shapes',symbols: [
        {
          id: 'AC current source', addInfo: { tooltip: 'Generator' }, width: 50, height: 60,
          shape: { type: 'Image', source: '../../assets/img/ac.png' }, 
          style:{ strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
        },
        {
          id: 'Transformer', addInfo: { tooltip: 'Transformer' }, width: 50, height: 60, 
          shape: { type: 'Image', source: '../../assets/img/Generator.png' }, 
          style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
        },
        {
          id: 'Switch', addInfo: { tooltip: 'Switch' }, width: 50, height: 60, 
          shape: { type: 'Image', source: '../../assets/img/switch.png' }, 
          style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
        },
        {
          id: 'Fuse', addInfo: { tooltip: 'Fuse' }, width: 50, height: 60, 
          shape: { type: 'Image', source: '../../assets/img/fuse.png' }, 
          style: { strokeWidth: 1, strokeColor: '#757575' },ports: [this.a]
        },
        {
          id: 'Low Voltage', addInfo: { tooltip: 'Low Voltage' }, width: 50, height: 60, 
          shape: { type: 'Image', source: '../../assets/img/low_voltage.png' }, 
          style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
        },
        {
          id: 'Medium Voltage', addInfo: { tooltip: 'Medium Voltage' }, width: 50, height: 60, 
          shape: { type: 'Image', source: '../../assets/img/medium-voltage.png' }, 
          style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
        },
        {
          id: 'Motor', addInfo: { tooltip: 'Motor' }, width: 50, height: 60, 
          shape: { type: 'Image', source: '../../assets/img/motor.png' }, 
          style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
        },
        {
          id: 'Current Transformer', addInfo: { tooltip: 'Current Transformer' }, width: 50, height: 60, 
          shape: { type: 'Image', source: '../../assets/img/CT.png' }, 
          style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
        },
        {
          id: 'Potential Transformer', addInfo: { tooltip: 'Potential Transformer' }, width: 50, height: 60, 
          shape: { type: 'Image', source: '../../assets/img/PT.png' }, 
          style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
        },
        {
          id: 'Circuit Breaker', addInfo: { tooltip: 'Circuit Breaker' }, width: 50, height: 60, 
          shape: { type: 'Image', source: '../../assets/img/circuit_breaker.png' }, 
          style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
        },
      ]
    },
  ];

  //shape: { type: 'Image', source: 'https://www.syncfusion.com/content/images/nuget/sync_logo_icon.png' } 

  public symbolPreview: SymbolPreviewModel = { height: 50, width: 50 };

  public symbolMargin: any = { left: 10, right: 10, top: 10, bottom: 10 };

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  };

  public getSymbolDefaults(symbol: any): void {
    symbol.style.strokeColor = '#757575';
  };
  email: String = '';
  constructor(private inspectionService: InspectionVerificationService,
              private router: ActivatedRoute
    ) {
      this.email = this.router.snapshot.paramMap.get('email') || '{}';
     }

  ngOnInit(): void {
  }

  retrieveFromSavedReport(data: any) {
    this.flag = true;
    this.diagram.loadDiagram(data.file)
  }

  submit(flag: any) {
    //var data = this.diagram.saveDiagram();
    var saveData: string = this.diagram.saveDiagram();
  
    this.diagramComponent.file = saveData;
    this.diagramComponent.userName =this.email;
    this.diagramComponent.fileName ='New file6';

    if(!flag) {
      this.inspectionService.addDiagram(this.diagramComponent).subscribe(
        data => {
          this.loadDiagram(this.diagramComponent.userName,this.diagramComponent.fileName)
        }
      )
    }
    else {
      this.inspectionService.updateDiagram(this.diagramComponent).subscribe(
        data => {
          this.loadDiagram(this.diagramComponent.userName,this.diagramComponent.fileName)
        }
      )
    }
    
  }
}
