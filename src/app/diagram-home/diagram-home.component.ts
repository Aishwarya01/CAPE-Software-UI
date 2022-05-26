import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectorModel, Node, Connector, DiagramComponent, NodeModel, PaletteModel, PortConstraints, PortVisibility, SymbolInfo, 
  SymbolPreviewModel } from '@syncfusion/ej2-angular-diagrams'; 
import {SymbolPalette} from  '@syncfusion/ej2-diagrams'
import { DiagramModel } from '../model/diagram-component';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { MCB } from '../SLD/SLD Models/mcb';

@Component({
  selector: 'app-diagram-home',
  templateUrl: './diagram-home.component.html',
  styleUrls: ['./diagram-home.component.css']
})
export class DiagramHomeComponent implements OnInit {
  @ViewChild("diagram")
  public diagram!: DiagramComponent;
  
  // @ViewChild("symbolpalette")
  // public palette: SymbolPalette | any;

  @ViewChild('palette')
  public palette: SymbolPalette | any;

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
  popup: boolean = false;
  finalSpinner: boolean = false;
  success: boolean = false;
  successMsg: String = '';
  Error: boolean = false;
  errorArr: any = [];
  errorMsg: String = '';
  mode: any= 'indeterminate';
  mcbForm!: FormGroup;
  mcb = new MCB();
  mcbGeneralTestingArray: any = [];
  mcbSafetyTestingArray: any = [];
  submitted: boolean = false;

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

  getAccessibility(e: any) {
    console.log(e);
  }

  clickFunction(e: any,content2: any,content3: any,content4: any,content5: any,content6: any,content7: any,content8: any,content9: any,content10: any) {
    if(e.element instanceof Node){
      if(e.element.properties.id.includes('Inductor')) {
        this.modalService.open(content2, { centered: true,size: 'xl'});
      }
      else if(e.element.properties.id.includes('Diode')) {
        this.modalService.open(content3, { centered: true,size: 'xl'});
      }
      else if(e.element.properties.id.includes('Resistor')) {
        this.modalService.open(content4, { centered: true,size: 'xl'});
      }
      else if(e.element.properties.id.includes('Circuit Breaker')) {
        this.modalService.open(content5, { centered: true,size: 'xl'});
      }
      else if(e.element.properties.id.includes('Ground')) {
        this.modalService.open(content6, { centered: true,size: 'xl'});
      }
      else if(e.element.properties.id.includes('MCCB')) {
        this.modalService.open(content7, { centered: true,size: 'xl'});
      }
      else if(e.element.properties.id.includes('DC')) {
        this.modalService.open(content8, { centered: true,size: 'xl'});
      }
      else if(e.element.properties.id.includes('MCB')) {
        this.modalService.open(content9, { centered: true,size: 'xl'});
        this.mcb.nodeId = e.element.properties.id;
        this.mcb.fileName = this.diagramComponent.fileName;
      }
      else if(e.element.properties.id.includes('Battery')) {
        this.modalService.open(content10, { centered: true,size: 'xl'});
      }
      // let person = prompt("Please enter color of the node:", "Red");
      // e.element.style.fill = person;
      console.log(e.element)
    } else if(e.element instanceof Connector){
      let person = prompt("Please enter type of the connector:", "Straight");
      e.element.type = person;
      console.log(e.element)
    }
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
    public connectorSymbols: ConnectorModel[] = [
      {
        id: 'Orthogonal1',
        type: 'Orthogonal',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow'},
        style: { strokeWidth: 2}
    },
    {
        id: 'Orthogonal2',
        type: 'Orthogonal',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2},
        targetDecorator: { shape: 'None' }
    },
    {
        id: 'Straight1',
        type: 'Straight',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow'},
        style: { strokeWidth: 2}
    },
    {
        id: 'Straight2',
        type: 'Straight',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2},
        targetDecorator: { shape: 'None' }
    },
    {
        id: 'Bezier',
        type: 'Bezier',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2},
        targetDecorator: { shape: 'None' }
    }
    ];

  //SymbolPalette Properties
  public expandMode: any = 'Multiple';
   
  public a:any= [
    { offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
    { offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
    { offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
    { offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
  ];

  //public b:any=[{ strokeWidth: 1, strokeColor: '#757575' }];
 
  // public palettes: PaletteModel[] = [
  //   {
  //     id: 'flow', expanded: true, title: 'Flow Shapes',symbols: [
  //       {
  //         id: 'AC current source', addInfo: { tooltip: 'Generator' }, width: 50, height: 60,
  //         shape: { type: 'Image', source: '../../assets/img/ac.png' }, 
  //         style:{ strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
  //       },
  //       {
  //         id: 'Transformer', addInfo: { tooltip: 'Transformer' }, width: 50, height: 60, 
  //         shape: { type: 'Image', source: '../../assets/img/Generator.png' }, 
  //         style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
  //       },
  //       {
  //         id: 'Switch', addInfo: { tooltip: 'Switch' }, width: 50, height: 60, 
  //         shape: { type: 'Image', source: '../../assets/img/switch.png' }, 
  //         style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
  //       },
  //       {
  //         id: 'Fuse', addInfo: { tooltip: 'Fuse' }, width: 50, height: 60, 
  //         shape: { type: 'Image', source: '../../assets/img/fuse.png' }, 
  //         style: { strokeWidth: 1, strokeColor: '#757575' },ports: [this.a]
  //       },
  //       {
  //         id: 'Low Voltage', addInfo: { tooltip: 'Low Voltage' }, width: 50, height: 60, 
  //         shape: { type: 'Image', source: '../../assets/img/low_voltage.png' }, 
  //         style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
  //       },
  //       {
  //         id: 'Medium Voltage', addInfo: { tooltip: 'Medium Voltage' }, width: 50, height: 60, 
  //         shape: { type: 'Image', source: '../../assets/img/medium-voltage.png' }, 
  //         style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
  //       },
  //       {
  //         id: 'Motor', addInfo: { tooltip: 'Motor' }, width: 50, height: 60, 
  //         shape: { type: 'Image', source: '../../assets/img/motor.png' }, 
  //         style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
  //       },
  //       {
  //         id: 'Current Transformer', addInfo: { tooltip: 'Current Transformer' }, width: 50, height: 60, 
  //         shape: { type: 'Image', source: '../../assets/img/CT.png' }, 
  //         style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
  //       },
  //       {
  //         id: 'Potential Transformer', addInfo: { tooltip: 'Potential Transformer' }, width: 50, height: 60, 
  //         shape: { type: 'Image', source: '../../assets/img/PT.png' }, 
  //         style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
  //       },
  //       {
  //         id: 'Circuit Breaker', addInfo: { tooltip: 'Circuit Breaker' }, width: 50, height: 60, 
  //         shape: { type: 'Image', source: '../../assets/img/circuit_breaker.png' }, 
  //         style: { strokeWidth: 1, strokeColor: '#757575' }, ports: [this.a]
  //       },
  //     ]
  //   },
  // ];
//   private flowshapes: NodeModel[] = [
//     {
//       id: 'AC current source', addInfo: { tooltip: 'Generator' },ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Generator', addInfo: { tooltip: 'Generator' },ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Switch', addInfo: { tooltip: 'Switch' },ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Fuse', addInfo: { tooltip: 'Fuse' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Low Voltage', addInfo: { tooltip: 'Low Voltage' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Medium Voltage', addInfo: { tooltip: 'Medium Voltage' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Motor', addInfo: { tooltip: 'Motor' },ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Current Transformer', addInfo: { tooltip: 'Current Transformer' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Potential Transformer', addInfo: { tooltip: 'Potential Transformer' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Circuit Breaker', addInfo: { tooltip: 'Circuit Breaker' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Delta', addInfo: { tooltip: 'Delta' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     // {
//     //   id: 'Double Throw Switch', addInfo: { tooltip: 'Double Throw Switch' }, ports: [this.a],shape: { type: 'Image' }
//     // },
//     {
//       id: 'Ground', addInfo: { tooltip: 'Ground' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Diode', addInfo: { tooltip: 'Diode' }, ports: [this.a],shape: { type: 'Image' }
//     }, {
//       id: 'Inductor', addInfo: { tooltip: 'Inductor' }, ports: [this.a],shape: { type: 'Image' }
//     }, {
//       id: 'Resistor', addInfo: { tooltip: 'Resistor' }, ports: [this.a],shape: { type: 'Image' }
//     }, {
//       id: 'Capacitor', addInfo: { tooltip: 'Capacitor' }, ports: [this.a],shape: { type: 'Image' }
//     }, {
//       id: 'DC', addInfo: { tooltip: 'DC' }, ports: [this.a],shape: { type: 'Image' }
//     },

//     {
//       id: 'Electric Lamp', addInfo: { tooltip: 'Electric Lamp' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Wattmeter', addInfo: { tooltip: 'Wattmeter' }, ports: [this.a],shape: { type: 'Image' }
//     },
//     {
//       id: 'Wire', addInfo: { tooltip: 'Wire' }, ports: [this.a],shape: { type: 'Image' }
//     }, {
//       id: 'Ammeter', addInfo: { tooltip: 'Ammeter' }, ports: [this.a],shape: { type: 'Image' }
//     }, {
//       id: 'Voltmeter', addInfo: { tooltip: 'Voltmeter' }, ports: [this.a],shape: { type: 'Image' }
//     }, {
//       id: 'cell', addInfo: { tooltip: 'cell' }, ports: [this.a],shape: { type: 'Image' }
//     }, {
//       id: 'Battery', addInfo: { tooltip: 'Battery' }, ports: [this.a],shape: { type: 'Image' }
//     },
// ];
  public palettes: PaletteModel[] = [
    {
        id: 'flow',
        expanded: true,
       // symbols: this.flowshapes,
        iconCss: 'shapes',
        title: 'Flow Shapes'
    },
    {
      id: 'connector',
      expanded: true,
      symbols: this.connectorSymbols,
      title: 'Connector Symbols',
      iconCss: 'e-ddb-icons e-basic'
  }
];

public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
}

// public getSymbolDefaults(symbol: NodeModel | any): void { 
//     if (symbol.shape.type === 'Image') {
//         symbol.shape = { type: 'Image', source: '../../assets/img/' + symbol.id + '.png' }
//         symbol.width = 50;
//         symbol.height = 60;
//     }
//     symbol.style = { strokeWidth: 1, strokeColor: '#757575' }
// }

 public AddSymbols() {
  let shapes: any;
  this.inspectionService.fetchAllDiagramSymbols().subscribe(
    data => {
      shapes = JSON.parse(data);
      console.log('a'); 
  for (let i = 0; i < shapes.length; i++) {
    let symbolItems: any = {
    id: shapes[i].imageName,
    shape: { type: 'Image', source: shapes[i].imageSource } , width: 50, height: 50 }
    this.palette.addPaletteItem('flow', symbolItems);
    }
    },
    error => {
      console.log(error);
    }
  )
}
  //shape: { type: 'Image', source: 'https://www.syncfusion.com/content/images/nuget/sync_logo_icon.png' } 

  public symbolPreview: SymbolPreviewModel = { height: 50, width: 50 };

  public symbolMargin: any = { left: 10, right: 10, top: 10, bottom: 10 };

  // public getSymbolInfo(symbol: NodeModel): SymbolInfo {
  //   return { fit: true };
  // };

  // public getSymbolDefaults(symbol: any): void {
  //   symbol.style.strokeColor = '#757575';
  // };
  email: String = '';
  constructor(private inspectionService: InspectionVerificationService,
              private router: ActivatedRoute,
              private modalService: NgbModal,
              private formBuilder: FormBuilder
    ) {
      this.email = this.router.snapshot.paramMap.get('email') || '{}';
     }

  ngOnInit(): void {
    this.AddSymbols();
    this.mcbForm = this.formBuilder.group({
      referenceName: [''],
      manufacturerName: [''],
      rating: ['', Validators.required],
      voltage: [''],
      noOfPoles: ['', Validators.required],
      currentCurve: ['', Validators.required],
      outgoingSizePhase: ['', Validators.required],
      outgoingSizeNeutral: ['', Validators.required],
      outgoingSizeProtective: ['', Validators.required],
      generalTestingMCB: this.formBuilder.array([this.createGeneralTestingMCB()]),
      safetyTestingMCB: this.formBuilder.array([this.createSafetyTestingMCB()]),
    });
  }

  private createGeneralTestingMCB(): FormGroup {
    return new FormGroup({
      rN: new FormControl(''),
      rNVoltage: new FormControl(''),
      rNResistance: new FormControl(''),

      yN: new FormControl(''),
      yNVoltage: new FormControl(''),
      yNResistance: new FormControl(''),

      bN: new FormControl(''),
      bNVoltage: new FormControl(''),
      bNResistance: new FormControl(''),

      rE: new FormControl(''),
      rEVoltage: new FormControl(''),
      rEResistance: new FormControl(''),

      yE: new FormControl(''),
      yEVoltage: new FormControl(''),
      yEResistance: new FormControl(''),

      bE: new FormControl(''),
      bEVoltage: new FormControl(''),
      bEResistance: new FormControl(''),

      rY: new FormControl(''),
      rYVoltage: new FormControl(''),
      rYResistance: new FormControl(''),

      yB: new FormControl(''),
      yBVoltage: new FormControl(''),
      yBResistance: new FormControl(''),

      bR: new FormControl(''),
      bRVoltage: new FormControl(''),
      bRResistance: new FormControl(''),

      nE: new FormControl(''),
      nEVoltage: new FormControl(''),
      nEResistance: new FormControl(''),

      iRCurrent: new FormControl(''),
      iYCurrent: new FormControl(''),
      iBCurrent: new FormControl(''),
      iNCurrent: new FormControl(''),
      iPECurrent: new FormControl(''),

      powerFactor: new FormControl(''),
      frequency: new FormControl(''),
    });
  }

  private createSafetyTestingMCB(): FormGroup {
    return new FormGroup({
      rN: new FormControl(''),
      rNImpedence: new FormControl(''),
      rNCurrent: new FormControl(''),
      rNTime: new FormControl(''),
      rNRemarks: new FormControl(''),

      yN: new FormControl(''),
      yNImpedence: new FormControl(''),
      yNCurrent: new FormControl(''),
      yNTime: new FormControl(''),
      yNRemarks: new FormControl(''),


      bN: new FormControl(''),
      bNImpedence: new FormControl(''),
      bNCurrent: new FormControl(''),
      bNTime: new FormControl(''),
      bNRemarks: new FormControl(''),


      rE: new FormControl(''),
      rEImpedence: new FormControl(''),
      rECurrent: new FormControl(''),
      rETime: new FormControl(''),
      rERemarks: new FormControl(''),


      yE: new FormControl(''),
      yEImpedence: new FormControl(''),
      yECurrent: new FormControl(''),
      yETime: new FormControl(''),
      yERemarks: new FormControl(''),


      bE: new FormControl(''),
      bEImpedence: new FormControl(''),
      bECurrent: new FormControl(''),
      bETime: new FormControl(''),
      bERemarks: new FormControl(''),


      rY: new FormControl(''),
      rYImpedence: new FormControl(''),
      rYCurrent: new FormControl(''),
      rYTime: new FormControl(''),
      rYRemarks: new FormControl(''),


      yB: new FormControl(''),
      yBImpedence: new FormControl(''),
      yBCurrent: new FormControl(''),
      yBTime: new FormControl(''),
      yBRemarks: new FormControl(''),


      bR: new FormControl(''),
      bRImpedence: new FormControl(''),
      bRCurrent: new FormControl(''),
      bRTime: new FormControl(''),
      bRRemarks: new FormControl(''),


      shockVoltage: new FormControl(''),
      floorResistance: new FormControl(''),
      wallResistance: new FormControl(''),
    });
  }

  getGeneralTestingMCBControls() : AbstractControl[] {
    return (<FormArray>this.mcbForm.get('generalTestingMCB')).controls;
  }

  getSafetyTestingMCBControls() : AbstractControl[] {
    return (<FormArray>this.mcbForm.get('safetyTestingMCB')).controls;
  }

  addMCBTesting() {
    let generalTestingMCBArr: any = [];
    let safetyTestingMCBArr: any = [];

    generalTestingMCBArr = this.mcbForm.get('generalTestingMCB') as FormArray;
    safetyTestingMCBArr = this.mcbForm.get('safetyTestingMCB') as FormArray;

    generalTestingMCBArr.push(this.createGeneralTestingMCB());
    safetyTestingMCBArr.push(this.createSafetyTestingMCB());

  }

  removeMCBtesting(a: any, i: any) {
    (this.mcbForm.get('generalTestingMCB') as FormArray).removeAt(i);
    (this.mcbForm.get('safetyTestingMCB') as FormArray).removeAt(i)
  }

  get f(){
    return this.mcbForm.controls;
  }

  retrieveFromSavedReport(data: any) {
    this.flag = true;
    this.diagram.loadDiagram(data.file)
  }

  loadFileName(fileName: any) {
    this.diagramComponent.fileName = fileName;
  }

  closeModalDialog() {
    this.finalSpinner=true;
      this.popup=false;
      if(this.errorMsg != ""){
        this.Error = false;
        this.modalService.dismissAll(this.errorMsg = "");
      }
      else {
        this.success=false;
        this.modalService.dismissAll(this.successMsg=""); 
      }
  }

  saveMCB() {
    this.submitted = true;
    if(this.mcbForm.invalid) {
      return;
    }

    this.mcbGeneralTestingArray = this.mcbForm.get('generalTestingMCB') as FormArray;
    this.mcbSafetyTestingArray = this.mcbForm.get('safetyTestingMCB') as FormArray;

    for(let i of this.mcbGeneralTestingArray.controls) {
      let arr1: any = [];
      let arr2: any = [];
      let arr3: any = [];
      let arr4: any = [];
      let arr5: any = [];
      let arr6: any = [];
      let arr7: any = [];
      let arr8: any = [];
      let arr9: any = [];
      let arr10: any = [];

      arr1.push(i.controls.rNVOltage.value, i.controls.rNResistance.value);
      arr2.push(i.controls.yNVOltage.value, i.controls.yNResistance.value);
      arr3.push(i.controls.bNVOltage.value, i.controls.bNResistance.value);
      arr4.push(i.controls.rEVOltage.value, i.controls.rEResistance.value);
      arr5.push(i.controls.yEVOltage.value, i.controls.yEResistance.value);
      arr6.push(i.controls.bEVOltage.value, i.controls.bEResistance.value);
      arr7.push(i.controls.rYVOltage.value, i.controls.rYResistance.value);
      arr8.push(i.controls.yBVOltage.value, i.controls.yBResistance.value);
      arr9.push(i.controls.bRVOltage.value, i.controls.bRResistance.value);
      arr10.push(i.controls.nEVOltage.value, i.controls.nEResistance.value);


      if(i.controls.rNVOltage.value != '' && i.controls.rNVOltage.value != null && i.controls.rNVOltage.value != undefined) {

      }
    }

    this.inspectionService.addMCB(this.mcb).subscribe(
      data => {

      },
      error => {
        
      }
    )
  }
 
  submit(flag: any,content1: any) {
    //var data = this.diagram.saveDiagram();
    var saveData: string = this.diagram.saveDiagram();
  
    this.diagramComponent.file = saveData;
    this.diagramComponent.userName =this.email;
    this.modalService.open(content1, { centered: true,size: 'md',backdrop: 'static'});


    if(!flag) {
      this.inspectionService.addDiagram(this.diagramComponent).subscribe(
        data => {
          this.popup=true;
          this.finalSpinner=false;
          this.success = true;
          this.successMsg = data;
          this.loadDiagram(this.diagramComponent.userName,this.diagramComponent.fileName)
        },
        error => {
          this.popup=true;
          this.finalSpinner=false;
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
        }
      )
    }
    else {
      this.inspectionService.updateDiagram(this.diagramComponent).subscribe(
        data => {
          this.popup=true;
          this.finalSpinner=false;
          this.success = true;
          this.successMsg = data;
          this.loadDiagram(this.diagramComponent.userName,this.diagramComponent.fileName)
        },
        error => {
          this.popup=true;
          this.finalSpinner=false;
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
        }
      )
    }
    
  }
}
