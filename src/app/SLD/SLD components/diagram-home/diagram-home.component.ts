import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectorModel, Node, Connector, DiagramComponent, NodeModel, PaletteModel, PortConstraints, PortVisibility, SymbolInfo, 
  SymbolPreviewModel } from '@syncfusion/ej2-angular-diagrams'; 
import {SymbolPalette} from  '@syncfusion/ej2-diagrams'
import { DiagramModel } from '../../SLD Models/diagram-component';
import { InspectionVerificationService } from '../../../services/inspection-verification.service';
import { DiagramServicesService } from '../../../SLD/SLD Services/diagram-services.service';
import { MCBServicesService } from '../../../SLD/SLD Services/mcb-services.service';
import { MCCBServicesService } from '../../../SLD/SLD Services/mccb-services.service';
import { RCBOServicesService } from '../../../SLD/SLD Services/rcbo-services.service';
import { LightServicesService } from '../../../SLD/SLD Services/light-services.service';
import { MCB } from '../../SLD Models/mcb';
import { RCBO } from '../../SLD Models/rcbo';
import { Light } from '../../SLD Models/light';
import { MCCB } from '../../SLD Models/mccb';


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
  mccbForm!: FormGroup;
  mcbWithRcdForm!: FormGroup;
  mcb = new MCB();
  mccb = new MCCB();
  mcbGeneralTestingArray: any = [];
  mcbSafetyTestingArray: any = [];

  mccbGeneralTestingArray: any = [];
  mccbSafetyTestingArray: any = [];

  submitted: boolean = false;
  mcbFlag: boolean = false;
  mcbData: any;
  mccbFlag: boolean = false;
  mccbData: any;
  validationError: boolean= false;
  validationErrorMsg: string="";

  //Light
  lightForm!: FormGroup;
  lightData: any;
  light = new Light();
  lightFlag: boolean = false;
  lightGeneralTestingArray: any = [];
  lightSafetyTestingArray: any = [];
  submittedLight: boolean = false;

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
    this.diagramService.retriveDiagram(userName,fileName).subscribe(
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

  clickFunction(e: any,content2: any,content3: any,content4: any,content5: any,content6: any,content7: any,content9: any,content10: any) {
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
        this.mccbService.retriveMCCB(this.diagramComponent.fileName,e.element.properties.id).subscribe(
          data => {
            this.mccbData = JSON.parse(data);
            if(this.mccbData.length != 0) {
              this.retrieveMccbNode(this.mccbData);
            }
          }
        )
        this.modalService.open(content7, { centered: true,size: 'xl'});
      }
      else if(e.element.properties.id.includes('MCB_with_RCD')) {
        this.rcboService.retriveRCBO(this.diagramComponent.fileName,e.element.properties.id).subscribe(
        )
        this.modalService.open(content7, { centered: true,size: 'xl'});
        this.mccb.nodeId = e.element.properties.id;
        this.mccb.fileName = this.diagramComponent.fileName;
      }
      // else if(e.element.properties.id.includes('DC')) {
      //   this.modalService.open(content8, { centered: true,size: 'xl'});
      // }
      else if(e.element.properties.id.includes('MCB')) {
        this.mcbService.retriveMCB(this.diagramComponent.fileName,e.element.properties.id).subscribe(
          data => {
            this.mcbData = JSON.parse(data);
            if(this.mcbData.length != 0) {
              this.retrieveMcbNode(this.mcbData);
            }
          }
        )
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
  this.diagramService.fetchAllDiagramSymbols().subscribe(
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
              private diagramService: DiagramServicesService,
              private mcbService: MCBServicesService,private mccbService: MCCBServicesService,
              private rcboService: RCBOServicesService,
              private lightService: LightServicesService,
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
    this.mccbForm = this.formBuilder.group({
      referenceName: [''],
      manufacturerName: [''],
      rating: ['', Validators.required],
      voltage: ['', Validators.required],
      noOfPoles: ['', Validators.required],
      relayManufacturer: ['', Validators.required],
      model: [''],
      overCurrent: ['', Validators.required],
      setTimes: ['', Validators.required],
      earthFault: ['', Validators.required],
      setTime: ['', Validators.required],
      outgoingSizePhase: ['', Validators.required],
      outgoingSizeNeutral: ['', Validators.required],
      outgoingSizeProtective: ['', Validators.required],
      generalTestingMCCB: this.formBuilder.array([this.createGeneralTestingMCCB()]),
      safetyTestingMCCB: this.formBuilder.array([this.createSafetyTestingMCCB()]),
    });

    // this.mcbWithRcdForm = this.formBuilder.group({
    //   referenceName: [''],
    //   manufacturerName: [''],
    //   rating: ['', Validators.required],
    //   voltage: [''], 
    //   noOfPoles: ['', Validators.required],
    //   currentCurve: ['', Validators.required],
    //   residualCurrentType: ['', Validators.required],
    //   residualCurrent: ['', Validators.required],
    //   outgoingSizePhase: ['', Validators.required],
    //   outgoingSizeNeutral: ['', Validators.required],
    //   outgoingSizeProtective: ['', Validators.required],
    // //  generalTestingRCBO: this.formBuilder.array([this.createGeneralTestingRCBO()]),
    //  // safetyTestingRCBO: this.formBuilder.array([this.createSafetyTestingRCBO()]),
    // });

    this.lightForm = this.formBuilder.group({
      referenceName: [''],
      manufacturerName: [''],
      powerCapacity: ['', Validators.required],
      rating: ['', Validators.required],
      voltage: [''],
      type: ['', Validators.required],
      incomingSizePhase: ['', Validators.required],
      incomingSizeNeutral: ['', Validators.required],
      incomingSizeProtective: ['', Validators.required],
      incomingLengthPhase: ['', Validators.required],
      incomingLengthNeutral: ['', Validators.required],
      incomingLengthProtective: ['', Validators.required],
      generalTestingLight: this.formBuilder.array([this.createGeneralTestingLight()]),
      safetyTestingLight: this.formBuilder.array([this.createSafetyTestingLight()]),
    });
  }

  private createGeneralTestingMCB(): FormGroup {
    return new FormGroup({
      rN: new FormControl(''),
      rNVoltage: new FormControl('', Validators.required),
      rNResistance: new FormControl('', Validators.required),

      yN: new FormControl(''),
      yNVoltage: new FormControl('', Validators.required),
      yNResistance: new FormControl('', Validators.required),

      bN: new FormControl(''),
      bNVoltage: new FormControl('', Validators.required),
      bNResistance: new FormControl('', Validators.required),

      rE: new FormControl(''),
      rEVoltage: new FormControl('', Validators.required),
      rEResistance: new FormControl('', Validators.required),

      yE: new FormControl(''),
      yEVoltage: new FormControl('', Validators.required),
      yEResistance: new FormControl('', Validators.required),

      bE: new FormControl(''),
      bEVoltage: new FormControl('', Validators.required),
      bEResistance: new FormControl('', Validators.required),

      rY: new FormControl(''),
      rYVoltage: new FormControl('', Validators.required),
      rYResistance: new FormControl('', Validators.required),

      yB: new FormControl(''),
      yBVoltage: new FormControl('', Validators.required),
      yBResistance: new FormControl('', Validators.required),

      bR: new FormControl(''),
      bRVoltage: new FormControl('', Validators.required),
      bRResistance: new FormControl('', Validators.required),

      nE: new FormControl(''),
      nEVoltage: new FormControl('', Validators.required),
      nEResistance: new FormControl('', Validators.required),

      iRCurrent: new FormControl('', Validators.required),
      iYCurrent: new FormControl('', Validators.required),
      iBCurrent: new FormControl('', Validators.required),
      iNCurrent: new FormControl('', Validators.required),
      iPECurrent: new FormControl('', Validators.required),

      powerFactor: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
    });
  }
  private createSafetyTestingMCB(): FormGroup {
    return new FormGroup({
      rN: new FormControl(''),
      rNImpedence: new FormControl('', Validators.required),
      rNCurrent: new FormControl('', Validators.required),
      rNTime: new FormControl('', Validators.required),
      rNRemarks: new FormControl('', Validators.required),

      yN: new FormControl(''),
      yNImpedence: new FormControl('', Validators.required),
      yNCurrent: new FormControl('', Validators.required),
      yNTime: new FormControl('', Validators.required),
      yNRemarks: new FormControl('', Validators.required),


      bN: new FormControl(''),
      bNImpedence: new FormControl('', Validators.required),
      bNCurrent: new FormControl('', Validators.required),
      bNTime: new FormControl('', Validators.required),
      bNRemarks: new FormControl('', Validators.required),


      rE: new FormControl(''),
      rEImpedence: new FormControl('', Validators.required),
      rECurrent: new FormControl('', Validators.required),
      rETime: new FormControl('', Validators.required),
      rERemarks: new FormControl('', Validators.required),


      yE: new FormControl(''),
      yEImpedence: new FormControl('', Validators.required),
      yECurrent: new FormControl('', Validators.required),
      yETime: new FormControl('', Validators.required),
      yERemarks: new FormControl('', Validators.required),


      bE: new FormControl(''),
      bEImpedence: new FormControl('', Validators.required),
      bECurrent: new FormControl('', Validators.required),
      bETime: new FormControl('', Validators.required),
      bERemarks: new FormControl('', Validators.required),


      rY: new FormControl(''),
      rYImpedence: new FormControl('', Validators.required),
      rYCurrent: new FormControl('', Validators.required),
      rYTime: new FormControl('', Validators.required),
      rYRemarks: new FormControl('', Validators.required),


      yB: new FormControl(''),
      yBImpedence: new FormControl('', Validators.required),
      yBCurrent: new FormControl('', Validators.required),
      yBTime: new FormControl('', Validators.required),
      yBRemarks: new FormControl('', Validators.required),


      bR: new FormControl(''),
      bRImpedence: new FormControl('', Validators.required),
      bRCurrent: new FormControl('', Validators.required),
      bRTime: new FormControl('', Validators.required),
      bRRemarks: new FormControl('', Validators.required),


      shockVoltage: new FormControl('', Validators.required),
      floorResistance: new FormControl('', Validators.required),
      wallResistance: new FormControl('', Validators.required),
    });
  }
  private createGeneralTestingMCCB(): FormGroup {
    return new FormGroup({
      rN: new FormControl(''),
      rNVoltage: new FormControl('', Validators.required),
      rNResistance: new FormControl('', Validators.required),

      yN: new FormControl(''),
      yNVoltage: new FormControl('', Validators.required),
      yNResistance: new FormControl('', Validators.required),

      bN: new FormControl(''),
      bNVoltage: new FormControl('', Validators.required),
      bNResistance: new FormControl('', Validators.required),

      rE: new FormControl(''),
      rEVoltage: new FormControl('', Validators.required),
      rEResistance: new FormControl('', Validators.required),

      yE: new FormControl(''),
      yEVoltage: new FormControl('', Validators.required),
      yEResistance: new FormControl('', Validators.required),

      bE: new FormControl(''),
      bEVoltage: new FormControl('', Validators.required),
      bEResistance: new FormControl('', Validators.required),

      rY: new FormControl(''),
      rYVoltage: new FormControl('', Validators.required),
      rYResistance: new FormControl('', Validators.required),

      yB: new FormControl(''),
      yBVoltage: new FormControl('', Validators.required),
      yBResistance: new FormControl('', Validators.required),

      bR: new FormControl(''),
      bRVoltage: new FormControl('', Validators.required),
      bRResistance: new FormControl('', Validators.required),

      nE: new FormControl(''),
      nEVoltage: new FormControl('', Validators.required),
      nEResistance: new FormControl('', Validators.required),

      iRCurrent: new FormControl('', Validators.required),
      iYCurrent: new FormControl('', Validators.required),
      iBCurrent: new FormControl('', Validators.required),
      iNCurrent: new FormControl('', Validators.required),
      iPECurrent: new FormControl('', Validators.required),

      powerFactor: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
    });
  }
  private createSafetyTestingMCCB(): FormGroup {
    return new FormGroup({
      rN: new FormControl(''),
      rNImpedence: new FormControl('', Validators.required),
      rNCurrent: new FormControl('', Validators.required),
      rNTime: new FormControl('', Validators.required),
      rNRemarks: new FormControl('', Validators.required),

      yN: new FormControl(''),
      yNImpedence: new FormControl('', Validators.required),
      yNCurrent: new FormControl('', Validators.required),
      yNTime: new FormControl('', Validators.required),
      yNRemarks: new FormControl('', Validators.required),


      bN: new FormControl(''),
      bNImpedence: new FormControl('', Validators.required),
      bNCurrent: new FormControl('', Validators.required),
      bNTime: new FormControl('', Validators.required),
      bNRemarks: new FormControl('', Validators.required),


      rE: new FormControl(''),
      rEImpedence: new FormControl('', Validators.required),
      rECurrent: new FormControl('', Validators.required),
      rETime: new FormControl('', Validators.required),
      rERemarks: new FormControl('', Validators.required),


      yE: new FormControl(''),
      yEImpedence: new FormControl('', Validators.required),
      yECurrent: new FormControl('', Validators.required),
      yETime: new FormControl('', Validators.required),
      yERemarks: new FormControl('', Validators.required),


      bE: new FormControl(''),
      bEImpedence: new FormControl('', Validators.required),
      bECurrent: new FormControl('', Validators.required),
      bETime: new FormControl('', Validators.required),
      bERemarks: new FormControl('', Validators.required),


      rY: new FormControl(''),
      rYImpedence: new FormControl('', Validators.required),
      rYCurrent: new FormControl('', Validators.required),
      rYTime: new FormControl('', Validators.required),
      rYRemarks: new FormControl('', Validators.required),


      yB: new FormControl(''),
      yBImpedence: new FormControl('', Validators.required),
      yBCurrent: new FormControl('', Validators.required),
      yBTime: new FormControl('', Validators.required),
      yBRemarks: new FormControl('', Validators.required),


      bR: new FormControl(''),
      bRImpedence: new FormControl('', Validators.required),
      bRCurrent: new FormControl('', Validators.required),
      bRTime: new FormControl('', Validators.required),
      bRRemarks: new FormControl('', Validators.required),


      shockVoltage: new FormControl('', Validators.required),
      floorResistance: new FormControl('', Validators.required),
      wallResistance: new FormControl('', Validators.required),
    });
  }
  getGeneralTestingMCBControls() : AbstractControl[] {
    return (<FormArray>this.mcbForm.get('generalTestingMCB')).controls;
  }
  getGeneralTestingMCCBControls() : AbstractControl[] {
    return (<FormArray>this.mccbForm.get('generalTestingMCCB')).controls;
  }
  getSafetyTestingMCBControls() : AbstractControl[] {
    return (<FormArray>this.mcbForm.get('safetyTestingMCB')).controls;
  }
  getSafetyTestingMCCBControls() : AbstractControl[] {
    return (<FormArray>this.mccbForm.get('safetyTestingMCCB')).controls;
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

  addMCCBTesting() {
    let generalTestingMCCBArr: any = [];
    let safetyTestingMCCBArr: any = [];

    generalTestingMCCBArr = this.mccbForm.get('generalTestingMCCB') as FormArray;
    safetyTestingMCCBArr = this.mccbForm.get('safetyTestingMCCB') as FormArray;

    generalTestingMCCBArr.push(this.createGeneralTestingMCCB());
    safetyTestingMCCBArr.push(this.createSafetyTestingMCCB());

  }
  removeMCCBtesting(a: any, i: any) {
    (this.mccbForm.get('generalTestingMCCB') as FormArray).removeAt(i);
    (this.mccbForm.get('safetyTestingMCCB') as FormArray).removeAt(i)
  }
  
  get f(){
    return this.mcbForm.controls;
  }
  get h(){
    return this.mccbForm.controls;
  }
  retrieveMcbNode(data: any) {
    this.mcbFlag = true;
    for(let i of data) {
      this.mcb.referenceName = i.referenceName;
      this.mcb.manufacturerName = i.manufacturerName;
      this.mcb.rating = i.rating;
      this.mcb.voltage = i.voltage;
      this.mcb.noOfPoles = i.noOfPoles;
      this.mcb.currentCurve = i.currentCurve;
      this.mcb.outgoingSizePhase = i.outgoingSizePhase;
      this.mcb.outgoingSizeNeutral = i.outgoingSizeNeutral;
      this.mcb.outgoingSizeProtective =i.outgoingSizeProtective;
      this.mcb.createdBy = i.createdBy;
      this.mcb.createdDate = i.createdDate;
      this.mcb.updatedBy = i.updatedBy;
      this.mcb.updatedDate = i.updatedDate;
      this.mcb.nodeId = i.nodeId;
      this.mcb.fileName = i.fileName;
      this.mcb.userName = i.userName;

      this.populateMcbForm(i);
    }
  }
  retrieveMccbNode(data: any) {
    this.mccbFlag = true;
    for(let i of data) {
      this.mccb.referenceName = i.referenceName;
      this.mccb.manufacturerName = i.manufacturerName;
      this.mccb.rating = i.rating;
      this.mccb.voltage = i.voltage;
      this.mccb.relayManufacturer= i.relayManufacturer;
      this.mccb.noOfPoles = i.noOfPoles;
      this.mccb.model = i.model;
      this.mccb.overCurrent = i.overCurrent;
      this.mccb.setTimes = i.setTimes;
      this.mccb.earthFault = i.earthFault;
      this.mccb.setTime = i.setTime;
      this.mccb.outgoingSizePhase = i.outgoingSizePhase;
      this.mccb.outgoingSizeNeutral = i.outgoingSizeNeutral;
      this.mccb.outgoingSizeProtective =i.outgoingSizeProtective;
      this.mccb.createdBy = i.createdBy;
      this.mccb.createdDate = i.createdDate;
      this.mccb.updatedBy = i.updatedBy;
      this.mccb.updatedDate = i.updatedDate;
      this.mccb.nodeId = i.nodeId;
      this.mccb.fileName = i.fileName;
     // this.mccb.userName = i.userName;

      this.populateMccbForm(i);
    }
  }
  populateMcbForm(i: any) {
    let generalTestingMCBArr : any = []
    let safetyTestingMCBArr : any = []

    for(let j of i.generalTestingMCB) {
      generalTestingMCBArr.push(this.populateGeneralTestingMCBForm(j));
    }

    for(let k of i.safetyTestingMCB) {
      safetyTestingMCBArr.push(this.populateSafetyTestingMCBForm(k));
    }

    this.mcbForm.setControl('generalTestingMCB', this.formBuilder.array(generalTestingMCBArr || []));
    this.mcbForm.setControl('safetyTestingMCB', this.formBuilder.array(safetyTestingMCBArr || []));
  }

  populateMccbForm(i: any) {
    let generalTestingMCCBArr : any = []
    let safetyTestingMCCBArr : any = []

    for(let q of i.generalTestingMCCB) {
      generalTestingMCCBArr.push(this.populateGeneralTestingMCCBForm(q));
    }

    for(let w of i.safetyTestingMCCB) {
      safetyTestingMCCBArr.push(this.populateSafetyTestingMCCBForm(w));
    }

    this.mccbForm.setControl('generalTestingMCCB', this.formBuilder.array(generalTestingMCCBArr || []));
    this.mccbForm.setControl('safetyTestingMCCB', this.formBuilder.array(safetyTestingMCCBArr || []));
  }
  populateGeneralTestingMCBForm(j: any): FormGroup {
    let rN = [];
    let yN = [];	
    let bN = [];
    let rE = [];
    let yE = [];	
    let bE = [];
    let rY = [];
    let yB = [];	
    let bR = [];
    let nE = [];
    
    rN = j.rN.split(",");
    yN = j.yN.split(",");
    bN = j.bN.split(",");
    rE = j.rE.split(",");
    yE = j.yE.split(",");
    bE = j.bE.split(",");
    rY = j.rY.split(",");
    yB = j.yB.split(",");
    bR = j.bR.split(",");
    nE = j.nE.split(",");

    return new FormGroup({
      generalTestingMCBId: new FormControl(j.generalTestingMCBId),
      rN: new FormControl(''),
      rNVoltage: new FormControl(rN[0], Validators.required),
      rNResistance: new FormControl(rN[1], Validators.required),

      yN: new FormControl(''),
      yNVoltage: new FormControl(yN[0], Validators.required),
      yNResistance: new FormControl(yN[1], Validators.required),

      bN: new FormControl(''),
      bNVoltage: new FormControl(bN[0], Validators.required),
      bNResistance: new FormControl(bN[1], Validators.required),

      rE: new FormControl(''),
      rEVoltage: new FormControl(rE[0], Validators.required),
      rEResistance: new FormControl(rE[1], Validators.required),

      yE: new FormControl(''),
      yEVoltage: new FormControl(yE[0], Validators.required),
      yEResistance: new FormControl(yE[1], Validators.required),

      bE: new FormControl(''),
      bEVoltage: new FormControl(bE[0], Validators.required),
      bEResistance: new FormControl(bE[1], Validators.required),

      rY: new FormControl(''),
      rYVoltage: new FormControl(rY[0], Validators.required),
      rYResistance: new FormControl(rY[1], Validators.required),

      yB: new FormControl(''),
      yBVoltage: new FormControl(yB[0], Validators.required),
      yBResistance: new FormControl(yB[1], Validators.required),

      bR: new FormControl(''),
      bRVoltage: new FormControl(bR[0], Validators.required),
      bRResistance: new FormControl(bR[1], Validators.required),

      nE: new FormControl(''),
      nEVoltage: new FormControl(nE[0], Validators.required),
      nEResistance: new FormControl(nE[1], Validators.required),

      iRCurrent: new FormControl(j.iRCurrent, Validators.required),
      iYCurrent: new FormControl(j.iYCurrent, Validators.required),
      iBCurrent: new FormControl(j.iBCurrent, Validators.required),
      iNCurrent: new FormControl(j.iNCurrent, Validators.required),
      iPECurrent: new FormControl(j.iPECurrent, Validators.required),

      powerFactor: new FormControl(j.powerFactor, Validators.required),
      frequency: new FormControl(j.frequency, Validators.required),
    });
  }

  populateSafetyTestingMCBForm(k: any): FormGroup {
    let rN = [];
    let yN = [];	
    let bN = [];
    let rE = [];
    let yE = [];	
    let bE = [];
    let rY = [];
    let yB = [];	
    let bR = [];
    
    rN = k.rN.split(",");
    yN = k.yN.split(",");
    bN = k.bN.split(",");
    rE = k.rE.split(",");
    yE = k.yE.split(",");
    bE = k.bE.split(",");
    rY = k.rY.split(",");
    yB = k.yB.split(",");
    bR = k.bR.split(",");

    return new FormGroup({
      safetyTestingMCBId: new FormControl(k.safetyTestingMCBId),
      rN: new FormControl(''),
      rNImpedence: new FormControl(rN[0], Validators.required),
      rNCurrent: new FormControl(rN[1], Validators.required),
      rNTime: new FormControl(rN[2], Validators.required),
      rNRemarks: new FormControl(rN[3], Validators.required),

      yN: new FormControl(''),
      yNImpedence: new FormControl(yN[0], Validators.required),
      yNCurrent: new FormControl(yN[1], Validators.required),
      yNTime: new FormControl(yN[2], Validators.required),
      yNRemarks: new FormControl(yN[3], Validators.required),

      bN: new FormControl(''),
      bNImpedence: new FormControl(bN[0], Validators.required),
      bNCurrent: new FormControl(bN[1], Validators.required),
      bNTime: new FormControl(bN[2], Validators.required),
      bNRemarks: new FormControl(bN[3], Validators.required),

      rE: new FormControl(''),
      rEImpedence: new FormControl(rE[0], Validators.required),
      rECurrent: new FormControl(rE[1], Validators.required),
      rETime: new FormControl(rE[2], Validators.required),
      rERemarks: new FormControl(rE[3], Validators.required),

      yE: new FormControl(''),
      yEImpedence: new FormControl(yE[0], Validators.required),
      yECurrent: new FormControl(yE[1], Validators.required),
      yETime: new FormControl(yE[2], Validators.required),
      yERemarks: new FormControl(yE[3], Validators.required),

      bE: new FormControl(''),
      bEImpedence: new FormControl(bE[0], Validators.required),
      bECurrent: new FormControl(bE[1], Validators.required),
      bETime: new FormControl(bE[2], Validators.required),
      bERemarks: new FormControl(bE[3], Validators.required),

      rY: new FormControl(''),
      rYImpedence: new FormControl(rY[0], Validators.required),
      rYCurrent: new FormControl(rY[1], Validators.required),
      rYTime: new FormControl(rY[2], Validators.required),
      rYRemarks: new FormControl(rY[3], Validators.required),

      yB: new FormControl(''),
      yBImpedence: new FormControl(yB[0], Validators.required),
      yBCurrent: new FormControl(yB[1], Validators.required),
      yBTime: new FormControl(yB[2], Validators.required),
      yBRemarks: new FormControl(yB[3], Validators.required),

      bR: new FormControl(''),
      bRImpedence: new FormControl(bR[0], Validators.required),
      bRCurrent: new FormControl(bR[1], Validators.required),
      bRTime: new FormControl(bR[2], Validators.required),
      bRRemarks: new FormControl(bR[3], Validators.required),

      shockVoltage: new FormControl(k.shockVoltage, Validators.required),
      floorResistance: new FormControl(k.floorResistance, Validators.required),
      wallResistance: new FormControl(k.wallResistance, Validators.required),
    });
  }

  populateGeneralTestingMCCBForm(q: any): FormGroup {
    let rN = [];
    let yN = [];	
    let bN = [];
    let rE = [];
    let yE = [];	
    let bE = [];
    let rY = [];
    let yB = [];	
    let bR = [];
    let nE = [];
    
    rN = q.rN.split(",");
    yN = q.yN.split(",");
    bN = q.bN.split(",");
    rE = q.rE.split(",");
    yE = q.yE.split(",");
    bE = q.bE.split(",");
    rY = q.rY.split(",");
    yB = q.yB.split(",");
    bR = q.bR.split(",");
    nE = q.nE.split(",");

    return new FormGroup({
      generalTestingMCCBId: new FormControl(q.generalTestingMCCBId),
      rN: new FormControl(''),
      rNVoltage: new FormControl(rN[0], Validators.required),
      rNResistance: new FormControl(rN[1], Validators.required),

      yN: new FormControl(''),
      yNVoltage: new FormControl(yN[0], Validators.required),
      yNResistance: new FormControl(yN[1], Validators.required),

      bN: new FormControl(''),
      bNVoltage: new FormControl(bN[0], Validators.required),
      bNResistance: new FormControl(bN[1], Validators.required),

      rE: new FormControl(''),
      rEVoltage: new FormControl(rE[0], Validators.required),
      rEResistance: new FormControl(rE[1], Validators.required),

      yE: new FormControl(''),
      yEVoltage: new FormControl(yE[0], Validators.required),
      yEResistance: new FormControl(yE[1], Validators.required),

      bE: new FormControl(''),
      bEVoltage: new FormControl(bE[0], Validators.required),
      bEResistance: new FormControl(bE[1], Validators.required),

      rY: new FormControl(''),
      rYVoltage: new FormControl(rY[0], Validators.required),
      rYResistance: new FormControl(rY[1], Validators.required),

      yB: new FormControl(''),
      yBVoltage: new FormControl(yB[0], Validators.required),
      yBResistance: new FormControl(yB[1], Validators.required),

      bR: new FormControl(''),
      bRVoltage: new FormControl(bR[0], Validators.required),
      bRResistance: new FormControl(bR[1], Validators.required),

      nE: new FormControl(''),
      nEVoltage: new FormControl(nE[0], Validators.required),
      nEResistance: new FormControl(nE[1], Validators.required),

      iRCurrent: new FormControl(q.iRCurrent, Validators.required),
      iYCurrent: new FormControl(q.iYCurrent, Validators.required),
      iBCurrent: new FormControl(q.iBCurrent, Validators.required),
      iNCurrent: new FormControl(q.iNCurrent, Validators.required),
      iPECurrent: new FormControl(q.iPECurrent, Validators.required),

      powerFactor: new FormControl(q.powerFactor, Validators.required),
      frequency: new FormControl(q.frequency, Validators.required),
    });
  }

  populateSafetyTestingMCCBForm(w: any): FormGroup {
    let rN = [];
    let yN = [];	
    let bN = [];
    let rE = [];
    let yE = [];	
    let bE = [];
    let rY = [];
    let yB = [];	
    let bR = [];
    
    rN = w.rN.split(",");
    yN = w.yN.split(",");
    bN = w.bN.split(",");
    rE = w.rE.split(",");
    yE = w.yE.split(",");
    bE = w.bE.split(",");
    rY = w.rY.split(",");
    yB = w.yB.split(",");
    bR = w.bR.split(",");

    return new FormGroup({
      safetyTestingMCCBId: new FormControl(w.safetyTestingMCCBId),
      rN: new FormControl(''),
      rNImpedence: new FormControl(rN[0], Validators.required),
      rNCurrent: new FormControl(rN[1], Validators.required),
      rNTime: new FormControl(rN[2], Validators.required),
      rNRemarks: new FormControl(rN[3], Validators.required),

      yN: new FormControl(''),
      yNImpedence: new FormControl(yN[0], Validators.required),
      yNCurrent: new FormControl(yN[1], Validators.required),
      yNTime: new FormControl(yN[2], Validators.required),
      yNRemarks: new FormControl(yN[3], Validators.required),

      bN: new FormControl(''),
      bNImpedence: new FormControl(bN[0], Validators.required),
      bNCurrent: new FormControl(bN[1], Validators.required),
      bNTime: new FormControl(bN[2], Validators.required),
      bNRemarks: new FormControl(bN[3], Validators.required),

      rE: new FormControl(''),
      rEImpedence: new FormControl(rE[0], Validators.required),
      rECurrent: new FormControl(rE[1], Validators.required),
      rETime: new FormControl(rE[2], Validators.required),
      rERemarks: new FormControl(rE[3], Validators.required),

      yE: new FormControl(''),
      yEImpedence: new FormControl(yE[0], Validators.required),
      yECurrent: new FormControl(yE[1], Validators.required),
      yETime: new FormControl(yE[2], Validators.required),
      yERemarks: new FormControl(yE[3], Validators.required),

      bE: new FormControl(''),
      bEImpedence: new FormControl(bE[0], Validators.required),
      bECurrent: new FormControl(bE[1], Validators.required),
      bETime: new FormControl(bE[2], Validators.required),
      bERemarks: new FormControl(bE[3], Validators.required),

      rY: new FormControl(''),
      rYImpedence: new FormControl(rY[0], Validators.required),
      rYCurrent: new FormControl(rY[1], Validators.required),
      rYTime: new FormControl(rY[2], Validators.required),
      rYRemarks: new FormControl(rY[3], Validators.required),

      yB: new FormControl(''),
      yBImpedence: new FormControl(yB[0], Validators.required),
      yBCurrent: new FormControl(yB[1], Validators.required),
      yBTime: new FormControl(yB[2], Validators.required),
      yBRemarks: new FormControl(yB[3], Validators.required),

      bR: new FormControl(''),
      bRImpedence: new FormControl(bR[0], Validators.required),
      bRCurrent: new FormControl(bR[1], Validators.required),
      bRTime: new FormControl(bR[2], Validators.required),
      bRRemarks: new FormControl(bR[3], Validators.required),

      shockVoltage: new FormControl(w.shockVoltage, Validators.required),
      floorResistance: new FormControl(w.floorResistance, Validators.required),
      wallResistance: new FormControl(w.wallResistance, Validators.required),
    });
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

  private createGeneralTestingLight(): FormGroup {
    return new FormGroup({
      phN: new FormControl(''),
      phNVoltage: new FormControl('', Validators.required),
      phNIResistance: new FormControl('', Validators.required),
      phNCResistance: new FormControl('', Validators.required),

      phE: new FormControl(''),
      phEVoltage: new FormControl('', Validators.required),
      phEIResistance: new FormControl('', Validators.required),
      phECResistance: new FormControl('', Validators.required),

      nE: new FormControl(''),
      nEVoltage: new FormControl('', Validators.required),
      nEIResistance: new FormControl('', Validators.required),
      nECResistance: new FormControl('', Validators.required),

      iRCurrent: new FormControl('', Validators.required),
      iNCurrent: new FormControl('', Validators.required),
      iPECurrent: new FormControl('', Validators.required),

      powerFactor: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
    });
  }

  private createSafetyTestingLight(): FormGroup {
    return new FormGroup({
      phN: new FormControl(''),
      phNImpedence: new FormControl('', Validators.required),
      phNCurrent: new FormControl('', Validators.required),
      phNTime: new FormControl('', Validators.required),
      phNRemarks: new FormControl('', Validators.required),

      phE: new FormControl(''),
      phEImpedence: new FormControl('', Validators.required),
      phECurrent: new FormControl('', Validators.required),
      phETime: new FormControl('', Validators.required),
      phERemarks: new FormControl('', Validators.required),


      nE: new FormControl(''),
      nEImpedence: new FormControl('', Validators.required),
      nECurrent: new FormControl('', Validators.required),
      nETime: new FormControl('', Validators.required),
      nERemarks: new FormControl('', Validators.required),

      shockVoltage: new FormControl('', Validators.required),
      floorResistance: new FormControl('', Validators.required),
      wallResistance: new FormControl('', Validators.required),
    });
  }

  getGeneralTestingLightControls() : AbstractControl[] {
    return (<FormArray>this.lightForm.get('generalTestingLight')).controls;
  }

  getSafetyTestingLightControls() : AbstractControl[] {
    return (<FormArray>this.lightForm.get('safetyTestingLight')).controls;
  }

  retrieveLightNode(data: any) {
    this.lightFlag = true;
    for(let i of data) {
      this.light.referenceName = i.referenceName;
      this.light.manufacturerName = i.manufacturerName;
      this.light.powerCapacity = i.powerCapacity;
      this.light.rating = i.rating;
      this.light.voltage = i.voltage;
      this.light.type = i.type;
      this.light.incomingSizePhase = i.incomingSizePhase;
      this.light.incomingSizeNeutral = i.incomingSizeNeutral;
      this.light.incomingSizeProtective = i.incomingSizeProtective;
      this.light.incomingLengthPhase = i.incomingLengthPhase;
      this.light.incomingLengthNeutral = i.incomingLengthNeutral;
      this.light.incomingLengthProtective =i.incomingLengthProtective;
      this.light.createdBy = i.createdBy;
      this.light.createdDate = i.createdDate;
      this.light.updatedBy = i.updatedBy;
      this.light.updatedDate = i.updatedDate;
      this.light.nodeId = i.nodeId;
      this.light.fileName = i.fileName;
      this.light.userName = i.userName;

      this.populateLightForm(i);
    }
  }

  populateLightForm(i: any) {
    let generalTestingLightArr : any = []
    let safetyTestingLightArr : any = []

    for(let j of i.generalTestingLight) {
      generalTestingLightArr.push(this.populateGeneralTestingLightForm(j));
    }

    for(let k of i.safetyTestingLight) {
      safetyTestingLightArr.push(this.populateSafetyTestingLightForm(k));
    }

    this.lightForm.setControl('generalTestingLight', this.formBuilder.array(generalTestingLightArr || []));
    this.lightForm.setControl('safetyTestingLight', this.formBuilder.array(safetyTestingLightArr || []));
  }

  populateGeneralTestingLightForm(j: any): FormGroup {
    let phN = [];
    let phE = [];	
    let nE = [];
    
    phN = j.phN.split(",");
    phE = j.phE.split(",");
    nE = j.nE.split(",");

    return new FormGroup({
      generalTestingLightId: new FormControl(j.generalTestingLightId),
      phN: new FormControl(''),
      phNVoltage: new FormControl(phN[0], Validators.required),
      phNIResistance: new FormControl(phN[1], Validators.required),
      phNCResistance: new FormControl(phN[2], Validators.required),

      phE: new FormControl(''),
      phEVoltage: new FormControl(phE[0], Validators.required),
      phEIResistance: new FormControl(phE[1], Validators.required),
      phECResistance: new FormControl(phE[2], Validators.required),

      nE: new FormControl(''),
      nEVoltage: new FormControl(nE[0], Validators.required),
      nEIResistance: new FormControl(nE[1], Validators.required),
      nECResistance: new FormControl(nE[2], Validators.required),

      iRCurrent: new FormControl(j.iRCurrent, Validators.required),
      iNCurrent: new FormControl(j.iNCurrent, Validators.required),
      iPECurrent: new FormControl(j.iPECurrent, Validators.required),

      powerFactor: new FormControl(j.powerFactor, Validators.required),
      frequency: new FormControl(j.frequency, Validators.required),
    });
  }

  populateSafetyTestingLightForm(k: any): FormGroup {
    let phN = [];
    let phE = [];	
    let nE = [];
    
    phN = k.phN.split(",");
    phE = k.phE.split(",");
    nE = k.nE.split(",");
    
    return new FormGroup({
      safetyTestingLightId: new FormControl(k.safetyTestingLightId),
      phN: new FormControl(''),
      phNImpedence: new FormControl(phN[0], Validators.required),
      phNCurrent: new FormControl(phN[1], Validators.required),
      phNTime: new FormControl(phN[2], Validators.required),
      phNRemarks: new FormControl(phN[3], Validators.required),

      phE: new FormControl(''),
      phEImpedence: new FormControl(phE[0], Validators.required),
      phECurrent: new FormControl(phE[1], Validators.required),
      phETime: new FormControl(phE[2], Validators.required),
      phERemarks: new FormControl(phE[3], Validators.required),

      nE: new FormControl(''),
      nEImpedence: new FormControl(nE[0], Validators.required),
      nECurrent: new FormControl(nE[1], Validators.required),
      nETime: new FormControl(nE[2], Validators.required),
      nERemarks: new FormControl(nE[3], Validators.required),

      shockVoltage: new FormControl(k.shockVoltage, Validators.required),
      floorResistance: new FormControl(k.floorResistance, Validators.required),
      wallResistance: new FormControl(k.wallResistance, Validators.required),
    });
  }

  addLightTesting() {
    let generalTestingLightArr: any = [];
    let safetyTestingLightArr: any = [];

    generalTestingLightArr = this.lightForm.get('generalTestingLight') as FormArray;
    safetyTestingLightArr = this.lightForm.get('safetyTestingLight') as FormArray;

    generalTestingLightArr.push(this.createGeneralTestingLight());
    safetyTestingLightArr.push(this.createSafetyTestingLight());
  }

  removeLighttesting(a: any, i: any) {
    (this.lightForm.get('generalTestingLight') as FormArray).removeAt(i);
    (this.lightForm.get('safetyTestingLight') as FormArray).removeAt(i)
  }

  //submit MCB
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

      arr1.push(i.controls.rNVoltage.value, i.controls.rNResistance.value);
      arr2.push(i.controls.yNVoltage.value, i.controls.yNResistance.value);
      arr3.push(i.controls.bNVoltage.value, i.controls.bNResistance.value);
      arr4.push(i.controls.rEVoltage.value, i.controls.rEResistance.value);
      arr5.push(i.controls.yEVoltage.value, i.controls.yEResistance.value);
      arr6.push(i.controls.bEVoltage.value, i.controls.bEResistance.value);
      arr7.push(i.controls.rYVoltage.value, i.controls.rYResistance.value);
      arr8.push(i.controls.yBVoltage.value, i.controls.yBResistance.value);
      arr9.push(i.controls.bRVoltage.value, i.controls.bRResistance.value);
      arr10.push(i.controls.nEVoltage.value, i.controls.nEResistance.value);

      let rN: String = '';
      let yN: String = '';
      let bN: String = '';
      let rE: String = '';
      let yE: String = '';
      let bE: String = '';
      let rY: String = '';
      let yB: String = '';
      let bR: String = '';
      let nE: String = '';


      if(i.controls.iRCurrent.value == '' || i.controls.iRCurrent.value == null || i.controls.iRCurrent.value == undefined) {
        i.controls.iRCurrent.setValue('NA');
      }

      if(i.controls.iYCurrent.value == '' || i.controls.iYCurrent.value == null || i.controls.iYCurrent.value == undefined) {
        i.controls.iYCurrent.setValue('NA');
      }

      if(i.controls.iBCurrent.value == '' || i.controls.iBCurrent.value == null || i.controls.iBCurrent.value == undefined) {
        i.controls.iBCurrent.setValue('NA');
      }

      if(i.controls.iNCurrent.value == '' || i.controls.iNCurrent.value == null || i.controls.iNCurrent.value == undefined) {
        i.controls.iNCurrent.setValue('NA');
      }

      if(i.controls.iPECurrent.value == '' || i.controls.iPECurrent.value == null || i.controls.iPECurrent.value == undefined) {
        i.controls.iPECurrent.setValue('NA');
      }


      for(let a of arr1) {
        if(a != '' && a != null && a != undefined) {
          rN += a + ',';
        }
        else {
          rN += 'NA,';
        }
      }
      rN = rN.replace(/,\s*$/, '');
      i.controls.rN.setValue(rN);



      for(let b of arr2) {
        if(b != '' && b != null && b != undefined) {
          yN += b + ',';
        }
        else {
          yN += 'NA,';
        }
      }
      yN = yN.replace(/,\s*$/, '');
      i.controls.yN.setValue(yN);


      for(let c of arr3) {
        if(c != '' && c != null && c != undefined) {
          bN += c + ',';
        }
        else {
          bN += 'NA,';
        }
      }
      bN = bN.replace(/,\s*$/, '');
      i.controls.bN.setValue(bN);


      for(let d of arr4) {
        if(d != '' && d != null && d != undefined) {
          rE += d + ',';
        }
        else {
          rE += 'NA,';
        }
      }
      rE = rE.replace(/,\s*$/, '');
      i.controls.rE.setValue(rE);



      for(let e of arr5) {
        if(e != '' && e != null && e != undefined) {
          yE += e + ',';
        }
        else {
          yE += 'NA,';
        }
      }
      yE = yE.replace(/,\s*$/, '');
      i.controls.yE.setValue(yE);


      for(let f of arr6) {
        if(f != '' && f != null && f != undefined) {
          bE += f + ',';
        }
        else {
          bE += 'NA,';
        }
      }
      bE = bE.replace(/,\s*$/, '');
      i.controls.bE.setValue(bE);


      for(let g of arr7) {
        if(g != '' && g != null && g != undefined) {
          rY += g + ',';
        }
        else {
          rY += 'NA,';
        }
      }
      rY = rY.replace(/,\s*$/, '');
      i.controls.rY.setValue(rY);


      for(let h of arr8) {
        if(h != '' && h != null && h != undefined) {
          yB += h + ',';
        }
        else {
          yB += 'NA,';
        }
      }
      yB = yB.replace(/,\s*$/, '');
      i.controls.yB.setValue(yB);


      for(let i of arr9) {
        if(i != '' && i != null && i != undefined) {
          bR += i + ',';
        }
        else {
          bR += 'NA,';
        }
      }
      bR = bR.replace(/,\s*$/, '');
      i.controls.bR.setValue(bR);


      for(let j of arr10) {
        if(j != '' && j != null && j != undefined) {
          nE += j + ',';
        }
        else {
          nE += 'NA,';
        }
      }
      nE = nE.replace(/,\s*$/, '');
      i.controls.nE.setValue(nE);   
    }

    for(let i of this.mcbSafetyTestingArray.controls) {
      let arr1: any = [];
      let arr2: any = [];
      let arr3: any = [];
      let arr4: any = [];
      let arr5: any = [];
      let arr6: any = [];
      let arr7: any = [];
      let arr8: any = [];
      let arr9: any = [];

      arr1.push(i.controls.rNImpedence.value, i.controls.rNCurrent.value, i.controls.rNTime.value, i.controls.rNRemarks.value);
      arr2.push(i.controls.yNImpedence.value, i.controls.yNCurrent.value, i.controls.yNTime.value, i.controls.yNRemarks.value);
      arr3.push(i.controls.bNImpedence.value, i.controls.bNCurrent.value, i.controls.bNTime.value, i.controls.bNRemarks.value);
      arr4.push(i.controls.rEImpedence.value, i.controls.rECurrent.value, i.controls.rETime.value, i.controls.rERemarks.value);
      arr5.push(i.controls.yEImpedence.value, i.controls.yECurrent.value, i.controls.yETime.value, i.controls.yERemarks.value);
      arr6.push(i.controls.bEImpedence.value, i.controls.bECurrent.value, i.controls.bETime.value, i.controls.bERemarks.value);
      arr7.push(i.controls.rYImpedence.value, i.controls.rYCurrent.value, i.controls.rYTime.value, i.controls.rYRemarks.value);
      arr8.push(i.controls.yBImpedence.value, i.controls.yBCurrent.value, i.controls.yBTime.value, i.controls.yBRemarks.value);
      arr9.push(i.controls.bRImpedence.value, i.controls.bRCurrent.value, i.controls.bRTime.value, i.controls.bRRemarks.value);

      let rN: String = '';
      let yN: String = '';
      let bN: String = '';
      let rE: String = '';
      let yE: String = '';
      let bE: String = '';
      let rY: String = '';
      let yB: String = '';
      let bR: String = '';

      for(let a of arr1) {
        if(a != '' && a != null && a != undefined) {
          rN += a + ',';
        }
        else {
          rN += 'NA,';
        }
      }
      rN = rN.replace(/,\s*$/, '');
      i.controls.rN.setValue(rN);



      for(let b of arr2) {
        if(b != '' && b != null && b != undefined) {
          yN += b + ',';
        }
        else {
          yN += 'NA,';
        }
      }
      yN = yN.replace(/,\s*$/, '');
      i.controls.yN.setValue(yN);


      for(let c of arr3) {
        if(c != '' && c != null && c != undefined) {
          bN += c + ',';
        }
        else {
          bN += 'NA,';
        }
      }
      bN = bN.replace(/,\s*$/, '');
      i.controls.bN.setValue(bN);


      for(let d of arr4) {
        if(d != '' && d != null && d != undefined) {
          rE += d + ',';
        }
        else {
          rE += 'NA,';
        }
      }
      rE = rE.replace(/,\s*$/, '');
      i.controls.rE.setValue(rE);



      for(let e of arr5) {
        if(e != '' && e != null && e != undefined) {
          yE += e + ',';
        }
        else {
          yE += 'NA,';
        }
      }
      yE = yE.replace(/,\s*$/, '');
      i.controls.yE.setValue(yE);


      for(let f of arr6) {
        if(f != '' && f != null && f != undefined) {
          bE += f + ',';
        }
        else {
          bE += 'NA,';
        }
      }
      bE = bE.replace(/,\s*$/, '');
      i.controls.bE.setValue(bE);


      for(let g of arr7) {
        if(g != '' && g != null && g != undefined) {
          rY += g + ',';
        }
        else {
          rY += 'NA,';
        }
      }
      rY = rY.replace(/,\s*$/, '');
      i.controls.rY.setValue(rY);


      for(let h of arr8) {
        if(h != '' && h != null && h != undefined) {
          yB += h + ',';
        }
        else {
          yB += 'NA,';
        }
      }
      yB = yB.replace(/,\s*$/, '');
      i.controls.yB.setValue(yB);


      for(let i of arr9) {
        if(i != '' && i != null && i != undefined) {
          bR += i + ',';
        }
        else {
          bR += 'NA,';
        }
      }
      bR = bR.replace(/,\s*$/, '');
      i.controls.bR.setValue(bR); 
    }

    this.mcb.generalTestingMCB = this.mcbForm.value.generalTestingMCB;
    this.mcb.safetyTestingMCB = this.mcbForm.value.safetyTestingMCB;

    this.mcbService.addMCB(this.mcb).subscribe(
      data => {

      },
      error => {
        
      }
    )
  }
  saveMCCB(flag:any,content1: any) {
    this.submitted = true;
    if(this.mccbForm.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
        return;
    }

    this.mccbGeneralTestingArray = this.mccbForm.get('generalTestingMCCB') as FormArray;
    this.mccbSafetyTestingArray = this.mccbForm.get('safetyTestingMCCB') as FormArray;

    for(let i of this.mccbGeneralTestingArray.controls) {
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

      arr1.push(i.controls.rNVoltage.value, i.controls.rNResistance.value);
      arr2.push(i.controls.yNVoltage.value, i.controls.yNResistance.value);
      arr3.push(i.controls.bNVoltage.value, i.controls.bNResistance.value);
      arr4.push(i.controls.rEVoltage.value, i.controls.rEResistance.value);
      arr5.push(i.controls.yEVoltage.value, i.controls.yEResistance.value);
      arr6.push(i.controls.bEVoltage.value, i.controls.bEResistance.value);
      arr7.push(i.controls.rYVoltage.value, i.controls.rYResistance.value);
      arr8.push(i.controls.yBVoltage.value, i.controls.yBResistance.value);
      arr9.push(i.controls.bRVoltage.value, i.controls.bRResistance.value);
      arr10.push(i.controls.nEVoltage.value, i.controls.nEResistance.value);

      let rN: String = '';
      let yN: String = '';
      let bN: String = '';
      let rE: String = '';
      let yE: String = '';
      let bE: String = '';
      let rY: String = '';
      let yB: String = '';
      let bR: String = '';
      let nE: String = '';


      if(i.controls.iRCurrent.value == '' || i.controls.iRCurrent.value == null || i.controls.iRCurrent.value == undefined) {
        i.controls.iRCurrent.setValue('NA');
      }

      if(i.controls.iYCurrent.value == '' || i.controls.iYCurrent.value == null || i.controls.iYCurrent.value == undefined) {
        i.controls.iYCurrent.setValue('NA');
      }

      if(i.controls.iBCurrent.value == '' || i.controls.iBCurrent.value == null || i.controls.iBCurrent.value == undefined) {
        i.controls.iBCurrent.setValue('NA');
      }

      if(i.controls.iNCurrent.value == '' || i.controls.iNCurrent.value == null || i.controls.iNCurrent.value == undefined) {
        i.controls.iNCurrent.setValue('NA');
      }

      if(i.controls.iPECurrent.value == '' || i.controls.iPECurrent.value == null || i.controls.iPECurrent.value == undefined) {
        i.controls.iPECurrent.setValue('NA');
      }


      for(let a of arr1) {
        if(a != '' && a != null && a != undefined) {
          rN += a + ',';
        }
        else {
          rN += 'NA,';
        }
      }
      rN = rN.replace(/,\s*$/, '');
      i.controls.rN.setValue(rN);



      for(let b of arr2) {
        if(b != '' && b != null && b != undefined) {
          yN += b + ',';
        }
        else {
          yN += 'NA,';
        }
      }
      yN = yN.replace(/,\s*$/, '');
      i.controls.yN.setValue(yN);


      for(let c of arr3) {
        if(c != '' && c != null && c != undefined) {
          bN += c + ',';
        }
        else {
          bN += 'NA,';
        }
      }
      bN = bN.replace(/,\s*$/, '');
      i.controls.bN.setValue(bN);


      for(let d of arr4) {
        if(d != '' && d != null && d != undefined) {
          rE += d + ',';
        }
        else {
          rE += 'NA,';
        }
      }
      rE = rE.replace(/,\s*$/, '');
      i.controls.rE.setValue(rE);



      for(let e of arr5) {
        if(e != '' && e != null && e != undefined) {
          yE += e + ',';
        }
        else {
          yE += 'NA,';
        }
      }
      yE = yE.replace(/,\s*$/, '');
      i.controls.yE.setValue(yE);


      for(let f of arr6) {
        if(f != '' && f != null && f != undefined) {
          bE += f + ',';
        }
        else {
          bE += 'NA,';
        }
      }
      bE = bE.replace(/,\s*$/, '');
      i.controls.bE.setValue(bE);


      for(let g of arr7) {
        if(g != '' && g != null && g != undefined) {
          rY += g + ',';
        }
        else {
          rY += 'NA,';
        }
      }
      rY = rY.replace(/,\s*$/, '');
      i.controls.rY.setValue(rY);


      for(let h of arr8) {
        if(h != '' && h != null && h != undefined) {
          yB += h + ',';
        }
        else {
          yB += 'NA,';
        }
      }
      yB = yB.replace(/,\s*$/, '');
      i.controls.yB.setValue(yB);


      for(let i of arr9) {
        if(i != '' && i != null && i != undefined) {
          bR += i + ',';
        }
        else {
          bR += 'NA,';
        }
      }
      bR = bR.replace(/,\s*$/, '');
      i.controls.bR.setValue(bR);


      for(let j of arr10) {
        if(j != '' && j != null && j != undefined) {
          nE += j + ',';
        }
        else {
          nE += 'NA,';
        }
      }
      nE = nE.replace(/,\s*$/, '');
      i.controls.nE.setValue(nE);   
    }

    for(let i of this.mccbSafetyTestingArray.controls) {
      let arr1: any = [];
      let arr2: any = [];
      let arr3: any = [];
      let arr4: any = [];
      let arr5: any = [];
      let arr6: any = [];
      let arr7: any = [];
      let arr8: any = [];
      let arr9: any = [];

      arr1.push(i.controls.rNImpedence.value, i.controls.rNCurrent.value, i.controls.rNTime.value, i.controls.rNRemarks.value);
      arr2.push(i.controls.yNImpedence.value, i.controls.yNCurrent.value, i.controls.yNTime.value, i.controls.yNRemarks.value);
      arr3.push(i.controls.bNImpedence.value, i.controls.bNCurrent.value, i.controls.bNTime.value, i.controls.bNRemarks.value);
      arr4.push(i.controls.rEImpedence.value, i.controls.rECurrent.value, i.controls.rETime.value, i.controls.rERemarks.value);
      arr5.push(i.controls.yEImpedence.value, i.controls.yECurrent.value, i.controls.yETime.value, i.controls.yERemarks.value);
      arr6.push(i.controls.bEImpedence.value, i.controls.bECurrent.value, i.controls.bETime.value, i.controls.bERemarks.value);
      arr7.push(i.controls.rYImpedence.value, i.controls.rYCurrent.value, i.controls.rYTime.value, i.controls.rYRemarks.value);
      arr8.push(i.controls.yBImpedence.value, i.controls.yBCurrent.value, i.controls.yBTime.value, i.controls.yBRemarks.value);
      arr9.push(i.controls.bRImpedence.value, i.controls.bRCurrent.value, i.controls.bRTime.value, i.controls.bRRemarks.value);

      let rN: String = '';
      let yN: String = '';
      let bN: String = '';
      let rE: String = '';
      let yE: String = '';
      let bE: String = '';
      let rY: String = '';
      let yB: String = '';
      let bR: String = '';

      for(let a of arr1) {
        if(a != '' && a != null && a != undefined) {
          rN += a + ',';
        }
        else {
          rN += 'NA,';
        }
      }
      rN = rN.replace(/,\s*$/, '');
      i.controls.rN.setValue(rN);



      for(let b of arr2) {
        if(b != '' && b != null && b != undefined) {
          yN += b + ',';
        }
        else {
          yN += 'NA,';
        }
      }
      yN = yN.replace(/,\s*$/, '');
      i.controls.yN.setValue(yN);


      for(let c of arr3) {
        if(c != '' && c != null && c != undefined) {
          bN += c + ',';
        }
        else {
          bN += 'NA,';
        }
      }
      bN = bN.replace(/,\s*$/, '');
      i.controls.bN.setValue(bN);


      for(let d of arr4) {
        if(d != '' && d != null && d != undefined) {
          rE += d + ',';
        }
        else {
          rE += 'NA,';
        }
      }
      rE = rE.replace(/,\s*$/, '');
      i.controls.rE.setValue(rE);



      for(let e of arr5) {
        if(e != '' && e != null && e != undefined) {
          yE += e + ',';
        }
        else {
          yE += 'NA,';
        }
      }
      yE = yE.replace(/,\s*$/, '');
      i.controls.yE.setValue(yE);


      for(let f of arr6) {
        if(f != '' && f != null && f != undefined) {
          bE += f + ',';
        }
        else {
          bE += 'NA,';
        }
      }
      bE = bE.replace(/,\s*$/, '');
      i.controls.bE.setValue(bE);


      for(let g of arr7) {
        if(g != '' && g != null && g != undefined) {
          rY += g + ',';
        }
        else {
          rY += 'NA,';
        }
      }
      rY = rY.replace(/,\s*$/, '');
      i.controls.rY.setValue(rY);


      for(let h of arr8) {
        if(h != '' && h != null && h != undefined) {
          yB += h + ',';
        }
        else {
          yB += 'NA,';
        }
      }
      yB = yB.replace(/,\s*$/, '');
      i.controls.yB.setValue(yB);


      for(let i of arr9) {
        if(i != '' && i != null && i != undefined) {
          bR += i + ',';
        }
        else {
          bR += 'NA,';
        }
      }
      bR = bR.replace(/,\s*$/, '');
      i.controls.bR.setValue(bR); 
    }

    this.mccb.generalTestingMCCB = this.mccbForm.value.generalTestingMCCB;
    this.mccb.safetyTestingMCCB = this.mccbForm.value.safetyTestingMCCB;
    this.modalService.open(content1, { centered: true,size: 'md',backdrop: 'static'});

    if(!flag) {
    this.mccbService.addMCCB(this.mccb).subscribe(
      data => {
        this.popup=true;
        this.finalSpinner=false;
        this.success = true;
        this.successMsg = data;
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
  else{
    this.mccbService.updateMCCB(this.diagramComponent).subscribe(
      data => {
        this.popup=true;
        this.finalSpinner=false;
        this.success = true;
        this.successMsg = data;
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

  submit(flag: any,content1: any) {
    //var data = this.diagram.saveDiagram();
    var saveData: string = this.diagram.saveDiagram();
  
    this.diagramComponent.file = saveData;
    this.diagramComponent.userName =this.email;
    this.modalService.open(content1, { centered: true,size: 'md',backdrop: 'static'});


    if(!flag) {
      this.diagramService.addDiagram(this.diagramComponent).subscribe(
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
      this.diagramService.updateDiagram(this.diagramComponent).subscribe(
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
