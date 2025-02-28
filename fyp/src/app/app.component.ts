import { Component, Host, HostListener, signal } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'fyp';
  showNavbar:boolean=false;

  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth)

  @HostListener('window:resize')
  onResize(){
    this.screenWidth.set(window.innerWidth);
    if(this.screenWidth() <768){
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  constructor(
    private router:Router
  ){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.showNavbar = !(currentRoute === '/login' || currentRoute === '/signup');
      }
    });
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed:boolean):void{
      this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);

  }

  showSidebar() {
    return !(this.router.url.includes('/login') || this.router.url.includes('/signup'));
  }
}
