import { PrimeNGConfig, MenuItem } from 'primeng/api';

import { MenuService } from './menu.service';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public menuMode = 'static';
    public colorScheme = 'light';
    public menuTheme = 'layout-sidebar-bluegray';
    public inputStyle = 'outlined';
    public ripple: boolean;

    public subscription: Subscription;
    public items: MenuItem[];
    public overlayMenuActive: boolean;
    public staticMenuDesktopInactive: boolean;
    public staticMenuMobileActive: boolean;
    public menuClick: boolean;
    public search = false;
    public searchClick = false;
    public userMenuClick: boolean;
    public topbarUserMenuActive: boolean;
    public notificationMenuClick: boolean;
    public topbarNotificationMenuActive: boolean;
    public rightMenuClick: boolean;
    public rightMenuActive: boolean;
    public configActive: boolean;
    public configClick: boolean;
    public resetMenu: boolean;
    public menuHoverActive = false;

    constructor(
        private menuService: MenuService,
        private primengConfig: PrimeNGConfig
    ) {
        this.primengConfig.ripple = true;
        this.ripple = true;
    }

    onLayoutClick() {
        if (!this.searchClick) {
            this.search = false;
        }

        if (!this.userMenuClick) {
            this.topbarUserMenuActive = false;
        }

        if (!this.notificationMenuClick) {
            this.topbarNotificationMenuActive = false;
        }

        if (!this.rightMenuClick) {
            this.rightMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isSlim() || this.isHorizontal()) {
                this.menuService.reset();
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
            this.unblockBodyScroll();
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.searchClick = false;
        this.configClick = false;
        this.userMenuClick = false;
        this.rightMenuClick = false;
        this.notificationMenuClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarUserMenuActive = false;
        this.topbarNotificationMenuActive = false;
        this.rightMenuActive = false;

        if (this.isOverlay()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }

        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
            if (this.staticMenuMobileActive) {
                this.blockBodyScroll();
            } else {
                this.unblockBodyScroll();
            }
        }

        event.preventDefault();
    }

    onSearchClick(event) {
        this.search = !this.search;
        this.searchClick = !this.searchClick;
    }

    onSearchHide(event) {
        this.search = false;
        this.searchClick = false;
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;
    }

    onTopbarUserMenuButtonClick(event) {
        this.userMenuClick = true;
        this.topbarUserMenuActive = !this.topbarUserMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarNotificationMenuButtonClick(event) {
        this.notificationMenuClick = true;
        this.topbarNotificationMenuActive = !this.topbarNotificationMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onRightMenuClick(event) {
        this.rightMenuClick = true;
        this.rightMenuActive = !this.rightMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onRippleChange(event) {
        this.ripple = event.checked;
        this.primengConfig = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isSlim() {
        return this.menuMode === 'slim';
    }

    isHorizontal() {
        return this.menuMode === 'horizontal';
    }

    isOverlay() {
        return this.menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 1091;
    }

    isMobile() {
        return window.innerWidth <= 1091;
    }

    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }



}
