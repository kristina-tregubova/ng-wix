"use strict"
import { MDCTab } from '@material/tab';
import {MDCTabIndicator} from '@material/tab-indicator';
import {MDCTabBar} from '@material/tab-bar';
import {MDCTabScroller} from '@material/tab-scroller';
import {MDCRipple} from '@material/ripple';
import {MDCMenu} from '@material/menu';
import {MDCDataTable} from '@material/data-table';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldCharacterCounter} from '@material/textfield/character-counter';


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
        if (document.querySelector(".main-header") && document.documentElement.clientWidth > 795 && Math.round(document.body.scrollTop) >= 50 || Math.round(document.documentElement.scrollTop) >= 50) {
            document.querySelector(".main-header").classList.add('scrolled');
            document.querySelector('.site-nav').style.display = 'none';
            document.querySelector('.site-nav-min').style.display = 'block';
        
        } else if (document.querySelector(".main-header") && document.documentElement.clientWidth > 795) {
            document.querySelector(".main-header").classList.remove('scrolled');
            document.querySelector('.site-nav').style.display = 'flex';
            document.querySelector('.site-nav-min').style.display = 'none';
        }
        
    }, { capture: false, passive: true});


document.querySelectorAll('.mdc-tab').forEach((tab) => {
    new MDCTab(tab);
})
document.querySelectorAll('.mdc-tab-indicator').forEach((tabInd) => {
    new MDCTabIndicator(tabInd);
})

document.querySelectorAll('.mdc-tab-bar').forEach((tabBar) => {
    new MDCTabBar(tabBar);
})
document.querySelectorAll('.mdc-tab-scroller').forEach((tabScroller) => {
    new MDCTabScroller(tabScroller);
})

// participants table
const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));

//comments
const textField = new MDCTextField(document.querySelector('.mdc-text-field'));




