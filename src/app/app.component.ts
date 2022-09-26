import {AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {gsap, TweenMax, TimelineMax, Power1} from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import {DOCUMENT} from "@angular/common";
//import { DOCUMENT } from '@angular/platform-browser';
import {WINDOW} from "./services/window.service";
import ScrollTrigger from "gsap/ScrollTrigger";

import {NgxAnimatedGradientDirective} from 'ngx-animated-gradient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('stickyMenu') menuElement!: ElementRef;
  menuPosition: any;
  public sticky: boolean = false;

  ngAfterViewInit(): void {
    this.directive.colors = [[251, 202, 29], [250, 196, 31], [249, 180, 40],
      [247, 155, 54], [244, 119, 73], [240, 73, 97], [237, 30, 121]];
    this.directive.colorIndices = [2, 1, 3, 5, 4, 6, 7];
    this.directive.gradientSpeed = 0.02;
    this.menuPosition = this.menuElement.nativeElement.offsetTop

  }

  videosM: any;
  videosK: any;
  @ViewChild(NgxAnimatedGradientDirective)
  directive!: NgxAnimatedGradientDirective;


  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) private window: Window) {
    gsap.registerPlugin(ScrollToPlugin);

  }

  menu = new TimelineMax({paused: true, reversed: true});
  gradianCloars = [[251, 202, 29], [250, 196, 31], [249, 180, 40],
    [247, 155, 54], [244, 119, 73], [240, 73, 97], [237, 30, 121]];

  ngOnInit() {
    this.animate();
    //gsap.registerPlugin(ScrollTrigger);
    //this.createMenuAnim()
    this.directive.colors = [[251, 202, 29], [250, 196, 31], [249, 180, 40],
      [247, 155, 54], [244, 119, 73], [240, 73, 97], [237, 30, 121]]

  }

  createMenuAnim() {
    this.videosK = gsap.fromTo('#blocM',
      {ease: Power1.easeInOut, transformStyle: "preserve-3d", transformOrigin: 'center', xPercent: 0, opacity: 2},
      {xPercent: -98})
    this.videosM = gsap.fromTo('#blocK',
      {
        ease: Power1.easeIn,
        transformStyle: "preserve-3d",
        transformOrigin: 'center',
        xPercent: 0,
        opacity: 2
      }, {xPercent: 98})


  }

  scroll(event: any, el: HTMLElement) {
    event.stopPropagation();
    const topY = el.getBoundingClientRect().top;
    gsap.to(window, 5, {
      scrollTo: {
        y: el,
        offsetY: 5,
        autoKill: true,

      },
      ease: Power3.easeOut
    });
  }


  menuClick() {

    this.menu.reversed() ? this.menu.play() : this.menu.reverse();
    return console.log('clicked s');

  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
   /* const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    console.log(offset);
    offset > 100 ? this.videosM.play() : this.videosM.reverse();
    offset > 100 ? this.videosK.play() : this.videosK.reverse();
*/
  }

  animate() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".b1", {
      x: -300,
      duration: 2, scrollTrigger: {
        trigger: '.b1',
        start: '0',
        endTrigger: '.endb',
        scrub: true,
        toggleActions: 'play pause reverse none',
        markers: true
      },
    });
    gsap.to(".b2", {
      x: 300, duration: 2, scrollTrigger: {
        trigger: '.b2',
        start: '0',
        endTrigger: '.endb',
        scrub: true,
        toggleActions: 'play pause reverse none',
        markers: true
      },
    });
  }
}
