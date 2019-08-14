"use strict"
import { MDCTab } from '@material/tab';
import {MDCTabIndicator} from '@material/tab-indicator';
import {MDCTabBar} from '@material/tab-bar';
import {MDCTabScroller} from '@material/tab-scroller';
import {MDCRipple} from '@material/ripple';
import {MDCMenu} from '@material/menu';

const menuBtn = document.querySelector('.menu-btn');
const menu = new MDCMenu(document.querySelector('.mdc-menu'));
menu.open = false;
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;
const tab = new MDCTab(document.querySelector('.mdc-tab'));
const tabIndicator = new MDCTabIndicator(document.querySelector('.mdc-tab-indicator'));
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
const tabScroller = new MDCTabScroller(document.querySelector('.mdc-tab-scroller'));


document.body.addEventListener("scroll", function() {
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop > 50) {
        document.querySelector(".main-header").classList.add('scrolled');
        document.querySelector('.site-nav').style.display = 'none';
        document.querySelector('.site-nav-min').style.display = 'block';
        } else {
        document.querySelector(".main-header").classList.remove('scrolled');
        document.querySelector('.site-nav').style.display = 'flex';
        document.querySelector('.site-nav-min').style.display = 'none';
        }
    }, { capture: false, passive: true}
);

document.addEventListener('click', function(e) {

    const menuBtnClicked = e.target.closest('.menu-btn');
    menuBtn.classList.toggle('open-menu');

    if (menuBtn.classList.contains("open-menu")) {
        menu.open = true;
    } else {
        menu.open = false; 
    }

    if(e.target !== menuBtn && menuBtn.classList.contains("open-menu")) {
        menuBtn.classList.remove('open-menu');
    }
})