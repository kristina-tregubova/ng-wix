"use strict"
import { MDCTab } from '@material/tab';
import {MDCTabIndicator} from '@material/tab-indicator';
import {MDCTabBar} from '@material/tab-bar';
import {MDCTabScroller} from '@material/tab-scroller';
import {MDCRipple} from '@material/ripple';
import {MDCMenu} from '@material/menu';
import {MDCTextField} from '@material/textfield';
import {MDCSelect} from '@material/select';


//for shrinked header (not on index and auth)
    const menuBtn = document.querySelector('.menu-btn');
    const menu = new MDCMenu(document.querySelector('.mdc-menu'));
    menu.open = false;
    const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button')); 
    iconButtonRipple.unbounded = true;
    
    // open minimized menu
    document.body.addEventListener('click', function(e) {

        const menuBtnClicked = e.target.closest('.menu-btn');

        if (e.target === menuBtn && !menuBtn.classList.contains("open-menu")) {
            menu.open = true;
            menuBtn.classList.add('open-menu');
        } else if (menuBtn.classList.contains("open-menu")) {
            menu.open = false; 
            menuBtn.classList.remove('open-menu');
        }
        
    });

    // shrink header by scroll
    document.body.addEventListener("scroll", function() {
        if (document.querySelector(".main-header") && document.documentElement.clientWidth > 760 && Math.round(document.body.scrollTop) >= 50 || Math.round(document.documentElement.scrollTop) >= 50) {
            document.querySelector(".main-header").classList.add('scrolled');
            document.querySelector('.site-nav').style.display = 'none';
            document.querySelector('.site-nav-min').style.display = 'block';
        
        } else if (document.querySelector(".main-header") && document.documentElement.clientWidth > 760) {
            document.querySelector(".main-header").classList.remove('scrolled');
            document.querySelector('.site-nav').style.display = 'flex';
            document.querySelector('.site-nav-min').style.display = 'none';
        }
        
    }, { capture: false, passive: true});


const tab = new MDCTab(document.querySelector('.mdc-tab'));
const tabIndicator = new MDCTabIndicator(document.querySelector('.mdc-tab-indicator'));
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
const tabScroller = new MDCTabScroller(document.querySelector('.mdc-tab-scroller'));





