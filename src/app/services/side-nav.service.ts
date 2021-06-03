import { Injectable, EventEmitter } from '@angular/core';
// import { DrawerComponent } from './drawer/drawer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs'

@Injectable()
export class SideNavService {
  public sideNavState$: Subject<boolean> = new Subject();

  constructor() { } 
 

  
}
