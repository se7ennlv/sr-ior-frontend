import { AppService } from '../services/app.service';
import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import { MenuService } from '../services/menu.service';

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-menuitem]',
    /* tslint:enable:component-selector */
    template: `
		<ng-container>
            <div *ngIf="root && item.visible !== false" class="layout-menuitem-root-text">{{item.label}}</div>
			<a [attr.href]="item.url" (click)="itemClick($event)" *ngIf="(!item.routerLink || item.items) && item.visible !== false" (mouseenter)="onMouseEnter()"
			   (keydown.enter)="itemClick($event)" [ngClass]="item.class" pRipple
			   [attr.target]="item.target" [attr.tabindex]="0">
				<i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.label}}</span>
				<i class="pi pi-fw layout-submenu-toggler" [ngClass]="!appService.isHorizontal() ?'pi-chevron-down': 'pi-angle-down'" *ngIf="item.items"></i>
			</a>
			<a (click)="itemClick($event)" (mouseenter)="onMouseEnter()" *ngIf="(item.routerLink && !item.items) && item.visible !== false"
			   [routerLink]="item.routerLink" routerLinkActive="active-route" [ngClass]="item.class" pRipple
			   [routerLinkActiveOptions]="{exact: true}" [attr.target]="item.target" [attr.tabindex]="0">
				<i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.label}}</span>
				<i class="pi pi-fw layout-submenu-toggler" [ngClass]="!appService.isHorizontal() ?'pi-chevron-down': 'pi-angle-down'" *ngIf="item.items"></i>
			</a>

			<ul *ngIf="item.items && item.visible !== false" role="menu" [@children]="(appService.isSlim() || appService.isHorizontal()) ? (root ? appService.isMobile()? 'visible':
			slimClick && !appService.isHorizontal() ? (active  ? 'slimVisibleAnimated' : 'slimHiddenAnimated') : (active ? 'visible' : 'hidden') :
			appService.isSlim() || appService.isHorizontal() ? (active ? 'visibleAnimated' : 'hiddenAnimated') : (active ? 'visible' : 'hidden')) :
			(root ? 'visible' :(active ? 'visibleAnimated' : 'hiddenAnimated'))">
				<ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
					<li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
				</ng-template>
			</ul>
		</ng-container>
    `,
    host: {
        '[class.layout-root-menuitem]': 'root',
        '[class.active-menuitem]': '(active && !root) || (active && (appService.isSlim() || appService.isHorizontal()))'
    },
    animations: [
        trigger('children', [
            state('void', style({
                height: '0px'
            })),
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            state('slimVisibleAnimated', style({
                opacity: 1,
                transform: 'none'
            })),
            state('slimHiddenAnimated', style({
                opacity: 0,
                transform: 'translateX(20px)'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('void => visibleAnimated, visibleAnimated => void',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('void => slimVisibleAnimated', animate('400ms cubic-bezier(.05,.74,.2,.99)')),
            transition('slimHiddenAnimated => slimVisibleAnimated', animate('400ms cubic-bezier(.05,.74,.2,.99)'))
        ])
    ]
})
export class AppMenuitemComponent implements OnInit, OnDestroy {

    @Input() item: any;
    @Input() index: number;
    @Input() root: boolean;
    @Input() parentKey: string;

    active = false;
    menuSourceSubscription: Subscription;
    menuResetSubscription: Subscription;
    key: string;
    slimClick = false;

    constructor(
        public appService: AppService,
        public router: Router,
        private cd: ChangeDetectorRef,
        private menuService: MenuService) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(key => {
            // deactivate current active menu
            if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
                this.active = false;
            }
        });

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.appService.isSlim() || this.appService.isHorizontal()) {
                    this.active = false;
                } else {
                    if (this.item.routerLink) {
                        this.updateActiveStateFromRoute();
                    } else {
                        this.active = false;
                    }
                }
            });
    }

    ngOnInit() {
        if (!(this.appService.isSlim() || this.appService.isHorizontal()) && this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }

        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    }

    updateActiveStateFromRoute() {
        this.active = this.router.isActive(this.item.routerLink[0], !this.item.items);
    }

    itemClick(event: Event) {
        if (this.appService.isSlim()) {
            this.slimClick = true;
        }

        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        // navigate with hover in horizontal mode
        if (this.root) {
            this.appService.menuHoverActive = !this.appService.menuHoverActive;
        }

        // notify other items
        this.menuService.onMenuStateChange(this.key);

        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;
        } else {
            // activate item
            this.active = true;

            if (this.appService.isMobile()) {
                this.appService.staticMenuMobileActive = false;
            }

            // reset horizontal menu
            if (this.appService.isSlim() || this.appService.isHorizontal()) {
                this.menuService.reset();
                this.appService.menuHoverActive = false;
            }

            this.appService.unblockBodyScroll();
        }

        this.removeActiveInk(event);
    }

    onMouseEnter() {
        // activate item on hover
        if (this.root  && (this.appService.isSlim() || this.appService.isHorizontal()) && this.appService.isDesktop()) {
            if (this.appService.menuHoverActive) {
                this.menuService.onMenuStateChange(this.key);
                this.active = true;
                this.slimClick = false;
            }
            else {
                if (this.appService.isSlim()) {
                    this.slimClick = true;
                }
            }
        }
    }
    removeActiveInk(event: Event) {
        let currentTarget = (event.currentTarget as HTMLElement);
        setTimeout(() => {
            if (currentTarget) {
                let activeInk = currentTarget.querySelector('.p-ink-active');
                if (activeInk) {
                    if (activeInk.classList)
                        activeInk.classList.remove('p-ink-active');
                    else
                        activeInk.className = activeInk.className.replace(new RegExp('(^|\\b)' + 'p-ink-active'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }
        }, 401);
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}
