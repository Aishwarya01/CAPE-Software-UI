import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { LTMotorServicesService } from '../../../SLD/SLD Services/LTMotor-services.service';
import { MCB } from '../../SLD Models/mcb';
import { MCCB } from '../../SLD Models/mccb';
import { RCBO } from '../../SLD Models/rcbo';
import { Light } from '../../SLD Models/light';
import { MCBComponent } from '../../SLD components/Node Components/mcb/mcb.component';
import { MatDialog } from '@angular/material/dialog';
import { MCCBComponent } from '../Node Components/mccb/mccb.component';
import { RCBOComponent } from '../Node Components/rcbo/rcbo.component';
import { LightComponent } from '../Node Components/light/light.component';
import { LTMotorComponent } from '../Node Components/ltmotor/ltmotor.component';
import { PortableApplianceComponent } from '../Node Components/portable-appliance/portable-appliance.component';	

import { FanServicesService } from '../../../SLD/SLD Services/fan-services.service';
import { FanComponent } from '../Node Components/fan/fan.component';
import { CablesComponent } from '../Node Components/cables/cables.component';
import { CablesServicesService } from '../../../SLD/SLD Services/cables-services.service';

import { CableConnectorComponent } from '../Node Components/cable-connector/cable-connector.component';
import { CableConnectorServicesService } from '../../../SLD/SLD Services/cableConnector-service.service';
import { DGComponent } from '../Node Components/dg/dg.component';
import { IDoubleClickEventArgs } from '@syncfusion/ej2-diagrams/src/diagram/objects/interface/IElement';
import { TransformerComponent } from '../Node Components/transformer/transformer.component';
import { SwitchBoardsComponent } from '../Node Components/switch-boards/switch-boards.component';
import { ACBComponent } from '../Node Components/acb/acb.component';
import { EquipotentialBondingComponent } from '../Node Components/equipotential-bonding/equipotential-bonding.component';
import { getCurrencySymbol } from '@angular/common';
import { ProtectiveEarthConductorComponent } from '../Node Components/protective-earth-conductor/protective-earth-conductor.component';
import { GlobalsService } from 'src/app/globals.service';


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
  //MCB
  mcbForm!: FormGroup;
  mcb = new MCB();
  mcbGeneralTestingArray: any = [];
  mcbSafetyTestingArray: any = [];
  submitted: boolean = false;
  mcbFlag: boolean = false;
  mcbData: any;

  //MCCB
  mccbForm!: FormGroup;
  mccb = new MCCB();
  submittedMccb: boolean = false;
  mccbFlag: boolean = false;
  mccbData: any;
  mccbGeneralTestingArray: any = [];
  mccbSafetyTestingArray: any = [];
  validationError: boolean= false;
  validationErrorMsg: string="";

  //LT Motor
  ltMotorForm!: FormGroup;
  submittedltMotor: boolean = false;
  ltMotorFlag: boolean = false;
  ltMotorData: any;
  ltMotorGeneralTestingArray: any = [];
  ltMotorSafetyTestingArray: any = [];

  //RCBO
  mcbWithRcdForm!: FormGroup;
  rcboData: any;
  rcbo = new RCBO();
  rcboFlag: boolean = false;
  rcboGeneralTestingArray: any = [];
  rcboSafetyTestingArray: any = [];
  submittedRCBO: boolean = false;

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
    //console.log(e);
    this.service.allStepsCompleted = true;
    this.service.lvClick = 1;
    this.service.sldClick = 1;
    this.service.windowTabClick=1;
    this.service.logoutClick=1;
  }

  // public doubleClick(args: IDoubleClickEventArgs) {
  //   console.log(args.source);
  //   alert('Double click Triggered');
  // }

  //clickFunction(e: any) {
  //console.log(this.diagram);
  public clickFunction(args: any) {
    //console.log(args.source);
    if(args.source instanceof Node){
      if(args.source.properties.id.includes('Inductor')) {

        //this.modalService.open(content2, { centered: true,size: 'xl'});
      }
      else if(args.source.properties.id.includes('Diode')) {
        //this.modalService.open(content3, { centered: true,size: 'xl'});
      }
      else if(args.source.properties.id.includes('Resistor')) {
        //this.modalService.open(content4, { centered: true,size: 'xl'});
      }
      else if(args.source.properties.id.includes('Circuit Breaker')) {
        //this.modalService.open(content5, { centered: true,size: 'xl'});
      }
      else if(args.source.properties.id.includes('Ground')) {
        //this.modalService.open(content6, { centered: true,size: 'xl'});
      }
      else if(args.source.properties.id.includes('Light')) {
        const dialogRef = this.dialog.open(LightComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.nodeId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
      else if(args.source.properties.id.includes('Fan')) {
        const dialogRef = this.dialog.open(FanComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.nodeId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
      else if(args.source.properties.id.includes('Wire')) {
          const dialogRef = this.dialog.open(CablesComponent, {
            width: '1100px',
            maxHeight: '90vh',
            disableClose: true,
          });
          dialogRef.componentInstance.nodeId = args.source.properties.id;
          dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
          dialogRef.componentInstance.email = this.email;
      }
      else if(args.source.properties.id.includes('MCB_with_RCD')) {
        const dialogRef = this.dialog.open(RCBOComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.nodeId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
      else if(args.source.properties.id.includes('MCB')) {
        const dialogRef = this.dialog.open(MCBComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.nodeId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
      else if(args.source.properties.id.includes('MCCB')) {
        const dialogRef = this.dialog.open(MCCBComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.nodeId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
	
      else if(args.source.properties.id.includes('Motor')) {
        const dialogRef = this.dialog.open(LTMotorComponent, {
          width: '1000px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.nodeId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
	    }

      else if(args.source.properties.id.includes('PortableAppliance')) {	
        const dialogRef = this.dialog.open(PortableApplianceComponent, {	
          width: '1450px',	
          maxHeight: '90vh',	
          disableClose: true,	
        });	
        dialogRef.componentInstance.nodeId = args.source.properties.id;;	
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;	
        dialogRef.componentInstance.email = this.email;      
      }

      else if(args.source.properties.id.includes('DieselGenerator')) {	
        const dialogRef = this.dialog.open(DGComponent, {	
          width: '1450px',	
          maxHeight: '90vh',	
          disableClose: true,	
        });	
        dialogRef.componentInstance.nodeId = args.source.properties.id;;	
        dialogRef.componentInstance.mainFileName = this.diagramComponent.fileName;	
        dialogRef.componentInstance.email = this.email;      
      }

      else if(args.source.properties.id.includes('Distribution board')) {	
        const dialogRef = this.dialog.open(SwitchBoardsComponent, {	
          width: '1450px',	
          maxHeight: '90vh',	
          disableClose: true,	
        });	
        dialogRef.componentInstance.nodeId = args.source.properties.id;;	
        dialogRef.componentInstance.mainFileName = this.diagramComponent.fileName;	
        dialogRef.componentInstance.email = this.email;      
      }

      else if(args.source.properties.id.includes('ACB')) {	
        const dialogRef = this.dialog.open(ACBComponent, {	
          width: '1450px',	
          maxHeight: '90vh',	 
          disableClose: true,	   
        });	
        dialogRef.componentInstance.nodeId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;	
        dialogRef.componentInstance.email = this.email;      
      }

      else if(args.source.properties.id.includes('EquipBond')) {	
        const dialogRef = this.dialog.open(EquipotentialBondingComponent, {	
          width: '1450px',	
          maxHeight: '90vh',	 
          disableClose: true,	   
        });	
        dialogRef.componentInstance.nodeId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;	
        dialogRef.componentInstance.email = this.email;      
      }

      else if((args.source.properties.id.includes('Transformer_delta_delta')) || (args.source.properties.id.includes('Transformer_delta_star'))
                || (args.source.properties.id.includes('Transformer_star_delta')) || (args.source.properties.id.includes('Transformer_star_star'))) {	
        const dialogRef = this.dialog.open(TransformerComponent, {	
          width: '1450px',	
          maxHeight: '90vh',	
          disableClose: true,	
        });	
        dialogRef.componentInstance.nodeId = args.source.properties.id;;	
        dialogRef.componentInstance.mainFileName = this.diagramComponent.fileName;	
        dialogRef.componentInstance.email = this.email;      
      }

      
      // let person = prompt("Please enter color of the node:", "Red");
      // args.source.style.fill = person;
    } 
    else if(args.source instanceof Connector){
      // let person = prompt("Please enter type of the connector:", "Straight");
      // args.source.type = person;
      // console.log(args.source)

      if(args.source.properties.id.includes('Orthogonal1')) {
        const dialogRef = this.dialog.open(CableConnectorComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.cableConnectorId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
      if(args.source.properties.id.includes('Orthogonal2')) {
        const dialogRef = this.dialog.open(CableConnectorComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.cableConnectorId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
      if(args.source.properties.id.includes('Straight1')) {
        const dialogRef = this.dialog.open(CableConnectorComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.cableConnectorId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
      if(args.source.properties.id.includes('Straight2')) {
        const dialogRef = this.dialog.open(CableConnectorComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.cableConnectorId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
     
      if(args.source.properties.id.includes('Bezier')) {
        const dialogRef = this.dialog.open(CableConnectorComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.cableConnectorId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }

      if(args.source.properties.id.includes('Straight3')) {
        const dialogRef = this.dialog.open(ProtectiveEarthConductorComponent, {
          width: '1100px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.cableConnectorId = args.source.properties.id;
        dialogRef.componentInstance.fileName = this.diagramComponent.fileName;
        dialogRef.componentInstance.email = this.email;
      }
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
    },
    {
      id: 'Straight3',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 40, y: 40 },
      targetDecorator: { shape: 'Arrow'},
      style: { strokeWidth: 2}
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
  for (let i = 0; i < shapes.length; i++) {
    let symbolItems: any = {
    id: shapes[i].imageName,
    shape: { type: 'Image', source: shapes[i].imageSource } , width: 50, height: 50 }
    this.palette.addPaletteItem('flow', symbolItems);
    }
    },
    error => {
      //console.log(error);
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
              private dialog: MatDialog,
              private mcbService: MCBServicesService,
              private mccbService: MCCBServicesService,
              private rcboService: RCBOServicesService,
              private lightService: LightServicesService,
              private fanService: FanServicesService,
              private cablesService: CablesServicesService,
              private LTMotorService:LTMotorServicesService,
              private cableConnectorservice:CableConnectorServicesService,
              private router: ActivatedRoute,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private service: GlobalsService
    ) {
      this.email = this.router.snapshot.paramMap.get('email') || '{}';
     }

  ngOnInit(): void {
    this.AddSymbols();
  }

  retrieveFromSavedReport(data: any) {
    this.flag = true;
    this.diagram.loadDiagram(data.file)
  }

  loadFileName(fileName: any) {
    this.diagramComponent.fileName = fileName;
  }

  doBeforeUnload() {
   
    if(this.service.logoutClick==1 && this.service.windowTabClick==0) {
      return true;
     }
     else if(this.service.logoutClick==0 && this.service.windowTabClick==0){
      return true;
     }
     else{
      window.location.reload(); 
      // Alert the user window is closing 
      return false;
     }
    }

    onPopState(event:any) {
      
      if(this.service.lvClick==1){
        //alert("Changes won't be saved!");
        if(confirm("Are you sure you want to proceed without saving?\r\n\r\nNote: To update the details, kindly click on save or update button!"))
        {
        this.service.windowTabClick=0;
        this.service.logoutClick=0; 
        this.service.lvClick=0;
         window.location.reload();
         return true;
         }
       else{
        history.pushState({page: 1}, "title 1", "?page=1");
        history.pushState({page: 2}, "title 2", "?page=2");    
        history.back();
        history.back();    
        history.go(0) // alerts "location: http://example.com/example.html, state: null"
        return false;
       }
        }
        else{
          window.location.reload();
          return;
        }
      
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

  submit(flag: any,content1: any) {
    //var data = this.diagram.saveDiagram();
    var saveData: string = this.diagram.saveDiagram();
    this.service.allStepsCompleted = false;
    this.service.lvClick = 0;
    this.service.sldClick = 0;
    this.service.windowTabClick=0;
    this.service.logoutClick=0;
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
